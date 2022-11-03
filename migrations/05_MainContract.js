const MainContract = artifacts.require("MainContract");

module.exports = async (deployer) => {
  await deployer.deploy(MainContract);
};
