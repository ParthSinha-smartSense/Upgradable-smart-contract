// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "./Proxiable.sol";

contract CounterV2Proxiable is Proxiable {
    address public owner;
    uint256 public count;

    //0x40caae06

    function setOwner() external {
        require(owner == address(0), "Already initialized");
        owner = msg.sender;
    }

    //0x0f5cd072

    function updateContract(address _contract) external onlyOwner {
        updateCodeAddress(_contract);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Access denied");
        _;
    }

    //0x782c5d26

    function changeOwner(address _owner) external onlyOwner {
        owner = _owner;
    }

    // 0x371303c0

    function inc() external {
        count += 1;
    }

    //0xb3bcfa82
    function dec() external onlyOwner {
        count -= 1;
    }

    //0x77105e41
    function multiply(uint256 a, uint256 b) external view returns (uint256 c) {
        c = a * b;
    }
}
