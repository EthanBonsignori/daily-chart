const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');

const defaultInclude = path.resolve(__dirname, 'src');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        use: [{ loader: 'babel-loader' }],
        include: defaultInclude,
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [{ loader: 'file-loader?name=img/[name]__[hash:base64:5].[ext]' }],
        include: defaultInclude,
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [{ loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]' }],
        include: defaultInclude,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Daily Occurences Chart',
    }),
    new CspHtmlWebpackPlugin({
      'script-src': '\'self\'',
    }),
    new webpack.DefinePlugin({
      __static: `"${path.join(__dirname, '/static').replace(/\\/g, '\\\\')}"`,
    }),
  ],
  target: 'electron-renderer',
};
