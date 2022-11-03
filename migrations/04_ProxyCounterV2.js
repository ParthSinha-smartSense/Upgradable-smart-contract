const CounterV2 = artifacts.require("CounterV2");

module.exports = async (deployer) => {
  await deployer.deploy(CounterV2);
};
