import { ethers } from "hardhat";

const addresses = [0x8E58a9aD55e4e9e5C387537097a6fF41504e4398]; // array with our addresses: address type
const contract = require("../artifacts/contracts/Ballot.sol/Ballot.json");
const provider = ethers.getDefaultProvider("goerli");
const mnemonic = process.env.MNEMONIC;
if(!mnemonic || mnemonic.length <= 0 )
    throw new Error("Missing Environment: Mnemonic seed");
const wallet = ethers.Wallet.fromMnemonic(mnemonic);
const signer = wallet.connect(provider);
const ballotContract = new ethers.Contract("Deployed contract address here",contract.abi,signer); // getting contract instance

async function main() {
    for (let i = 0; i < addresses.length; i++){
        await ballotContract.giveRightToVote(addresses[i]);
    }
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
