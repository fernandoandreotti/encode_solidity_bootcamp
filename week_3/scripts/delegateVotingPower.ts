import { ethers } from "hardhat";
import * as dotenv from 'dotenv';
import { MyToken__factory } from "../typechain-types";
import { BigNumber } from "ethers";

dotenv.config();

async function main() {
    const args = process.argv;
    const tokenContractAddress = args[2];
    const delegateAddress = args[3];

    const provider = new ethers.providers.AlchemyProvider("goerli", process.env.ALCHEMY_API_KEY);
    const PK = process.env.PRIVATE_KEY;

    if (!PK || PK.length <= 0) {
        throw new Error("No private key found in env");
    }

    const wallet = new ethers.Wallet(PK, provider);
    const signer = wallet.connect(provider);

    const tokenContract = new MyToken__factory(signer).attach(tokenContractAddress);
    console.log("Token contract attached to:", tokenContract.address);

    const votePowerBefore = await tokenContract.getVotes(wallet.address);
    // IDK IF WE SHOULD DO IT OR NOT ????????    
    // if the user has no voting power, he cannot delegate
    // if (votePowerBefore.eq(BigNumber.from(0))) {
        // console.log("You have no voting power. You cannot delegate.");
        // return;
    // }
    console.log(`You had a vote power of ${votePowerBefore} units before delegating.`);

    const delegateTx = await tokenContract.delegate(delegateAddress);
    const delegateTxReceipt = await delegateTx.wait();

    console.log("Tokens delegated.");
    const votePowerAfter = await tokenContract.getVotes(wallet.address);
    console.log(`You have now a vote power of ${votePowerAfter} units.`);
    console.log(
        `Tokens delegated from ${wallet.address} to ${delegateAddress
        } at block ${delegateTxReceipt.blockNumber}, for a cost of ${delegateTxReceipt.gasUsed
        } gas units, totalling a tx cost of ${delegateTxReceipt.gasUsed.mul(
            delegateTxReceipt.effectiveGasPrice
        )} Wei (${ethers.utils.formatEther(
            delegateTxReceipt.gasUsed.mul(delegateTxReceipt.effectiveGasPrice)
        )} ETH)`
    );
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
})
