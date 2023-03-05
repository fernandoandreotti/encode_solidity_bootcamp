import { ethers } from 'hardhat'
import { Ballot__factory } from '../typechain-types';
import * as dotenv from 'dotenv'

dotenv.config()

async function main() {
    
    //In the command line, we provide the token address with which we will be able to vote
    //Then the target block number from which we want to count the voting power
    //Then the proposals to be voted 
    const args = process.argv;
    const tokenAddress = args[2];
    const numberOfBlocksBeforeVotingPowerCount = args[3];
    const proposals = args.slice(4);

    const provider = new ethers.providers.AlchemyProvider("goerli", process.env.ALCHEMY_API_KEY);
    const privateKey = process.env.PRIVATE_KEY;
    if(!privateKey || privateKey.length <= 0) {
        throw new Error("Private key missing")
    }
    const wallet = new ethers.Wallet(privateKey);
    const signer = wallet.connect(provider);

    console.log("Deploying Tokenized Ballot contract");
    console.log("Proposals: ");
    proposals.forEach((element, index) => {
      console.log(`Proposal N. ${index + 1}: ${element}`);
    });
  
    const currentBlockNumber = await provider.getBlockNumber();
    const ballotFactory = new Ballot__factory(signer);
    const ballotContract = await ballotFactory.deploy(
        proposals.map(proposal => ethers.utils.formatBytes32String(proposal)), 
        tokenAddress,
        currentBlockNumber + Number(numberOfBlocksBeforeVotingPowerCount)
    );
    await ballotContract.deployTransaction.wait()
    console.log(`Ballot contract deployed at address ${ballotContract.address}`)
}

main().catch((error) => {
    console.log(error)
    process.exitCode=1
})