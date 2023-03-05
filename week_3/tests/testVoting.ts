import { expect } from "chai";
import { ethers } from "hardhat";
import { TokenizedBallot, MyToken__factory } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

describe("TokenizedBallot", function () {
  let ballotContract: TokenizedBallot;
  let deployer: SignerWithAddress
  let voter: SignerWithAddress
  let voter2: SignerWithAddress
  let voter3: SignerWithAddress
  let attacker: SignerWithAddress

  beforeEach(async function () {
    // Deploy the Token contract
    const tokenFactory = await ethers.getContractFactory("MyToken");
    const contract = await tokenFactory.deploy();
    const deployedTokenTransactionReceipt = await contract.deployTransaction.wait();
    console.log(`Deployed contract at address ${deployedTokenTransactionReceipt.contractAddress} and block ${deployedTokenTransactionReceipt.blockNumber}`)

    // Deploy Ballot contract
    const ballotFactory = await ethers.getContractFactory("TokenizedBallot");
    ballotContract = await ballotFactory.deploy(
      convertStringArrayToBytes32(PROPOSALS),
      deployedTokenTransactionReceipt.contractAddress,
      deployedTokenTransactionReceipt.blockNumber
    );
    await ballotContract.deployed();
    const [deployer, voter, voter2, voter3, attacker ] = await ethers.getSigners();
  });

  describe("Once the contracts are deployed", function () {
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
    // Checks voting powers.
    it("checks everyone's initial voting powers", async function () {
      // TODO
    });
  });

  // describe("when the voter interact with the vote function in the contract", function () {
  //   it("should register the vote", async () => {
  //     await ballotContract.giveRightToVote(voter.address);
  //     await ballotContract.connect(voter).vote(1);
  //     const voterInfo = await ballotContract.voters(voter.address)
  //     expect(voterInfo.vote).to.eq(1)
  //   });
  // });

  // describe("when the voter interact with the delegate function in the contract", function () {
  //   it("should transfer voting power", async () => {
  //     await ballotContract.giveRightToVote(voter.address);
  //     await ballotContract.connect(voter).delegate(deployer.address);
  //     const deployerInfo = await ballotContract.voters(deployer.address);
  //     expect(deployerInfo.weight).to.eq(2)
  //   });
  // });

  // describe("when the an attacker interact with the giveRightToVote function in the contract", function () {
  //   it("should revert", async () => {
  //     await expect(ballotContract.connect(attacker).giveRightToVote(voter.address)).to.be.reverted
  //   });
  // });

  // describe("when the an attacker interact with the vote function in the contract", function () {
  //   it("should revert", async () => {
  //     await expect(ballotContract.connect(attacker).vote(1)).to.be.reverted
  //   });
  // });

  // describe("when the an attacker interact with the delegate function in the contract", function () {
  //   it("should revert", async () => {
  //     await expect(ballotContract.connect(attacker).delegate(voter.address)).to.be.reverted
  //   });
  // });

  // describe("when someone interact with the winningProposal function before any votes are cast", function () {
  //   it("should return 0", async () => {
  //     expect(await ballotContract.winningProposal()).to.eq(0)
  //   });
  // });

  // describe("when someone interact with the winningProposal function after one vote is cast for the first proposal", function () {
  //   it("should return 0", async () => {
  //     await ballotContract.vote(0);
  //     expect(await ballotContract.connect(voter).winningProposal()).to.eq(0)
  //   });
  // });

  // describe("when someone interact with the winnerName function before any votes are cast", function () {
  //   it("should return name of proposal 0", async () => {
  //     const firstProposal = await ballotContract.proposals(0)
  //     expect(await ballotContract.connect(voter).winnerName()).to.eq(firstProposal.name)
  //   });
  // });

  // describe("when someone interact with the winnerName function after one vote is cast for the first proposal", function () {
  //   it("should return name of proposal 0", async () => {
  //     await ballotContract.vote(0)
  //     const firstProposal = await ballotContract.proposals(0)
  //     expect(await ballotContract.winnerName()).to.eq(firstProposal.name)
  //   });
  // });

  // describe("when someone interact with the winningProposal function and winnerName after 5 random votes are cast for the proposals", function () {
  //   it("should return the name of the winner proposal", async () => {
  //     const voters = [ deployer, voter, voter2, voter3, attacker ];
  //     for (let i = 1; i < voters.length; i++) { 
  //       const tx = await ballotContract.giveRightToVote(voters[i].address)
  //       await tx.wait()
  //     }
  //     for (const voter of voters) { 
  //       const tx = await ballotContract.connect(voter).vote(Math.floor(Math.random()*(PROPOSALS.length)))
  //       await tx.wait()
  //     }
  //     const winnerName = await ballotContract.winnerName();
  //     console.log(`From winnerName: ${ethers.utils.parseBytes32String(winnerName)}`)
  //     const winningProposal = await ballotContract.proposals(await ballotContract.winningProposal());
  //     console.log(`From winningProposal: ${ethers.utils.parseBytes32String(winningProposal.name)}`)
  //     expect(winnerName).to.eq(winningProposal.name)
  //   });
  // });
});
