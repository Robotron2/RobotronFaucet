import React, { useMemo } from 'react';
import { Check, ArrowUpRight } from 'lucide-react';

export const ActivityFeed: React.FC = () => {
  const mockTransactions = useMemo(() => [
    { id: '1', title: 'Faucet Claim', amount: '+100 RBNT', status: 'Confirmed', time: 'Today, 10:24 AM', type: 'claim' },
    { id: '2', title: 'Transfer to 0x882...1922', amount: '-450 RBNT', status: 'Confirmed', time: 'Yesterday, 04:15 PM', type: 'transfer' },
    { id: '3', title: 'Reward Distribution', amount: '+12.5 RBNT', status: 'Confirmed', time: 'Oct 24, 2023', type: 'claim' }
  ], []);

  return (
    <div className="w-full flex flex-col gap-4 mt-8">
      <div className="flex items-center justify-between px-2 mb-2">
        <h3 className="text-sm font-bold text-[#e1e1e7] tracking-wider">Recent Activity</h3>
        <span className="text-[11px] font-semibold text-slate-300 hover:text-white cursor-pointer transition-colors tracking-wide">
          View All
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        {mockTransactions.map((tx) => (
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
            
            <div className="flex items-center gap-24 pr-4">
              <span className="text-xs font-semibold text-slate-400 hidden md:block">{tx.status}</span>
              <span className={`text-sm font-bold w-24 text-right ${tx.type === 'claim' ? 'text-[#00E676]' : 'text-slate-300'}`}>
                {tx.amount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
