const path = require('path')
const spawn = require('child_process').spawn
const config = require('../package.json').config

;(function main() {
  const output = process.env.OUTPUT ? process.env.OUTPUT : 'markup'
  const configRoot = path.dirname(path.resolve(__dirname, '../package.json'))
  const assetsPath = process.env.NODE_ENV === 'production' ?
                   path.join(configRoot, config.server_assets_path) :
                   path.join(configRoot, config[`${output}_assets_path`]) || ''

  if (!assetsPath) {
    console.error(`出力先パスエラー server_assets_path-> ${assetsPath}`)
    return
  }

  let options = []
  switch(process.argv[2]) {
    case 'w':
    case 'watch':
    case '-w':
    case '--watch':
      options.push('watch')
      break
    case 'c':
    case 'compile':
    case '-c':
    case '--compile':
    default:
      options.push('compile')
      break
  }
  options.push('--sass-dir', `${__dirname}/scss`)
  options.push('--css-dir', `${assetsPath}/css`)
  options.push('--images-dir', `${assetsPath}/img`)
  options.push('--relative-assets', '--no-line-comments', '--force', '--time')
  if (process.env.NODE_ENV === 'production') {
    options.push('--output-style', 'compressed')
    options.push('--no-sourcemap')
  } else {
    options.push('--output-style', 'expanded')
    options.push('--sourcemap')
  }

  const compass = spawn('compass', options)
  compass.stdout.on('data', data => {
    console.log(`${data}`)
  })
  compass.stderr.on('data', data => {
    console.error(`${data}`)
  })
})()