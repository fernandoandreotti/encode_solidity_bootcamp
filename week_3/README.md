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

The Token contract was deployed at the following address: `0x63840a264045f5F87eC18dB64353990D67b225c7`. The Tokenized Ballot was deployed at address `0x103cdc03325c0F6C53CC2C1030816a89e3aF079F`

The following scripts were added to interact with the contract:
- `VotingTokens.ts` - ...
- `CheckVotePower.ts` - ... 
- `CastVote.ts` - for casting votes, provided rights are given
- `DelegateVote.ts` - for user to delegate rights to other user
- `QueryResults.ts` - querying voting results