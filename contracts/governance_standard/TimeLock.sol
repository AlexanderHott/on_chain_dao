// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract TimeLock is TimelockController {
    /// @dev Creates a new TimeLock instance.
    /// @param _minDelay The amount of time before executing a function.
    /// @param _proposers The list of addresses that can vote
    /// @param _executors The list of contracts that can execute the function
    constructor(
        uint256 _minDelay,
        address[] memory _proposers,
        address[] memory _executors
    ) TimelockController(_minDelay, _proposers, _executors) {}
}
