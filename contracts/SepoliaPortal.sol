// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {CrossChainBridge} from "./CrossBridge.sol";

contract SepoliaPortal is CrossChainBridge {
    constructor (address _token) CrossChainBridge(_token) {}
}