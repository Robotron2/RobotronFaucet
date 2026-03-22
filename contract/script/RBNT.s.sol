// SPDX-License-Identifier: MIT
pragma solidity 0.8.33;

import {Script} from "forge-std/Script.sol";
import {RBNT} from "../src/RBNT.sol";

contract RBNTScript is Script {
    RBNT public rbnt;
    uint256 constant INITIAL_SUPPLY = 1000;
    uint256 deployerKey = vm.envUint("PRIVATE_KEY");
    address owner = vm.addr(deployerKey);

    function run() external returns (RBNT) {
        vm.startBroadcast();

        rbnt = new RBNT(owner, INITIAL_SUPPLY);

        vm.stopBroadcast();
        return rbnt;
    }
}
