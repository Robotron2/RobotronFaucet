import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { mockContract } from '../services/mockContract';

export const useToken = () => {
  const { state, setBalance, setTotalSupply } = useAppContext();
  const [isTransferring, setIsTransferring] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  
  const refreshBalance = async () => {
    if (state.walletAddress) {
      const bal = await mockContract.balanceOf(state.walletAddress);
      setBalance(bal);
    }
  };

  const transfer = async (to: string, amount: number) => {
    if (!state.walletAddress) throw new Error("Wallet not connected");
    setIsTransferring(true);
    try {
       await mockContract.transfer(state.walletAddress, to, amount);
       await refreshBalance(); // Updates internal context instantly
       return true;
    } catch(err) {
       throw err;
    } finally {
       setIsTransferring(false);
    }
  };

  const mint = async (to: string, amount: number) => {
    setIsMinting(true);
    try {
      await mockContract.mint(to, amount);
      if (state.walletAddress === to) {
        await refreshBalance();
      }
      const supply = await mockContract.totalSupply();
      setTotalSupply(supply);
      return true;
    } catch (err) {
      throw err;
    } finally {
      setIsMinting(false);
    }
  };

  return { 
    balance: state.balance, 
    refreshBalance, 
    transfer, 
    mint, 
    isTransferring, 
    isMinting 
  };
};
