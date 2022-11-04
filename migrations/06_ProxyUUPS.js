const Proxy = artifacts.require("ProxyUUPS");
const CounterV1 = artifacts.require("CounterV1Proxiable");
require("web3");
module.exports = async (deployer) => {
  await deployer.deploy(Proxy,web3.utils.sha3('setOwner()').substring(0,10),CounterV1.address);
};
