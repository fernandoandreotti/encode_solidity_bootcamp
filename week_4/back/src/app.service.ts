import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import * as tokenJson from './assets/MyToken.json';
import * as ballotJson from './assets/Ballot.json'

dotenv.config();

const TOKEN_CONTRACT_ADDRESS = '0x63840a264045f5F87eC18dB64353990D67b225c7';
const CONTRACT_BALLOT = '0x103cdc03325c0F6C53CC2C1030816a89e3aF079F';

@Injectable()
export class AppService {
  provider: ethers.providers.Provider;
  contract: ethers.Contract;
  contractBallot: ethers.Contract;
  votes: string[] = [];

  requestTokens(address: string, amount: number) {
    // TODO: implement
    // Load pkey from .env
    // Create a signer
    // Connect signer to contract
    // Call contract function mint
    // Return transaction hash
    return "TxHash";
  }

  constructor(private configService: ConfigService) {
    this.provider = new ethers.providers.AlchemyProvider("goerli",this.configService.get<string>('ALCHEMY_API_KEY'));
    this.contract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, tokenJson.abi, this.provider);
    this.contractBallot = new ethers.Contract(CONTRACT_BALLOT, ballotJson.abi, this.provider);
  }
  getContractAddress(): string {
    return this.contract.address;
  }

  getContractBallotAddress(): string {
    return this.contractBallot.address;
  }

  async getTotalSupply(): Promise<number> {
    const totalSupply = await this.contract.totalSupply();
    const tolalSupplyString = ethers.utils.formatEther(totalSupply);
    const totalSupplyNumber = parseFloat(tolalSupplyString);
    return totalSupplyNumber;
  }

  async getAllowance(from: string, to: string): Promise<number> {
    const allowance = await this.contract.allowance(from, to);
    const allowanceString = ethers.utils.formatEther(allowance);
    const allowanceNumber = parseFloat(allowanceString);
    return allowanceNumber;
  }

  async getTransactionStatus(hash: string): Promise<string> {
    const transaction = await this.provider.getTransaction(hash);
    const txReceipt = await transaction.wait();
    return txReceipt.status == 1 ? 'Completed' : 'Reverted';
  }

  getVotes(): string[] {
    return this.votes;
  }

  addVote(vote: string): void {
    this.votes.push(vote);
    if (this.votes.length > 10) {
      this.votes.shift();
    }
  }

  async getWinningProposal() : Promise<string> {
    const tx = await this.contractBallot.winnerName();
    return ethers.utils.parseBytes32String(tx);
  }

  async castVote(proposal: number, votes: number): Promise<string> {

    const privateKey = this.configService.get<string>('PRIVATE_KEY');

    if(!privateKey){
      throw new Error('Private key missing');
    }

    const wallet = new ethers.Wallet(privateKey)
    const signer = wallet.connect(this.provider);

    const castVoteTX = await this.contractBallot.connect(signer).vote(proposal,votes);
    const castVoteTXReceipt = await castVoteTX.wait();
    console.log(`You succesfully voted ${votes} units to proposal number: ${proposal}`);

    console.log(castVoteTXReceipt.transactionHash);
    this.addVote(castVoteTXReceipt.transactionHash);

    return castVoteTXReceipt.transactionHash;
  }
}
