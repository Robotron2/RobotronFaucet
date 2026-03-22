import type { DecodedError } from "ethers-decode-error"

export const mapContractError = (decoded: DecodedError): string => {
	const { name, args } = decoded

	switch (name) {
		case "Error__CooldownNotElapsed": {
			const nextTime = Number(args?.[0] || 0) * 1000
			const date = new Date(nextTime)

			return `Cooldown active. Next claim at ${date.toLocaleTimeString()}`
		}

		case "Error__NotOwner":
			return "Only the contract owner can perform this action"

		case "Error__MaxSupplyExceeded":
			return "Max token supply has been reached"

		case "Error__ZeroAddress":
			return "Invalid address provided"

		case "Error__ZeroValue":
			return "Amount must be greater than zero"

		case "Error__InsufficientBalance":
			return "You do not have enough tokens"

		case "Error__InsufficientAllowance":
			return "Allowance too low for this transaction"

		default:
			return decoded.reason || "Transaction failed"
	}
}
