/**
 * Reference Code
 * https://github.com/kriasoft/react-starter-kit/blob/master/tools/bundle.js
 */
const webpack = require('webpack');
const webpackConfig = require('../../config/webpack.config');

class _webpack {
  build() {
    console.log('---webpack compile start---\n');

    return new Promise((resolve, reject) => {
      webpack(webpackConfig).run((err, stats) => {
        if (err) {
          return reject(err);
        }

        this.callback(stats);
        return resolve();
      });
    });
  }

  compile() {
    return this.build();
  }

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
        this.callback(stats);
        return resolve();
      });
    });
  }

  callback(stats) {
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n');
  }
}

module.exports = new _webpack();
