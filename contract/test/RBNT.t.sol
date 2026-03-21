// SPDX-License-Identifier: MIT
pragma solidity 0.8.33;

import {Test} from "forge-std/Test.sol";
import {RBNT} from "../src/RBNT.sol";

event Transfer(address indexed _from, address indexed _to, uint256 _value);
event Approval(address indexed _owner, address indexed _spender, uint256 _value);

// event TokensRequested(address indexed user, uint256 amount);
// event TokensMinted(address indexed to, uint256 amount);
// event OwnershipTransferred(address indexed oldOwner, address indexed newOwner);

// error Error__NotOwner();
//     error Error__MaxSupplyExceeded();
//     error Error__CooldownNotElapsed(uint256 nextAllowedTime);
error Error__ZeroAddress();
//     error Error__ZeroValue();
error Error__InsufficientBalance();
// error Error__InsufficientAllowance();

contract RBNTTest is Test {
    RBNT public rbnt;
    uint256 constant INITIAL_SUPPLY = 200;
    address owner = makeAddr("owner");
    address recipient = makeAddr("recipient");
    address zeroAddress = address(0);
    uint256 transferAmount = 10;
    uint256 approvedAmount = 100;
    uint256 excessTransferAmount = 500;
    address contractAddress;

    function setUp() public {
        rbnt = new RBNT(owner, INITIAL_SUPPLY);
        contractAddress = address(rbnt);
    }

    /***  ERC20Basics
     * transfer
     * approve
     */

    function test__successfulTransfer() public {
        uint256 prevOwnerBal = rbnt.balanceOf(owner);
        uint256 prevRecipientBal = rbnt.balanceOf(recipient);
        //transfer
        vm.prank(owner);
        vm.expectEmit(true, true, false, false);
        emit Transfer(owner, recipient, transferAmount);
        rbnt.transfer(recipient, transferAmount);
        uint256 currentOwnerBal = rbnt.balanceOf(owner);
        uint256 currentRecipientBal = rbnt.balanceOf(recipient);

        assertEq(currentOwnerBal, prevOwnerBal - transferAmount);
        assertEq(currentRecipientBal, prevRecipientBal + transferAmount);
    }

    function test__transferEdgeCases() public {
        vm.startPrank(owner);

        // Transfer more than balance → revert
        vm.expectRevert(abi.encodeWithSelector(Error__InsufficientBalance.selector));
        rbnt.transfer(recipient, excessTransferAmount);

        // Transfer to address(0) → revert
        vm.expectRevert(abi.encodeWithSelector(Error__ZeroAddress.selector));
        rbnt.transfer(zeroAddress, transferAmount);

        // Transfer full balance → works
        uint256 prevOwnerBal = rbnt.balanceOf(owner);
        uint256 prevRecipientBal = rbnt.balanceOf(recipient);

        vm.expectEmit(true, true, false, false);
        emit Transfer(owner, recipient, transferAmount);
        rbnt.transfer(recipient, prevOwnerBal);

        uint256 currentOwnerBal = rbnt.balanceOf(owner);
        uint256 currentRecipientBal = rbnt.balanceOf(recipient);
        assertEq(currentOwnerBal, 0);
        assertEq(currentRecipientBal, prevRecipientBal + prevOwnerBal);

        vm.stopPrank();
    }

    function test__successfulApproval() public {
        vm.startPrank(owner);

        //owner allows contract to spend funds
        // Emits Approval event
        vm.expectEmit(true, true, false, false);
        emit Approval(owner, contractAddress, approvedAmount);
        rbnt.approve(contractAddress, approvedAmount);

        //check allowance
        uint256 approvedAllowance = rbnt.allowance(owner, contractAddress);

        // Approve sets allowance correctly (Overwriting allowance works)
        assertEq(approvedAmount, approvedAllowance);

        vm.stopPrank();
    }

    function test__ApprovalEdgeCases() public {
        vm.startPrank(owner);

        // Approve to zero address → revert
        vm.expectRevert(abi.encodeWithSelector(Error__ZeroAddress.selector));
        rbnt.approve(zeroAddress, approvedAmount);

        vm.stopPrank();
    }

    // Mint
    // Faucet
    // Ownership
}
