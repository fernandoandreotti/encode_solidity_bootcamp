import { ethers } from "hardhat";
import * as dotenv from 'dotenv';
import { Ballot__factory } from "../typechain-types";
dotenv.config();

function convertStringArrayToBytes32(array: string[]) {
    const bytes32Array = [];
    for (let index = 0; index < array.length; index++) {
      bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
    }
    return bytes32Array;
  }

async function main() {
    // Treating input arguments
    const args = process.argv;
    const proposals = args.slice(2);
    if (proposals.length <= 0) throw new Error("Missing parameters: proposals");

    // Provider information
    // using "goerli" testnet from .env MNEMONIC
    const provider = new ethers.providers.AlchemyProvider("goerli", process.env.ALCHEMY_API_KEY)
    console.log({provider});
    
    // Wallet info
    const privateKey = process.env.PRIVATE_KEY;
    if(!privateKey || privateKey.length <= 0) {
        throw new Error("Private key missing")
    }
    const wallet = new ethers.Wallet(privateKey)
    const signer = wallet.connect(provider)
    console.log(`Connected to the wallet address ${wallet.address}`)
    const balance = await signer.getBalance();
    console.log(`Ẁallet balance: ${balance} Wei`);

    // Contract
    console.log("Deploying Ballot contract");
    console.log("Proposals: ");
    proposals.forEach((element, index) => {
        console.log(`Proposal N. ${index + 1}: ${element}`);
    });
    const ballotContractFactory = new Ballot__factory(signer);
    // This transaction initiates contract.
    console.log("Deploying contract ...");
    const ballotContract = await ballotContractFactory.deploy(
      convertStringArrayToBytes32(proposals)
    );
    // This waits for contract to be actually deployed. Receipt is available of transaction.
    // an alternative is deployed(), with the wait() you also get gas costs etc.
    const deployTxReceipt = await ballotContract.deployTransaction.wait();
    console.log(
      `The Ballot contract was deployed at the address ${ballotContract.address}`
    );
    console.log({ deployTxReceipt });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});