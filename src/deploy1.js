//Importing Compiled Smart Contract
const fs = require("fs");
const ABI = JSON.parse(
  fs.readFileSync("../contracts/build/BidData_sol_BidData.abi")
);
const bytecode = fs
  .readFileSync("../contracts/build/BidData_sol_BidData.bin")
  .toString();
//Connecting to the network
const Web3 = require("web3");
// //Web3 Connection
// const web3 = new Web3(ganache.provider());
const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
async function deploy() {
  let accounts = await web3.eth.getAccounts();
  let bidContract = new web3.eth.Contract(ABI);
  bidContract = bidContract.deploy({ data: bytecode });

  const deployContract = await bidContract.send({
    from: accounts[0],
    gas: 5000000,
  });
  console.log(
    "BidData Deployed Contract Address: ",
    deployContract.options.address
  );
  // 0x7EC46eFBd2D3D7Bc23bAD23cF6C6Dcfb5960776f  -- BidData.sol
}
deploy();
