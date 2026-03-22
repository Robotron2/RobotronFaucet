import React, { useEffect, useState } from "react"
import { Card } from "../ui/Card"
import { formatAddress } from "../../utils/format"
import { Copy, Check } from "lucide-react"
import { useAppContext } from "../../hooks/context/useAppContext"
import { useReadFunctions } from "../../hooks/contractHook/useReadContract"
// import { useAppKitAccount } from "@reown/appkit/react"

export const WalletCard: React.FC = () => {
	const { state } = useAppContext()

	const [copied, setCopied] = useState(false)
	const { getUserBalance } = useReadFunctions()

	const handleCopy = () => {
		if (state.walletAddress) {
			navigator.clipboard.writeText(state.walletAddress)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		}
	}
	useEffect(() => {
		if (!state.walletAddress) return

		getUserBalance()
	}, [state.walletAddress, getUserBalance])

	return (
		<Card className="flex flex-col h-full bg-[#18191d] border-slate-800/60" hoverEffect={false}>
			<div className="flex flex-col mb-8">
				<div className="flex items-center gap-2 mb-1">
					<span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
						NETWORK CONNECTED
					</span>
					<div className="w-1.5 h-1.5 rounded-full bg-[#00E676]"></div>
				</div>
				<p className="text-xs text-slate-500 font-medium mb-4">Main Wallet Address</p>

				<div className="flex items-center gap-2">
					<span className="text-xl font-bold text-[#e1e1e7] tracking-wider">
						{state.isConnected ? formatAddress(state.walletAddress || "") : "Not Connected"}
					</span>
					{state.isConnected &&
						(copied ? (
							<Check size={16} className="text-[#00E676] transition-colors" />
						) : (
							<Copy
								size={16}
								className="text-slate-500 hover:text-white cursor-pointer transition-colors"
								onClick={handleCopy}
							/>
						))}
				</div>
			</div>

			<div className="mt-auto pt-4">
				<p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-2">AVAILABLE BALANCE</p>
				<div className="flex items-baseline gap-2">
					<span className="text-5xl font-bold text-[#a3ddff] tracking-tight">
						{/* {state.balance} */}
						{state.balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
					</span>
					<span className="text-xl font-bold text-[#a3ddff]">$RBNT</span>
				</div>
			</div>
		</Card>
	)
}
