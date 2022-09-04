import { network } from 'hardhat';

export const moveTime = async (amount: number) => {
  console.log(`==> Moving time forward by ${amount} seconds`);
  await network.provider.send('evm_increaseTime', [amount]);
  console.log('==> Time moved!');
};
