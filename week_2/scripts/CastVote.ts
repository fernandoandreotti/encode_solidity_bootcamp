import { ethers } from 'ethers'
import * as dotenv from 'dotenv'
dotenv.config()

const abi = [{
    "inputs": [
      {
        "internalType": "uint256",
        "name": "proposal",
        "type": "uint256"
      }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "proposals",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "name",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "voteCount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }];

async function main() {

    const args = process.argv;
    const contractAddress = args[2]
    const voteProposal = args[3]

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
    console.log("Succesfully attached")
    console.log("Registering your vote ...")
    await deployedContract.vote(voteProposal);
    const votedProposal = await deployedContract.proposals(voteProposal)
    console.log(`You successfully voted for proposal ${ethers.utils.parseBytes32String(votedProposal.name)}`)
}

main().catch(error => {
    console.error(error)
    process.exitCode=1;
})