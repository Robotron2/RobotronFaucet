import React, { useState } from "react"
import { Card } from "../ui/Card"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { KeyRound, ArrowRightLeft, Copy, AlertTriangle } from "lucide-react"
import { formatAddress } from "../../utils/format"
import { useAppContext } from "../../hooks/context/useAppContext"

export const OwnershipCard: React.FC = () => {
	const { state } = useAppContext()
	const [newOwner, setNewOwner] = useState("")

	const handleTransfer = (e: React.FormEvent) => {
		e.preventDefault()
		// Implementation mock
	}

	return (
		<div className="flex flex-col h-full gap-4">
			<Card className="flex flex-col h-full bg-[#18191d] border-slate-800/60 p-8" hoverEffect={false}>
				<div className="flex items-center gap-4 mb-8">
					<div className="w-10 h-10 rounded-full bg-[#FFb74D]/10 flex items-center justify-center">
						<KeyRound className="text-[#FFb74D]" size={18} />
					</div>
					<h3 className="text-xl font-bold text-[#e1e1e7] tracking-wide">Ownership</h3>
				</div>

				<div className="mb-8">
					<label className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-3 block">
						CURRENT OWNER
					</label>
					<div className="w-full bg-[#111415] border border-slate-800/80 rounded-lg px-4 py-3.5 flex items-center justify-between">
						<span className="text-sm font-mono text-[#e1e1e7] font-medium">
							{state.owner ? formatAddress(state.owner, 8, 4) : "0x71C765...6001"}
						</span>
						<Copy size={16} className="text-slate-500 hover:text-white cursor-pointer transition-colors" />
					</div>
				</div>

				<form
					onSubmit={handleTransfer}
					className="mt-auto border-t border-slate-800/60 pt-8 flex flex-col gap-5">
					<Input
						label="TRANSFER OWNERSHIP TO"
						placeholder="New owner address..."
						value={newOwner}
						onChange={(e) => setNewOwner(e.target.value)}
						className="bg-[#111415] border-slate-800/80 py-3.5 text-sm"
					/>

					<Button
						variant="secondary"
						className="w-full mt-2 font-bold tracking-widest uppercase py-3.5 border-slate-700 hover:border-slate-500"
						type="submit"
						disabled={!state.isConnected || !newOwner}>
						<ArrowRightLeft size={16} />
						TRANSFER OWNERSHIP
					</Button>
				</form>
			</Card>

			{/* Manual Alert Component tightly matching Image 1 */}
			<div className="w-full rounded-xl bg-gradient-to-r from-[#2a1315] to-[#1f0e10] border border-[#3d1a1e] p-5 flex items-start gap-4">
				<AlertTriangle size={20} className="text-[#FF5252] shrink-0 mt-0.5" />
				<div className="flex flex-col">
					<span className="text-xs font-bold text-[#e1e1e7] uppercase tracking-wider mb-1">
						CRITICAL ACTION
					</span>
					<span className="text-[11px] text-[#ff8e8e] leading-relaxed font-medium">
						Transferring ownership is irreversible. The new owner will have full control over minting and
						protocol parameters.
					</span>
				</div>
			</div>
		</div>
	)
}
