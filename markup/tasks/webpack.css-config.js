const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const p_path = require('./lib/p_path');

const webpackConf = {
  context: `${p_path._assets}`,
  entry: {
    style: './index.css'
  },
  output: {
    path: p_path.output.css,
    filename: '[name].css'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader'
          ]
        })
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: 'url-loader'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          // 読み込む順番大事
          require('postcss-easy-import'),
          require('postcss-cssnext')({
            browsers: ['last 2 versions']
          })
          // require('postcss-nested')
        ]
      }
    })
  ]
};

module.exports = webpackConf;
