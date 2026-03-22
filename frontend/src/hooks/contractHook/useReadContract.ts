import { toast } from "react-toastify"
import { useTokenContract } from "../useContracts"
import { useCallback } from "react"

import { ethers } from "ethers"
import { useAppContext } from "../context/useAppContext"

export const useReadFunctions = () => {
	const tokenContract = useTokenContract()
	const { state, setBalance, setOwner, setTotalSupply } = useAppContext()
	const walletAddress = state.walletAddress
	// const [isLoadingBalance, setIsLoadingBalance] = useState(false)
	//   const [isLoadingDetails, setIsLoadingDetails] = useState(false);

	const getUserBalance = useCallback(async () => {
		if (!tokenContract) {
			toast.error("token contract not found!")
			return
		}
		if (!walletAddress) {
			toast.error("address is not found!")
			return
		}
		try {
			// const name = await tokenContract.name()
			// console.log(name)
			const balance = await tokenContract.balanceOf(walletAddress)
			const formattedBalance = Number(ethers.formatUnits(balance, 18))
			// console.log(balance, "Raw balance")
			// console.log(formattedBalance, "Formatted balance")
			setBalance(formattedBalance)
			return formattedBalance
		} catch (error) {
			toast.error("Failed to fetch balance")
			console.error(error)
			return null
		}
	}, [tokenContract, walletAddress])

	const getOwner = useCallback(async () => {
		if (!tokenContract) {
			toast.error("token contract not found!")
			return
		}
		try {
			// setIsLoadingBalance(true)
			const owner = await tokenContract.owner()
			if (owner) setOwner(owner)
			return owner
		} catch (error) {
			toast.error("Failed to fetch token owner")
			console.error(error)
			return null
		} finally {
			// setIsLoadingBalance(false)
		}
	}, [tokenContract])

	const getTokenDetail = useCallback(async () => {
		if (!tokenContract) {
			return
		}
		try {
			const totalSupply = await tokenContract.totalSupply()
			setTotalSupply(Number(ethers.formatUnits(totalSupply, 18)))
		} catch (error) {
			console.error("Failed to fetch token detail", error)
		}
	}, [tokenContract, setTotalSupply])

	return {
		getUserBalance,
		getOwner,
		getTokenDetail,
	}
}
