import { moveTime } from './../utils/move-time';
import { ethers, network } from 'hardhat';
import {
  DEVELOPMENT_CHAINS,
  FUNC,
  MIN_DELAY,
  NEW_STORE_AMOUNT,
  PROPOSALS_FILE,
  PROPOSAL_STRING,
  VOTING_DELAY,
} from '../helper-hardhat-config';
import { moveBlocks } from '../utils/move-blocks';
import * as fs from 'fs';

export const queueAndExecute = async () => {
  const box = await ethers.getContract('Box');
  const encFuncCall = box.interface.encodeFunctionData(FUNC, [
    NEW_STORE_AMOUNT,
  ]);
  const descriptionHash = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(PROPOSAL_STRING)
  );

  const governor = await ethers.getContract('GovernorContract');

  console.log(`==> Queueing...`);

  const queueTx = await governor.queue(
    [box.address],
    [0],
    [encFuncCall],
    descriptionHash
  );
  await queueTx.wait(1);

  if (DEVELOPMENT_CHAINS.includes(network.name)) {
    await moveTime(MIN_DELAY + 1);
    await moveBlocks(1);
  }

  console.log(`==> Executing...`);
  const executeTx = governor.execute(
    [box.address],
    [0],
    [encFuncCall],
    descriptionHash
  );
  await executeTx.wait(1);

  const boxNewValue = await box.retrieve();
  console.log(
    `==> Box new value: ${boxNewValue} (which should be ${NEW_STORE_AMOUNT})`
  );
};

queueAndExecute()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
