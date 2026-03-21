// SPDX-License-Identifier: MIT
pragma solidity 0.8.33;

import {Script} from "forge-std/Script.sol";
import {RBNT} from "../src/RBNT.sol";

contract CounterScript is Script {
    RBNT public rbnt;
    uint256 constant INITIAL_SUPPLY = 200;
    address owner = makeAddr("owner");

    function run() public {
        vm.startBroadcast();

        rbnt = new RBNT(owner, INITIAL_SUPPLY);

        vm.stopBroadcast();
    }
}
