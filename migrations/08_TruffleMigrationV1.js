const { deployProxy } = require("@openzeppelin/truffle-upgrades");
const CounterV1 = artifacts.require("CounterV1");

module.exports = async function (deployer) {
  const instance = await deployProxy(CounterV1, { deployer });
  console.log("Deployed", instance.address);
};
