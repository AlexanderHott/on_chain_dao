# On-Chain DAO

## Quick Start

```
yarn install
yarn hardhat node
```

In a new terminal

```
yarn hardhat run scripts/propose.ts --network localhost
yarn hardhat run scripts/vote.ts --network localhost
yarn hardhat console --network localhost

> const governor = await ethers.getContract('GovernorContract');
undefined
// copy and paste the latest proposal id from ./proposals.json into
// the function below
> await governor.state("PROPOSAL_ID_HERE");
4
// 4 means success
^C
^C

yarn hardhat run scripts/propose-and-execute.ts --network localhost
```

## What are DAOs?

DAOs are an effective and safe way to work with like-minded folks around the globe.

Think of them like an internet-native business that's collectively owned and managed by its members. They have built-in treasuries that no one has the authority to access without the approval of the group. Decisions are governed by proposals and voting to ensure everyone in the organization has a voice.

There's no CEO who can authorize spending based on their own whims and no chance of a dodgy CFO manipulating the books. Everything is out in the open and the rules around spending are baked into the DAO via its code.

## Why do we need DAOs?

Starting an organization with someone that involves funding and money requires a lot of trust in the people you're working with. But it’s hard to trust someone you’ve only ever interacted with on the internet. With DAOs you don’t need to trust anyone else in the group, just the DAO’s code, which is 100% transparent and verifiable by anyone.

This opens up so many new opportunities for global collaboration and coordination.

## How do DAOs work?

The backbone of a DAO is its smart contract. The contract defines the rules of the organization and holds the group's treasury. Once the contract is live on Ethereum, no one can change the rules except by a vote. If anyone tries to do something that's not covered by the rules and logic in the code, it will fail. And because the treasury is defined by the smart contract too that means no one can spend the money without the group's approval either. This means that DAOs don't need a central authority. Instead the group makes decisions collectively and payments are authorized automatically when votes pass.

This is possible because smart contracts are tamper-proof once they go live on Ethereum. You can't just edit the code (the DAOs rules) without people noticing because everything is public.

[Source](https://ethereum.org/en/dao/)
[OpenZeppelin Governance](https://docs.openzeppelin.com/contracts/4.x/api/governance)

<!-- https://www.youtube.com/watch?v=AhJtmUqhAqg -->
<!-- https://github.com/PatrickAlphaC/dao-template -->
