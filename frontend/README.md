# ROBOTRON ($RBNT) - Frontend dApp

A sleek, responsive, and highly dynamic Web3 Dashboard and Admin Panel built for the ROBOTRON ERC20 Token ecosystem. The application natively tracks active wallet balances, monitors live smart contract limits, decodes custom Solidity errors, and executes highly secure transactions directly onto the Lisk Sepolia network.

## Technology Stack

- **Framework**: React 18 + Vite (TypeScript strict mode)
- **Styling**: Tailwind CSS
- **Web3 Interface**: `ethers.js` (v6)
- **Wallet Connection**: Reown AppKit (formerly Web3Modal)
- **Routing**: React Router DOM (v6)
- **State Management**: React Context API (`AppContext.tsx`)
- **Notifications**: React Toastify

## Architecture Overview

The codebase is strictly separated by concerns, ensuring components remain "dumb" (presentation-only) while custom hooks handle the complex Web3 logic.

### 1. Global State (`src/context/`)

- `AppContext.tsx`: The solitary source of truth. It stores `walletAddress`, `isConnected`, `balance`, `totalSupply`, and `owner`. Instead of executing logic directly, it purely acts as a hydration store for the rest of the application.

### 2. Web3 Hooks (`src/hooks/`)

The interface layer between React and the Blockchain:

- **`useWallet.ts`**: Connects/Disconnects users via Reown AppKit.
- **`useSyncAccount.ts`**: The heartbeat of the app. It fires upon wallet connection to hydrate the `AppContext` with the user's `$RBNT` balance, the Global Max Supply, and the Contract Owner address.
- **`useContracts.ts`**: Exposes the generic `TokenContract` interface, abstracting whether the app needs a fast `JsonRpcProvider` (for read-only `view` operations) or a secure `JsonRpcSigner` (for write operations).
- **`useReadContract.ts`**: Consumes `useContracts.ts` to abstract `balanceOf()`, `totalSupply()`, and `owner()` calls natively.
- **`useWriteContract.ts`**: Handles state-mutating transactions like `mint()`, `transfer()`, `requestToken()` (Faucet), and `changeOwnership()`.
- **`useCooldown.ts`**: Operates entirely independently on a fast, read-only JSON-RPC provider. It natively calculates the precise Unix timestamp difference between `getNextClaimTime()` and `Date.now()`, pushing a seamless countdown timer to the UI without relying on active Wallet Signers.
- **`useActivity.ts` & `useAdminActivity.ts`**: Directly scrapes block-logs via RPC. It parses literal Ethers `Transfer`, `TokensMinted`, and `OwnershipTransferred` event arrays, seamlessly slicing and distributing exactly to the `History` and `GovernanceLog` UI arrays.

### 3. Smart Contract Error Mapping (`src/utils/`)

- `handleContractError.ts`: Deeply inspects nested Reown AppKit rejection data payloads to bypass standard wallet masking. It natively unpacks and securely parses Custom Solidity Errors (e.g., `Error__CooldownNotElapsed(uint256)`) using Ethers v6 explicit interface binding.
- `contractErrorMapper.ts`: Converts the decoded Custom Error structs into human-readable toast notifications.

### 4. Route Guardians (`src/App.tsx`)

- **`ProtectedRoute`**: Evaluates `useAppKitAccount()` status. If the router intercepts a `connecting` state, it visually pauses on a sleek CSS loading wheel. If the Reown wallet successfully verifies `address === state.owner`, the user is explicitly cleared to view the `/admin` terminal endpoints.

### 5. View Layer (`src/components/`)

- **`admin/`**: High-execution terminal components (`MintCard`, `OwnershipCard`, `GovernanceLog`, `StatsPanel`). These components strictly wire to `useWriteContract.ts` and dispatch instant `sync()` commands on success to ensure global React state represents actual Blockchain reality.
- **`dashboard/`**: The standard user suite harboring `WalletCard`, `FaucetCard` (bonded identically to `useCooldown`), `TransferCard`, and the high-speed `ActivityFeed`.

## Installation & Setup

1. Copy `.env.example` to `.env` and fill the variables:

```bash
VITE_TOKEN_CONTRACT_ADDRESS="your_deployed_rbnt_address"
VITE_REOWN_PROJECT_ID="your_reown_cloud_id"
```

2. Install dependencies:

```bash
npm install
```

3. Boot the development server:

```bash
npm run dev
```
