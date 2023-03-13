import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CastVoteDTO } from './dtos/castVoteDTO';
import { RequestTokensDTO } from './dtos/RequestTokensDTO';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get("contract-address")
  getContractAddress(): { address: string } {
    return { address: this.appService.getContractAddress() };
  }

  @Get("ballot-contract-address")
  getcontractBallotAddress(): {address: string}{
    return { address: this.appService.getContractBallotAddress() };
  }

  @Get("total-supply")
  async getTotalSupply(): Promise<number> {
    return await this.appService.getTotalSupply();
  }

  @Get("allowance")
  async getAllowance(
    @Query('from') from: string,
    @Query('to') to: string
  ): Promise<number> {
    return await this.appService.getAllowance(from, to);
  }

  @Get("transaction-status")
  async getTransactionStatus(
    @Query('hash') hash: string
  ): Promise<string> {
    return await this.appService.getTransactionStatus(hash);
  }

  @Get("winning-proposal")
  async getWinningProposal(): Promise<string> {
    return await this.appService.getWinningProposal();
  }

  @Post("/request-tokens")
  requestTokens(@Body() body: RequestTokensDTO): void {
    this.appService.requestTokens(body.address, body.amount);
  }

  @Get("votes")
  getVotes(): string[] {
    return this.appService.getVotes();
  }


  @Post("/cast-vote")
  castVote(@Body() body: CastVoteDTO): Promise<string>{
    return this.appService.castVote(body.proposal,body.votes);
  }
}
