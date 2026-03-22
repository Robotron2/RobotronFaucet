import React, { useState } from "react"
import { Card } from "../ui/Card"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"

import { useToken } from "../../hooks/useToken"
import { Send } from "lucide-react"
import { useAppContext } from "../../hooks/context/useAppContext"

export const TransferCard: React.FC = () => {
	const { state } = useAppContext()
	const { transfer } = useToken()
	const [recipient, setRecipient] = useState("")
	const [amount, setAmount] = useState("")
	const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

	const handleTransfer = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!state.isConnected) return

		const amt = parseFloat(amount)
		if (isNaN(amt) || amt <= 0 || amt > state.balance || !recipient.startsWith("0x") || recipient.length !== 42) {
			setStatus("error")
			setTimeout(() => setStatus("idle"), 3000)
			return
		}

		setStatus("loading")
		try {
			await transfer(recipient, amt)
			setStatus("success")
			setRecipient("")
			setAmount("")
			setTimeout(() => setStatus("idle"), 3000)
		} catch (err) {
			setStatus("error")
			console.log(err)
			setTimeout(() => setStatus("idle"), 3000)
		}
	}

	return (
		<Card className="flex flex-col h-full bg-[#18191d] border-slate-800/60" hoverEffect={false}>
			<div className="flex items-start gap-3 mb-6">
				<div className="w-8 h-8 rounded bg-[#a3ddff]/10 flex items-center justify-center mt-1">
					<Send className="text-[#a3ddff]" size={16} />
				</div>
				<div>
					<h3 className="text-sm font-bold text-[#e1e1e7] tracking-wider mb-1">Transfer Assets</h3>
					<p className="text-xs text-slate-400 font-medium">Send RBNT tokens to any node address</p>
				</div>
			</div>

			<form onSubmit={handleTransfer} className="flex-1 flex flex-col gap-4 mt-auto">
				<Input
					label="RECIPIENT ADDRESS"
					placeholder="0x..."
					value={recipient}
					onChange={(e) => setRecipient(e.target.value)}
					disabled={status === "loading"}
					className="bg-[#111415] border-slate-800 py-2.5 text-sm"
				/>

				<div className="relative">
					<Input
						label="AMOUNT (RBNT)"
						type="number"
						placeholder="0.00"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						disabled={status === "loading"}
						className="bg-[#111415] border-slate-800 py-2.5 pr-12 text-sm"
					/>
					<span
						className="absolute right-3 top-[28px] text-[10px] font-bold text-slate-500 uppercase tracking-widest cursor-pointer hover:text-white transition-colors"
						onClick={() => state.isConnected && setAmount(state.balance.toString())}>
						MAX
					</span>
				</div>

				<div className="mt-2 flex flex-col items-center gap-3">
					<Button
						variant="primary"
						className="w-full bg-[#a3ddff] hover:bg-[#8eccee] text-[#0B0E11] shadow-[0_0_15px_rgba(163,221,255,0.2)] font-bold text-sm tracking-wide"
						type="submit"
						disabled={status === "loading" || !state.isConnected || !recipient || !amount}
						isLoading={status === "loading"}>
						<Send size={16} className={status === "loading" ? "hidden" : "block"} />
						Send Tokens
					</Button>
					<span className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
						<span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
						Estimated Gas Fee : ~0.00042 ETH
					</span>
				</div>
			</form>
		</Card>
	)
}
