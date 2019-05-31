// Simple example app that demonstrates sign in, sign out, using web3,
// and initializing contracts from truffle.

import { Bitski, AuthenticationStatus } from 'bitski';
import Web3 from 'web3';
import Contract from './contract';

// Import any contracts you want to use from the build folder.
// Here we've imported the sample contract.
import artifacts from '../build/contracts/MyContract.json';

export default class App {
  /**
   * Creates the app.
   */
  constructor() {
    // Initialize bitski sdk
    this.bitski = new Bitski(BITSKI_CLIENT_ID, BITSKI_REDIRECT_URL);
    // Generate a network config for the current environment
    const network = {
      rpcUrl: PROVIDER_RPC_URL,
      chainId: PROVIDER_CHAIN_ID
    };
    // Initialize web3
    this.web3 = new Web3(this.bitski.getProvider({ network }));
    // Initialize the sample contract
    this.contract = new Contract(this.web3, artifacts);
  }

  /**
   * Starts the application.
   */
  start() {
    // Setup the interface
    this.configureView();
    this.checkLoggedInStatus();
  }

  /**
   * One-time setup of the interface.
   */
  configureView() {
    // Store various UI elements
    this.loadingContainer = document.getElementById('loading');
    this.signedInContainer = document.getElementById('signed-in');
    this.signedOutContainer = document.getElementById('signed-out');
    this.walletAddressContainer = document.getElementById('wallet-address');
    this.errorContainer = document.getElementById('error');

    // Set up connect button
    const connectElement = document.getElementById('connect-button');
    this.connectButton = this.bitski.getConnectButton({ container: connectElement }, (error) => {
      if (error) {
        this.setError(error);
      } else {
        this.continueToApp();
      }
    });

    // Set up log out button
    this.logOutButton = document.getElementById('log-out');
    this.logOutButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.signOut();
    });
  }

  /**
   * Checks whether or not the user is currently logged in to Bitski.
   */
  checkLoggedInStatus() {
    if (this.bitski.authStatus !== AuthenticationStatus.NotConnected) {
      this.continueToApp();
    } else {
      this.showLoginButton();
    }
  }

  /**
   * Toggles the loading state
   * @param {boolean} show whether or not to show the loading state
   */
  toggleLoading(show) {
    this.loadingContainer.style.display = show === true ? 'block' : 'none';
  }

  /**
   * Initializes the contract and shows the app UI
   */
  continueToApp() {
    //Set up the contract
    this.contract.deployed().then(instance => {
      this.contractInstance = instance;
      // Show the app UI
      this.showApp();
    }).catch(error => {
      this.setError(error);
    });
  }

  /**
   * Configure the UI to show or hide an error
   * @param {error | null} error error to show in the UI, or null to clear.
   */
  setError(error) {
    if (error) {
      this.errorContainer.innerHTML = error;
      console.error(error);
    } else {
      this.errorContainer.innerHTML = '';
    }
  }

  /**
   * Show the main app (logged in) UI
   */
  showApp() {
    this.signedOutContainer.style.display = 'none';
    this.signedInContainer.style.display = 'block';
    // From this point, you should be able to interact with web3 and contractInstance
    this.web3.eth.getAccounts().then(accounts => {
      this.currentAccount = accounts[0];
      if (accounts[0]) {
        this.walletAddressContainer.innerHTML = accounts[0];
      } else {
        console.log('no address found');
      }
    }).catch(error => {
      this.setError(error);
    });
  }

  /**
   * Show the logged out UI
   */
  showLoginButton() {
    this.signedOutContainer.style.display = 'block';
    this.signedInContainer.style.display = 'none';
  }

  /**
   * Signs the current user out of Bitski and updates the UI.
   */
  signOut() {
    this.bitski.signOut().then(() => {
      this.contractInstance = null;
      this.showLoginButton();
    }).catch(err => {
      this.setError(err);
    });
  }
}
