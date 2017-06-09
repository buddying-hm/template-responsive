require('./lib/check_nodemodule');

const del = require('del');
const p_path = require('./lib/p_path');

function clean() {
  const cleanFiles =  [`${p_path.root}/public/**/*`, `!${p_path.root}/public/**/.*`];
  console.log('---clean up markup---');
  console.log(cleanFiles.join('\n'), '\n');
  del(cleanFiles).then(() => {
    console.log('---cleaning finished---')
  });
}

clean();
