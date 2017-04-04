const gulp = require('gulp')
const spawn = require('child_process').spawn
const browserSync = require('browser-sync').create()
const clean = require('./clean')

switch(process.argv[2]) {
  case 's':
  case 'server':
  case '-s':
  case '--server':
    process.env.OUTPUT = 'server'
    break
  case 'm':
  case 'markup':
  case '-m':
  case '--markup':
  default:
    process.env.OUTPUT = 'markup'
    break
}

// script
function watchScript() {
  // webpack -w --config ./_assets/webpack.config.js --color
  const webpack = spawn('webpack', ['-w', '--config', `${__dirname}/_assets/webpack.config.js`, '--color'])
  webpack.stdout.on('data', data => {
    console.log('---webpack:stdout---\n')
    console.log(`${data}`)
  })
  webpack.stderr.on('data', data => {
    console.log('---webpack:stderr---\n')
    console.log(`${data}`)
  })
}

// style
function watchStyle() {
  // node ./_style/compass watch
  const compass = spawn('node', [`${__dirname}/_assets/compass.js`, 'watch'])
  compass.stdout.on('data', data => {
    console.log('---compass:stdout---\n')
    console.log(`${data}`)
  })
  compass.stderr.on('data', data => {
    console.log('---compass:stderr---\n')
    console.log(`${data}`)
  })
}

// ejs
const ejs = {
  viewPath: `${__dirname}/_view`,
  compile() {
    const compile = spawn('node', [`${ejs.viewPath}/compile-ejs.js`])
    compile.stdout.on('data', data => {
      console.log('---ejs:stdout---\n')
      console.log(`${data}`)
    })
    compile.stderr.on('data', data => {
      console.log('---ejs:stderr---\n')
      console.log(`${data}`)
    })
    compile.on('close', browserSync.reload)
  },
  watch() {
    ejs.compile()
    gulp.watch(`${ejs.viewPath}/**/*.ejs`).on('change', ejs.compile)
  }
}

// browserSync
function startBrowserSync() {
  const markup = `${__dirname}/markup`
  browserSync.init({
    server: { baseDir: markup }
  })
  gulp.watch([`${markup}/**/*`, `!${markup}/**/*.html`, `!${markup}/**/*.css.map`]).on('change', browserSync.reload)
}

// clean()
watchScript()
watchStyle()
if (process.env.OUTPUT === 'markup') {
  ejs.watch()
  startBrowserSync()
}