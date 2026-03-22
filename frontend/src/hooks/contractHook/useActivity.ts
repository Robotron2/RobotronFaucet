import { useState, useEffect, useCallback } from "react"
import { useTokenContract } from "../useContracts"
import { useAppContext } from "../context/useAppContext"
import { ethers, Log } from "ethers"

export interface ActivityLog {
	id: string
	title: string
	amount: string
	status: string
	time: string
	type: "claim" | "transfer"
}

export const useActivity = () => {
	const { state } = useAppContext()
	const tokenContract = useTokenContract()
	const [activities, setActivities] = useState<ActivityLog[]>([])
	const [isLoadingActivities, setIsLoadingActivities] = useState(false)

	const fetchActivity = useCallback(async () => {
		if (!tokenContract || !state.walletAddress) return
		setIsLoadingActivities(true)
		try {
			const provider = tokenContract.runner?.provider
			if (!provider) return

			// Calculate safe block range (last ~5000 blocks to prevent RPC timeouts)
			const latestBlock = await provider.getBlockNumber()
			const fromBlock = Math.max(0, latestBlock - 5000)

			// Fallback: we can fetch all Transfers and map them to bypass strict TS filter typing
			const transferEventId = ethers.id("Transfer(address,address,uint256)")
			const paddedWallet = ethers.zeroPadValue(state.walletAddress, 32)
			const contractRef = await tokenContract.getAddress()

			// Manual Ethers v6 Topic Filtering (Incoming + Outgoing)
			const logsTo = await provider.getLogs({
				address: contractRef,
				fromBlock: fromBlock,
				toBlock: "latest",
				topics: [transferEventId, null, paddedWallet]
			})

			const logsFrom = await provider.getLogs({
				address: contractRef,
				fromBlock: fromBlock,
				toBlock: "latest",
				topics: [transferEventId, paddedWallet, null]
			})

			// Merge, deduplicate (if any overlap), and sort descending safely
			const allLogsMap = new Map<string, Log>()
			;[...logsTo, ...logsFrom].forEach((log) => allLogsMap.set(log.transactionHash, log))
			const allLogs = Array.from(allLogsMap.values())
				.sort((a, b) => b.blockNumber - a.blockNumber)
				.slice(0, 5) // Limit to top 5 recent events for performance

			const parsedActivities: ActivityLog[] = await Promise.all(
				allLogs.map(async (log) => {
					// Hard parse without relying on Typechain strictly
					// topics[1] = from, topics[2] = to, data = value
					const from = ethers.dataSlice(log.topics[1], 12) // slice out padding to get 20-byte address
					const to = ethers.dataSlice(log.topics[2], 12)
					
					const isIncoming = to.toLowerCase() === state.walletAddress?.toLowerCase()
					const isMint = from === ethers.ZeroAddress

					const amountStr = ethers.formatUnits(log.data, 18)
					
					// Parse the individual block dynamically to fetch true timestamp
					let formattedTime = "Recently"
					try {
						const block = await provider.getBlock(log.blockNumber)
						if (block) {
							const date = new Date(block.timestamp * 1000)
							formattedTime = date.toLocaleString("en-US", {
								month: "short",
								day: "numeric",
								hour: "numeric",
								minute: "2-digit",
								hour12: true,
							})
						}
					} catch (e) {
						// Fail gracefully
					}

					return {
						id: log.transactionHash,
						title: isMint
							? "Faucet Claim"
							: isIncoming
							? `Received from ${from.slice(0, 6)}...`
							: `Transfer to ${to.slice(0, 6)}...`,
						amount: `${isIncoming ? "+" : "-"}${amountStr} RBNT`,
						status: "Confirmed",
						time: formattedTime,
						type: isMint ? "claim" : "transfer",
					}
				})
			)

			setActivities(parsedActivities)
		} catch (e) {
			console.error("Failed to fetch activity logs:", e)
		} finally {
			setIsLoadingActivities(false)
		}
	}, [tokenContract, state.walletAddress])

	useEffect(() => {
		fetchActivity()
	}, [fetchActivity])

	return { activities, isLoadingActivities, fetchActivity }
}
