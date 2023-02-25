Week 2 - Deploying and interacting with Ballot
===========================

Getting started
-------------------

1. Clone repo.
2. Setup `.env`file with at least the `ALCHEMY_API_KEY` and `PRIVATE_KEY` which are used to attach our contract. 
````
MNEMONIC="here is where your twelve words mnemonic should be put my friend"
PRIVATE_KEY="<your private key here if you don't have a mnemonic seed>"
INFURA_API_KEY="********************************"
INFURA_API_SECRET="********************************"
ALCHEMY_API_KEY="********************************"
ETHERSCAN_API_KEY="********************************"
````

1. Install repo using `yarn install`
2. Compile the contract with `yarn hardhat compile`
3. Run tests with `yarn hardhat test`
4. Deploy contract using: `yarn run ts-node --files scripts/Deployment.ts "arg1" "arg2" "arg3"`

The contract was deployed at the following address: `0x5fff9c7cbe4476b1981d54b90afab3d94da6ae05`

The following scripts were added to interact with the contract:
- `CastVote.ts` - for casting votes, provided rights are given
- `DelegateVote.ts` - for user to delegate rights to other user
- `GiveVoteRights.ts` - for enabling voting rights to user
- `QueryResults.ts` - querying voting results