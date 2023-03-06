Week 3 Project - Develop and run scripts for “TokenizedBallot.sol”
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

The token contract was deployed at the following address: `0x63840a264045f5F87eC18dB64353990D67b225c7` 
(https://goerli.etherscan.io/address/0x63840a264045f5F87eC18dB64353990D67b225c7)
The ballot contract was deployed at the following address: `0x103cdc03325c0F6C53CC2C1030816a89e3aF079F` (https://goerli.etherscan.io/address/0x103cdc03325c0f6c53cc2c1030816a89e3af079f)


# Delegate Vote Power
``

# Cast Vote
`yarn run ts-node --files ./scripts/castVote.ts [Ballot Contract Address] [Proposal Number] [Voting Power] `

# Check Vote power
``

# Query results
``

Token Contract [0x63840a264045f5F87eC18dB64353990D67b225c7] 
-------------------
| Transaction Number | Txhash                                                             | Blocknb | DateTime                     | From                                             | To ContractAddress                         |  Method             | Info                 |
|--------------------|--------------------------------------------------------------------|---------|------------------------------|--------------------------------------------------|--------------------------------------------|---------------------|----------------------|
|          1         | 0x1997ace8b522651e96561c632819fc3d4dce7d2203f4ddce1b18dad25cbc7702 | 8603205 | Mar-05-2023 07:56:24 PM +UTC | 0x8706c28c73e5276195db191376ee006cbd48b9d0 (leon)| 0x63840a264045f5f87ec18db64353990d67b225c7 |  Delegate           | Delegated to myself  |
|          2         | 0xbdb2500f904d778e328a38c1050564b12231510125654470b0cf4c300f8f93e6 | 8603224 | Mar-05-2023 08:01:36 PM +UTC | 0x8706c28c73e5276195db191376ee006cbd48b9d0 (leon)| 0x63840a264045f5f87ec18db64353990d67b225c7 |  Delegate           | Delegated to Yannick |



Ballot Contract [0x103cdc03325c0F6C53CC2C1030816a89e3aF079F] 
-------------------
| Transaction Number | Txhash                                                             | Blocknb | DateTime                     | From                                             | To ContractAddress                         |  Method             | Info                 |
|--------------------|--------------------------------------------------------------------|---------|------------------------------|--------------------------------------------------|--------------------------------------------|---------------------|----------------------|
|          1         | 0x5ba986dc2e636b30f71a55210f2defec429e72877bd3217b75e2ac68c033d333 | 8603148 | Mar-05-2023 07:41:24 PM +UTC | 0x344c263ae7575b58bcd313fd6a517c8ca8872b3b (Yannick)| 0x103cdc03325c0F6C53CC2C1030816a89e3aF079F |  Contract Creation |  |
|          2         | 0x2370f55efdfcf18853c2bffed2d8f0707a64d8ab9e1e07fca7a4634c407f010c | 8604165 | Mar-05-2023 11:55:12 PM +UTC | 0xc17eb79c3625a0c45381ee8dfe6dd2be3b049f10 (Marvin)| 0x103cdc03325c0F6C53CC2C1030816a89e3aF079F |  Vote | Failed - Block not yet mined |
|          3         | 0x880e327d3e16ed061440e9d5a5097b2f7784a259839b5520d772078ad05a6bcb | 8604180 | Mar-05-2023 11:59:00 PM +UTC | 0xc17eb79c3625a0c45381ee8dfe6dd2be3b049f10 (Marvin)| 0x103cdc03325c0F6C53CC2C1030816a89e3aF079F |  Vote | Failed - Block not yet mined |
|          4         | 0x3ffad40c7cb583910aa420939820746e11cc8ea4ec20e5c559e6cc07e7b095df | 8604200 | Mar-06-2023 12:04:48 AM +UTC | 0xc17eb79c3625a0c45381ee8dfe6dd2be3b049f10 (Marvin)| 0x103cdc03325c0F6C53CC2C1030816a89e3aF079F |  Vote | Failed - Block not yet mined |
|          5         | 0x5b3c4a750952945cf7dd93f25a8bb585c9258b1bbfd99313fb710d86e1cb41e3 | 8604245 | Mar-06-2023 12:17:36 AM +UTC | 0xc17eb79c3625a0c45381ee8dfe6dd2be3b049f10 (Marvin)| 0x103cdc03325c0F6C53CC2C1030816a89e3aF079F |  Vote | Failed - Block not yet mined |
|          6         | 0x95ad7bb6d1b040dad29161430c67e653fa9fd4ddf0691b9c9b1ab938f1665c55 | 8604250 | Mar-06-2023 12:18:36 AM +UTC | 0xc17eb79c3625a0c45381ee8dfe6dd2be3b049f10 (Marvin)| 0x103cdc03325c0F6C53CC2C1030816a89e3aF079F |  Vote | Failed - Block not yet mined |
