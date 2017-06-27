require('./lib/check_nodemodule');

process.env.NODE_ENV = 'production';
process.env.TARGET = 'server';
process.env.TASK = 'build';

let log = '/**\n' +
          ` * NODE_ENV: ${process.env.NODE_ENV}\n` +
          ` * TARGET  : ${process.env.TARGET}\n` +
          ` * TASK    : ${process.env.TASK}\n` +
          ' **/\n';
console.log(log);

const _webpack = require('./lib/_webpack');

function build() {
  _webpack.build();
}

build();
