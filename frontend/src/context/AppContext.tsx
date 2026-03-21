import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of our global state
export interface AppState {
  walletAddress: string | null;
  isConnected: boolean;
  balance: number;
  totalSupply: number;
  lastClaimTime: number | null; // stored as timestamp in milliseconds
  owner: string;
}

// Define the context API shape with getters, setters, and actions
export interface AppContextType {
  state: AppState;
  
  // Setters
  setWalletAddress: (address: string | null) => void;
  setIsConnected: (connected: boolean) => void;
  setBalance: (balance: number) => void;
  setTotalSupply: (supply: number) => void;
  setLastClaimTime: (timestamp: number | null) => void;
  setOwner: (ownerAddress: string) => void;

  // Actions (to be fleshed out with mockContract logic in Phase 4/5)
  connectWallet: () => Promise<void>;
  claim: () => Promise<void>;
  transfer: (to: string, amount: number) => Promise<void>;
  mint: (to: string, amount: number) => Promise<void>;
}

// Initial state values
const INITIAL_STATE: AppState = {
  walletAddress: null,
  isConnected: false,
  balance: 0,
  totalSupply: 7420182.50, // Using the screenshot value for total token supply randomly
  lastClaimTime: null,
  owner: '0x71c765...8001', // Using the mock owner from admin screenshot
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(INITIAL_STATE);

  // === Setters ===
  const setWalletAddress = (address: string | null) => setState(prev => ({ ...prev, walletAddress: address }));
  const setIsConnected = (connected: boolean) => setState(prev => ({ ...prev, isConnected: connected }));
  const setBalance = (balance: number) => setState(prev => ({ ...prev, balance }));
  const setTotalSupply = (supply: number) => setState(prev => ({ ...prev, totalSupply: supply }));
  const setLastClaimTime = (timestamp: number | null) => setState(prev => ({ ...prev, lastClaimTime: timestamp }));
  const setOwner = (ownerAddress: string) => setState(prev => ({ ...prev, owner: ownerAddress }));

  // === Actions (Placeholders for now, to be integrated with mockContract later) ===
  const connectWallet = async () => {
    // Basic mock connection for now
    setState(prev => ({
      ...prev,
      walletAddress: '0x1234...5678', // matching screenshot
      isConnected: true,
      balance: 5400.00
    }));
  };

  const claim = async () => {
    // Will be fully implemented with mockContract in Phase 4/5
  };

  const transfer = async (to: string, amount: number) => {
    // Will be fully implemented with mockContract in Phase 4/5
  };

  const mint = async (to: string, amount: number) => {
    // Will be fully implemented with mockContract in Phase 4/5
  };

  const value: AppContextType = {
    state,
    setWalletAddress,
    setIsConnected,
    setBalance,
    setTotalSupply,
    setLastClaimTime,
    setOwner,
    connectWallet,
    claim,
    transfer,
    mint
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
