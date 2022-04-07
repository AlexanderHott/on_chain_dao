import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const deployGovernanceToken: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
  const {
    getNamedAccounts,
    deployments: { deploy, log },
    network,
  } = hre;
  const { deployer } = await getNamedAccounts();

  log('==> Deploying Governance Token');
  const governanceToken = await deploy('GovernanceToken', {
    from: deployer,
    args: [],
    log: true,
  });
  log(`==> Deployed Governance Token at ${governanceToken.address}`);

};

export default deployGovernanceToken;
