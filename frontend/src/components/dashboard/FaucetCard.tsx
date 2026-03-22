import React from "react"
import { Card } from "../ui/Card"
import { Button } from "../ui/Button"
import { Alert } from "../ui/Alert"

import { useFaucet } from "../../hooks/useFaucet"
import { useCooldown } from "../../hooks/useCooldown"
import { Droplet, RefreshCw } from "lucide-react"
import { useAppContext } from "../../hooks/context/useAppContext"

export const FaucetCard: React.FC = () => {
	const { state } = useAppContext()
	const { claim, status, errorMessage, resetStatus } = useFaucet()
	const { formattedTime, isOnCooldown, fetchCooldown } = useCooldown()

	const handleClaim = async () => {
		if (!state.isConnected || isOnCooldown) return

		await claim()
		
		// Force a slight delay to beat potential RPC block-read latency
		setTimeout(async () => {
			await fetchCooldown()
			resetStatus()
		}, 3000)
	}

	return (
		<Card className="flex flex-col h-full bg-[#18191d] border-slate-800/60" hoverEffect={false}>
			<div className="flex items-start gap-3 mb-10">
				<div className="w-8 h-8 rounded bg-[#00E676]/10 flex items-center justify-center mt-1">
					<Droplet className="text-[#00E676]" size={16} fill="#00E676" />
				</div>
				<div>
					<h3 className="text-sm font-bold text-[#e1e1e7] tracking-wider mb-1">Token Faucet</h3>
					<p className="text-xs text-slate-400 font-medium">Daily rewards for verified operators</p>
				</div>
			</div>

			<div className="flex flex-col gap-6 mb-8 mt-auto">
				<div className="flex items-center justify-between px-2">
					<div className="flex flex-col">
						<span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
							CLAIM AMOUNT
						</span>
						<span className="text-sm font-bold text-[#e1e1e7]">100 RBNT</span>
					</div>

					<div className="flex flex-col text-right">
						<span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
							COOLDOWN
						</span>
						<span
							className={`text-sm font-bold tracking-wider ${
								isOnCooldown ? "text-amber-500" : "text-[#00E676]"
							}`}>
							{isOnCooldown ? formattedTime : "24:00:00"}
						</span>
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-4">
				<Button
					variant="primary"
					className="w-full bg-[#00E676] hover:bg-[#00c968] text-[#0B0E11] shadow-[0_0_15px_rgba(0,230,118,0.2)]"
					onClick={handleClaim}
					disabled={isOnCooldown || !state.isConnected || status === "loading"}
					isLoading={status === "loading"}>
					<RefreshCw size={16} className={status === "loading" ? "hidden" : "block"} />
					{status === "loading" ? "Processing..." : isOnCooldown ? "Locked" : "Claim Tokens"}
				</Button>

				{status === "success" && (
					<Alert
						message="Success: 100 RBNT added. Next claim available in 24 hours."
						variant="success"
						className="text-xs py-2 bg-transparent border-none"
					/>
				)}

				{status === "error" && (
					<Alert
						message={errorMessage || "Claim failed"}
						variant="error"
						className="text-xs py-2 bg-transparent border-none"
					/>
				)}
			</div>
		</Card>
	)
}
