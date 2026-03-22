# ROBOTRON ($RBNT) - Smart Contract

A highly secure, customizable, and efficient ERC20 token deployed on the Lisk Sepolia Network. It ships strictly with built-in token-faucet logic, explicit maximum supply bounds, cooldown interval constraints, and extensive owner-managed governance methods.

## Core Mechanics

- **Name**: `ROBOTRON`
- **Symbol**: `RBNT`
- **Decimals**: `18`
- **Max Supply**: `10,000,000 RBNT`
- **Faucet Allocation**: Fixed at `100 RBNT` per claim.
- **Faucet Cooldown**: Hardcoded to `24 Hours` (86,400 seconds).

## Security & Custom Errors

To massively minimize gas execution limits and explicitly improve frontend parsing potential, the contract utilizes custom Solidity `error` mappings instead of expensive traditional `require` strings:

- `Error__NotOwner()`: Emitted when non-admins attempt to execute `mint()` or `changeOwnership()`.
- `Error__MaxSupplyExceeded()`: Prevents arbitrary infinite minting if `totalSupply + amount > MAX_SUPPLY`.
- `Error__CooldownNotElapsed(uint256 nextAllowedTime)`: Throws the explicit future Unix timestamp block when users attempt to drain the embedded Protocol Faucet too early.
- `Error__ZeroAddress()` / `Error__ZeroValue()`: Rigid parameter bound validations to nullify standard ERC20 burn-failures.
- `Error__InsufficientBalance()`: Guarding `transfer()` endpoints.

## Event Tracking

Custom event mappings have been implemented to allow seamless Frontend off-chain analytics tracing:

- `TokensRequested(address indexed user, uint256 amount)`: Fired directly by the `requestToken()` system.
- `TokensMinted(address indexed to, uint256 amount)`: Emitted by the actual internal `_mint` mechanism (and specifically queried natively by the dApp `GovernanceLogs`).
- `OwnershipTransferred(address indexed oldOwner, address indexed newOwner)`

## Administrator Endpoints (`onlyOwner`)

1. **`mint(address _to, uint256 _amount)`**: Native unbonded token fabrication, strictly bounded up to the immutable `MAX_SUPPLY`.
2. **`changeOwnership(address _newOwner)`**: Hard-transfers total contract supremacy to an alternate wallet block.

## Usage Functions (Public)

1. **`requestToken()`**: Execute the standard 100 `$RBNT` Faucet generation algorithm (if your mapping clears the 24-hr `lastRequestTime` interval).
2. **`canClaim(address user)`**: Explicit `view` boolean return testing if a target address has cleared the Cooldown protocol.
3. **`getNextClaimTime(address user)`**: Pushes the exact mathematical threshold (in Unix Seconds) the user must wait before clearing `canClaim()`.

## Deployment

Ensure your `hardhat.config.ts` or `foundry.toml` is mapped exactly to the modern `Lisk Sepolia` RPC node standard before executing standard migrations.
