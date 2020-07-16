const path = require('path');
const { merge } = require('webpack-merge');
const { spawn } = require('child_process');
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  node: {
    __dirname: true,
    __filename: true,
  },
  devtool: 'cheap-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    stats: {
      colors: true,
      chunks: false,
      children: false,
    },
    before() {
      spawn(
        'electron',
        ['.'],
        { shell: true, env: process.env, stdio: 'inherit' }
      )
        .on('close', code => process.exit(0))
        .on('error', spawnError => console.error(spawnError));
    },
  },
});
