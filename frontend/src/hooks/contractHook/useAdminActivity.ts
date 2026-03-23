import { useState, useEffect, useCallback, useRef } from "react"
import { useTokenContract } from "../useContracts"
import { useAppContext } from "../context/useAppContext"
import { ethers, Log } from "ethers"

export interface AdminLog {
	id: string
	title: string
	desc: string
	color: string
	time: string
	hash: string
}

export const useAdminActivity = () => {
	const { state } = useAppContext()
	const tokenContract = useTokenContract(false)
	const [logs, setLogs] = useState<AdminLog[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const lastFetchedOwner = useRef<string | null>(null)

	const fetchLogs = useCallback(async (force = false) => {
		if (!tokenContract || !state.owner) return
		if (!force && lastFetchedOwner.current === state.owner) return

		setIsLoading(true)
		try {
			const provider = tokenContract.runner?.provider
			if (!provider) return

			const latestBlock = await provider.getBlockNumber()
			const fromBlock = Math.max(0, latestBlock - 10000)

			const contractRef = await tokenContract.getAddress()

			// Event Topics
			const ownershipTopic = ethers.id("OwnershipTransferred(address,address)")
			const mintTopic = ethers.id("TokensMinted(address,uint256)")

			const [transferLogs, mintRawLogs] = await Promise.all([
				provider.getLogs({
					address: contractRef,
					fromBlock,
					toBlock: "latest",
					topics: [ownershipTopic],
				}),
				provider.getLogs({
					address: contractRef,
					fromBlock,
					toBlock: "latest",
					topics: [mintTopic],
				}),
			])

			// Filter `TokensMinted` to ensure it was triggered by the Admin, not Faucets.
			// Faucets are executed by users. Admin Mints are executed by `state.owner`.
			const validMintLogs: Log[] = []
			for (const log of mintRawLogs) {
				const tx = await provider.getTransaction(log.transactionHash)
				if (tx && tx.from.toLowerCase() === state.owner.toLowerCase()) {
					validMintLogs.push(log)
				}
			}

			// Merge and sort
			const allLogsMap = new Map<string, Log>()
			;[...transferLogs, ...validMintLogs].forEach((log) => allLogsMap.set(log.transactionHash, log))
			const allLogs = Array.from(allLogsMap.values())
				.sort((a, b) => b.blockNumber - a.blockNumber)
				.slice(0, 5)

			const parsedAdminLogs: AdminLog[] = await Promise.all(
				allLogs.map(async (log) => {
					const isOwnership = log.topics[0] === ownershipTopic

					let title = ""
					let desc = ""
					let color = ""

					if (isOwnership) {
						const newOwner = ethers.dataSlice(log.topics[2], 12)
						title = "Ownership Transferred"
						desc = `NEW OWNER: ${newOwner.slice(0, 6).toUpperCase()}...${newOwner.slice(-4).toUpperCase()}`
						color = "bg-[#FFb74D]"
					} else {
						const to = ethers.dataSlice(log.topics[1], 12)
						const amountStr = ethers.formatUnits(log.data, 18)
						title = `Minted ${Number(amountStr).toLocaleString()} RBNT`
						desc = `TO: ${to.slice(0, 6).toUpperCase()}...${to.slice(-4).toUpperCase()}`
						color = "bg-[#00E676]"
					}

					let formattedTime = "RECENTLY"
					try {
						const block = await provider.getBlock(log.blockNumber)
						if (block) {
							const date = new Date(block.timestamp * 1000)
							formattedTime = date
								.toLocaleDateString("en-US", { month: "short", day: "numeric" })
								.toUpperCase()
						}
					} catch (e) {}

					return {
						id: log.transactionHash,
						hash: log.transactionHash,
						title,
						desc: `${desc} • ${formattedTime}`,
						color,
						time: formattedTime,
					}
				}),
			)

			setLogs(parsedAdminLogs)
			lastFetchedOwner.current = state.owner
		} catch (e) {
			console.error("Failed to fetch admin logs:", e)
		} finally {
			setIsLoading(false)
		}
	}, [tokenContract, state.owner])

	useEffect(() => {
		fetchLogs()
	}, [fetchLogs])

	return { logs, isLoading, fetchLogs }
}
