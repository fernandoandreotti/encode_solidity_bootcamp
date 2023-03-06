import { ethers } from "hardhat";
import { MyToken__factory } from "../typechain-types";
import * as dotenv from 'dotenv'

dotenv.config()

async function main() {

    //In the command line provide the address of the token with which we will be able to vote;
    //Then give the number of token to mint
    //Then provide the addresses for which you want to mint token for
    const args = process.argv;
    const tokenAddress = args[2];
    const numberOfTokenToMint = args[3]
    const voters = args.slice(4);

    const provider = new ethers.providers.AlchemyProvider("goerli", process.env.ALCHEMY_API_KEY);
    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey || privateKey.length <= 0) {
        throw new Error("Private key missing")
    }
    const wallet = new ethers.Wallet(privateKey)
    const signer = wallet.connect(provider)

    const tokenFactory = new MyToken__factory(signer);
    const tokenContract = tokenFactory.attach(tokenAddress);

    for (const voter of voters) {
        await tokenContract.mint(voter, ethers.utils.parseEther(numberOfTokenToMint), {gasLimit: 100000 * voters.length});
        console.log(`Minted ${numberOfTokenToMint} tokens to address: ${voter}`)
    }
    console.log("Distribution of tokens over")
}

main().catch((error) => {
    console.error(error)
    process.exitCode=1;
})