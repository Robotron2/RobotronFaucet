import React from 'react';
import { Card } from '../ui/Card';
import { Zap, TrendingUp } from 'lucide-react';

export const StakingCard: React.FC = () => {
  return (
    <Card className="flex flex-col h-full bg-[#18191d] border-slate-800/60" hoverEffect={false}>
      <div className="flex items-center justify-between mb-6">
        <div className="w-8 h-8 rounded bg-[#00E676]/10 flex items-center justify-center">
          <Zap className="text-[#00E676]" size={16} />
        </div>
        <div className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-[#00E676] border border-[#00E676]/20">
          ACTIVE STAKING
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-sm font-bold text-[#e1e1e7] mb-2 tracking-wide">Staking Yield</h3>
        <p className="text-xs text-slate-400 leading-relaxed font-medium">
          Your node is currently generating 12.5 RBNT daily.
        </p>
      </div>

      <div className="mt-auto pt-4 border-t border-slate-800/50 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">NEXT PAYOUT</span>
          <span className="text-sm font-bold text-[#e1e1e7]">04h 22m</span>
        </div>
        <TrendingUp className="text-slate-600" size={16} />
      </div>
    </Card>
  );
};
