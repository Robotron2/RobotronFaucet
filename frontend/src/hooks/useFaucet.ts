import { useState, useCallback } from "react"
import { useAppContext } from "./context/useAppContext"
import { useWriteFunctions } from "./contractHook/useWriteContract"

export type RequestStatus = "idle" | "loading" | "success" | "error"

export const useFaucet = () => {
	const { state } = useAppContext()
	const { claimFaucet } = useWriteFunctions()

	const [status, setStatus] = useState<RequestStatus>("idle")
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const claim = useCallback(async () => {
		if (!state.walletAddress) {
			setStatus("error")
			setErrorMessage("Wallet not connected")
			return
		}

		setStatus("loading")
		setErrorMessage(null)

		try {
			const success = await claimFaucet()

			if (!success) {
				setStatus("error")
				setErrorMessage("Transaction failed")
				return
			}

			setStatus("success")
		} catch (err: unknown) {
			setStatus("error")

			if (err instanceof Error) {
				setErrorMessage(err.message)
			} else {
				setErrorMessage("Failed to claim tokens")
			}
		}
	}, [state.walletAddress, claimFaucet])

	const resetStatus = useCallback(() => {
		setStatus("idle")
		setErrorMessage(null)
	}, [])

	return {
		claim,
		status,
		errorMessage,
		resetStatus,
	}
}
