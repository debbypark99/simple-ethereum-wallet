const Migrations = artifacts.require("Migrations");
const SimpleEthereumWallet = artifacts.require("SimpleEthereumWallet.sol");
var Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(SimpleEthereumWallet);
};
