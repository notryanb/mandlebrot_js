const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const ROOT_PATH = path.resolve(__dirname);

const config = {
  entry: path.resolve(ROOT_PATH, 'index.js'),
  output: {
    path: path.resolve(ROOT_PATH, 'build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: { extensions: ['.js'] },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: __dirname,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015', { modules: false }]
            ]
          }
        }]
      }
    ]
  }
}

module.exports = config;
