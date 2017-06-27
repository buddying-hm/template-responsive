// ２つのパスをもらい相対パスを作成
const path = require('path');

function resolveLocalPath(from, to) {
  let result = '.';
  let dirArray = path.relative(to, from).match(/\//g);
  if (dirArray) {
    result = dirArray.map(() => '..').join('/')
  }

  return result;
}

module.exports = resolveLocalPath;
