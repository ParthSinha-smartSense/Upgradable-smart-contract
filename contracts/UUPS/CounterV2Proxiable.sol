// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "./Proxiable.sol";

contract CounterV2Proxiable is Proxiable {
    address public owner;
    uint256 public count;

    function setOwner() external {
        require(owner == address(0), "Already initialized");
        owner = msg.sender;
    }

    function updateContract(address _contract) external onlyOwner {
        updateCodeAddress(_contract);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Access denied");
        _;
    }

    function changeOwner(address _owner) external onlyOwner {
        owner = _owner;
    }

    function inc() external {
        count += 1;
    }

    function dec() external {
        count -= 1;
    }

    function multiply(uint256 a, uint256 b)
        external
        view
        onlyOwner
        returns (uint256 c)
    {
        c = a * b;
    }
}
