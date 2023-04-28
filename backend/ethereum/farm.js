const {  web3_manager, smartContractAddress } = require('./constants');

// import Interface or ABI of contract
const fs = require("fs")
const ABI = JSON.parse(fs.readFileSync("contracts/build/FarmData_sol_FarmData.abi"))


const instance = new web3_manager.eth.Contract(
    ABI,
    smartContractAddress
);
module.exports =  instance; 
