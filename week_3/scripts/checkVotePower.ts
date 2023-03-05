import { ethers } from "hardhat";
import * as dotenv from 'dotenv';
import { Ballot__factory, MyToken__factory } from "../typechain-types";
import { BigNumber } from "ethers";

dotenv.config();

async function main(){

    const args = process.argv;
    const tokenContractAddress = args[2];
    const checkVotePowerAddress = args[3];

    const provider = new ethers.providers.AlchemyProvider("goerli", process.env.ALCHEMY_API_KEY);
    const privateKey = process.env.PRIVATE_KEY;

    if(!privateKey || privateKey.length <= 0) {
        throw new Error("Private key missing in env")
    }

    const wallet = new ethers.Wallet(privateKey);
    const signer = wallet.connect(provider);
    const contract = new MyToken__factory(signer);
    const deployedContract = await contract.attach(tokenContractAddress);
    console.log(`Attached to contract: ${tokenContractAddress}`);

    const getVotePower = await deployedContract.getVotes(checkVotePowerAddress);
    console.log(`Account ${checkVotePowerAddress} has ${getVotePower} vote power units`);

}

main().catch((err) => {
    console.error(err);
    process.exit(1);
})