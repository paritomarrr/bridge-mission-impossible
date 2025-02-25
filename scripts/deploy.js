const {ethers} = require("hardhat");

async function main () {
    // Deploy Sepolia Token Contract
    // const SepoliaToken = await ethers.getContractFactory("SepoliaToken");
    // const sepoliaToken = await SepoliaToken.deploy();
    // await sepoliaToken.deployed();
    // console.log("Sepolia Token deployed to:", sepoliaToken.address);

    // deploy Volary Token Contract
    const VolaryToken = await ethers.getContractFactory("VolaryToken");
    const volaryToken = await VolaryToken.deploy();
    await volaryToken.deployed();
    console.log("Volary Token deployed to:", volaryToken.address);

    // deploy sepolia portal contract
    // const SepoliaPortal = await ethers.getContractFactory("SepoliaPortal");
    // const sepoliaPortal = await SepoliaPortal.deploy(sepoliaToken.address);
    // await sepoliaPortal.deployed();
    // console.log("Sepolia Portal deployed to:", sepoliaPortal.address);

    // deploy volary portal contract
    const VolaryPortal = await ethers.getContractFactory("VolaryPortal");
    const volaryPortal = await VolaryPortal.deploy(volaryToken.address);
    await volaryPortal.deployed();
    console.log("Volary Portal deployed to:", volaryPortal.address);
}

main().catch((error) => {
    console.error(error);
    // process.exitCode(1);
})