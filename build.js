const spawn = require('child_process').spawn
const clean = require('./clean.js')

process.env.OUTPUT = 'server'
process.env.NODE_ENV = 'production'

// script
function buildScript() {
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
function buildStyle() {
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

// clean()
buildScript()
buildStyle()