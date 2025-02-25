// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

interface ICrossToken {
    function mint(address to, uint256 amount) external;
    function burn(address owner, uint256 amount) external;
}

contract CrossChainBridge is Ownable {
    address public admin;
    ICrossToken public token;
    uint256 public nonce;
    mapping(address => mapping(uint256 => bool)) public processedNonces;

    enum Process {
        Mint,
        Burn
    }

    event CrossTransfer (
        address sender,
        address receiver,
        uint256 tokenAmount,
        uint256 timestamp,
        uint256 nonce,
        bytes signature,
        Process indexed status
    );

    constructor (address _token){
        admin = msg.sender;
        token = ICrossToken(_token);
    }

    function burn (
        uint256 amount,
        uint256 crossChainNonce,
        bytes calldata signature
    ) external {
        require(msg.sender == admin, "Only Admin!");
        require(
            processedNonces[msg.sender][crossChainNonce] == false, "Already Transferred!"
        );
        processedNonces[msg.sender][crossChainNonce] = true;    
        token.burn(msg.sender, amount);

        emit CrossTransfer(
            msg.sender,
            address(0),
            amount,
            block.timestamp,
            crossChainNonce,
            signature,
            Process.Burn
        );

        nonce++;
    }

    function mint (
        address sender,
        address receiver,
        uint256 amount,
        uint256 crossChainNonce,
        bytes calldata signature
    ) external {
        require(msg.sender == admin, "Only Admin!");
        bytes32 message = prefixed(
            keccak256(abi.encodePacked(
                sender,
                receiver,
                amount,
                nonce
            ))
        );
        require(recoverSigner(message, signature) == sender, "Wrong Signature!");
        require(
            processedNonces[msg.sender][crossChainNonce] == false,
             "Already Transferred!"
        );
        token.mint(receiver, amount);
        
        emit CrossTransfer (
            msg.sender,
            receiver,
            amount,
            block.timestamp,
            crossChainNonce,
            signature,
            Process.Mint
        );
    }

    function prefixed (bytes32 hash) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(
            "\x19Ethereum Signed Message:\n32", hash
        ));
    }

    function recoverSigner (bytes32 message, bytes memory sig) internal pure returns (address) {
        uint8 v;
        bytes32 r;
        bytes32 s;

        (v, r, s) = splitSignature(sig);

        return ecrecover(message, v, r, s);
    }

    function splitSignature (
        bytes memory sig
    ) internal pure returns (uint8, bytes32, bytes32) {
        require(sig.length == 65);

        bytes32 r;
        bytes32 s;
        uint8 v;

        assembly {
            // first 32 bytes
            r := mload(add(sig, 32))
            // second 32 bytes
            s := mload(add(sig, 64))
            // final byte
            v := byte(0, mload(add(sig, 96)))
        }

        return (v, r, s);
    }


}