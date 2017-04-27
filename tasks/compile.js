process.env.NODE_ENV = 'development';

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
                 ' * TASK    : compile\n' +
                 ' **/\n';
console.log(startLog);

const _webpack = require('./_webpack');
const _ejs = require('./_ejs');

// require('./clean')
// .then(() => {
//   return
// })
_webpack.compile()
.then(() => {
  if (process.env.TARGET === 'markup') {
    _ejs.compile();
  }
});
