import { useAppKitAccount } from "@reown/appkit/react"
import { useTokenContract } from "../useContracts"
import { useCallback, useState } from "react"
import { toast } from "react-toastify"
import { ethers } from "ethers"
import { handleContractError } from "../../utils/handleContractError"

export const useWriteFunctions = () => {
	const tokenContract = useTokenContract(true)
	const { address } = useAppKitAccount()

	const [isClaiming, setIsClaiming] = useState(false)
	const [isTransferring, setIsTransferring] = useState(false)

	const claimFaucet = useCallback(async () => {
		if (!tokenContract || !address) {
			toast.error("Wallet not connected")
			return false
		}

		try {
			setIsClaiming(true)

			const tx = await tokenContract.requestToken()
			const receipt = await tx.wait()

			return receipt.status === 1
		} catch (error) {
			await handleContractError(error)
			return false
		} finally {
			setIsClaiming(false)
		}
	}, [tokenContract, address])

	const mintToken = useCallback(
		async (amount: string, receiver: string) => {
			if (!tokenContract || !address) {
				toast.error("Wallet not connected")
				return false
			}

			try {
				setIsClaiming(true)

				const amt = ethers.parseUnits(amount, 18)
				const tx = await tokenContract.mint(receiver, amt)
				const receipt = await tx.wait()

				return receipt.status === 1
			} catch (error) {
				await handleContractError(error)
				return false
			} finally {
				setIsClaiming(false)
			}
		},
		[tokenContract, address],
	)

	const transferToken = useCallback(
		async (amount: string, receiver: string) => {
			if (!tokenContract) {
				toast.error("Token contract not found")
				return false
			}

			try {
				setIsTransferring(true)

				const amt = ethers.parseUnits(amount, 18)
				const tx = await tokenContract.transfer(receiver, amt)
				const receipt = await tx.wait()

				if (receipt.status === 1) {
					for (const log of receipt.logs) {
						try {
							const parsed = tokenContract.interface.parseLog(log)
							if (parsed?.name === "Transfer") {
								const transferredAmount = ethers.formatUnits(parsed.args[2], 18)
								toast.success(`Transferred ${transferredAmount} RBNT successfully!`)
								break
							}
						} catch (e) {
							// Ignored parse failures for unrelated logs
						}
					}
				}

				return receipt.status === 1
			} catch (error) {
				await handleContractError(error)
				return false
			} finally {
				setIsTransferring(false)
			}
		},
		[tokenContract],
	)

	const changeOwnershipToken = useCallback(
		async (newOwner: string) => {
			if (!tokenContract) {
				toast.error("Token contract not found")
				return false
			}

			try {
				setIsClaiming(true) // Reusing loading state for simplicity or could add new one
				const tx = await tokenContract.changeOwnership(newOwner)
				const receipt = await tx.wait()

				if (receipt.status === 1) {
					toast.success(`Ownership transferred successfully to ${newOwner.slice(0, 8)}...`)
				}

				return receipt.status === 1
			} catch (error) {
				await handleContractError(error)
				return false
			} finally {
				setIsClaiming(false)
			}
		},
		[tokenContract]
	)

	return {
		claimFaucet,
		mintToken,
		transferToken,
		changeOwnershipToken,
		isClaiming,
		isTransferring,
	}
}
