require('./lib/check_nodemodule');

process.env.NODE_ENV = 'development';
process.env.TASK = 'clean';

const del = require('del');
const p_path = require('./lib/p_path');

function clean() {
  const cleanFiles =  [`${p_path.output.root}/**/*`, `!${p_path.output.root}/**/.*`];
  console.log('---clean up directory---');
  console.log(cleanFiles.join('\n'), '\n');
  del(cleanFiles, {force: true}).then(() => {
    console.log('---cleaning finished---');
  });
}

clean();
