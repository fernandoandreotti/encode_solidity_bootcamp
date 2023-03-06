import { expect } from "chai";
import { ethers } from "hardhat";
import { MyToken, Ballot } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "ethers";

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

describe("TokenizedBallot", function () {
  let ballotContract: Ballot;
  let tokenContract: MyToken;
  let blockNumber: uint256
  let deployer: SignerWithAddress
  let voter1: SignerWithAddress
  let voter2: SignerWithAddress
  let voter3: SignerWithAddress
  let attacker: SignerWithAddress
  let MINT_VALUE: BigNumber
  let tokenBalanceVoter1Before: BigNumber
  let tokenBalanceVoter1After: BigNumber
  let votePowerBefore: BigNumber
  let votePowerAfter: BigNumber
  
  beforeEach(async function () {
    // Deploy the Token contract
    const tokenFactory = await ethers.getContractFactory("MyToken");
    tokenContract = await tokenFactory.deploy();
    const deployedTokenTransactionReceipt = await tokenContract.deployTransaction.wait();
    blockNumber = deployedTokenTransactionReceipt.blockNumber

    // Deploy Ballot contract
    const ballotFactory = await ethers.getContractFactory("Ballot");
    ballotContract = await ballotFactory.deploy(
      convertStringArrayToBytes32(PROPOSALS),
      deployedTokenTransactionReceipt.contractAddress,
      deployedTokenTransactionReceipt.blockNumber + 3
    );
    await ballotContract.deployed();
    [deployer, voter1, voter2, voter3, attacker ] = await ethers.getSigners();

    // Minting tokens for voter1
    MINT_VALUE = ethers.utils.parseEther("10");
    tokenBalanceVoter1Before = await tokenContract.balanceOf(voter1.address);
    const mintTx = await tokenContract.mint(voter1.address, MINT_VALUE);
    await mintTx.wait();
    tokenBalanceVoter1After = await tokenContract.balanceOf(voter1.address);
    votePowerBefore = await tokenContract.getVotes(voter1.address)
    const delegateTx = await tokenContract.connect(voter1).delegate(voter1.address);
    await delegateTx.wait();
    votePowerAfter = await tokenContract.getVotes(voter1.address)

  });

  describe("Once both contracts are deployed", function () {
    it("has the provided proposals", async function () {
      for (let index = 0; index < PROPOSALS.length; index++) {
        const proposal = await ballotContract.proposals(index);
        expect(ethers.utils.parseBytes32String(proposal.name)).to.eq(
          PROPOSALS[index]
        );
      }
    });

    it("has zero votes for all proposals", async function () {
      for (let i = 0; i < PROPOSALS.length; i++) {
        const proposal = await ballotContract.proposals(i)
        expect(await proposal.voteCount).to.eq(0)
      }
    });

    it("checks everyone's initial voting powers", async function () {
      let arr_address = [deployer, voter1, voter2, voter3, attacker ];
      for (var addr of arr_address) {
        const votePowerAcc = await tokenContract.getPastVotes(addr.address, blockNumber );
        expect(votePowerAcc).to.eq(0)
      }
    });
  });

  describe("checking balances before/after minting tokens", function () {   
    it("check voter1 initial balance", function () {
        expect(tokenBalanceVoter1Before).to.eq(0)
      });

    it("check balance for voter1 after minting", function () {
      expect(tokenBalanceVoter1After).to.eq(MINT_VALUE)
    });
  
  });

  describe("checking voting power before/after self-delegating", function () {   
    it("voting power for voter1 BEFORE self-delegating", function () {
      expect(votePowerBefore).to.eq(0)
    });

    it("voting power for voter1 AFTER self-delegating", function () {
      expect(votePowerAfter).to.eq(MINT_VALUE)
    });


  });

  describe("attempting to vote", function () {   
    it("voting with powers and amount should work", async function () {
      const PROPOSAL_VOTE = 1
      await ballotContract.connect(voter1).vote(PROPOSAL_VOTE, votePowerAfter);
    });

    it("voting with more powers than current have should revert", async function () {
      expect(ballotContract.connect(voter1).vote(0, votePowerAfter.mul(2))).to.be.reverted;
    });

    it("voting without power should revert", async function () {
      expect(ballotContract.connect(attacker).vote(0, votePowerAfter)).to.be.reverted;
    })

  });

  describe("testing delegation", function () {   
    it("delegation should work", async function () {
      await tokenContract.connect(voter1).delegate(voter2.address);
      const votePowerAfterDelegate = await tokenContract.getVotes(voter2.address)
      expect(votePowerAfterDelegate).to.eq(votePowerAfter)
    });

    it("delegation should not work if not power is available", async function () {
      await tokenContract.connect(attacker).delegate(voter2.address);
      expect(tokenContract.getVotes(voter2.address)).to.be.reverted;
    });

  });

  describe("interacting with winningProposal", function () {   
    it("when someone interact with the winningProposal function before any votes are cast", async function () {
      expect(await ballotContract.winningProposal()).to.eq(0)
    });

    it("when someone interact with the winningProposal function after one vote is cast for the first proposal", async function () {
      await ballotContract.connect(voter1).vote(0, votePowerAfter);
      expect(await ballotContract.connect(voter1).winningProposal()).to.eq(0)
    });

  });

  describe("interact with the winnerName function", function () {
     it("when someone interacts before any votes are cast, should return name of proposal 0", async () => {
       const firstProposal = await ballotContract.proposals(0)
       expect(await ballotContract.connect(voter1).winnerName()).to.eq(firstProposal.name)
     });


     it("after vote for 0, should return name of proposal 0", async () => {
      await ballotContract.connect(voter1).vote(0, votePowerAfter);
       const firstProposal = await ballotContract.proposals(0)
       expect(await ballotContract.winnerName()).to.eq(firstProposal.name)
    });

    it("after 5 random votes by voter 1, should return the name of the winner proposal", async () => {
        for (let i = 0; i < 5; i++) { 
          const tx = await ballotContract.connect(voter1).vote(Math.floor(Math.random()*(PROPOSALS.length)), votePowerAfter.div(5))
          await tx.wait()
        }
        const winnerName = await ballotContract.winnerName();
        console.log(`From winnerName: ${ethers.utils.parseBytes32String(winnerName)}`)
        const winningProposal = await ballotContract.proposals(await ballotContract.winningProposal());
        console.log(`From winningProposal: ${ethers.utils.parseBytes32String(winningProposal.name)}`)
        expect(winnerName).to.eq(winningProposal.name)
    });
  });

});

