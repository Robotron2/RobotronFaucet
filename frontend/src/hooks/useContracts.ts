import { useMemo } from "react"
import useRunners from "./useRunners"
import { Contract } from "ethers"
import { getAddress } from "ethers"
import { RBNT_ABI } from "../abi/RBNT"

export const useTokenContract = (withSigner = false) => {
	const { readOnlyProvider, signer } = useRunners()

	return useMemo(() => {
		if (withSigner) {
			if (!signer) return null
			return new Contract(getAddress(import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS), RBNT_ABI, signer)
		}
		return new Contract(getAddress(import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS), RBNT_ABI, readOnlyProvider)
	}, [readOnlyProvider, signer, withSigner])
}
