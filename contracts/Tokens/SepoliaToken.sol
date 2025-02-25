// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {MockToken} from "./MockToken.sol";

contract SepoliaToken is MockToken {
    constructor() MockToken
    (
        "Sepolia Token",
        "ETH"
    ) {}
}