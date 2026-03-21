import { useAppContext } from '../context/AppContext';
import { mockContract } from '../services/mockContract';

const generateFakeAddress = () => {
  const chars = '0123456789abcdef';
  let address = '0x';
  for (let i = 0; i < 40; i++) {
    address += chars[Math.floor(Math.random() * 16)];
  }
  return address;
};

export const useWallet = () => {
  const { 
    state, 
    setWalletAddress, 
    setIsConnected, 
    setBalance, 
    setTotalSupply, 
    setLastClaimTime, 
    setOwner 
  } = useAppContext();

  const connect = async () => {
    const address = generateFakeAddress();
    setWalletAddress(address);
    setIsConnected(true);

    // Fetch initial chain state
    const bal = await mockContract.balanceOf(address);
    setBalance(bal);

    const supply = await mockContract.totalSupply();
    setTotalSupply(supply);

    const claimTime = await mockContract.getLastClaimTime(address);
    setLastClaimTime(claimTime);

    const owner = await mockContract.getOwner();
    setOwner(owner);
  };

  const disconnect = () => {
    setWalletAddress(null);
    setIsConnected(false);
    setBalance(0);
    setLastClaimTime(null);
  };

  return {
    address: state.walletAddress,
    isConnected: state.isConnected,
    connect,
    disconnect,
  };
};
