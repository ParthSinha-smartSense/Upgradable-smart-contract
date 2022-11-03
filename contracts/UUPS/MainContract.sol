//SPDX-License-Identifier: MIT
import "./Proxiable.sol";
import "./../TransparentProxy/CounterV1.sol";
pragma solidity 0.8.17;

contract MainContract is Proxiable, CounterV1 {
    constructor() Proxiable() {}

    function updateContractVersion(address _contract) external onlyOwner {
        updateContract(_contract);
    }

    modifier onlyOwner() {
        require(
            StorageSlot
                .getStorage(
                    0x6270edb7c868f86fda4adedba75108201087268ea345934db8bad688e1feb91b
                )
                .addr == msg.sender
        );
        _;
    }
}

library StorageSlot {
    struct store {
        address addr;
    }

    function getStorage(bytes32 _addr)
        internal
        pure
        returns (store storage temp)
    {
        assembly {
            temp.slot := _addr
        }
    }
}
