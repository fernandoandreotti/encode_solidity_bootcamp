import { Button, TextField, Card, CardContent, Typography, Grid, Box } from "@mui/material"
import { useState, useEffect } from "react";
import { ethers, Contract  } from "ethers";
import * as lotteryJson from './utils/Lottery.json';
import * as tokenJson from './utils/LotteryToken.json';

export default function Home() {

  const [signerAddress, setSignerAddress] = useState<string>('');
  const [timestamp, setTimestamp] = useState<number>(0)
  const [tokenAmountToBuy, setTokenAmountToBuy] = useState<string>('');
  const [tokenAmountToReturn, setTokenAmountToReturn] = useState<string>('');
  const [closingTime, setClosingTime] = useState<string>('');
  const [numberOfBets, setNumberOfBets] = useState<string>('');

  const [contract, setContract] = useState<Contract>();
  const [token, setToken] = useState<Contract>();


  let provider: ethers.providers.Web3Provider;

  useEffect(() => {
    const initContract = async () => {
      const { ethereum } = window;
      if (ethereum) {
      try {
        const contractAddress = "0xcb8eef8365da5bd89373bdf27e64269d7f01df89";
        const contractABI = lotteryJson.abi;
        const tokenAddress = "0xC649c3e09C16Fb4267e7B012083c53f3BaB4672d";
        const tokenABI = tokenJson.abi;
        provider = new ethers.providers.Web3Provider(ethereum);
        setTimestamp((await provider.getBlock('latest')).timestamp);
        const signer = provider.getSigner();
        setSignerAddress(await signer.getAddress())
        setContract(new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        ));
        setToken(new ethers.Contract(
          tokenAddress,
          tokenABI,
          signer
        ))
      } catch (error) {
        console.log(error)
      }
      } else {
        console.log("Install Metamask!")
      }
    }
    initContract();
  }, []);


  const handleTokenAmountToBuy = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTokenAmountToBuy(event.target.value)
  }

  const handleTokenAmountToReturn = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTokenAmountToReturn(event.target.value)
  }

  const purchaseHandler = async () => {
    try {
      const purchaseRatio = await contract?.purchaseRatio();
      const ethToSend = ethers.utils.parseEther(tokenAmountToBuy).div(purchaseRatio); 
      const purchaseTokenTx = await contract?.purchaseTokens({value: ethToSend});
      const purchaseTokenTxReceipt = await purchaseTokenTx.wait();
      console.log(purchaseTokenTxReceipt);
      setTokenAmountToBuy('')
    } catch (error) {
      console.log(error);
    }
  };

  const redeemHandler = async () => {
    try {
      const approveToken = await token?.approve(contract?.address, ethers.constants.MaxUint256);
      const approveTokenReceipt = await approveToken.wait(); 
      const returnTokenTx = await contract?.returnTokens(ethers.utils.parseEther(tokenAmountToReturn));
      const returnTokenTxReceipt = await returnTokenTx.wait();
      console.log(returnTokenTxReceipt);
      setTokenAmountToReturn('')      
    } catch (error) {
      console.log(error);
    }
  };

  const handleClosingTime = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setClosingTime(event.target.value)
  }

  const openBetHandler = async () => {
    try {
      const openBetTx = await contract?.openBets(timestamp + Number(closingTime));
      await openBetTx.wait();
    } catch (error) {
      console.log(error);
    } 
  };

  const closeLotteryHandler = async () => {
    try {
      const closeLotteryTx = await contract?.closeLottery()
      await closeLotteryTx.wait();
    } catch (error) {
      console.log(error)
    }
  }

  const ownerWithdrawHandler = async () => {
    try {
      const ownerPoolAmount = await contract?.ownerPool();
      const ownerWithdraw = await contract?.ownerWithdraw(ownerPoolAmount);
      await ownerWithdraw.wait();

    } catch (error) {
      console.log(error)
    }
  }

  const betHandler = async () => {
    try {
      const betTx = await contract?.bet()
      await betTx.wait();
    } catch (error) {
      console.log(error)
    } 
  }

  const handleNumberOfBets = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfBets(event.target.value)
  }

  const manyBetsHandler = async () => {
    try {
      const manyBetsTx = await contract?.betMany(numberOfBets);
      await manyBetsTx.wait();
    } catch (error) {
      console.log(error)
    } 
  }

  const withdrawHandler = async () => {
    try {
      const amountPrize = await contract?.prize(signerAddress)
      console.log(amountPrize)
      const withdrawTx = await contract?.prizeWithdraw(amountPrize);
      await withdrawTx.wait();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Grid item xs={12} container spacing={4} justifyContent="center" marginBottom={8}>
        <Card>
          <Typography variant="h5" align="center">
              Purchase and redeem Lottery Tokens
          </Typography>
          <br />
          <CardContent>
            <TextField sx={{mx: 2, mb:2}} id="outlined-basic" label="Amount of tokens" variant="outlined" size="small" value={tokenAmountToBuy} onChange={handleTokenAmountToBuy}/>
            <Button variant="outlined" onClick={purchaseHandler} size="large">Purchase Tokens</Button>
            <br />
            <TextField sx={{mx: 2, mb:2}} id="outlined-basic" label="Amount of tokens" variant="outlined" size="small" value={tokenAmountToReturn} onChange={handleTokenAmountToReturn}/>
            <Button variant="outlined" onClick={redeemHandler} size="large">Redeem Tokens</Button>
          </CardContent>
        </Card>
      </Grid>
      <br />
      <Grid item xs={12} container spacing={4} justifyContent="center" marginBottom={8}>
        <Card>
          <Typography variant="h5" align="center">
              Bet Management
          </Typography>
          <br />
          <CardContent>
            <TextField sx={{mx: 2, mb:2}} id="outlined-basic" label="Duration of the bet" variant="outlined" size="small" value={closingTime} onChange={handleClosingTime}/>
            <Button variant="outlined" onClick={openBetHandler} size="large">Open bet</Button>
            <br />
            <Box display="flex" justifyContent="flex-end">
              <Button variant="outlined" onClick={closeLotteryHandler} size="large">Close Lottery</Button>
            </Box>
            <br />
            <Box display="flex" justifyContent="flex-end">
              <Button variant="outlined" onClick={ownerWithdrawHandler} size="large">Withdraw bet fees</Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <br />
      <Grid item xs={12} container spacing={4} justifyContent="center" marginBottom={8}>
        <Card>
          <Typography variant="h5" align="center">
              Play 
          </Typography>
          <br />
          <CardContent>
            <Box display="flex" justifyContent="center" >
              <Button sx={{mx: 2}} variant="outlined" onClick={betHandler} size="large">Bet</Button>
              <Button variant="outlined" onClick={withdrawHandler} size="large">Withdraw Prize</Button>
            </Box>
            <br />
            <TextField sx={{mx: 2, mb:2}} id="outlined-basic" label="Number of bets" variant="outlined" size="small" value={numberOfBets} onChange={handleNumberOfBets}/>
            <Button variant="outlined" onClick={manyBetsHandler} size="large">Many bets</Button>
            <br />
          </CardContent>
        </Card>
      </Grid>
      
    </>
  )
}
