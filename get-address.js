// get-address.js
// A simple utility to get your app wallet's address(es)

const BitskiConfig = require('./bitski.config.js');
const { getProvider } = require('bitski-node');
const Web3 = require('web3');

const { credential, secret } = BitskiConfig.appWallet;

const provider = getProvider(BitskiConfig.app.id, {
  credentials: {
    id: credential,
    secret: secret,
  }
});

const web3 = new Web3(provider);

console.log('Loading account...\n\n');

web3.eth.getAccounts().then(accounts => {
  console.log(`Your App Wallet Addresses: ${accounts}\n\n`);
  process.exit(0);
}).catch(err => {
  console.error('Could not load accounts. Make sure your credentials are set correctly in bitski.config.js\n');
  process.exit(1);
});
