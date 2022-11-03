const Proxy = artifacts.require("Proxy");
const truffleAssert = require("truffle-assertions");
const Helper = artifacts.require("helper");
const version1 = artifacts.require("CounterV1");

require("web3");
const chainID = config.network_id;

(chainID == 5777 ? contract : contract.skip)(
  "Proxy-CounterV1",
  async function (accounts) {
    before(async () => {
      instance = await Proxy.deployed();
      help = await Helper.deployed();
      v1 = await version1.deployed();
    });

    it("Test case - Admin returns correctly", async () => {
      await instance._getAdmin.call().then((x) => {
        assert.equal(x, accounts[0], "Incorrect Admin");
      });
    });

    it("Test case - Modifier works correctly", async () => {
      await truffleAssert.fails(
        instance._getImplementation.call({ from: accounts[1] }),
        "stack overflow"
      );
    });

    it("Test case - Set implementation", async () => {
      await instance._setImplementation.sendTransaction(v1.address);
      await instance._getImplementation.call().then((x) => {
        assert.equal(x, v1.address, "Wrong address set");
      });
    });

    it("Test case - Get implementation", async () => {
      await instance._getImplementation.call().then((x) => {
        assert.equal(x, v1.address, "Wrong address returned");
      });
    });

    it("Test case - Increment Counter", async () => {
      let temp = await help.inc.call();
      await web3.eth.sendTransaction({
        from: accounts[0],
        to: instance.address,
        data: temp,
      });
      instance.count.call().then((x) => assert.equal(x, 1, "Increment failed"));
    });
  }
);
