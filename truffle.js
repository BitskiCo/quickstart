const BitskiConfig = require('./bitski.config.js');
const { ProviderManager } = require('bitski-node');

const { credential, secret } = BitskiConfig.appWallet;
const providerManager = new ProviderManager(credential, secret);

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 9545,
      network_id: '*',
    },
    live: {
      network_id: '1',
      provider: () => {
        return providerManager.getProvider('mainnet');
      }
    },
    kovan: {
      network_id: '42',
      provider: () => {
        return providerManager.getProvider('kovan');
      }
    },
    rinkeby: {
      network_id: '4',
      provider: () => {
        return providerManager.getProvider('rinkeby');
      }
    },
  }
};
