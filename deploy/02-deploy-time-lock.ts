import { MIN_DELAY } from './../helper-hardhat-config';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const deployTimeLock: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
  const {
    getNamedAccounts,
    deployments: { deploy, log },
  } = hre;
  const { deployer } = await getNamedAccounts();

  log('==> 02 <==\n');

  log('==> Deploying Time Lock');
  const timeLock = await deploy('TimeLock', {
    from: deployer,
    args: [MIN_DELAY, [], []],
    log: true,
  });
  log(`==> Deployed Time Lock at ${timeLock.address}`);
};

export default deployTimeLock;
