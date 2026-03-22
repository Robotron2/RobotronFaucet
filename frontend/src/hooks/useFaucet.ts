import { useState } from "react"
import { mockContract } from "../services/mockContract"
import { useCooldown } from "./useCooldown"
import { useAppContext } from "./context/useAppContext"

export type RequestStatus = "idle" | "loading" | "success" | "error"

export const useFaucet = () => {
	const { state, setBalance, setTotalSupply, setLastClaimTime } = useAppContext()
	const { isOnCooldown } = useCooldown()

	const [status, setStatus] = useState<RequestStatus>("idle")
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const claim = async () => {
		// Basic validations before interacting with mockContract
		if (!state.walletAddress) {
			setStatus("error")
			setErrorMessage("Wallet not connected")
			return
		}

		if (isOnCooldown) {
			setStatus("error")
			setErrorMessage("Cooldown not elapsed")
			return
		}

		setStatus("loading")
		setErrorMessage(null)

		try {
			await mockContract.requestToken(state.walletAddress)

			// Update local state by refetching from mock contract
			const newBal = await mockContract.balanceOf(state.walletAddress)
			setBalance(newBal)

			const newSupply = await mockContract.totalSupply()
			setTotalSupply(newSupply)

			const newClaimTime = await mockContract.getLastClaimTime(state.walletAddress)
			setLastClaimTime(newClaimTime)

			setStatus("success")
		} catch (err: any) {
			setStatus("error")
			setErrorMessage(err.message || "Failed to claim tokens")
		}
	}

	const resetStatus = () => {
		setStatus("idle")
		setErrorMessage(null)
	}

	return { claim, status, errorMessage, resetStatus }
}
