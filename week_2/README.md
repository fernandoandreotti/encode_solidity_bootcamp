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

The contract was deployed at the following address: `0x5fff9c7cbe4476b1981d54b90afab3d94da6ae05` (visible at: https://etherscan.io/address/0x5fff9c7cbe4476b1981d54b90afab3d94da6ae05)

The following scripts were added to interact with the contract:
- `CastVote.ts` - casts votes, provided rights are given
- `DelegateVote.ts` - delegates voting rights to other user
- `GiveVoteRights.ts` - enables voting rights to user
- `QueryResults.ts` - queries voting results
- `GetProposals.ts` - queries available options for voting on proposal.

The list of transactions can be found below:

| Transaction Number | Txhash                                                             | Blockno | UnixTimestamp | DateTime            | From                                       | To ContractAddress                         | TxnFee(ETH)       | Method             |
|--------------------|--------------------------------------------------------------------|---------|---------------|---------------------|--------------------------------------------|--------------------------------------------|-------------------|--------------------|
|          1         | 0xc17bdc6bd586a46cb4f7a4160f1d3b4f89a353b743722487628da92043b49834 | 8548258 | 1677246840    | 2023-02-24 13:54:00 | 0x344c263ae7575b58bcd313fd6a517c8ca8872b3b | 0x5fff9c7cbe4476b1981d54b90afab3d94da6ae05 | 0.029798703223706 | 0x60806040         |
|          2         | 0x44fa77f0d71d31ae34bd41c49fb3922b057c8552c463be52efd13f4644817a60 | 8548269 | 1677246972    | 2023-02-24 13:56:12 | 0x344c263ae7575b58bcd313fd6a517c8ca8872b3b | 0x5fff9c7cbe4476b1981d54b90afab3d94da6ae05 | 0.001234433654171 | Give Right To Vote |
|          3         | 0xe0deca98438fed9ec2a5f99176e0097d3cb314509dac6b9878141c827bc10a85 | 8548271 | 1677247008    | 2023-02-24 13:56:48 | 0x344c263ae7575b58bcd313fd6a517c8ca8872b3b | 0x5fff9c7cbe4476b1981d54b90afab3d94da6ae05 | 0.001158544805724 | Give Right To Vote |
|          4         | 0x621fc23dec08aa7818d3c4ad48f0a7edd942b91ff6f1cf7adb0b0956017a0535 | 8548271 | 1677247008    | 2023-02-24 13:56:48 | 0x344c263ae7575b58bcd313fd6a517c8ca8872b3b | 0x5fff9c7cbe4476b1981d54b90afab3d94da6ae05 | 0.001158544805724 | Give Right To Vote |
|          5         | 0xaa9c671854bb210bb7cf9eaee79035804db05bea2c78243bb7eecb27017d0a7c | 8548272 | 1677247020    | 2023-02-24 13:57:00 | 0x344c263ae7575b58bcd313fd6a517c8ca8872b3b | 0x5fff9c7cbe4476b1981d54b90afab3d94da6ae05 | 0.001241973801601 | Give Right To Vote |
|          6         | 0x36aa15548b068cd45e3699f4107297eb279638b0b0876741dd5c6e6452eada95 | 8548273 | 1677247032    | 2023-02-24 13:57:12 | 0x344c263ae7575b58bcd313fd6a517c8ca8872b3b | 0x5fff9c7cbe4476b1981d54b90afab3d94da6ae05 | 0.001196217877643 | Give Right To Vote |
|          7         | 0x3393475374a41ddb616a44848d5ff83d79ec8b536310b9bfc6e6708835f5e35b | 8548371 | 1677248352    | 2023-02-24 14:19:12 | 0x344c263ae7575b58bcd313fd6a517c8ca8872b3b | 0x5fff9c7cbe4476b1981d54b90afab3d94da6ae05 | 0.000918333676423 | Give Right To Vote |
|          8         | 0x71ad86e290464ee7646d0104092ddd9aa4d7180464bd18db89d67d5b51de8ba6 | 8553998 | 1677328080    | 2023-02-25 12:28:00 | 0x7d519b2d27512dbb130ec4c9b997ef07a6ad9266 | 0x5fff9c7cbe4476b1981d54b90afab3d94da6ae05 | 0.003510103469394 | Vote               |
|          9         | 0x5522b84905729a064b13b1213f50292a26c6abc9b5466b9a5428ffefbfb3df68 | 8554015 | 1677328296    | 2023-02-25 12:31:36 | 0x8e58a9ad55e4e9e5c387537097a6ff41504e4398 | 0x5fff9c7cbe4476b1981d54b90afab3d94da6ae05 | 0.0025632106952   | Vote               |
|         10         | 0xc2011bd61b8158739bf3393a274c29292312d298672ab540f895c7b3a488dd28 | 8554763 | 1677339012    | 2023-02-25 15:30:12 | 0x344c263ae7575b58bcd313fd6a517c8ca8872b3b | 0x5fff9c7cbe4476b1981d54b90afab3d94da6ae05 | 0.001481007224113 | Delegate           |
|         11         | 0x3b6cce21ece245dea0a11972ce42beebbddd84e571690ae325813785e0b0162d | 8555559 | 1677350472    | 2023-02-25 18:41:12 | 0x5e635441cab460c3b126f7233419f143f87e404d | 0x5fff9c7cbe4476b1981d54b90afab3d94da6ae05 | 0.000329521332831 | Vote               |
|         12         | 0x45d50e4e57e6cf82cb0bebb76a2385606216075d1331393c88ef49e4c8e507e2 | 8556255 | 1677360276    | 2023-02-25 21:24:36 | 0xaf168c4c755771e46d24c7785909ba70c1e85218 | 0x5fff9c7cbe4476b1981d54b90afab3d94da6ae05 | 0.00026668567848  | Vote               |
|         13         | 0x407b2fa5c90866fc891ea24442a1a981ce3e71d53b658fbac22fe59e3954a4eb | 8565746 | 1677496080    | 2023-02-27 11:08:00 | 0x8706c28c73e5276195db191376ee006cbd48b9d0 | 0x5fff9c7cbe4476b1981d54b90afab3d94da6ae05 | 0.001511566844412 | Vote               |
|         14         | 0x0a10cdbd3ebad7a6693104e317e579cff3061f8792befb8b0f01cbf0e878d878 | 8565758 | 1677496248    | 2023-02-27 11:10:48 | 0x8706c28c73e5276195db191376ee006cbd48b9d0 | 0x5fff9c7cbe4476b1981d54b90afab3d94da6ae05 | 0.00155282346706  | Delegate           |
|         15         | 0x29f82baadf75a88d76fb16bf40d1fcc78890dd139d7fe8dd84d7719318239166 | 8565777 | 1677496524    | 2023-02-27 11:15:24 | 0x8706c28c73e5276195db191376ee006cbd48b9d0 | 0x5fff9c7cbe4476b1981d54b90afab3d94da6ae05 | 0.001671910430457 | Give Right To Vote |
|         16         | 0x94fa6f03593be30ed6931f9e5b339864e644d08fbef4f10189db71fd2a02a647 | 8566214 | 1677502752    | 2023-02-27 12:59:12 | 0x52d51348509c059a177a8441fb0001ae7ef73466 | 0x5fff9c7cbe4476b1981d54b90afab3d94da6ae05 | 0.004725781058002 | Vote               |
|         17         | 0x70460be7cbcf7312750cd29e29dd90581c447c4d61e58333bc62589163298b75 | 8566220 | 1677502836    | 2023-02-27 13:00:36 | 0x52d51348509c059a177a8441fb0001ae7ef73466 | 0x5fff9c7cbe4476b1981d54b90afab3d94da6ae05 | 0.001405446258315 | Delegate           |

As we can see on the list of transactions, we first deployed the contract, then gave rights to vote to the different members of the group. The members of the group voted, and then the chairperson delegated its vote to a member of the group (transaction number 10).

Conditions have been added in the code; For instance, one cannot vote twice. An example of trying to vote multiple times can be found below and is not succesful:

![image](https://user-images.githubusercontent.com/92883939/221441821-98008a05-ed22-479f-9f60-9977c3b0e23a.png)

An other case is when we want to delegate our vote while not being the chairperson; This is also not succesful:

![image](https://user-images.githubusercontent.com/92883939/221441872-6fbe4297-5880-4610-866b-cf8a00b7f6c5.png)

When we query results, we get the following:

<img width="635" alt="Screenshot 2023-02-27 at 14 31 42" src="https://user-images.githubusercontent.com/69082711/221585745-c523fe84-e273-41de-acc3-530960cf7faa.png">

Accounts:

    Fernando Andreotti - 0x7d519b2d27512dbb130ec4c9b997ef07a6ad9266
    Marvin Roy - 0x5E635441cAb460C3b126f7233419f143f87e404d
    Ramiro Lopez Cento - 0x8E58a9aD55e4e9e5C387537097a6fF41504e4398
    Loic B - 0xAf168C4c755771e46d24C7785909BA70C1e85218
    Leon Ducasse - 0x52d51348509c059A177a8441fb0001AE7Ef73466
    Yannick Jen.- 0x344C263Ae7575b58BCD313Fd6a517c8ca8872B3B
