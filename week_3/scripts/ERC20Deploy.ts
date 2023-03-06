import { ethers } from 'ethers'
import { MyToken__factory } from '../typechain-types'
import * as dotenv from 'dotenv'

dotenv.config()

async function main() {

    const provider = new ethers.providers.AlchemyProvider("goerli", process.env.ALCHEMY_API_KEY);
    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey || privateKey.length <= 0) {
        throw new Error("Private key missing")
    }
    const wallet = new ethers.Wallet(privateKey)
    const signer = wallet.connect(provider)

    const tokenFactory = new MyToken__factory(signer)
    const tokenContract = await tokenFactory.deploy()
    const tokenDeployTx = await tokenContract.deployTransaction.wait();
    console.log(`Token contract deployed at address ${tokenContract.address}`)
}

main().catch((error) => {
    console.error(error);
    process.exitCode=1
})