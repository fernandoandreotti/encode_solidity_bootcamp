Week 2 - Deploying and interacting with Ballot
===========================

Getting started
-------------------

1. Clone repo.
2. Setup `.env`file with at least the `MNEMONIC` seed which is used to attach our wallets. 
````
MNEMONIC="here is where your twelve words mnemonic should be put my friend"
PRIVATE_KEY="<your private key here if you don't have a mnemonic seed>"
INFURA_API_KEY="********************************"
INFURA_API_SECRET="********************************"
ALCHEMY_API_KEY="********************************"
ETHERSCAN_API_KEY="********************************"
````

3. Install repo using `yarn install`
4. Compile the contract with `yarn hardhat compile`
5. Run tests with `yarn hardhat test`
6. Deploy contract using: `yarn run ts-node --files .\scripts\Deployment.ts "arg1" "arg2" "arg3"`

The wallet was deployed at the following address: `XXXXXXXXX`