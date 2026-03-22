# ROBOTRON Faucet - Frontend Architecture

Welcome to the ROBOTRON Faucet local simulation environment. This document outlines the architectural patterns, component interactions, and state management strategies implemented in this repository. It serves as your primary reference guide for transitioning this UI into a live Web3 environment.

## 🏗️ Architecture Overview

The system is built as a Single Page Application (SPA) using React, TypeScript, Vite, and `react-router-dom`. It securely separates presentational UI logic from state management and simulated blockchain interactions.

### Directory Structure

- `/src/components/ui`: Dumb, reusable primitive components (`Button`, `Card`, `Badge`, `Alert`). These elements do not fetch state natively and strictly listen to props.
- `/src/components/layout`: Structural UI handlers defining application borders (`Sidebar`, `Navbar`, `PageWrapper`).
- `/src/components/dashboard` & `/src/components/admin`: Smart components rendering isolated blocks of logic that consume context hooks.
- `/src/context`: React Context API manager (`AppContext.tsx`) acting as the single source of truth for global state.
- `/src/hooks`: Custom React Hooks wrapping internal context modifiers and external asynchronous API routines.
- `/src/pages`: Top-level route components acting as layout maps matching `react-router-dom`.
- `/src/services`: The simulated API integration layer housing `mockContract.ts`.

---

## 🔗 State Management (React Context)

### `AppContext.tsx`
The underlying application architecture heavily proxies its data through `<AppContext.Provider>`.

**State Interface Configuration:**
- `isConnected` (boolean)
- `walletAddress` (string | null)
- `balance` (number)
- `totalSupply` (number)
- `lastClaimTime` (number | null)
- `owner` (string)

**Future Integration Path:** 
When replacing `mockContract.ts` with `ethers.js` or `viem`, you will solely modify the `init` / `connectWallet` methods inside `AppContext` to query the physical browser extensions (e.g., `window.ethereum.request({ method: 'eth_requestAccounts' })`). The component branches below are already programmed to inherit real addresses and token balances recursively without additional mapping!

---

## 🪝 Custom Hooks Architecture

All simulated Web3 mutations and global fetches are strictly decoupled from the UI via local custom hooks. 

### `useWallet()`
- **Purpose**: Authenticates the active user session.
- **Methods**: `connect()`, `disconnect()`.

### `useToken()`
- **Purpose**: Manages interactions specifically around the core ERC20 asset (RBNT).
- **Methods**: 
  - `transfer(recipient, amount)`: Moves RBNT. Validates parameters locally before dispatching to the simulated chain block.
  - `mint(recipient, amount)`: Generates raw tokens. Strictly checks if the active Context `walletAddress` matches the internal `owner` string before adjusting `totalSupply`.

### `useFaucet()`
- **Purpose**: Encapsulates logic for the daily faucet drip.
- **Methods**: `claim()`. Reads the interval timers inherently to prevent invalid sub-requests.

### `useCooldown()`
- **Purpose**: A strictly client-side hook performing `setInterval` visual calculations against the Unix Epoch. Monitors `lastClaimTime` from Context.
- **Optimization Strategy**: Guaranteed to rigorously clean up its mathematical tracking interval on unmount utilizing standard `useEffect` teardown flows. This prevents potentially massive React re-render memory leaks when switching pages away from the Faucet.

---

## 🧩 Component Interaction Lifecycle

To understand how data flows seamlessly between components, trace this standard user event flow:

1. **Routing (`App.tsx`)**: The active URL query is captured by the `<BrowserRouter>` and injects the corresponding page configuration into `<PageWrapper>`.
2. **Navigation Layout (`PageWrapper.tsx`)**: Dynamically resolves if the Sidebar or Topbar should render. Viewport states for responsive side-drawers (`isCollapsed`, `isMobileOpen`) are hoisted structurally here.
3. **Card Input (`MintCard`, `TransferCard`)**: A user enters criteria into an `<Input>` form. Upon `<form onSubmit={}>`, the component securely shifts an internal React `useState` to `'loading'`.
4. **Hook Delegation**: The form calls its appropriate hook routine (e.g., `transfer(address, amount)`).
5. **Contract Processing (`mockContract.ts`)**: The method executes a 1.5-second `Promise` timeout to visually emulate block gas confirmations. 
6. **State Refresh**: Upon resolving, `mockContract.ts` natively instructs the `AppContext` context layer to silently execute `fetchTokenData()`.
7. **UI Hydration**: The global Context immediately updates, cascading the adjusted `balance` data strictly downwards into the dumb `WalletCard` without a hard reload.

---

## 💅 Animations & Styling Enforcement

- Constructed using strict utility-class mappings through **Tailwind CSS**.
- **Framer Motion** natively empowers `Landing.tsx` and the mobile variants of `Navbar.tsx`, exploiting declarative `<AnimatePresence>` structures for smooth interactive teardowns natively within React Virtual DOM.
- Precise typography logic prevents text clipping. Critical properties like `whitespace-nowrap` alongside customized responsive width variables ensure buttons remain crisp from ultra-wide 4K to compact smartphone layouts.

---
*Compiled securely for Phase 15 Integration Hand-off.*
