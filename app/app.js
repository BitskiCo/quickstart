import { Bitski } from 'bitski';

export default class App {
  constructor() {
    //Initialize bitski and web3
    const currentURL = new URL(window.location.href);
    const redirectURL = currentURL.origin + "/callback.html";
    this.bitski = new Bitski(BITSKI_CLIENT_ID, redirectURL);
    this.web3 = this.bitski.getWeb3(BITSKI_PROVIDER_ID);
    //Store various UI elements
    this.loadingContainer = document.getElementById('loading');
    this.signedInContainer = document.getElementById('signed-in');
    this.signedOutContainer = document.getElementById('signed-out');
    this.walletAddressContainer = document.getElementById('wallet-address');
    this.errorContainer = document.getElementById('error');
    //Set up connect button
    const connectElement = document.getElementById('connect-button');
    this.connectButton = this.bitski.getConnectButton(connectElement);
    this.connectButton.callback = (error, user) => {
      if (error) {
        this.setError(error);
      }
      this.validateUser(user);
    }
    //Set up log out button
    this.logOutButton = document.getElementById('log-out');
    this.logOutButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.signOut();
    });
  }

  start() {
    if (window.location.pathname === '/callback.html') {
      console.log(window.location);
      this.bitski.signInCallback();
      return;
    }
    this.checkLoggedInStatus();
  }

  checkLoggedInStatus() {
    this.bitski.getUser().then(user => {
      this.hideLoading();
      this.validateUser(user);
    }).catch(error => {
      this.setError(error);
      showLoginButton();
    });
  }

  hideLoading() {
    this.loadingContainer.style.display = 'none';
  }

  validateUser(user) {
    if (user && !user.expired) {
      this.showApp();
    } else {
      this.showLoginButton();
    }
  }

  setError(error) {
    if (error) {
      this.errorContainer.innerHTML = error;
      console.error(error);
    }
  }

  showApp() {
    this.signedOutContainer.style.display = 'none';
    this.signedInContainer.style.display = 'block';

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

  showLoginButton() {
    this.signedOutContainer.style.display = 'block';
    this.signedInContainer.style.display = 'none';
  }

  signOut() {
    this.bitski.userManager.removeUser();
    this.showLoginButton();
  }
}
