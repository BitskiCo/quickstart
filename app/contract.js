// Replace this with the built json file for your actual contract
import artifacts from '../build/contracts/MyContract.json';

// Rename this class to whatever makes sense for your app
export default class MyContract {

  constructor(web3) {
    this.web3 = web3;
  }

  at(address) {
    if (artifacts && artifacts.abi) {
      const abi = artifacts.abi;
      const instance = new this.web3.eth.Contract(abi, address);
      return Promise.resolve(instance);
    } else {
      return Promise.reject('Contract not compiled or not found');
    }
  }

  getAddress(networkID) {
    if (artifacts && artifacts.networks && artifacts.networks[networkID] && artifacts.networks[networkID].address) {
      return artifacts.networks[networkID].address;
    }
  }

  deployed() {
    return this.web3.eth.net.getId().then(network => {
      const address = this.getAddress(network);
      if (address) {
        return this.at(address);
      } else {
        const deployedNetworks = Object.keys(artifacts.networks);
        return Promise.reject(`Contract not deployed on current network (${network}). Make sure you ran truffle migrate for the network this environment points to. Currently deployed on: ${deployedNetworks}.`);
      }
    });
  }
}
