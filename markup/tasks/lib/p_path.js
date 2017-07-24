/**
 * Project Path
 */
const path = require('path');
const pkg = require('../../package.json');

function p_path() {
  const TARGET = process.env.TARGET ? process.env.TARGET : 'markup';

  const root = path.dirname(path.resolve(__dirname, '../../package.json'));
  const context = path.join(root, pkg.output[TARGET]['context']) || root;

  return {
    root   : root,
    _assets: path.resolve(root, 'assets'),
    output : {
      root: context,
      css: path.join(context, pkg.output[TARGET]['css']),
      js : path.join(context, pkg.output[TARGET]['js']),
      img: path.join(context, pkg.output[TARGET]['img'])
    },
  }
}

module.exports = p_path();
