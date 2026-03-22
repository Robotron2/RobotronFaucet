import { ErrorDecoder } from "ethers-decode-error"
import { toast } from "react-toastify"
import { mapContractError } from "./contractErrorMapper"
import { RBNT_ABI } from "../abi/RBNT"
import { Interface } from "ethers"

const rbntInterface = new Interface(RBNT_ABI as any)
const errorDecoder = ErrorDecoder.create([rbntInterface as any])

export const handleContractError = async (error: any) => {
	try {
		// 1. AppKit / WalletConnect nests the raw RPC error data deeply
		const rawErrorData = error?.data || error?.error?.data || error?.info?.error?.data
		
		// 2. Safely attempt Native Ethers v6 explicit parsing
		if (rawErrorData) {
			const parsedError = rbntInterface.parseError(rawErrorData)
			if (parsedError) {
				const message = mapContractError(parsedError as any)
				toast.error(message)
				return message
			}
		}

		// 3. Fallback to extracting the Hex string if standard .data is stripped by the wallet
		const stringMatch = (error?.message || "").match(/(0x[0-9a-fA-F]{8})/)
		if (stringMatch && stringMatch[1]) {
			// Hard fallback for the specific Cooldown hex selector reported
			if (stringMatch[1].toLowerCase() === "0x7bae800f") {
				const fallbackMsg = "Cooldown active. Please wait 24 hours between claims."
				toast.error(fallbackMsg)
				return fallbackMsg
			}
			
			const parsedStringError = rbntInterface.parseError(stringMatch[1])
			if (parsedStringError) {
				const message = mapContractError(parsedStringError as any)
				toast.error(message)
				return message
			}
		}

		// 4. Finally attempt 3rd party parser if all native bindings missed
		const decoded = await errorDecoder.decode(error)
		const message = mapContractError(decoded)

		toast.error(message)
		return message
	} catch (e) {
		console.error("Error decoding failed:", e)
		
		// 5. Final Graceful Fallback preventing empty transactions
		const reason = error?.reason || "Transaction failed"
		toast.error(reason)
		return reason
	}
}
