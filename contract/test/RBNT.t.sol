// SPDX-License-Identifier: MIT
pragma solidity 0.8.33;

import {Test} from "forge-std/Test.sol";
import {RBNT} from "../src/RBNT.sol";

contract RBNTTest is Test {
    RBNT public rbnt;
    uint256 constant INITIAL_SUPPLY = 200;
    address owner = makeAddr("owner");
    address recipient = makeAddr("recipient");
    address zeroAddress = address(0);
    uint256 transferAmount = 10;

    function setUp() public {
        rbnt = new RBNT(owner, INITIAL_SUPPLY);
    }

    // ERC20Basic

    function test__successfulTransfer() public {
        uint256 prevOwnerBal = rbnt.balanceOf(owner);
        uint256 prevRecipientBal = rbnt.balanceOf(recipient);
        //transfer
        vm.prank(owner);
        rbnt.transfer(recipient, transferAmount);
        uint256 currentOwnerBal = rbnt.balanceOf(owner);
        uint256 currentRecipientBal = rbnt.balanceOf(recipient);

        assertEq(currentOwnerBal, prevOwnerBal - transferAmount);
        assertEq(currentRecipientBal, prevRecipientBal + transferAmount);
    }
    // Mint
    // Faucet
    // Ownership
}
