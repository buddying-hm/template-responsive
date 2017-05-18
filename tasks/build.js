require('./lib/check_nodemodule');

process.env.NODE_ENV = 'production';
process.env.TARGET = 'server';

const startLog = '/**\n' +
            ` * NODE_ENV: ${process.env.NODE_ENV}\n` +
            ` * TARGET  : ${process.env.TARGET}\n` +
            ' * TASK    : build\n' +
            ' **/\n';
console.log(startLog);

const _webpack = require('./lib/_webpack');

function build() {
  _webpack.build();
}

build();
