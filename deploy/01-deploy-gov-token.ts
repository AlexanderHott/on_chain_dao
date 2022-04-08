import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';

const deployGovernanceToken: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
  const {
    getNamedAccounts,
    deployments: { deploy, log },
  } = hre;
  const { deployer } = await getNamedAccounts();

  log('==> 01 <==\n');

  log('==> Deploying Governance Token');
  const governanceToken = await deploy('GovernanceToken', {
    from: deployer,
    args: [],
    log: true,
  });
  log(`==> Deployed Governance Token at ${governanceToken.address}`);

  await delegate(governanceToken.address, deployer);
  log(`==> Delegated ${deployer} to ${governanceToken.address}`);
};

const delegate = async (govTokenAddr: string, delegatedAcc: string) => {
  const govToken = await ethers.getContractAt('GovernanceToken', govTokenAddr);
  const tx = await govToken.delegate(delegatedAcc);
  await tx.wait(1);
  console.log(
    `==> Checkpoints: ${await govToken.numCheckpoints(delegatedAcc)}`
  );
};

export default deployGovernanceToken;
