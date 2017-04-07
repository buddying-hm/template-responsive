const spawn = require('child_process').spawn;
const p_path = require('./p_path');

let options = [];
options.push('--sass-dir', `${p_path._assets}/scss`);
options.push('--css-dir', `${p_path.TARGET}/css`);
options.push('--images-dir', `${p_path.TARGET}/img`);
options.push('--relative-assets', '--no-line-comments', '--force', '--time');
if (process.env.NODE_ENV === 'production') {
  options.push('--output-style', 'compressed');
  options.push('--no-sourcemap');
} else {
  options.push('--output-style', 'expanded');
  options.push('--sourcemap');
}

const _compass = {
  compile() {
    console.log('---compass compile start---\n');
    options.unshift('compile');

    return new Promise((resolve, reject) => {
      const compass = spawn('compass', options)
      compass.stdout.on('data', _compass.log);
      compass.stderr.on('data', _compass.log);
      compass.on('close', code => {
        if (code === 0) {
          resolve();
        } else {
          reject();
        }
      });
    });
  },

  watch() {
    console.log('---compass watch start---\n');
    options.unshift('watch');

    const compass = spawn('compass', options);
    compass.stdout.on('data', _compass.log);
    compass.stderr.on('data', _compass.log);
    compass.on('close', () => {
      console.log('close!!!???');
    });
  },

  log(data) {
    console.log(data.toString());
  }
};

module.exports = _compass