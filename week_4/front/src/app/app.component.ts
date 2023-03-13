import { HttpClient, HttpHeaders  } from "@angular/common/http";
import { Component } from "@angular/core";
import { BigNumber, Contract, ethers, Wallet } from "ethers";
import tokenJson from "../assets/MyToken.json";
import ballotJson from "../assets/Ballot.json"

const API_URL = "http://localhost:3000";
const API_URL_MINT = "http://localhost:3000/request-tokens";
const API_URL_CASTVOTE = "http://localhost:3000/cast-vote";

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

  ballotContractAddress: string | undefined;
  ballotContract: ethers.Contract | undefined;

  totalSupply: number | string | undefined;
  winningProposal: string | undefined | Promise<string> | any;

  ballotContractAddress: string | undefined;
  ballotContract: ethers.Contract | undefined;

  winningProposal: string | undefined | Promise<string> | any;

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
    this.getBallotAddress().subscribe((response) => {
      this.ballotContractAddress = response.address;
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

  getBallotAddress() {
    return this.http.get<{ address: string }>(`${API_URL}/ballot-contract-address`);
  }

  requestTokens(amount: string) {
    const body = { address: this.userWallet?.address, amount: amount };
    this.http
      .post<{ result: string }>(API_URL_MINT, body)
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

  castVote(proposal: string, votes: string){
    const body = {proposal : proposal, votes: votes}
    this.http
        .post<{ result: string }> (API_URL_CASTVOTE, body)
        .subscribe((result) => {
          console.log(
            "Proposal :" +
            proposal +
            " Votes: " +
            votes
          );
          console.log('TX hash'+ result.result)
        });
  }

  getWinningProposal(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'text/plain, */*',
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json' 
    };

    this.http.get<Promise<string>>(`${API_URL}/winning-proposal`, httpOptions).subscribe((response) => {
      this.winningProposal = response.toString();
      console.log("response ===> " + this.winningProposal);
    });
  }
}
