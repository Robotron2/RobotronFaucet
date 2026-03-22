import React from "react"
import { Card } from "../ui/Card"
import { ExternalLink, Loader2 } from "lucide-react"
import { useAdminActivity } from "../../hooks/contractHook/useAdminActivity"

export const GovernanceLog: React.FC = () => {
	const { logs, isLoading } = useAdminActivity()

	return (
		<Card className="flex flex-col h-full bg-[#050505] border-slate-800/60 p-8" hoverEffect={false}>
			<div className="flex items-center justify-between mb-8 px-2">
				<h3 className="text-base font-black text-[#e1e1e7] tracking-wider uppercase">GOVERNANCE LOG</h3>
			</div>

			<div className="flex flex-col gap-3">
				{isLoading ? (
					<div className="w-full flex justify-center py-10">
						<Loader2 className="animate-spin text-[#a3ddff]" size={28} />
					</div>
				) : logs.length === 0 ? (
					<div className="w-full flex justify-center py-8 text-sm text-slate-500 font-medium">
						No recent governance actions found.
					</div>
				) : (
					logs.map((log) => (
						<div
							key={log.id}
							className="w-full flex items-center justify-between p-4 px-6 rounded-xl bg-[#111415] border border-slate-800/40 hover:border-slate-700 transition-colors">
							<div className="flex items-start gap-5">
								<div
									className={`w-2 h-2 rounded-full mt-1.5 shadow-[0_0_8px_rgba(255,255,255,0.2)] ${log.color}`}></div>
								<div className="flex flex-col">
									<span className="text-sm font-bold text-[#e1e1e7] tracking-wide mb-1">
										{log.title}
									</span>
									<span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">
										{log.desc}
									</span>
								</div>
							</div>

							<a
								href={`https://sepolia-blockscout.lisk.com/tx/${log.hash}`}
								target="_blank"
								rel="noopener noreferrer"
								className="text-slate-500 hover:text-white transition-colors">
								<ExternalLink size={16} />
							</a>
						</div>
					))
				)}
			</div>
		</Card>
	)
}
