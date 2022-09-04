import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';

const deployBox: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const {
    getNamedAccounts,
    deployments: { deploy, log },
  } = hre;
  const { deployer } = await getNamedAccounts();

  log('==> 05 <==\n');

  log('==> Deploying Box');
  const box = await deploy('Box', {
    from: deployer,
    args: [],
    log: true,
  });
  log(`==> Deployed Box at ${box.address}`);

  const timeLock = await ethers.getContract('TimeLock');
  const boxContract = await ethers.getContractAt('Box', box.address);
  const transferOwnershipTx = await boxContract.transferOwnership(
    timeLock.address
  );

  await transferOwnershipTx.wait(1);
  log(`==> Transferred ownership of Box to ${timeLock.address}`);
};

export default deployBox;
