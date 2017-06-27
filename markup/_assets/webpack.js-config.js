const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const p_path = require('../tasks/lib/p_path');

const webpackConf = {
  context: `${p_path._assets}/js`,
  entry: {
    common: ['babel-polyfill', './common.js']
  },
  output: {
    path: p_path.output.js,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new CopyWebpackPlugin([
      { from: `${p_path._assets}/img`, to: p_path.output.img }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          { loader: 'babel-loader', options: { presets: ['es2015'] } }
        ]
      }
    ]
  }
};

module.exports = webpackConf;
