const Web3 = require('web3');

const web3 = new Web3(process.env.GANACHE_URI || 'http://localhost:8545');

module.exports = web3;
