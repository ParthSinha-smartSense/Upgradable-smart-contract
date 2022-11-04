const CounterV1 = artifacts.require("CounterV1Proxiable");

module.exports = async (deployer) => {
  await deployer.deploy(CounterV1);
};