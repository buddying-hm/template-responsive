const del = require('del');
const p_path = require('./p_path');

function clean() {
  let fileList;
  switch(process.env.TARGET) {
    case 'markup':
      fileList = [`${p_path.ROOT}/markup/**/*`, `!${p_path.ROOT}/markup/**/.*`];
      break;
    case 'server':
      fileList = [p_path.SERVER];
      break;
    default:
      fileList = [`${p_path.ROOT}/markup/**/*`, `!${p_path.ROOT}/markup/**/.*`, p_path.SERVER, p_path.MARKUP];
      break;
  }

  console.log('---cleaning directory or files---\n');
  console.log(fileList.join('\n'), '\n');
  return new Promise((resolve, reject) => {
    del(fileList).then(() => {
      resolve();
    });
  });
}

module.exports = clean();