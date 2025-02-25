// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {MockToken} from "./MockToken.sol";

contract VolaryToken is MockToken {
    constructor() MockToken
    (
        "Volary Token",
        "VLRY"
    ) {}
}