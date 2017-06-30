const webpack = require('webpack');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const webpackJsConfig = require('./webpack.js-config');
const webpackCssConfig = require('./webpack.css-config');

process.noDeprecation = true;

if (process.env.NODE_ENV === 'production') {
  webpackJsConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());
  webpackJsConfig.plugins.push(new webpack.DefinePlugin({ 'process.env': { NODE_ENV: 'production' } }));
} else {
  webpackJsConfig.devtool = 'inline-source-map';
  webpackCssConfig.devtool = 'inline-source-map';
}

if (process.env.TASK !== 'watch') {
  webpackJsConfig.plugins.push(new WebpackCleanupPlugin());
  webpackCssConfig.plugins.push(new WebpackCleanupPlugin());
}

const webpackConf = [webpackJsConfig, webpackCssConfig];

module.exports = webpackConf;
