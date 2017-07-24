require('./lib/check_nodemodule');

process.env.NODE_ENV = 'development';
process.env.TASK = 'compile';

switch (process.argv[2]) {
  case 's':
  case 'server':
  case '-s':
  case '--server':
    process.env.TARGET = 'server';
    break;
  case 'm':
  case 'markup':
  case '-m':
  case '--markup':
  default:
    process.env.TARGET = 'markup';
    break;
}

let log = '/**\n' +
          ` * NODE_ENV: ${process.env.NODE_ENV}\n` +
          ` * TARGET  : ${process.env.TARGET}\n` +
          ` * TASK    : ${process.env.TASK}\n` +
          ' **/\n';
console.log(log);

const _ejs = require('./lib/_ejs');
const _webpack = require('./lib/_webpack');

if (process.env.TARGET === 'markup') {
  _ejs.compile()
  .then(() => {
    _webpack.compile()
  });
} else {
  _webpack.compile();
}
