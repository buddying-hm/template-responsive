const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const config = require('../package.json').config

const output = process.env.OUTPUT ? process.env.OUTPUT : 'markup'
const configRoot = path.dirname(path.resolve(__dirname, '../package.json'))
const assetsPath = process.env.NODE_ENV === 'production' ?
                   path.join(configRoot, config.server_assets_path) :
                   path.join(configRoot, config[`${output}_assets_path`]) || ''

if (!assetsPath) {
  throw new Error(`出力先パスエラー assetsPath-> ${assetsPath}`)
}

const webpackConf = {
  context: `${__dirname}/js`,
  entry: {
    common: './common.js'
  },
  output: {
    path: `${assetsPath}/js`,
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
      { from: `${__dirname}/js/vender/**/*.js`, to: `${assetsPath}/js`, flatten: true },
      { from: `${__dirname}/img`, to: `${assetsPath}/img` }
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
  }
}

if (process.env.NODE_ENV === 'production') {
  webpackConf.plugins.push(new webpack.optimize.UglifyJsPlugin())
  webpackConf.plugins.push(new webpack.DefinePlugin({ 'process.env': {NODE_ENV: '"production"'} }))
} else {
  webpackConf.devtool = 'inline-source-map'
}

module.exports = webpackConf