import React, { useState, useMemo } from 'react';
import { Card } from '../components/ui/Card';
import { useActivity } from '../hooks/contractHook/useActivity';
import { Check, ArrowUpRight, Loader2, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 7;

const History: React.FC = () => {
    // Fetch up to 100 activities natively
    const { activities, isLoadingActivities } = useActivity(0);
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(activities.length / ITEMS_PER_PAGE) || 1;

    const currentActivities = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return activities.slice(start, start + ITEMS_PER_PAGE);
    }, [activities, currentPage]);

    return (
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-8 pb-12 animate-fade-in">
            <div className="flex flex-col mb-4">
                <h1 className="text-2xl md:text-3xl font-black text-[#e1e1e7] tracking-wider uppercase mb-2">
                    Transaction History
                </h1>
                <p className="text-sm text-slate-400 font-medium">
                    Complete immutable log of all incoming transfers and Faucet claims
                </p>
            </div>

            <Card className="flex flex-col bg-[#18191d] border-slate-800/60 p-2 md:p-6">
                <div className="flex flex-col gap-2.5">
                    {isLoadingActivities ? (
                        <div className="w-full flex justify-center py-20">
                            <Loader2 className="animate-spin text-[#a3ddff]" size={36} />
                        </div>
                    ) : activities.length === 0 ? (
                        <div className="w-full flex justify-center py-16 text-sm text-slate-500 font-medium">
                            You have no transaction history yet.
                        </div>
                    ) : (
                        currentActivities.map((tx) => (
                            <div key={tx.id} className="w-full flex items-center justify-between px-4 md:px-6 py-5 rounded-xl bg-[#111415] border border-slate-800/40 hover:border-slate-700 transition-colors">
                                <div className="flex items-center gap-4 md:gap-6">
                                    <div className="min-w-6 min-h-6 flex items-center justify-center">
                                       {tx.type === 'claim' ? (
                                         <Check className="text-[#00E676]" size={20} strokeWidth={2.5} />
                                       ) : (
                                         <ArrowUpRight className="text-[#a3ddff]" size={20} strokeWidth={2.5} />
                                       )}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-[#e1e1e7] tracking-wide mb-1">{tx.title}</span>
                                        <span className="text-[11px] text-slate-500 font-medium">{tx.time}</span>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-end gap-6 md:gap-24 pl-4">
                                    <span className="text-xs font-semibold text-slate-400 hidden md:block">{tx.status}</span>
                                    <span className={`text-sm font-bold min-w-20 md:w-24 text-right ${tx.type === 'claim' || tx.amount.startsWith('+') ? 'text-[#00E676]' : 'text-slate-300'}`}>
                                        {tx.amount}
                                    </span>
                                    <a href={`https://sepolia-blockscout.lisk.com/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
                                        <ExternalLink size={16} />
                                    </a>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {activities.length > 0 && (
                    <div className="flex items-center justify-between mt-8 px-4">
                        <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                            Page {currentPage} of {totalPages}
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="w-8 h-8 rounded bg-[#111415] border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="w-8 h-8 rounded bg-[#111415] border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default History;
