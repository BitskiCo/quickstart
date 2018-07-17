const TruffleConfig = require('./truffle.js');

module.exports = {
  app: {
    id: 'YOUR-CLIENT-ID'
  },
  appWallet: {
    client: {
      id: 'YOUR-APP-WALLET-ID',
      secret: 'YOUR-APP-WALLET-SECRET'
    },
    auth: {
      tokenHost: 'https://account.bitski.com',
      tokenPath: '/oauth2/token'
    }
  },
  environments: {
    development: {
      network: 'development'
    },
    production: {
      network: 'kovan'
    }
  },
  networkIds: {
    kovan: 'kovan',
    rinkeby: 'rinkeby',
    live: 'mainnet',
    development: `http://${TruffleConfig.networks.development.host}:${TruffleConfig.networks.development.port}`,
  }
};
