//SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

contract Proxiable {
    // keccak256(OWNER)=0x6270edb7c868f86fda4adedba75108201087268ea345934db8bad688e1feb91b
    // keccak256(PROXIABLE)=0xc5f16f0fcc639fa48a6947836d9850f504798523bf8c9a3a87d5876cf622bcf7
    constructor() {
        address owner = msg.sender;
        assembly {
            sstore(
                0x6270edb7c868f86fda4adedba75108201087268ea345934db8bad688e1feb91b,
                owner
            )
        }
    }

    function updateContract(address _contract) internal {
        require(
            bytes32(
                0xc5f16f0fcc639fa48a6947836d9850f504798523bf8c9a3a87d5876cf622bcf7
            ) == Proxiable(_contract).proxiableUUID(),
            "Not compatible"
        );
        assembly {
            sstore(
                0xc5f16f0fcc639fa48a6947836d9850f504798523bf8c9a3a87d5876cf622bcf7,
                _contract
            )
        }
    }

    function proxiableUUID() public pure returns (bytes32) {
        return
            0xc5f16f0fcc639fa48a6947836d9850f504798523bf8c9a3a87d5876cf622bcf7;
    }
}
