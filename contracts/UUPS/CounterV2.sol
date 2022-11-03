//SPDX-License-Identifier: MIT
import "./Proxiable.sol";
import "./../TransparentProxy/CounterV2.sol";
pragma solidity 0.8.17;
contract CounterV2Proxiable is CounterV2, Proxiable{
    constructor() Proxiable(){
        
    }
}