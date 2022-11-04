const Proxy = artifacts.require("Proxy");
const truffleAssert = require("truffle-assertions");
const version1 = artifacts.require("CounterV1");
const version2 = artifacts.require("CounterV2");

require("web3");
const chainID = config.network_id;

(chainID == 5777 ? contract : contract.skip)(
  "Proxy-Counter",
  async function (accounts) {
    before(async () => {
      instance = await Proxy.deployed();
      v1 = await version1.deployed();
      v2 = await version2.deployed();
      contractInstance1 = await version1.at(instance.address);
      contractInstance2 = await version2.at(instance.address);
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
      await contractInstance1.inc.sendTransaction();
      contractInstance1.count
        .call()
        .then((x) => assert.equal(x, 1, "Increment failed"));
    });

    it("Test case - Update code", async()=>{
      await instance._setImplementation.sendTransaction(v2.address);
      await instance._getImplementation.call().then((x) => {
        assert.equal(x, v2.address, "Wrong address set");
      });
    })

    it("Test case - Decrement Counter",async()=>{
      await contractInstance2.dec.sendTransaction();
      contractInstance2.count
        .call()
        .then((x) => assert.equal(x, 0, "Decrement failed"));
    })
  }
);
