const CounterV1 = artifacts.require("CounterV1");
const CounterV2 = artifacts.require("CounterV2");
const parse = require("./../.openzeppelin/unknown-1337.json");

module.exports = async function (deployer) {
  const existing = await CounterV1.deployed();
  //console.log(parse.proxies)
  const instance = await upgradeProxy(parse.proxies[0].address, CounterV2, {
    deployer,
  });
  console.log("Upgraded", instance.address);
};
