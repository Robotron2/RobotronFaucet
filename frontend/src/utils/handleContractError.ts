import { ErrorDecoder } from "ethers-decode-error"
import { toast } from "react-toastify"
import { mapContractError } from "./contractErrorMapper"

const errorDecoder = ErrorDecoder.create()

export const handleContractError = async (error: unknown) => {
	try {
		const decoded = await errorDecoder.decode(error)
		const message = mapContractError(decoded)

		toast.error(message)
		return message
	} catch (e) {
		console.error("Error decoding failed:", e)
		toast.error("Transaction failed")
		return "Transaction failed"
	}
}
