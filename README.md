# Bitski Dapp Quickstart

## Setup

Install the dependencies:

```
npm install
```

Create a new app on Bitski's developer portal

Insert your credentials:


## Developing locally

In one terminal window run:

```
truffle develop
```

Then, in another window, run the development web server:

```
npm run dev
```

Visit localhost:3000 to run the app. Changes to the app will automatically trigger a reload of the page.

## Deploying to Heroku

```
npm run build
```

```
heroku create
```

```
heroku push
```

Update your redirect url in the developer portal to include your new domain.
