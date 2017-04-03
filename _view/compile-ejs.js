const gulp = require('gulp')
const ejs = require('./custom-gulp-ejs')
const beautify = require('gulp-html-beautify')
const path = require('path')

const FILE = [
  `${__dirname}/**/*.ejs`,
  `!${__dirname}/**/_*.ejs`
]
const dest = path.resolve(__dirname, '../markup')

console.log('ejs compile start')
gulp.src(FILE)
  .pipe(ejs({}, {}, { ext: '.html' }, __dirname))
  .pipe(beautify())
  .pipe(gulp.dest(dest))