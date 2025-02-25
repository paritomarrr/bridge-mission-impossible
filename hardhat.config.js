require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    hardhat: {
      chainId: 1337
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC,
      accounts: [process.env.PRIVATE_KEY]
    },
    volary: {
      url: process.env.VOLARY_RPC,
      accounts: [process.env.PRIVATE_KEY]
    },
    amoy: {
      url: process.env.AMOY_RPC,
      accounts: [process.env.PRIVATE_KEY]
    },
    holesky: {
      url: process.env.HOLESKY_RPC,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};