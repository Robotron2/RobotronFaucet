export interface AppState {
	walletAddress: string | null
	isConnected: boolean
	balance: number
	totalSupply: number
	lastClaimTime: number | null // stored as timestamp in milliseconds
	owner: string
}

// Define the context API shape with getters, setters, and actions
export interface AppContextType {
	state: AppState

	// Setters
	setWalletAddress: (address: string | null) => void
	setIsConnected: (connected: boolean) => void
	setBalance: (balance: number) => void
	setTotalSupply: (supply: number) => void
	setLastClaimTime: (timestamp: number | null) => void
	setOwner: (ownerAddress: string) => void

	// Actions (to be fleshed out with mockContract logic in Phase 4/5)
	claim: () => Promise<void>
	transfer: (to: string, amount: number) => Promise<void>
	mint: (to: string, amount: number) => Promise<void>
}
