require('./lib/check_nodemodule');

process.env.NODE_ENV = 'development';
process.env.TASK = 'watch';

switch(process.argv[2]) {
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
const _browser = require('./lib/_browser');

function watch() {
  if (process.env.TARGET === 'markup') {
    _ejs.watch()
    .then(() => _webpack.watch())
    .then(_browser.start)
  } else {
    _webpack.watch();
  }
}

watch();
