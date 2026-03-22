// SPDX-License-Identifier: MIT
pragma solidity 0.8.33;

import {console} from "forge-std/console.sol";
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
error Error__InsufficientAllowance();

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
     * transferFrom
     */

    function test__successfulTransfer() public {
        uint256 prevOwnerBal = rbnt.balanceOf(owner);
        uint256 prevRecipientBal = rbnt.balanceOf(recipient);
        //transfer
        vm.prank(owner);
        vm.expectEmit(true, true, false, false);
        emit Transfer(owner, recipient, transferAmount);
        bool result = rbnt.transfer(recipient, transferAmount);
        uint256 currentOwnerBal = rbnt.balanceOf(owner);
        uint256 currentRecipientBal = rbnt.balanceOf(recipient);

        assertTrue(result);
        assertEq(currentOwnerBal, prevOwnerBal - transferAmount);
        assertEq(currentRecipientBal, prevRecipientBal + transferAmount);
    }

    function test__transferEdgeCases() public {
        vm.startPrank(owner);
        bool result;

        // Transfer more than balance → revert
        vm.expectRevert(abi.encodeWithSelector(Error__InsufficientBalance.selector));
        result = rbnt.transfer(recipient, excessTransferAmount);
        assertFalse(result);
        console.log(result);

        // Transfer to address(0) → revert
        vm.expectRevert(abi.encodeWithSelector(Error__ZeroAddress.selector));
        result = rbnt.transfer(zeroAddress, transferAmount);
        assertFalse(result);

        // Transfer full balance → works
        uint256 prevOwnerBal = rbnt.balanceOf(owner);
        uint256 prevRecipientBal = rbnt.balanceOf(recipient);

        vm.expectEmit(true, true, false, false);
        emit Transfer(owner, recipient, transferAmount);
        result = rbnt.transfer(recipient, prevOwnerBal);
        assertTrue(result);

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
        bool result = rbnt.approve(contractAddress, approvedAmount);

        //check allowance
        uint256 approvedAllowance = rbnt.allowance(owner, contractAddress);

        // Approve sets allowance correctly (Overwriting allowance works)
        assertTrue(result);
        assertEq(approvedAmount, approvedAllowance);

        vm.stopPrank();
    }

    function test__ApprovalEdgeCases() public {
        vm.startPrank(owner);

        // Approve to zero address → revert
        vm.expectRevert(abi.encodeWithSelector(Error__ZeroAddress.selector));
        bool result = rbnt.approve(zeroAddress, approvedAmount);

        assertFalse(result);

        vm.stopPrank();
    }

    function test__sucessfulTransferFrom() public {
        vm.startPrank(owner);

        bool approvalStatus;
        bool transferFromStatus;

        approvalStatus = rbnt.approve(contractAddress, approvedAmount);
        assertTrue(approvalStatus);
        //contract has allowance; contract try spend on my behalf
        uint256 recipientPrevBal = rbnt.balanceOf(recipient);
        uint256 prevAllowance = rbnt.allowance(owner, contractAddress);
        uint256 ownerPrevBal = rbnt.balanceOf(owner);

        changePrank(contractAddress);
        // Emits Transfer
        vm.expectEmit(true, true, false, false);
        emit Transfer(owner, recipient, approvedAmount);
        // console.log(prevAllowance);
        transferFromStatus = rbnt.transferFrom(owner, recipient, approvedAmount);
        assertTrue(transferFromStatus);
        // Works with sufficient allowance + balance

        uint256 currentAllowance = rbnt.allowance(owner, contractAddress);
        uint256 ownerCurrentBal = rbnt.balanceOf(owner);
        uint256 recipientCurrentBal = rbnt.balanceOf(recipient);

        // Deducts allowance correctly
        // Updates balances correctly
        assertEq(currentAllowance, prevAllowance - approvedAmount);
        assertEq(ownerCurrentBal, ownerPrevBal - approvedAmount);
        assertEq(recipientCurrentBal, approvedAmount + recipientPrevBal);

        vm.stopPrank();
    }

    function test__transferFromEdgeCaseI() public {
        vm.startPrank(owner);

        bool result;

        uint256 spikedAmount = approvedAmount + 200;
        result = rbnt.approve(contractAddress, approvedAmount);
        assertTrue(result);
        //contract has allowance; contract try spend on my behalf

        changePrank(contractAddress);
        // Exceeds allowance → revert
        vm.expectRevert(abi.encodeWithSelector(Error__InsufficientAllowance.selector));
        result = rbnt.transferFrom(owner, recipient, spikedAmount);
        assertFalse(result);
        vm.stopPrank();
    }

    function test__transferFromEdgeCaseII() public {
        vm.startPrank(owner);

        bool status;

        uint256 spikedAmount = approvedAmount + 200;
        status = rbnt.approve(contractAddress, spikedAmount);
        assertTrue(status);
        //contract has allowance; contract try spend on my behalf

        changePrank(contractAddress);

        // Exceeds balance → revert
        vm.expectRevert(abi.encodeWithSelector(Error__InsufficientBalance.selector));
        status = rbnt.transferFrom(owner, recipient, spikedAmount);
        assertFalse(status);
        vm.stopPrank();
    }

    function test__transferFromEdgeCaseIII() public {
        vm.startPrank(owner);

        bool status;

        status = rbnt.approve(contractAddress, approvedAmount);
        assertTrue(status);

        changePrank(contractAddress);

        // From = zero address → revert
        vm.expectRevert(abi.encodeWithSelector(Error__ZeroAddress.selector));
        status = rbnt.transferFrom(zeroAddress, recipient, approvedAmount);
        assertFalse(status);
        vm.stopPrank();
    }

    function test__transferFromEdgeCaseIV() public {
        vm.startPrank(owner);

        bool status;

        status = rbnt.approve(contractAddress, approvedAmount);
        assertTrue(status);

        changePrank(contractAddress);

        // To = zero address → revert
        vm.expectRevert(abi.encodeWithSelector(Error__ZeroAddress.selector));
        status = rbnt.transferFrom(zeroAddress, recipient, approvedAmount);
        assertFalse(status);
        vm.stopPrank();
    }

    // Edge cases:

    // Mint
    // Faucet
    // Ownership
}
