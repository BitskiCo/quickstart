// Simple example app that demonstrates sign in, sign out, using web3,
// and initializing contracts from truffle.

import { Bitski } from 'bitski';
import Contract from './contract';

// Import any contracts you want to use from the build folder.
// Here we've imported the sample contract.
import artifacts from '../build/contracts/MyContract.json';

export default class App {
  /**
   * Creates the app.
   */
  constructor() {
    // Initialize bitski and web3
    this.bitski = new Bitski(BITSKI_CLIENT_ID, BITSKI_REDIRECT_URL);
    this.web3 = this.bitski.getWeb3(BITSKI_PROVIDER_ID);
    // Initialize the sample contract
    this.contract = new Contract(this.web3, artifacts);
  }

  /**
   * Starts the application.
   */
  start() {
    // Check if this is the callback page - if so, notify Bitski SDK
    if (window.location.href === BITSKI_REDIRECT_URL) {
      this.bitski.signInCallback();
      return;
    }
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
    this.connectButton = this.bitski.getConnectButton(connectElement);
    this.connectButton.callback = (error, user) => {
      if (error) {
        this.setError(error);
      }
      this.validateUser(user);
    }
    // Set up log out button
    this.logOutButton = document.getElementById('log-out');
    this.logOutButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.signOut();
    });
  }

  /**
   * Checks whether or not the user is current logged in to Bitski.
   */
  checkLoggedInStatus() {
    this.bitski.getUser().then(user => {
      this.toggleLoading(false);
      this.validateUser(user);
    }).catch(error => {
      this.toggleLoading(false);
      this.setError(error);
      showLoginButton();
    });
  }

  /**
   * Toggles the loading state
   * @param {boolean} show whether or not to show the loading state
   */
  toggleLoading(show) {
    this.loadingContainer.style.display = show === true ? 'block' : 'none';
  }

  /**
   * Checks whether or not the user we received is valid, and configures the UI.
   * @param {Object} user the user returned from Bitski.getUser() or Bitski.signIn()
   */
  validateUser(user) {
    if (user && !user.expired) {
      //Set up the contract
      this.contract.deployed().then(instance => {
        this.contractInstance = instance;
        // Show the app UI
        this.showApp();
      }).catch(error => {
        this.setError(error);
      });
    } else {
      this.showLoginButton();
    }
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
        console.log('no address found')
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
    this.bitski.userManager.removeUser();
    this.contractInstance = null;
    this.showLoginButton();
  }
}
