process.env.NODE_ENV = 'production';
process.env.TARGET = 'server';

const startLog = '/**\n' +
            ` * NODE_ENV: ${process.env.NODE_ENV}\n` +
            ` * TARGET  : ${process.env.TARGET}\n` +
            ' * TASK    : build\n' +
            ' **/\n';
console.log(startLog);

const _webpack = require('./_webpack');
const _compass = require('./_compass');

function build() {
  require('./clean')
  .then(() => {
    return _webpack.build();
  })
  .then(() => {
    return _compass.compile();
  });
}

build();