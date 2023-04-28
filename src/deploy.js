//Importing Compiled Smart Contract
const fs = require("fs");

const ABI = JSON.parse(
  fs.readFileSync("../contracts/build/FarmData_sol_FarmData.abi")
);
const bytecode = fs
  .readFileSync("../contracts/build/FarmData_sol_FarmData.bin")
  .toString();
//Connecting to the network
const Web3 = require("web3");
// //Web3 Connection
// const web3 = new Web3(ganache.provider());
const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

async function deploy() {
  let accounts = await web3.eth.getAccounts();
  let farmContract = new web3.eth.Contract(ABI);
  farmContract = farmContract.deploy({ data: bytecode });

  const deployContract = await farmContract.send({
    from: accounts[0],
    gas: 1000000,
  });
  console.log("Deployed Contract Address: ", deployContract.options.address);
  // 0xE758Ac1224615eB28e2a29B66E133a4ABF564eDd -- FarmData.sol
}
deploy();
