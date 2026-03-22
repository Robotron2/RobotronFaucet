import { useState, useEffect, useCallback } from "react"
import { useTokenContract } from "./useContracts"
import { useAppContext } from "./context/useAppContext"

export const useCooldown = () => {
	const { state } = useAppContext()
	const tokenContract = useTokenContract(false) // Bind to read-only RPC provider so cooldown timers boot instantly alongside the App rather than waiting for slow Web3 Signer initialization
	const [remainingTime, setRemainingTime] = useState<number>(0)
	const [canClaimUser, setCanClaimUser] = useState<boolean>(false)

	const fetchCooldown = useCallback(async () => {
		if (!tokenContract || !state.walletAddress) {
			setCanClaimUser(false)
			setRemainingTime(0)
			return
		}
		try {
			const isEligible = await tokenContract.canClaim(state.walletAddress)
			setCanClaimUser(isEligible)
			
			if (!isEligible) {
				const time = await tokenContract.getNextClaimTime(state.walletAddress)
				const targetTime = Number(time) * 1000
				const now = Date.now()
				const diff = targetTime - now
				setRemainingTime(diff > 0 ? diff : 0)
			} else {
				setRemainingTime(0)
			}
		} catch (e) {
			console.error("Failed to fetch cooldown:", e)
		}
	}, [tokenContract, state.walletAddress])

	useEffect(() => {
		fetchCooldown()
		const intervalId = setInterval(() => {
			setRemainingTime((prev) => {
				if (prev <= 1000) {
					if (prev > 0) fetchCooldown()
					return 0
				}
				return prev - 1000
			})
		}, 1000)

		return () => clearInterval(intervalId)
	}, [fetchCooldown])

	const isOnCooldown = !canClaimUser && remainingTime > 0

	const formattedTime = () => {
		if (!isOnCooldown) return "00:00:00"
		const h = Math.floor(remainingTime / (1000 * 60 * 60))
		const m = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))
		const s = Math.floor((remainingTime % (1000 * 60)) / 1000)
		return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
	}

	return {
		remainingTime,
		isOnCooldown,
		formattedTime: formattedTime(),
		fetchCooldown
	}
}
