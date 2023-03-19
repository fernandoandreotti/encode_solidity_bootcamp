import { Button, TextField } from "@mui/material"
import { useState } from "react";
import { ethers } from "ethers";
import * as lotteryJson from './utils/Lottery.json';
import * as tokenJson from './utils/LotteryToken.json';

export default function Home() {

  const contractAddress = "0xcb8eef8365da5bd89373bdf27e64269d7f01df89";
  const contractABI = lotteryJson.abi;
  const tokenAddress = "0xC649c3e09C16Fb4267e7B012083c53f3BaB4672d";
  const tokenABI = tokenJson.abi;

  const [tokenAmountToBuy, setTokenAmountToBuy] = useState<string>('');
  const [tokenAmountToReturn, setTokenAmountToReturn] = useState<string>('');

  const handleTokenAmountToBuy = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTokenAmountToBuy(event.target.value)
  }

  const handleTokenAmountToReturn = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTokenAmountToReturn(event.target.value)
  }

  const purchaseHandler = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const purchaseRatio = await contract.purchaseRatio();
        const ethToSend = ethers.utils.parseEther(tokenAmountToBuy).div(purchaseRatio); 
        const purchaseTokenTx = await contract.purchaseTokens({value: ethToSend});
        const purchaseTokenTxReceipt = await purchaseTokenTx.wait();
        console.log(purchaseTokenTxReceipt);

      } else {
        console.log("Metamask is not connected");
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  const redeemHandler = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const token = new ethers.Contract(
          tokenAddress,
          tokenABI,
          signer
        )
        const approveToken = await token.approve(contract.address, ethers.constants.MaxUint256);
        const approveTokenReceipt = await approveToken.wait(); 
        const returnTokenTx = await contract.returnTokens(ethers.utils.parseEther(tokenAmountToReturn));
        const returnTokenTxReceipt = await returnTokenTx.wait();
        console.log(returnTokenTxReceipt);
      } else {
        console.log("Metamask is not connected");
      }
      
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <>
      <TextField sx={{mx: 2, mb:2}} id="outlined-basic" label="Amount of tokens" variant="outlined" size="small" value={tokenAmountToBuy} onChange={handleTokenAmountToBuy}/>
      <Button variant="outlined" onClick={purchaseHandler} size="large">Purchase Tokens</Button>
      <br />
      <TextField sx={{mx: 2, mb:2}} id="outlined-basic" label="Amount of tokens" variant="outlined" size="small" value={tokenAmountToReturn} onChange={handleTokenAmountToReturn}/>
      <Button variant="outlined" onClick={redeemHandler} size="large">Redeem Tokens</Button>
    </>
  )
}
