import { useState, useEffect, useCallback } from "react"
import { useTokenContract } from "./useContracts"
import { useAppContext } from "./context/useAppContext"

export const useCooldown = () => {
	const { state } = useAppContext()
	const tokenContract = useTokenContract(false) // Bind to read-only RPC provider so cooldown timers boot instantly alongside the App rather than waiting for slow Web3 Signer initialization
	const [remainingTime, setRemainingTime] = useState<number>(0)
	const [canClaimUser, setCanClaimUser] = useState<boolean>(false)
	const [targetTimestamp, setTargetTimestamp] = useState<number | null>(null)

	const fetchCooldown = useCallback(async () => {
		if (!tokenContract || !state.walletAddress) {
			setCanClaimUser(false)
			setRemainingTime(0)
			setTargetTimestamp(null)
			return
		}
		try {
			const isEligible = await tokenContract.canClaim(state.walletAddress)
			setCanClaimUser(isEligible)

			if (!isEligible) {
				const time = await tokenContract.getNextClaimTime(state.walletAddress)
				const targetTime = Number(time) * 1000
				setTargetTimestamp(targetTime)
				const now = Date.now()
				const diff = targetTime - now
				setRemainingTime(diff > 0 ? diff : 0)
			} else {
				setRemainingTime(0)
				setTargetTimestamp(null)
			}
		} catch (e) {
			console.error("Failed to fetch cooldown:", e)
		}
	}, [tokenContract, state.walletAddress])

	useEffect(() => {
		fetchCooldown()
	}, [fetchCooldown])

	useEffect(() => {
		if (targetTimestamp === null) {
			setRemainingTime(0)
			return
		}

		const intervalId = setInterval(() => {
			const now = Date.now()
			const diff = targetTimestamp - now
			if (diff <= 0) {
				setRemainingTime(0)
				setCanClaimUser(true)
				setTargetTimestamp(null)
			} else {
				setRemainingTime(diff)
			}
		}, 1000)

		return () => clearInterval(intervalId)
	}, [targetTimestamp])

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
