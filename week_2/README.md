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
- `CastVote.ts` - casts votes, provided rights are given
- `DelegateVote.ts` - delegates voting rights to other user
- `GiveVoteRights.ts` - enables voting rights to user
- `QueryResults.ts` - queries voting results
- `GetProposals.ts` - queries available options for voting on proposal.

The list of transactions can be found below:

| Transaction Number | Blockno | UnixTimestamp | DateTime            | From                                       | To ContractAddress                         | TxnFee(ETH)       | Method             |
|--------------------|---------|---------------|---------------------|--------------------------------------------|--------------------------------------------|-------------------|--------------------|
| 1                  | 8548258 | 1677246840    | 2023-02-24 13:54:00 | 0x344c263ae7575b58bcd313fd6a517c8ca8872b3b | 0x5fff9c7cbe4476b1981d54b90afab3d94da6ae05 | 0.029798703223706 | 0x60806040         |
| 2                  | 8548269 | 1677246972    | 2023-02-24 13:56:12 | 0x344c263ae7575b58bcd313fd6a517c8ca8872b3b | 0x5fff9c7cbe4476b1981d54b90afab3d94da6ae05 | 0.001234433654171 | Give Right To Vote |
| 3                  | 8548271 | 1677247008    | 2023-02-24 13:56:48 | 0x344c263ae7575b58bcd313fd6a517c8ca8872b3b | 0x5fff9c7cbe4476b1981d54b90afab3d94da6ae05 | 0.001158544805724 | Give Right To Vote |
| 4                  | 8548271 | 1677247008    | 2023-02-24 13:56:48 | 0x344c263ae7575b58bcd313fd6a517c8ca8872b3b | 0x5fff9c7cbe4476b1981d54b90afab3d94da6ae05 | 0.001158544805724 | Give Right To Vote |
| 5                  | 8548272 | 1677247020    | 2023-02-24 13:57:00 | 0x344c263ae7575b58bcd313fd6a517c8ca8872b3b | 0x5fff9c7cbe4476b1981d54b90afab3d94da6ae05 | 0.001241973801601 | Give Right To Vote |
| 6                  | 8548273 | 1677247032    | 2023-02-24 13:57:12 | 0x344c263ae7575b58bcd313fd6a517c8ca8872b3b | 0x5fff9c7cbe4476b1981d54b90afab3d94da6ae05 | 0.001196217877643 | Give Right To Vote |
| 7                  | 8548371 | 1677248352    | 2023-02-24 14:19:12 | 0x344c263ae7575b58bcd313fd6a517c8ca8872b3b | 0x5fff9c7cbe4476b1981d54b90afab3d94da6ae05 | 0.000918333676423 | Give Right To Vote |
| 8                  | 8553998 | 1677328080    | 2023-02-25 12:28:00 | 0x7d519b2d27512dbb130ec4c9b997ef07a6ad9266 | 0x5fff9c7cbe4476b1981d54b90afab3d94da6ae05 | 0.003510103469394 | Vote               |
| 9                  | 8554015 | 1677328296    | 2023-02-25 12:31:36 | 0x8e58a9ad55e4e9e5c387537097a6ff41504e4398 | 0x5fff9c7cbe4476b1981d54b90afab3d94da6ae05 | 0.0025632106952   | Vote               |
| 10                 | 8554763 | 1677339012    | 2023-02-25 15:30:12 | 0x344c263ae7575b58bcd313fd6a517c8ca8872b3b | 0x5fff9c7cbe4476b1981d54b90afab3d94da6ae05 | 0.001481007224113 | Delegate           |
| 11                 | 8555559 | 1677350472    | 2023-02-25 18:41:12 | 0x5e635441cab460c3b126f7233419f143f87e404d | 0x5fff9c7cbe4476b1981d54b90afab3d94da6ae05 | 0.000329521332831 | Vote               |
| 12                 | 8556255 | 1677360276    | 2023-02-25 21:24:36 | 0xaf168c4c755771e46d24c7785909ba70c1e85218 | 0x5fff9c7cbe4476b1981d54b90afab3d94da6ae05 | 0.00026668567848  | Vote               |

As we can see on the list of transactions, we first deployed the contract, then gave rights to vote to the different members of the group. The members of the group voted, and then the chairperson delegated its vote to a member of the group (transaction number 10).

Conditions have been added in the code; For instance, one cannot vote twice. An example of trying to vote multiple times can be found below and is not succesful:

![image](https://user-images.githubusercontent.com/92883939/221441821-98008a05-ed22-479f-9f60-9977c3b0e23a.png)

An other case is when we want to delegate our vote while not being the chairperson; This is also not succesful:

![image](https://user-images.githubusercontent.com/92883939/221441872-6fbe4297-5880-4610-866b-cf8a00b7f6c5.png)
