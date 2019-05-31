const webpack = require('webpack');
const path = require('path');
const BitskiConfig = require('./bitski.config.js');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = () => {
  // Configuration options
  const environment = process.env.NODE_ENV || 'development';
  const bitskiClientId = BitskiConfig.app.id;
  const bitskiRedirectURL = BitskiConfig.environments[environment].redirectURL;
  const network = BitskiConfig.environments[environment].network;
  const providerRPCUrl = network.rpcUrl;
  const providerChainId = network.chainId;

  // Generate a source-map only for development builds
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
      new CopyWebpackPlugin([
        {
        from: 'public',
          to: 'public'
        }
      ]),
      new webpack.DefinePlugin({
        'PROVIDER_RPC_URL': JSON.stringify(providerRPCUrl),
        'PROVIDER_CHAIN_ID': JSON.stringify(providerChainId),
        'BITSKI_CLIENT_ID': JSON.stringify(bitskiClientId),
        'BITSKI_REDIRECT_URL': JSON.stringify(bitskiRedirectURL)
      })
    ]
  };
};
