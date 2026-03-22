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

	// Actions (Mock actions removed)
}
