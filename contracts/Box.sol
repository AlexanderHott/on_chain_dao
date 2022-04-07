// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Box is Ownable {
    uint256 private value;

    /// @notice Triggers when a new value is stored.
    /// @dev Only emitted by the `Box.store` function.
    /// @param newValue The new value being stored in the contract
    event ValueChanged(uint256 newValue);

    /// @notice Updates the value stored in the Contract
    /// @dev Assigns the function paramter to the value stored in the Contract and emits the ValueChanged event with the new value.
    /// @param newValue The new value being stored in the Contract
    function store(uint256 newValue) public onlyOwner {
        value = newValue;
        emit ValueChanged(newValue);
    }

    /// @notice Returns the value stored in the Contract
    /// @dev Returns the value stored in the Contract
    /// @return value The value that is stored in the contract
    function retrieve() public view returns (uint256) {
        return value;
    }
}
