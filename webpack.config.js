const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  mode: 'development',
  module: {
    rules: [{
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: false
        },
      }]
    },]
  },
  // plugins: [
  //   new HtmlWebPackPlugin({
  //     template: '.src/index.html',
  //     filename: './index.html'
  //   }),
  // ],
  devServer: {
    compress: true,
    port: 3000,
  },
};
