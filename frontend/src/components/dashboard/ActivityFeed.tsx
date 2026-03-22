import React from 'react';
import { Check, ArrowUpRight, Loader2, ExternalLink } from 'lucide-react';
import { useActivity } from '../../hooks/contractHook/useActivity';
import { Link } from 'react-router-dom';

export const ActivityFeed: React.FC = () => {
  const { activities, isLoadingActivities } = useActivity(5);

  return (
    <div className="w-full flex flex-col gap-4 mt-8">
      <div className="flex items-center justify-between px-2 mb-2">
        <h3 className="text-sm font-bold text-[#e1e1e7] tracking-wider">Recent Activity</h3>
        <Link to="/history" className="text-[11px] font-semibold text-slate-300 hover:text-white cursor-pointer transition-colors tracking-wide">
          View All
        </Link>
      </div>

      <div className="flex flex-col gap-2.5">
        {isLoadingActivities ? (
          <div className="w-full flex justify-center py-10">
            <Loader2 className="animate-spin text-[#a3ddff]" size={28} />
          </div>
        ) : activities.length === 0 ? (
          <div className="w-full flex justify-center py-8 text-sm text-slate-500 font-medium">
            No recent activity found.
          </div>
        ) : (
          activities.map((tx) => (
            <div key={tx.id} className="w-full flex items-center justify-between px-6 py-5 rounded-xl bg-[#18191d] border border-slate-800/60 hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-6">
                <div className="w-6 h-6 flex items-center justify-center">
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
              
              <div className="flex items-center gap-6 md:gap-24 pr-4">
                <span className="text-xs font-semibold text-slate-400 hidden md:block">{tx.status}</span>
                <span className={`text-sm font-bold md:w-24 text-right ${tx.type === 'claim' || tx.amount.startsWith('+') ? 'text-[#00E676]' : 'text-slate-300'}`}>
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
    </div>
  );
};
