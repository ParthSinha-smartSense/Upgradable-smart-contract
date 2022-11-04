const counterV1 = artifacts.require("CounterV1Proxiable");
const truffleAssert = require("truffle-assertions");
const Proxy = artifacts.require("ProxyUUPS");
const counterV2 = artifacts.require("CounterV2Proxiable");

require("web3");
const chainID = config.network_id;

(chainID == 5777 ? contract : contract.skip)(
  "UUPS-CounterV1",
  async function (accounts) {
    before(async () => {
      instanceV1 = await counterV1.deployed();
      instanceV2 = await counterV2.deployed();
      proxy = await Proxy.deployed();
      contractInstanceV1 = await counterV1.at(proxy.address);
      contractInstanceV2 = await counterV2.at(proxy.address);
    });

    it("Test case - Contract deployed succesfully", async () => {
      assert(instanceV1.address != 0 && instanceV2.address != 0);
    });

    it("Test case - Proxy deployed succesfully", async () => {
      assert.notEqual(proxy.address, 0, "Contract deployement failed");
    });

    it("Test case - Constructor called succesfully", async () => {
      assert.equal(
        await contractInstanceV1.owner.call(),
        accounts[0],
        "Wrong owner set"
      );
    });

    it("Test case - Increment operation succesful", async () => {
      await contractInstanceV1.inc.sendTransaction();
      await contractInstanceV1.count
        .call()
        .then((x) => assert.equal(x, 1, "Increment failed"));
    });

    it("Test case - Change owner succesful", async () => {
      await contractInstanceV1.changeOwner.sendTransaction(accounts[1]);
      await contractInstanceV1.owner
        .call()
        .then((x) => assert.equal(x, accounts[1], "Changing owner failed"));
    });

    it("Test case - Change version succesful", async () => {
      await contractInstanceV1.updateContract.sendTransaction(
        instanceV2.address,
        { from: accounts[1] }
      );
      contractInstanceV2.owner.call().then((x) => {
        assert.equal(x, accounts[1], "Version change failed");
      });
    });

    it("Test case - decrement operation succesful", async () => {
      await contractInstanceV2.dec.sendTransaction({ from: accounts[1] });
      await contractInstanceV2.count
        .call()
        .then((x) => assert.equal(x, 0, "decrement failed"));
    });

    it("Test case - Multiplication succesful", async () => {
      await contractInstanceV2.multiply
        .call(3, 7)
        .then((x) => assert.equal(x, 21, "Wrong multiplication"));
    });
  }
);
