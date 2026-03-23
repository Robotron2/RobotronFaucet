import React, { useState, useCallback, type ReactNode } from "react"
import type { AppContextType, AppState } from "../types/contextTypes"
import { AppContext } from "../hooks/context/useAppContext"

// Initial state values
const INITIAL_STATE: AppState = {
	walletAddress: null,
	isConnected: false,
	balance: 0,
	totalSupply: 0, 
	lastClaimTime: null,
	owner: "", 
}

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [state, setState] = useState<AppState>(INITIAL_STATE)

	// === Setters ===
	const setWalletAddress = useCallback((address: string | null) => setState((prev) => ({ ...prev, walletAddress: address })), [])
	const setIsConnected = useCallback((connected: boolean) => setState((prev) => ({ ...prev, isConnected: connected })), [])
	const setBalance = useCallback((balance: number) => setState((prev) => ({ ...prev, balance })), [])
	const setTotalSupply = useCallback((supply: number) => setState((prev) => ({ ...prev, totalSupply: supply })), [])
	const setLastClaimTime = useCallback((timestamp: number | null) => setState((prev) => ({ ...prev, lastClaimTime: timestamp })), [])
	const setOwner = useCallback((ownerAddress: string) => setState((prev) => ({ ...prev, owner: ownerAddress })), [])

	const value: AppContextType = {
		state,
		setWalletAddress,
		setIsConnected,
		setBalance,
		setTotalSupply,
		setLastClaimTime,
		setOwner,
	}

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
