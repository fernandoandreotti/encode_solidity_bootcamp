import { ethers } from 'ethers'
import * as dotenv from 'dotenv'
dotenv.config()

const abi = [    {
    "inputs": [],
    "name": "winnerName",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "winnerName_",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }];

async function main() {

    const args = process.argv;
    const contractAddress = args[2]

    const provider = new ethers.providers.AlchemyProvider("goerli", process.env.ALCHEMY_API_KEY)
    const privateKey = process.env.PRIVATE_KEY;
    if(!privateKey || privateKey.length <= 0) {
        throw new Error("Private key missing")
    }
    const wallet = new ethers.Wallet(privateKey)
    const signer = wallet.connect(provider)
    
    const contract = new ethers.Contract("Ballot", abi, signer);
    console.log(`Attaching to ballot contract at address ${contractAddress} ...`)
    const deployedContract = contract.attach(contractAddress);
    console.log("Succesfully attached");
    console.log("Requesting the winner of this ballot ...")
    const result = await deployedContract.winnerName();
    console.log(`And the winner is proposal ${ethers.utils.parseBytes32String(result)}`)
}

main().catch(error => {
    console.error(error)
    process.exitCode=1;
})