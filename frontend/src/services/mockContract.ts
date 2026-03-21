import { FAUCET_COOLDOWN_HOURS, FAUCET_AMOUNT } from '../utils/constants';

// Internal Mock Blockchain State
interface MockChainState {
  balances: Record<string, number>;
  lastClaims: Record<string, number>; // Timestamps in MS
  totalSupply: number;
  maxSupply: number;
  owner: string;
}

// Initializing the blockchain state based on the UI design specs
const chainState: MockChainState = {
  balances: {
    '0x1234...5678': 5400, // Pre-fund our mock test user
  },
  lastClaims: {},
  totalSupply: 7420182.50,
  maxSupply: 10000000, // 10 Million RBNT Fixed
  owner: '0x71c765...8001',
};

// Emulate network latency
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const mockContract = {
  // 1. requestToken (Faucet Claim)
  requestToken: async (address: string): Promise<boolean> => {
    await delay(1000); // Simulate tx time
    
    // Check max supply
    if (chainState.totalSupply + FAUCET_AMOUNT > chainState.maxSupply) {
      throw new Error("max supply exceeded");
    }

    // Check cooldown
    const lastClaim = chainState.lastClaims[address] || 0;
    const now = Date.now();
    const msIn24Hours = FAUCET_COOLDOWN_HOURS * 60 * 60 * 1000;
    
    if (now - lastClaim < msIn24Hours) {
      throw new Error("cooldown not elapsed");
    }

    // Process claim
    chainState.balances[address] = (chainState.balances[address] || 0) + FAUCET_AMOUNT;
    chainState.totalSupply += FAUCET_AMOUNT;
    chainState.lastClaims[address] = now;

    return true;
  },

  // 2. balanceOf
  balanceOf: async (address: string): Promise<number> => {
    await delay(500); // Simulate RPC read
    return chainState.balances[address] || 0;
  },

  // 3. transfer
  transfer: async (from: string, to: string, amount: number): Promise<boolean> => {
    await delay(1200);
    
    const senderBalance = chainState.balances[from] || 0;
    if (senderBalance < amount) {
      throw new Error("insufficient balance");
    }

    chainState.balances[from] -= amount;
    chainState.balances[to] = (chainState.balances[to] || 0) + amount;
    
    return true;
  },

  // 4. mint (Admin Only theoretically, but we simulate the contract method)
  mint: async (to: string, amount: number): Promise<boolean> => {
    await delay(1000);

    if (chainState.totalSupply + amount > chainState.maxSupply) {
      throw new Error("max supply exceeded");
    }

    chainState.balances[to] = (chainState.balances[to] || 0) + amount;
    chainState.totalSupply += amount;

    return true;
  },

  // 5. totalSupply
  totalSupply: async (): Promise<number> => {
    await delay(500);
    return chainState.totalSupply;
  },

  // 6. changeOwnership
  changeOwnership: async (newOwner: string): Promise<boolean> => {
    await delay(1000);
    chainState.owner = newOwner;
    return true;
  },
  
  // Helpers specifically for UI Mock Tracking
  getLastClaimTime: async (address: string): Promise<number | null> => {
    await delay(200);
    return chainState.lastClaims[address] || null;
  },
  
  getOwner: async (): Promise<string> => {
    await delay(200);
    return chainState.owner;
  }
};
