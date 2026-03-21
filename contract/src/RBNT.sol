// SPDX-License-Identifier: MIT
pragma solidity 0.8.33;

// function name() public view returns (string)
// function symbol() public view returns (string)
// function decimals() public view returns (uint8)

// function totalSupply() public view returns (uint256)
// function balanceOf(address _owner) public view returns (uint256 balance)

// function transfer(address _to, uint256 _value) public returns (bool success)
// function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)

// function approve(address _spender, uint256 _value) public returns (bool success)
// function allowance(address _owner, address _spender) public view returns (uint256 remaining)

contract RBNT {
    string constant NAME = "ROBOTRON";
    string constant SYMBOL = "RBNT";
    uint8 constant DECIMAL = 18;
    uint256 _totalSupply;

    address public owner;
    uint256 public constant MAX_SUPPLY = 10_000_000 * 1e18;
    uint256 public constant FAUCET_AMOUNT = 100 * 1e18;
    uint256 public constant COOLDOWN = 1 days;

    //erc20 mappings
    mapping(address _certainAddress => uint256 _balanceOfThatAddress) private balances;
    mapping(address _ownerAddress => mapping(address _spender => uint256 _amountAllowedToSpend)) private allowances;

    //faucet mapping
    mapping(address faucetRecipient => uint256 time) lastRequestTime;

    //errors
    error Error__NotOwner();
    error Error__MaxSupplyExceeded();
    error Error__CooldownNotElapsed(uint256 nextAllowedTime);
    error Error__ZeroAddress();
    error Error__ZeroValue();
    error Error__InsufficientBalance();
    error Error__InsufficientAllowance();

    //events
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    event TokensRequested(address indexed user, uint256 amount);
    event TokensMinted(address indexed to, uint256 amount);
    event OwnershipTransferred(address indexed oldOwner, address indexed newOwner);

    //constructor
    constructor(address _owner, uint256 _initialSupply) {
        owner = _owner;
        _mint(owner, _initialSupply);
    }

    modifier onlyOwner() {
        _onlyOwner();
        _;
    }

    //requestToken()
    // Check last claim timestamp
    // Ensure 24 hours passed
    //Mint fixed amount
    //Update timestamp

    // ---------------------------FAUCET START---------------------------
    function requestToken() public {
        if (block.timestamp < lastRequestTime[msg.sender] + COOLDOWN) {
            revert Error__CooldownNotElapsed(COOLDOWN + (lastRequestTime[msg.sender]));
        }
        _mint(msg.sender, FAUCET_AMOUNT);
        lastRequestTime[msg.sender] = block.timestamp;
    }
    // ---------------------------FAUCET START---------------------------

    // ---------------------------ERC20 CORE START---------------------------

    function approve(address _spender, uint256 _value) public returns (bool) {
        if (_spender == address(0)) revert Error__ZeroAddress();

        allowances[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);

        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint256 allowanceBal) {
        //return the value of the allowance given to a spender
        return allowances[_owner][_spender];
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        if (_to == address(0)) revert Error__ZeroAddress();

        if (balances[msg.sender] < _value) revert Error__InsufficientBalance();

        balances[msg.sender] = balances[msg.sender] - _value;

        balances[_to] = balances[_to] + _value;

        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        if (_to == address(0)) revert Error__ZeroAddress();
        if (_from == address(0)) revert Error__ZeroAddress();
        if (_value > balances[_from]) revert Error__InsufficientBalance();
        if (_value > allowances[_from][msg.sender]) revert Error__InsufficientAllowance();

        allowances[_from][msg.sender] = allowances[_from][msg.sender] - _value;
        balances[_from] = balances[_from] - _value;
        balances[_to] = balances[_to] + _value;

        emit Transfer(_from, _to, _value);

        return true;
    }

    function mint(address _to, uint256 _amount) external onlyOwner {
        _mint(_to, _amount);
    }

    function changeOwnership(address _newOwner) external onlyOwner {
        if (_newOwner == address(0)) revert Error__ZeroAddress();
        address oldOwner = owner;
        owner = _newOwner;
        emit OwnershipTransferred(oldOwner, _newOwner);
    }

    // ---------------------------ERC20 CORE END---------------------------

    // ---------------------------ERC20 GETTERS END---------------------------

    function name() public pure returns (string memory) {
        return NAME;
    }

    function symbol() public pure returns (string memory) {
        return SYMBOL;
    }

    function decimals() public pure returns (uint8) {
        return DECIMAL;
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }

    // ---------------------------ERC20 GETTERS END---------------------------

    // ---------------------------ERC20 HELPER START---------------------------
    function _mint(address _to, uint256 _amount) internal {
        if (_amount == 0) revert Error__ZeroValue();
        if (_to == address(0)) revert Error__ZeroAddress();
        if (_amount + _totalSupply > MAX_SUPPLY) revert Error__MaxSupplyExceeded();

        _totalSupply = _totalSupply + _amount;
        balances[_to] = balances[_to] + _amount;

        emit Transfer(address(0), _to, _amount);
        emit TokensMinted(_to, _amount);
    }

    function _onlyOwner() internal view {
        if (msg.sender != owner) revert Error__NotOwner();
    }

    // ---------------------------ERC20 HELPER END---------------------------
}

