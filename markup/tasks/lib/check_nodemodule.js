const path = require('path');
const fs = require('fs');

const nodeModules = path.resolve(__dirname, '../../node_modules');

if (!fs.existsSync(nodeModules)) {
  throw new Error('プロジェクトルートにnode_modulesが見当たりません。プロジェクトルートで`npm run install`もしくは`yarn`コマンドを実行。詳しくはREADMEを参照してください。');
}
