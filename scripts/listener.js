require("dotenv").config();
const {ethers} = require("ethers");
const {ABI} = require("../contracts/utils/ABI.js");


const sepoliaPortalAddress = "0xFc37d15D364Cc52376B36865051c7AC127429874";
const volaryPortalAddress = "0x672623Df5Dcd0c98496F7E39A1483aC03bD6100b";

const providerSepolia = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC);
const providerVolary = new ethers.providers.JsonRpcProvider(process.env.VOLARY_RPC);
const walletVolary = new ethers.Wallet(process.env.PRIVATE_KEY, providerVolary);

const sepoliaPortal = new ethers.Contract(sepoliaPortalAddress, ABI, providerSepolia);
const volaryPortal = new ethers.Contract(volaryPortalAddress, ABI, walletVolary);

// TODO
async function handleMint() {}

sepoliaPortal.on("CrossTransfer", async (sender, receiver, amount, timestamp, nonce, signature, status) => {
    console.log("Burn event on Sepolia. Now Initiating mint on Volary");
    await handleMint(sender, receiver, amount, nonce, signature);
});

console.log("Listening for CrossTransfer events on Sepolia Portal");