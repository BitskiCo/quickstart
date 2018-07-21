// get-address.js
// A simple utility to get your app wallet's address

const BitskiConfig = require('./bitski.config.js');
const BitskiTruffleProvider = require('bitski-truffle-provider');
const Web3 = require('web3');

const provider = new BitskiTruffleProvider("mainnet", BitskiConfig.appWallet);
const web3 = new Web3(provider);

console.log('Loading account...\n\n');

web3.eth.getAccounts().then(accounts => {
  console.log(`Your App Wallet Address: ${accounts[0]}\n\n`);
  process.exit(0);
}).catch(err => {
  console.error('Could not load accounts. Make sure your credentials are set correctly in bitski.config.js\n');
  process.exit(1);
});
