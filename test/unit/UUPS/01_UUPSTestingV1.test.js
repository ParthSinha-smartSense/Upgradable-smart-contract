const MainContract = artifacts.require("MainContract");
const truffleAssert = require("truffle-assertions");
const Proxy = artifacts.require("ProxyUUPS");

require("web3");
const chainID = config.network_id;

(chainID == 5777 ? contract : contract.skip)(
  "UUPS-CounterV1",
  async function (accounts) {
    before(async () => {
      instance = await MainContract.deployed();
      proxy = await Proxy.deployed();
    });

    it("Test case - Contract deployed succesfully", async () => {
      assert.notEqual(instance.address, 0, "Contract deployement failed");
    });

    it("Test case - Proxy deployed succesfully", async () => {
      assert.notEqual(proxy.address, 0, "Contract deployement failed");
    });

    it("Test case - Proxy returns correct initial value", async () => {
      await console.log(instance.methods)
      // proxy.count
      //   .call()
      //   .then((x) => assert.equal(x, 0, "Wrong initialisation"));
    });
  }
);
