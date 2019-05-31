const { Mainnet, Rinkeby, Kovan } = require('bitski');

module.exports = {
  app: {
    id: 'YOUR-CLIENT-ID' //change this to your app's client id
  },
  appWallet: {
    credential: 'YOUR-APP-WALLET-CLIENT-ID',
    secret: 'YOUR-APP-WALLET-SECRET'
  },
  environments: {
    development: {
       //ethereum network to use for local dev (Replace with Mainnet, Rinkeby, or Kovan to use a real network)
      network: {
        rpcUrl: 'http://localhost:9545',
        chainId: 5777,
      },
      redirectURL: 'http://localhost:3000/public/callback.html' //url the popup will redirect to when logged in
    },
    production: {
      //ethereum network to use for production builds
      network: Rinkeby,
      redirectURL: 'https://mydomain.com/public/callback.html' //url the popup will redirect to when logged in
    }
  }
};
