const webpack = require('webpack');
const path = require('path');
const BitskiConfig = require('./bitski.config.js');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = () => {
  // Configuration options
  const environment = process.env.NODE_ENV || 'development';
  const currentNetwork = BitskiConfig.environments[environment].network;
  const bitskiClientId = BitskiConfig.app.id;
  const bitskiNetworkId = BitskiConfig.networkIds[currentNetwork];
  const bitskiRedirectURL = BitskiConfig.environments[environment].redirectURL;
  const devtool = environment == 'development' ? 'source-map' : false;

  return {
    devtool: devtool,
    entry: './app/index.js',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      ]
    },
    plugins: [
      new HTMLWebpackPlugin({
        title: 'My App',
        template: './app/index.html',
        hash: true
      }),
      new HTMLWebpackPlugin({
        title: 'My App',
        filename: 'callback.html',
        template: './app/callback.html',
        hash: true
      }),
      new CopyWebpackPlugin([
        {
        from: 'public',
          to: 'public'
        }
      ]),
      new webpack.DefinePlugin({
        'BITSKI_PROVIDER_ID': JSON.stringify(bitskiNetworkId),
        'BITSKI_CLIENT_ID': JSON.stringify(bitskiClientId),
        'BITSKI_REDIRECT_URL': JSON.stringify(bitskiRedirectURL)
      })
    ]
  }
};
