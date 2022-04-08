import {
  QUORUM_PCT,
  VOTING_PERIOD,
  VOTING_DELAT,
} from './../helper-hardhat-config';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';

const deployGovernorContract: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
  const {
    getNamedAccounts,
    deployments: { deploy, log, get },
  } = hre;
  const { deployer } = await getNamedAccounts();

  log('==> 03 <==\n');

  const governanceToken = await get('GovernanceToken');
  const timeLock = await get('TimeLock');
  log('==> Deploying Governor Contract');

  const governorContract = await deploy('GovernorContract', {
    from: deployer,
    args: [
      governanceToken.address,
      timeLock.address,
      VOTING_DELAT,
      VOTING_PERIOD,
      QUORUM_PCT,
    ],
    log: true,
  });
};

export default deployGovernorContract;
