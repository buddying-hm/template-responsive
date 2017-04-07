const gulp = require('gulp');
const beautify = require('gulp-html-beautify');
const ejs = require('./custom-gulp-ejs');
const p_path = require('./p_path');

const _view = `${p_path.ROOT}/_view`;

const FILE = [
  `${_view}/**/*.ejs`,
  `!${_view}/**/_*.ejs`
];

const _ejs = {
  compile() {
    console.log('---ejs compile start---');
    gulp.src(FILE)
        .pipe(ejs({}, {}, { ext: '.html' }, _view))
        .pipe(beautify())
        .pipe(gulp.dest(`${p_path.ROOT}/markup`));
  },

  watch() {
    const chokidar = require('chokidar');
    const watcher = chokidar.watch(_view);

    _ejs.compile();
    console.log('---ejs watch start...');
    watcher.on('change', () => {
      _ejs.compile();
    });
  }
};

module.exports = _ejs;