const ProxyUUPS = artifacts.require("ProxyUUPS");
const MainContract = artifacts.require("MainContract");
require('web3')
module.exports = async (deployer) => {
  await deployer.deploy(ProxyUUPS, MainContract.address);
};
