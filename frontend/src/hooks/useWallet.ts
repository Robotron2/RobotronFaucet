import { useEffect } from "react"
import { useAppKit, useAppKitAccount } from "@reown/appkit/react"
import { useAppContext } from "./context/useAppContext"

export const useWallet = () => {
	const { state, setWalletAddress, setIsConnected } = useAppContext()

	const { open } = useAppKit()
	const { address, isConnected } = useAppKitAccount()

	useEffect(() => {
		if (isConnected && address) {
			setIsConnected(true)
			setWalletAddress(address)
		} else {
			setIsConnected(false)
			setWalletAddress(null)
		}
	}, [isConnected, address])

	const handleWalletConnect = () => {
		open()
	}

	return {
		address: state.walletAddress,
		isConnected: state.isConnected,
		handleWalletConnect,
	}
}

// const connect = async () => {

// 	setWalletAddress(address)
// 	setIsConnected(true)

// 	// Fetch initial chain state
// 	const bal = await mockContract.balanceOf(address)
// 	setBalance(bal)

// 	const supply = await mockContract.totalSupply()
// 	setTotalSupply(supply)

// 	const claimTime = await mockContract.getLastClaimTime(address)
// 	setLastClaimTime(claimTime)

// 	const owner = await mockContract.getOwner()
// 	setOwner(owner)
// }

// const disconnect = () => {
// 	setWalletAddress(null)
// 	setIsConnected(false)
// 	setBalance(0)
// 	setLastClaimTime(null)
// }
