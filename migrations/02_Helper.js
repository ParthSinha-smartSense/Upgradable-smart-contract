const Helper = artifacts.require("helper");

module.exports = async (deployer) => {
  await deployer.deploy(Helper);
};
