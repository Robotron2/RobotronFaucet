import React from 'react';
import { WalletCard } from '../components/dashboard/WalletCard';
import { FaucetCard } from '../components/dashboard/FaucetCard';
import { TransferCard } from '../components/dashboard/TransferCard';
import { ActivityFeed } from '../components/dashboard/ActivityFeed';
import { StakingCard } from '../components/dashboard/StakingCard';

const Dashboard: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto py-8">
      {/* Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 h-full">
          <WalletCard />
        </div>
        <div className="lg:col-span-1 h-full">
          <StakingCard />
        </div>
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="h-full">
          <FaucetCard />
        </div>
        <div className="h-full">
          <TransferCard />
        </div>
      </div>
      
      {/* Bottom Row */}
      <div className="w-full mt-6">
        <ActivityFeed />
      </div>
    </div>
  );
};

export default Dashboard;
