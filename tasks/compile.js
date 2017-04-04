const spawn = require('child_process').spawn
const clean = require('./clean.js')

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
function compileScript() {
  // webpack --config ./_assets/webpack.config.js --color
  const webpack = spawn('webpack', ['--config', `${__dirname}/_assets/webpack.config.js`, '--color'])
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
function compileStyle() {
  // node ./_style/compass compile
  const compass = spawn('node', [`${__dirname}/_assets/compass.js`, 'compile'])
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
    compile.on('close', () => {
      console.log('---ejs:close---\n')
    })
  }
}

// clean()
compileScript()
compileStyle()
if (process.env.OUTPUT === 'markup') {
  ejs.compile()
}