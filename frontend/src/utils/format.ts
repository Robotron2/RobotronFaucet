import { ethers } from "ethers"

export const formatAddress = (address: string, startChars = 6, endChars = 4): string => {
	if (!address) return ""
	if (address.length <= startChars + endChars) return address
	return `${address.substring(0, startChars)}...${address.substring(address.length - endChars)}`
}

export const parseToken = (value: string | number) => ethers.parseUnits(value.toString(), 18)
