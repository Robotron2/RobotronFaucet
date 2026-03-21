import React, { useMemo } from 'react';
import { Card } from '../ui/Card';
import { ExternalLink } from 'lucide-react';

export const GovernanceLog: React.FC = () => {
  const mockLogs = useMemo(() => [
    { id: '1', title: 'Minted 50,000 RBNT', desc: 'TO: 0X8A2...814D • 2 HOURS AGO', color: 'bg-[#00E676]' },
    { id: '2', title: 'Protocol Parameter Update', desc: 'ACTION: SETREWARDMULTIPLIER • 5 HOURS AGO', color: 'bg-[#a3ddff]' },
    { id: '3', title: 'Authorized Operator Added', desc: 'TARGET: 0X44D...BE21 • YESTERDAY', color: 'bg-[#FF5252]' }
  ], []);

  return (
    <Card className="flex flex-col bg-[#18191d] border-slate-800/60 p-8" hoverEffect={false}>
      <div className="flex items-center justify-between mb-8 px-2">
        <h3 className="text-base font-black text-[#e1e1e7] tracking-wider uppercase">GOVERNANCE LOG</h3>
        <span className="text-[10px] font-bold text-slate-400 hover:text-[#a3ddff] cursor-pointer transition-colors uppercase tracking-widest flex items-center gap-1">
          VIEW ALL <span className="text-xs">→</span>
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {mockLogs.map((log) => (
          <div key={log.id} className="w-full flex items-center justify-between p-4 px-6 rounded-xl bg-[#111415] border border-slate-800/40 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-5">
              <div className={`w-2 h-2 rounded-full mt-1.5 shadow-[0_0_8px_rgba(255,255,255,0.2)] ${log.color}`}></div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#e1e1e7] tracking-wide mb-1">{log.title}</span>
                <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">{log.desc}</span>
              </div>
            </div>
            
            <ExternalLink size={16} className="text-slate-500 cursor-pointer hover:text-white transition-colors" />
          </div>
        ))}
      </div>
    </Card>
  );
};
