const { expect } = require('chai');
const { ethers } = require('hardhat');

describe ("Cross chain Token Bridge", function () {
    let token;
    let sepoliaPortal;
    let volaryPortal;

    const AMOUNT = ethers.utils.parseEther("100");

    beforeEach(async function () {
        const Token = await ethers.getContractFactory("SepoliaToken");
        token = await Token.deploy();
        await token.deployed();

        const SepoliaPortal = await ethers.getContractFactory("SepoliaPortal");
        sepoliaPortal = await SepoliaPortal.deploy(token.address);
        await sepoliaPortal.deployed();

        const VolaryPortal = await ethers.getContractFactory("VolaryPortal");
        volaryPortal = await VolaryPortal.deploy(token.address);
        await volaryPortal.deployed();
    })

    it ("Should transfer tokens from Sepolia to Volary", async function () {
        const [sender, receiver] = await ethers.getSigners();

        await token.connect(sender).mint(sender.address, AMOUNT);

        await token.connect(sender).approve(sepoliaPortal.address, AMOUNT);
    
        const nonce = 0;

        const balanceBefore = await token.balanceOf(receiver.address);
        console.log("Balance before: ", balanceBefore.toString());

        expect(
            sepoliaPortal.connect(sender).burn(receiver.address, AMOUNT, nonce)
            .to.emit(sepoliaPortal, "CrossTransfer")
            .withArgs(
                sender.address,
                receiver.address,
                AMOUNT,
                ethers.BigNumber,
                nonce,
                ethers.constants.HashZero,
                0
            )
        )

        const volaryFilter = volaryPortal.filters.CrossTransfer(
            null,
            null,
            null,
            null,
            nonce,
            null,
            1
        );

        const [volaryEvent] = await volaryPortal.queryFilter(volaryFilter);

        expect(volaryEvent.args.sender).to.equal(sender.address);
    })
})