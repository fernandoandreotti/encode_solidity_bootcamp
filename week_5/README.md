Week 5 - Project  Team 10
=============

This project uses:

- [Next.js](https://nextjs.org/) as frontend framework
- [RainbowKit](https://www.rainbowkit.com/) for connecting to MetaMask wallet.



Deploy contracts from ``hardhat/` folder:
  - `yarn hardhat compile`
  - `yarn run ts-node --files scripts/Lottery.ts`


To run the frontend:
  - Update `contractAddress` and `tokenAddress` under `src/pages/index.tsx`
  - `yarn install` within `client/` folder
  - `yarn dev` to initiate frontent.


