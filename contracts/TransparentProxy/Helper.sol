// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "./CounterV1.sol";

contract helper {
    function inc() external pure returns (bytes memory) {
        return abi.encodeWithSelector(CounterV1.inc.selector);
    }
}
