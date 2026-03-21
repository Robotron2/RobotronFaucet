import React from 'react';
import { TotalSupplyCard, MaxSupplyCard } from '../components/admin/StatsPanel';
import { MintCard } from '../components/admin/MintCard';
import { OwnershipCard } from '../components/admin/OwnershipCard';
import { GovernanceLog } from '../components/admin/GovernanceLog';

const Admin: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto py-8">
      <div className="flex items-center justify-between mb-10 px-2 mt-4">
        <div>
          <h1 className="text-4xl font-black text-[#e1e1e7] tracking-tight mb-3 uppercase">ADMIN TERMINAL</h1>
          <p className="text-[13px] font-medium text-slate-400 max-w-xl leading-relaxed">
            Manage token issuance, protocol parameters, and smart contract ownership through the secure operator interface.
          </p>
        </div>
        <div className="hidden md:flex flex-col items-end">
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">NETWORK STATUS</span>
          <div className="flex items-center gap-2 px-3.5 py-2 rounded bg-[#111415] border border-slate-800 text-[11px] font-bold text-slate-300 tracking-wide shadow-inner">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse"></div>
            Mainnet Online
          </div>
        </div>
      </div>
      
      {/* 1. Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 h-full">
          <TotalSupplyCard />
        </div>
        <div className="lg:col-span-1 h-full">
          <MaxSupplyCard />
        </div>
      </div>

      {/* 2. Controls Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 h-full">
          <MintCard />
        </div>
        <div className="lg:col-span-1 h-full">
          <OwnershipCard />
        </div>
      </div>
      
      {/* 3. Log Row */}
      <div className="w-full mt-8">
        <GovernanceLog />
      </div>
    </div>
  );
};

export default Admin;
