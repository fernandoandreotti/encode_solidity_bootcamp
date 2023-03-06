import * as dotenv from 'dotenv';
import { ethers } from 'ethers';
import { Ballot__factory } from '../typechain-types';

dotenv.config();

async function main() {
  //check parameters
  const args = process.argv;
  if (args.length === 0 || args.length !== 5)
    throw new Error("Error with parameters");
  
  // Get arguments
  const ballotContractAddress = args[2];
  const proposalsNumber = args[3];
  const votingPower = args[4];

  // Get Provider + connection
  const provider = new ethers.providers.AlchemyProvider("goerli", process.env.ALCHEMY_API_KEY);
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey || privateKey.length <= 0) {
    throw new Error("Private key missing")
  }
  const wallet = new ethers.Wallet(privateKey);
  const signer = wallet.connect(provider);

  // Cast Vote 
  const ballotContractFactory = new Ballot__factory(signer);
  const ballotContract = ballotContractFactory.attach(ballotContractAddress);
  console.log(`The ballot contract is at: ${ballotContractAddress}
  The proposal vote is: ${proposalsNumber}
  The voting power is: ${votingPower}`)
  const voteTx = await ballotContract.vote(proposalsNumber, votingPower, {gasLimit: 100000});
  const voteTxReceipt = voteTx.wait();
  console.log(voteTxReceipt);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
})
