import { useCallback, useRef } from "react"
import { useAppContext } from "./context/useAppContext"
import { useReadFunctions } from "./contractHook/useReadContract"

export const useSyncAccount = () => {
	const { state } = useAppContext()
	const { getUserBalance, getOwner, getTokenDetail } = useReadFunctions()

	// Track the last synced wallet to avoid redundant session fetches
	const lastSyncedWallet = useRef<string | null>(null)
	// Track if we've fetched global details
	const hasFetchedGlobals = useRef<boolean>(false)

	const sync = useCallback(async (forceRefresh = false) => {
		const promises: Promise<any>[] = []

		if (!hasFetchedGlobals.current || forceRefresh || !state.totalSupply) {
			promises.push(
				getTokenDetail().then(() => {
					hasFetchedGlobals.current = true
				})
			)
		}

		if (state.walletAddress) {
			const isNewWallet = lastSyncedWallet.current !== state.walletAddress

			if (isNewWallet || forceRefresh) {
				promises.push(getUserBalance())
			}

			if (!state.owner || forceRefresh) {
				promises.push(getOwner())
			}
		}

		if (promises.length > 0) {
			await Promise.all(promises)
		}

		if (state.walletAddress) {
			lastSyncedWallet.current = state.walletAddress
		}
	}, [state.walletAddress, state.totalSupply, state.owner, getUserBalance, getOwner, getTokenDetail])

	return { sync }
}
