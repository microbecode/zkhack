// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Verification} from "../src/Verification.sol";

contract VerificationScript is Script {
    Verification public myContract;

    // TODO: fill in
    address public zkVerify;
    bytes32 public vkey;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        myContract = new Verification(zkVerify, vkey);

        vm.stopBroadcast();
    }
}
