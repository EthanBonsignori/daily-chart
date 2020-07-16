const { merge } = require('webpack-merge');
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',
  node: {
    __dirname: false,
    __filename: false,
  },
  stats: {
    colors: true,
    children: false,
    chunks: false,
    modules: false,
  },
});
