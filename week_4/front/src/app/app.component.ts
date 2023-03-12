/*
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { BigNumber, ethers, Wallet } from "ethers";
import tokenJson from "../assets/MyToken.json";

const API_URL = "http://localhost:3000";
const API_URL_MIN = "http://localhost:3000/request-tokens";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})

export class AppComponent {
  blockNumber: number | string | undefined;
  provider: ethers.providers.Provider;

  userEthBalance: number | undefined;
  userWallet: Wallet | undefined;
  userTokenBalance: number | undefined;

  tokenContractAddress: string | undefined;
  tokenContract: ethers.Contract | undefined;

  totalSupply: number | string | undefined;

  constructor(private http: HttpClient) {
    this.provider = ethers.getDefaultProvider("goerli");
  }

  syncBlock() {
    this.blockNumber = "Loading...";
    this.totalSupply = "Loading...";
    this.provider.getBlock("latest").then((block) => {
      this.blockNumber = block.number;
    });
    this.getTokenAddress().subscribe((response) => {
      this.tokenContractAddress = response.address;
      this.updateTokenInfo();
    });
  }

  updateTokenInfo() {
    if (!this.tokenContractAddress) return;
    this.tokenContract = new ethers.Contract(
      this.tokenContractAddress,
      tokenJson.abi,
      this.userWallet ?? this.provider
    );

    this.tokenContract["totalSupply"]().then((totalSupplyBN: BigNumber) => {
      const totalSupplyString = ethers.utils.formatEther(totalSupplyBN);
      this.totalSupply = parseFloat(totalSupplyString);
    });
  }

  clearBlock() {
    this.blockNumber = 0;
  }

  createWallet() {
    this.userWallet = Wallet.createRandom().connect(this.provider);
    this.userWallet.getBalance().then((balanceBN) => {
      const balanceString = ethers.utils.formatEther(balanceBN);
      this.userEthBalance = parseFloat(balanceString);
    });
  }

  getTokenAddress() {
    return this.http.get<{ address: string }>(`${API_URL}/contract-address`);
  }

  requestTokens(amount: number) {
    const body = { address: this.userWallet?.address, amount: amount };
    this.http
      .post<{ result: string }>(API_URL_MIN, body)
      .subscribe((response) => {
        console.log(
          "Requested " +
            amount +
            " tokens for address " +
            this.userWallet?.address
        );
        console.log("Tx hash: " + response);
      });
  }
}
*/

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BigNumber, Contract, ethers, utils, Wallet } from 'ethers';
import tokenJson from '../assets/MyToken.json';


const API_URL = "http://localhost:3000/contract-address"
const MINT_URL = "http://localhost:3000/request-tokens"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  blockNumber:number  = 0;
  provider : ethers.providers.BaseProvider;
  userWallet: Wallet | undefined;
  userEthBalance: number | string | undefined;
  userTokenBalance: string | undefined;
  tokenContractAddress: string | undefined;
  tokenContract: Contract|undefined;
  tokenTotalSupply: number | undefined | string;

  constructor(private http: HttpClient){
   
    //this.provider = ethers.getDefaultProvider("goerli");
    this.provider = new ethers.providers.AlchemyProvider("goerli", "E37deHZ162KUnEYdn7nVrp7IANH504OF");
    //setInterval(()=>{this.blockNumber++},100)
   
  }

  getTokenAddress() {
    return this.http.get<{address:string}>(API_URL);
  }


  syncBlock(){
    this.provider.getBlock('latest').then((block)=>{
      this.blockNumber = block.number;
    });
    this.getTokenAddress().subscribe((response)=>{
      this.tokenContractAddress = response.address;
      this.updateTokenInfo();
    })

  }
  updateTokenInfo(){
    if(! this.tokenContractAddress) return;
    this.tokenContract = new Contract(
      this.tokenContractAddress,
      tokenJson.abi,
      this.userWallet ?? this.provider
    );
    this.tokenTotalSupply = "loading..."
    this.tokenContract['totalSupply']().then((totalSupplyBN: BigNumber) =>{
      const totalSupplyStr = utils.formatEther(totalSupplyBN);
      this.tokenTotalSupply = parseFloat(totalSupplyStr)
    });

  }


  clearBlock(){
    this.blockNumber = 0;
  }


  requestTokens(amount:string){
    this.userTokenBalance = "minting..."
    const body = {address:this.userWallet?.address,amount:amount};
    console.log('requested ' + amount + ' tokens for address '+ this.userWallet?.address);
    return this.http.post<{result:string}>(MINT_URL,body).subscribe((result) =>{
      console.log('tx hash ' + result.result);
      this.updateTokenBalance();
    })
    //console.log('TODO request tokens from backend passing address')
  }

  async updateTokenBalance(){
    if(! this.tokenContractAddress) return;
    this.tokenContract = new Contract(
      this.tokenContractAddress,
      tokenJson.abi,
      this.userWallet ?? this.provider
    );
    
   this.tokenContract['balanceOf'](this.userWallet?.address).then((balance:any) =>{
    console.log('token balance is '+ balance)
    this.userTokenBalance = balance;
    });
  }

  createWallet(){
    this.userWallet = Wallet.createRandom().connect(this.provider);
    this.userWallet.getBalance().then((balanceBN) =>{
      const balanceStr = utils.formatEther(balanceBN);
      this.userEthBalance = parseFloat(balanceStr)
    });
  }
}