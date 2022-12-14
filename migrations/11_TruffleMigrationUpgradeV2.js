const CounterV1 = artifacts.require("CounterV1");
const CounterV2 = artifacts.require("CounterV2");
const { upgradeProxy } = require("@openzeppelin/truffle-upgrades");
const parse = require("./../.openzeppelin/unknown-1337.json");

module.exports = async function (deployer) {
  const existing = await CounterV1.deployed();
  const instance = await upgradeProxy(parse.proxies[1].address, CounterV2, {
    deployer,
  });
  console.log("Upgraded", instance.address);
};
