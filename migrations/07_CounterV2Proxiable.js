const CounterV2 = artifacts.require("CounterV2Proxiable");

module.exports = async (deployer) => {
  await deployer.deploy(CounterV2);
};