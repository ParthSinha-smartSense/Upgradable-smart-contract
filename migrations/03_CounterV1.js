const CounterV1 = artifacts.require("CounterV1");

module.exports = async (deployer) => {
  await deployer.deploy(CounterV1);
};
