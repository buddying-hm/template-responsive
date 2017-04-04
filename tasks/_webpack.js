/**
 * Reference Code
 * https://github.com/kriasoft/react-starter-kit/blob/master/tools/bundle.js
 */
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

const _webpack = {
  build() {
    console.log('---webpack compile start---\n');

    return new Promise((resolve, reject) => {
      webpack(webpackConfig).run((err, stats) => {
        if (err) {
          return reject(err);
        }

        _webpack.callback(stats);
        return resolve();
      });
    });
  },

  compile() {
    return _webpack.build();
  },

  watch() {
    return new Promise((resolve, reject) => {
      webpack(webpackConfig)
      .watch({
        /* watchOptions */
        aggregateTimeout: 300,
        poll            : undefined
      }, (err, stats) => {
        if (err) {
          return reject(err);
        }

        console.log('---webpack watch start---\n');
        _webpack.callback(stats);
        return resolve();
      });
    });
  },

  callback(stats) {
    console.log(`directory ${webpackConfig.output.path}`);
    console.log(stats.toString(webpackConfig.stats) + '\n');
  }
}

module.exports = _webpack;