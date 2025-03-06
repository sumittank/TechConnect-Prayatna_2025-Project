const hre = require("hardhat");

async function main() {
    // Get the contract factory
    const NOCStorage = await hre.ethers.getContractFactory("NOCStorage");

    // Deploy the contract
    const nocStorage = await NOCStorage.deploy();

    // Wait for deployment
    await nocStorage.waitForDeployment();

    // Get the contract address
    console.log("NOCStorage deployed to:", await nocStorage.getAddress());
}

// Run the script
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
