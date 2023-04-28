const Web3 = require('web3')


const smartContractAddress = "0xe2C688FAae6B995aBbB7Fa86b47A9Ec2B8734FA3";
const smartContractAddressGlobal = "0x183E527dD34a8f9f1f4CA7f52F4CE63024e705f0";

const sensorNodeAddr ="0x17ec9504a0bcd1aa2fe24645c832047016512ff3";
const farmManagerAddr ="0xf4a9907b94135a1f27d0a5aa207599738ccfe69f";
const farmManagerAddrGlobal ="0x6588d7462c8a44e6a025b484ceba79283ac14229";

const httpAddr_manager = "http://127.0.0.1:8061";
const httpAddr_sensor = "http://127.0.0.1:8062"; 
const httpAddr_globalManager = "http://172.17.22.53:9043";   

//sensor node address
const web3_sensor = new Web3(new Web3.providers.HttpProvider(httpAddr_sensor));
const web3_manager = new Web3(new Web3.providers.HttpProvider(httpAddr_manager));
const web3_manager_global = new Web3(new Web3.providers.HttpProvider(httpAddr_globalManager));

module.exports = { 
    smartContractAddress,
    smartContractAddressGlobal, 
    sensorNodeAddr, 
    farmManagerAddr,
    farmManagerAddrGlobal, 
    httpAddr_sensor,
    httpAddr_manager,
    httpAddr_globalManager,
    web3_sensor,
    web3_manager,
    web3_manager_global
};