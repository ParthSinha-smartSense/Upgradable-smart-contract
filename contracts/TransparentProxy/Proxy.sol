// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Proxy {
    uint256 public count;
    bytes32 private constant IMPLEMENTATION_SLOT =
        bytes32(uint256(keccak256("eip1967.proxy.implementation")) - 1);
    // 0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103
    bytes32 private constant ADMIN_SLOT =
        bytes32(uint256(keccak256("eip1967.proxy.admin")) - 1);

    constructor() {
        _setAdmin(msg.sender);
    }

    //0x21bc166c
    function _setAdmin(address _admin) private {
        require(_admin != address(0), "admin = zero address");
        StorageSlot.getStorage(ADMIN_SLOT).addr = _admin;
    }

    //0x44f3454b
    function _setImplementation(address _addr) public ifAdmin {
        StorageSlot.getStorage(IMPLEMENTATION_SLOT).addr = _addr;
    }

    //0x42404e07
    function _getImplementation() public ifAdmin returns (address) {
        return StorageSlot.getStorage(IMPLEMENTATION_SLOT).addr;
    }

    //0x839f5fb8
    function _getAdmin() public view returns (address) {
        return StorageSlot.getStorage(ADMIN_SLOT).addr;
    }

    function _delegate(address _implementation) internal virtual {
        assembly {
            // Copy msg.data. We take full control of memory in this inline assembly
            // block because it will not return to Solidity code. We overwrite the
            // Solidity scratch pad at memory position 0.

            // calldatacopy(t, f, s) - copy s bytes from calldata at position f to mem at position t
            // calldatasize() - size of call data in bytes
            calldatacopy(0, 0, calldatasize())

            // Call the implementation.
            // out and outsize are 0 because we don't know the size yet.

            // delegatecall(g, a, in, insize, out, outsize) -
            // - call contract at address a
            // - with input mem[in…(in+insize))
            // - providing g gas
            // - and output area mem[out…(out+outsize))
            // - returning 0 on error (eg. out of gas) and 1 on success
            let result := delegatecall(
                gas(),
                _implementation,
                0,
                calldatasize(),
                0,
                0
            )

            // Copy the returned data.
            // returndatacopy(t, f,bytes32 s) - copy s bytes from returndata at position f to mem at position t
            // returndatasize() - size of the last returndata
            returndatacopy(0, 0, returndatasize())

            switch result
            // delegatecall returns 0 on error.
            case 0 {
                // revert(p, s) - end execution, revert state changes, return data mem[p…(p+s))
                revert(0, returndatasize())
            }
            default {
                // return(p, s) - end execution, return data mem[p…(p+s))
                return(0, returndatasize())
            }
        }
    }

    modifier ifAdmin() {
        if (msg.sender == _getAdmin()) _;
        else _fallback();
    }

    function _fallback() private {
        _delegate(_getImplementation());
    }

    fallback() external payable {
        _fallback();
    }

    receive() external payable {
        _fallback();
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
