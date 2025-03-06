require("dotenv").config();
const { ethers } = require("ethers");
const fs = require("fs");

// Load environment variables
const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// Load contract ABI
const contractABI = JSON.parse(fs.readFileSync("blockchain/NOCStorage.json")).abi;

// Connect to Hardhat local blockchain
const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, wallet);

// Function to store NOC details on blockchain
async function storeNOC(applicationId, ownerName, businessName, nocUrl) {
    const tx = await contract.storeNOC(applicationId, ownerName, businessName, nocUrl);
    await tx.wait();
    console.log("✅ NOC stored on blockchain:", tx.hash);
    return tx.hash;
}

// Function to get NOC details from blockchain
async function getNOC(applicationId) {
    const nocDetails = await contract.getNOC(applicationId);
    return nocDetails;
}

module.exports = { storeNOC, getNOC };
