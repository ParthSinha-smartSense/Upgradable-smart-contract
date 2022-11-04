// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "./Proxiable.sol";
//contracts/UUPS/Proxiable.sol
contract CounterV1Proxiable is Proxiable {
    address public owner;
    uint256 public count;

    function setOwner() external {
        require(owner == address(0), "Already initialized");
        owner = msg.sender;
    }

    function updateContract(address _contract) onlyOwner() external{
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
}
