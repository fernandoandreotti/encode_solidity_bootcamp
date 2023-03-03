import { ethers } from "hardhat";
import {MyToken__factory} from "../typechain-types";

async function main() {
    // Deploy the contract
    const [deployer, account1, account2] = await ethers.getSigners();
    const contractFactory = new MyToken__factory(deployer);
    const contract = await contractFactory.deploy();
    const deployedTransactionReceipt = await contract.deployTransaction.wait();
    console.log(`Deployed contract at the block ${deployedTransactionReceipt.blockNumber}`)
    
    // Acount1 - Mint some tokens
    const MINT_VALUE = ethers.utils.parseEther("10");
    const mintTx = await contract.mint(account1.address, MINT_VALUE);
    const mintTxReceipt = await mintTx.wait();
    console.log(`Tokens minted for ${account1.address} at block ${mintTxReceipt.blockNumber}`)
    const tokenBalanceAccount1 = await contract.balanceOf(account1.address);
    console.log(`Account 1 has a balance of ${ethers.utils.formatEther(tokenBalanceAccount1)} Vote Tokens.`);
    
    // Acount1 - Check the voting power
    const votePowerAccount1 = await contract.getVotes(account1.address);
    console.log(`Account 1 has a vote power of ${votePowerAccount1} units.`);

    // Acount1 - Self delegate (to enable voting power)
    const delegateTx = await contract.connect(account1).delegate(account1.address);
    const delegateTxReceipt = await delegateTx.wait();
    console.log("Tokens self-delegated.");
    console.log(`Account 1 has now a vote power of ${votePowerAccount1} units.`);
    console.log(
        `Tokens delegated from ${account1.address} for ${
          account1.address
        } at block ${delegateTxReceipt.blockNumber}, for a cost of ${
          delegateTxReceipt.gasUsed
        } gas units, totalling a tx cost of ${delegateTxReceipt.gasUsed.mul(
          delegateTxReceipt.effectiveGasPrice
        )} Wei (${ethers.utils.formatEther(
          delegateTxReceipt.gasUsed.mul(delegateTxReceipt.effectiveGasPrice)
        )} ETH)`
      );

    // Acount2 - Mint some tokens
    const mintTx2 = await contract.mint(account2.address, MINT_VALUE);
    const mintTxReceipt2 = await mintTx.wait();
    console.log(`Tokens minted for ${account2.address} at block ${mintTxReceipt2.blockNumber}`)
    const tokenBalanceAccount2 = await contract.balanceOf(account2.address);
    console.log(`Account 2 has a balance of ${ethers.utils.formatEther(tokenBalanceAccount2)} Vote Tokens.`);
    
    // Acount2 - Check the voting power
    const votePowerAccount2 = await contract.getVotes(account2.address);
    console.log(`Account 2 has a vote power of ${votePowerAccount2} units.`);

    // Acount2 - Self delegate (to enable voting power)
    const delegateTx2 = await contract.connect(account1).delegate(account2.address);
    const delegateTxReceipt2 = await delegateTx2.wait();
    console.log("Tokens self-delegated.");
    console.log(`Account 2 has now a vote power of ${votePowerAccount2} units.`);
    console.log(
        `Tokens delegated from ${account2.address} for ${
          account2.address
        } at block ${delegateTxReceipt2.blockNumber}, for a cost of ${
          delegateTxReceipt2.gasUsed
        } gas units, totalling a tx cost of ${delegateTxReceipt2.gasUsed.mul(
          delegateTxReceipt2.effectiveGasPrice
        )} Wei (${ethers.utils.formatEther(
          delegateTxReceipt2.gasUsed.mul(delegateTxReceipt2.effectiveGasPrice)
        )} ETH)`
      );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})