const BitskiConfig = require('./bitski.config.js');
const BitskiTruffleProvider = require('bitski-truffle-provider');

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 9545,
      network_id: "*",
    },
    live: {
      network_id: '1',
      provider: BitskiTruffleProvider("mainnet", BitskiConfig.appWallet),
    },
    kovan: {
      network_id: '42',
      provider: BitskiTruffleProvider("kovan", BitskiConfig.appWallet),
    },
    rinkeby: {
      network_id: '4',
      provider: BitskiTruffleProvider("rinkeby", BitskiConfig.appWallet),
    },
  }
};
