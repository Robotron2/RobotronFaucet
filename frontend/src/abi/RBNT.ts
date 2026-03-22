export const RBNT_ABI = [
	// Constructor
	"constructor(address _owner, uint256 _initialSupply)",

	// Errors
	"error Error__CooldownNotElapsed(uint256 nextAllowedTime)",
	"error Error__InsufficientAllowance()",
	"error Error__InsufficientBalance()",
	"error Error__MaxSupplyExceeded()",
	"error Error__NotOwner()",
	"error Error__ZeroAddress()",
	"error Error__ZeroValue()",

	// Events
	"event Approval(address indexed _owner, address indexed _spender, uint256 _value)",
	"event OwnershipTransferred(address indexed oldOwner, address indexed newOwner)",
	"event TokensMinted(address indexed to, uint256 amount)",
	"event TokensRequested(address indexed user, uint256 amount)",
	"event Transfer(address indexed _from, address indexed _to, uint256 _value)",

	// Read Functions
	"function COOLDOWN() view returns (uint256)",
	"function FAUCET_AMOUNT() view returns (uint256)",
	"function MAX_SUPPLY() view returns (uint256)",
	"function allowance(address _owner, address _spender) view returns (uint256 allowanceBal)",
	"function balanceOf(address _owner) view returns (uint256 balance)",
	"function decimals() pure returns (uint8)",
	"function name() pure returns (string)",
	"function owner() view returns (address)",
	"function symbol() pure returns (string)",
	"function totalSupply() view returns (uint256)",
	"function getNextClaimTime(address user) view returns (uint256)",
	"function canClaim(address user) view returns (bool)",

	// Write Functions
	"function approve(address _spender, uint256 _value) returns (bool)",
	"function transfer(address _to, uint256 _value) returns (bool success)",
	"function transferFrom(address _from, address _to, uint256 _value) returns (bool success)",
	"function requestToken()",
	"function mint(address _to, uint256 _amount)",
	"function changeOwnership(address _newOwner)",
] as const
