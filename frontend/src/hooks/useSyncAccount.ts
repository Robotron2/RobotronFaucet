import { useCallback } from "react"
import { useAppContext } from "./context/useAppContext"
import { useReadFunctions } from "./contractHook/useReadContract"

export const useSyncAccount = () => {
	const { state } = useAppContext()
	const { getUserBalance, getOwner, getTokenDetail } = useReadFunctions()

	const sync = useCallback(async () => {
		await getTokenDetail() // Can run even without connected wallet!
		if (!state.walletAddress) return

		await Promise.all([getUserBalance(), getOwner()])
	}, [state.walletAddress, getUserBalance, getOwner, getTokenDetail])

	return { sync }
}
