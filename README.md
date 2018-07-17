# Bitski Dapp Quickstart

## Project structure

`app/` | vanilla javascript front-end app that simply signs in and shows you the user's address. customize this with your own app.
`build/` | the compiled json metadata for your contracts. import these files in your dapp to interact with your contracts.
`contracts/` | solidity source code
`migrations/` | truffle migrations data
`public/` | static files to be served
`test/` | truffle tests
`package.json` | metadata about this project. customize with your details.
`truffle.js` | configuration file for truffle. customize with your app wallet details.
`truffle-config.js` | configuration file for truffle (Windows version). customize with your app wallet details if you use a Windows environment.
`webpack.config.js` | configuration for webpack. customize with your Bitski client id.

## Setup

Install the dependencies:

```
npm install
```

## Creating your Client ID

You'll need a Bitski client id to run this app. Your client id provides some basic information to users about your application, and links various permissions granted by the user to your app.

Visit Bitski's developer portal and create a client id.

https://developer.bitski.com

Then you'll also want to add a redirect URL for localhost, where we'll be running the app locally.

(Image of form)

http://localhost:3000/callback.html

## Developing locally

This example uses webpack to combine some simple static files and vanilla javascript. Locally we'll use webpack-dev-server to run the app.

First, start Truffle's development blockchain:

```
truffle develop
```

Then, in a new terminal window, run the development web server:

```
npm run dev
```

Visit http://localhost:3000 to run the app. Changes to the app will automatically trigger a reload of the page.

## Deploying to Heroku

This template is designed to also be easy to deploy on Heroku for live demos. The server is powered by `server.js`, a simple Express app that routes the files created by webpack.

First, you'll want to deploy your contract on public blockchain. Verify your config information is correct, then run:

```
truffle migrate --network live
```

Next, make sure you have heroku-cli installed, then create a new Heroku app:

```
heroku create
```

Important! Now that you have a dedicated URL for your app, update your redirect url in the developer portal to include your new domain (https://my-app.herokuapp.com/callback.html)

To deploy your app, first commit your latest changes:

```
git add .
git commit -m "Made some changes"
```

Then, push to Heroku:

```
git push heroku master
```

Finally, check out your live site!

```
heroku open
```

Whenever you want to update the front-end application, simply commit your changes and push to heroku again.
