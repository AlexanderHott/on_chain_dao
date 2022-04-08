import {
  DEVELOPMENT_CHAINS,
  PROPOSALS_FILE,
  VOTING_DELAY,
} from '../helper-hardhat-config';
import * as fs from 'fs';
import { ethers, network } from 'hardhat';
import { moveBlocks } from '../utils/move-blocks';

export const main = async (proposalIdx: number = 0) => {
  const proposals = JSON.parse(fs.readFileSync(PROPOSALS_FILE, 'utf8'));
  const proposalId = proposals[network.config.chainId!][proposalIdx];
  const governor = await ethers.getContract('GovernorContract');

  // 0 = against, 1 = for, 2 = abstain
  const voteWay = 1;
  const voteTx = await governor.castVoteWithReason(
    proposalId,
    voteWay,
    '77 is POG'
  );
  await voteTx.wait(1);

  if (DEVELOPMENT_CHAINS.includes(network.name)) {
    await moveBlocks(VOTING_DELAY + 1);
  }
  console.log('==> Vote casted!');
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
