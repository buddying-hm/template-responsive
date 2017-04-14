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

const startLog = '/**\n' +
                 ` * NODE_ENV: ${process.env.NODE_ENV}\n` +
                 ` * TARGET  : ${process.env.TARGET}\n` +
                 ' * TASK    : watch\n' +
                 ' **/\n';
console.log(startLog);

const _webpack = require('./_webpack');
// const _compass = require('./_compass');
const _ejs = require('./_ejs');
const _browser = require('./_browser');

function watch() {
  require('./clean')
  .then(() => {
    return _ejs.watch();
    // return _compass.watch();
  })
  .then(() => {
    return _webpack.watch();
  })
  .then(() => {
    _browser.start();
  })
  .catch((mes) => {
    console.log(mes);
  });
}

watch();