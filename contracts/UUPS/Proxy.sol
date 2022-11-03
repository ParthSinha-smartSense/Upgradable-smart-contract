//SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

contract ProxyUUPS {
    //keccak256("PROXIABLE") = "0xc5f16f0fcc639fa48a6947836d9850f504798523bf8c9a3a87d5876cf622bcf7"
    constructor( address _contract) {
        assembly {
            sstore(
                0xc5f16f0fcc639fa48a6947836d9850f504798523bf8c9a3a87d5876cf622bcf7,
                _contract
            )
        }
        
    }

    fallback() external payable{
        assembly{
            let _contract := sload(0xc5f16f0fcc639fa48a6947836d9850f504798523bf8c9a3a87d5876cf622bcf7)
            calldatacopy(0x0, 0x0, calldatasize())
            let result := delegatecall(sub(gas(), 10000), _contract, 0x0, calldatasize(), 0, 0)
            let resultsize := returndatasize()
            returndatacopy(0, 0, resultsize)
            switch result
            case 0 {
                revert(0, resultsize)
            }
            default {
                return(0, resultsize)
            }
        }
        
    }
}
