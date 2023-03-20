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

Here is a screenshot of the frontend:

![Screenshot from 2023-03-20 19-00-09](https://user-images.githubusercontent.com/7779437/226427448-6df8fed8-7ed1-4c76-bb38-914a1bb7ce5e.png)
