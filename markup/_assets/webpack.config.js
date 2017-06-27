const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const autoprefixer = require('autoprefixer');

const p_path = require('../tasks/lib/p_path');

process.noDeprecation = true;

const webpackConf = [
  // [0] js and img
  {
    context: `${p_path._assets}/js`,
    entry: {
      common: './common.js'
    },
    output: {
      path: p_path.output.js,
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
        { from: `${p_path._assets}/img`, to: p_path.output.img }
      ]),
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
  },
  // [1] scss
  {
    context: `${p_path._assets}/scss`,
    entry: {
      style: './style.scss'
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
            use: ['css-loader', 'postcss-loader']
          })
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true
                }
              },
              { loader: 'postcss-loader' },
              {
                loader: 'sass-loader',
                options: {
                  outputStyle: 'compact',
                  sourceMap: true
                }
              }
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
          autoprefixer({ browsers: ['last 2 versions'] })
        ]
      }
    })
    ]
  }
];

if (process.env.NODE_ENV === 'production') {
  // js and img
  webpackConf[0].plugins.push(new webpack.optimize.UglifyJsPlugin());
  webpackConf[0].plugins.push(new webpack.DefinePlugin({ 'process.env': {NODE_ENV: 'production'} }));
} else {
  // js and img
  webpackConf[0].devtool = 'inline-source-map';
  // scss
  webpackConf[1].devtool = 'inline-source-map';
}

if (process.env.TASK !== 'watch') {
  webpackConf[0].plugins.push(new WebpackCleanupPlugin());
  webpackConf[1].plugins.push(new WebpackCleanupPlugin());
}

module.exports = webpackConf;