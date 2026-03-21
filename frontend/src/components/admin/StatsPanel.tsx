import React from 'react';
import { Card } from '../ui/Card';
import { useAppContext } from '../../context/AppContext';
import { ShieldCheck } from 'lucide-react';

export const TotalSupplyCard: React.FC = () => {
  const { state } = useAppContext();
  const MAX_SUPPLY = 10000000;
  const currentSupply = state.totalSupply;
  const percentage = Math.min((currentSupply / MAX_SUPPLY) * 100, 100).toFixed(1);

  return (
    <Card className="flex flex-col h-full bg-[#18191d] border-slate-800/60 relative overflow-hidden p-8" hoverEffect={false}>
      <div className="absolute -right-8 -bottom-12 opacity-5 pointer-events-none">
         <ShieldCheck size={200} />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-6">TOTAL TOKEN SUPPLY</h3>
        
        <div className="flex items-baseline gap-3 mb-8">
          <span className="text-5xl md:text-6xl font-black text-[#a3ddff] tracking-tight">{currentSupply.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          <span className="text-xl font-bold text-slate-500">RBNT</span>
        </div>

        <div className="mt-auto w-full">
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-3">
            <div 
              className="h-full bg-[#a3ddff] shadow-[0_0_10px_rgba(163,221,255,0.5)] transition-all duration-1000 ease-out" 
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-slate-400 font-medium tracking-wide">{percentage}% of Max Supply Minted</p>
        </div>
      </div>
    </Card>
  );
};

export const MaxSupplyCard: React.FC = () => {
  return (
    <Card className="flex flex-col h-full justify-between bg-[#111415] border-[#00E676]/30 shadow-[0_0_20px_rgba(0,230,118,0.03)] p-8" hoverEffect={false}>
      <div>
        <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-6">MAX SUPPLY CAP</h3>
        
        <div className="flex flex-col mb-4">
          <span className="text-4xl font-black text-[#e1e1e7] tracking-tight">10,000,000</span>
          <span className="text-sm font-bold text-[#00E676] tracking-wider uppercase mt-2">RBNT FIXED</span>
        </div>
      </div>

      <div className="mt-auto pt-6">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/20">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00E676]"></div>
          IMMUTABLE
        </span>
      </div>
    </Card>
  );
};
