import { moveBlocks } from './../utils/move-blocks';
import {
  NEW_STORE_AMOUNT,
  FUNC,
  PROPOSAL_STRING,
  DEVELOPMENT_CHAINS,
  VOTING_DELAY,
  PROPOSALS_FILE,
} from './../helper-hardhat-config';
import { ethers, network } from 'hardhat';
import * as fs from 'fs';

export const propose = async (
  args: any[],
  functionToCall: string,
  description: string
) => {
  const governor = await ethers.getContract('GovernorContract');
  const box = await ethers.getContract('Box');
  const encFuncCall = box.interface.encodeFunctionData(functionToCall, args);
  console.log(`==> Proposing ${NEW_STORE_AMOUNT} tokens to ${FUNC}`);
  console.log(`==> Proposal description: \n${description}\n`);

  const proposeTx = await governor.propose(
    [box.address],
    [0],
    [encFuncCall],
    description
  );
  if (DEVELOPMENT_CHAINS.includes(network.name)) {
    await moveBlocks(VOTING_DELAY + 1);
  }
  const proposeReceipt = await proposeTx.wait(1);
  const proposalId = proposeReceipt.events[0].args.proposalId;

  if (DEVELOPMENT_CHAINS.includes(network.name)) {
    await moveBlocks(VOTING_DELAY + 1);
  }
  let proposals = JSON.parse(fs.readFileSync(PROPOSALS_FILE, 'utf8'));
  proposals[network.config.chainId!.toString()].push(proposalId.toString());
  fs.writeFileSync(PROPOSALS_FILE, JSON.stringify(proposals));
};

propose([NEW_STORE_AMOUNT], FUNC, PROPOSAL_STRING)
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
