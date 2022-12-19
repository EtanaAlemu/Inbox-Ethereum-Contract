const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");

let accounts;
let inbox;
let message;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Hi there!"] })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address)
  });

  
  it("has a default message", async() => {
    message = await inbox.methods.message().call();

    assert.equal(message , "Hi there!")
  });

  
  it("set message", async() => {
    await inbox.methods.setMessage('Hi').send({from: accounts[0]});
    message = await inbox.methods.message().call();
    
    assert.equal(message , "Hi")
  });


});
