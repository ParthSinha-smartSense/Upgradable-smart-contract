const Proxy = artifacts.require("Proxy");

module.exports = async (deployer) => {
  await deployer.deploy(Proxy);
};
