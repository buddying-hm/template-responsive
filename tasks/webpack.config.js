const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const p_path = require('./p_path');

process.noDeprecation = true;

const webpackConf = {
  context: `${p_path._assets}/js`,
  entry: {
    common: './common.js'
  },
  output: {
    path: `${p_path.TARGET}/js`,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  plugins: [
    new webpack.ProvidePlugin({
      $     : 'jquery',
      jQuery: 'jquery',
    }),
    new CopyWebpackPlugin([
      { from: `${p_path._assets}/js/vender/**/*.js`, to: `${p_path.TARGET}/js`, flatten: true },
      { from: `${p_path._assets}/img`, to: `${p_path.TARGET}/img` }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          { loader: 'babel-loader', options: {presets: ['es2015']} }
        ]
      }
    ]
  },
  stats: {
    colors: true
  }
}

if (process.env.NODE_ENV === 'production') {
  webpackConf.plugins.push(new webpack.optimize.UglifyJsPlugin());
  webpackConf.plugins.push(new webpack.DefinePlugin({ 'process.env': {NODE_ENV: '"production"'} }));
} else {
  webpackConf.devtool = 'inline-source-map';
}

module.exports = webpackConf;