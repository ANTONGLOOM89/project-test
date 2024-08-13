/*global process*/

const { ethers } = require("hardhat");

async function main() {
    const providerName = "sepolia";
    const provider = await ethers.providers.getDefaultProvider(providerName);
    const signers = await ethers.getSigners();

    const EOA = signers[0];
    // EOA address
    const deployer = await EOA.getAddress();

    // Transaction signing and execution
    const OptimizedContract = await ethers.getContractFactory("OptimizedContract");
    const optimizedContract = await OptimizedContract.connect(EOA).deploy("This is a test contract");
    const result = await optimizedContract.deployed();

    // Transaction details
    console.log("Contract deployment: OptimizedContract");
    console.log("Contract address:", optimizedContract.address);
    console.log("Transaction:", result.deployTransaction.hash);

    // Contract verification
    const execSync = require("child_process").execSync;
    execSync("npx hardhat verify --network " + providerName + " " + optimizedContract.address, { encoding: "utf-8" });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });