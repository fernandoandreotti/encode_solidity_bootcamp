import { ethers } from 'ethers'
import * as dotenv from 'dotenv'
import { Ballot__factory } from '../typechain-types';
dotenv.config()

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
    
    const contract = new Ballot__factory(signer);
    console.log(`Attaching to ballot contract at address ${contractAddress} ...`)
    const deployedContract = contract.attach(contractAddress);
    console.log("Succesfully attached")
    let proposals = [];
    let i = 0
    while(true) {
        try {
            const proposal = await deployedContract.proposals(i)
            proposals.push(ethers.utils.parseBytes32String(proposal.name))
            i++;
        } catch (error) {
            for(let j = 0; j < proposals.length; j++) {
                console.log(`Vote ${j} for ${proposals[j]}`)
            }
            
            process.exit(0)
        }
    }
}

main().catch(error => {
    console.error(error)
    process.exitCode=1;
})



