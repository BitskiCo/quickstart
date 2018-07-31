const prompt = require("prompt");
const fs = require('fs');

const configFile = './bitski.config.js';

prompt.message = '';
prompt.delimiter = '';

console.log('Welcome to Bitski Quickstart!');
console.log('Now we\'re going to ask you about your Bitski app. If you haven\'t yet registered, visit https://developer.bitski.com to create your client');

const schema = {
  properties: {
    hasClientId: {
      message: '\nDo you have a Bitski Client Id? (y/n)',
      validator: /^[y|n]?$/,
      warning: 'Must respond y or n',
      default: 'n',
      type: 'string'
    },
    clientId: {
      description: '\nEnter your Bitski Client Id',
      type: 'string',
      ask: function() {
        return prompt.history('hasClientId').value == 'y';
      }
    },
    hasAppWallet: {
      message: '\nDo you have an App Wallet? (y/n)',
      validator: /^[y|n]?$/,
      warning: 'Must respond yes or no',
      default: 'n',
      type: 'string'
    },
    appWalletId: {
      description: '\nEnter your App Wallet ID',
      type: 'string',
      ask: function() {
        return prompt.history('hasAppWallet').value == 'y';
      }
    },
    appWalletSecret: {
      description: '\nEnter your App Wallet secret',
      type: 'string',
      ask: function() {
        return prompt.history('hasAppWallet').value == 'y';
      }
    }
  }
};

prompt.start();

prompt.get(schema, (err, result) => {
  fs.readFile(configFile, 'utf8', function (err, data) {
    if (err) {
      return console.log('\nError reading config file: '+ err);
    }
    let updated = data;
    if (result.hasClientId == 'y') {
        updated = updated.replace(/YOUR-CLIENT-ID/g, result.clientId);
    } else {
      console.log('\nPlease visit https://developer.bitski.com/ to register a client id and run "npm run setup" again.');
    }
    if (result.hasAppWallet == 'y') {
      updated = updated.replace(/YOUR-APP-WALLET-CLIENT-ID/g, result.appWalletId);
      updated = updated.replace(/YOUR-APP-WALLET-SECRET/g, result.appWalletSecret);
    }
    if (updated !== data) {
      fs.writeFile(configFile, updated, 'utf8', function(err) {
        if (err) {
          return console.log('\nError writing config file: '+ err);
        }
        console.log('\nYour config file has been updated. If you need to make changes, see bitski.config.js\n');
      });
    }
  });
})
