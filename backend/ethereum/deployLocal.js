const fs = require("fs");
const {  web3_manager } = require('./constants');

const ABI = JSON.parse(fs.readFileSync("contracts/build/FarmData_sol_FarmData.abi"));

const bytecode = fs.readFileSync("contracts/build/FarmData_sol_FarmData.bin").toString();

async function deploy() {

  const accounts = await web3_manager.eth.getAccounts();
  console.log("Deploying using Account - ",accounts[0]);

  const balance = await web3_manager.eth.getBalance(accounts[0]);
  const etherAmount = web3_manager.utils.fromWei(balance, 'ether');
  console.log("Current Balance - ", etherAmount);

  const farmContract = new web3_manager.eth.Contract(ABI);

  const deployContract = await farmContract.deploy({
    data: bytecode,
  }).send({
    from: accounts[0],
    gas: 1500000,
    gasPrice: '300000000000'
   }); // add the from field here

  console.log(`Contract deployed at address: ${deployContract.options.address}`);

}

  deploy();
