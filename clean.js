const del = require('del')
const path = require('path')
const config = require('./package.json').config

function clean() {
  const configRoot = path.dirname(path.resolve(__dirname, 'package.json'))
  const assetsPath = process.env.OUTPUT ?
                     path.join(configRoot, config[`${process.env.OUTPUT}_assets_path`]) :
                     false

  if (!assetsPath) return

  console.log('---cleaning---\n')
  let fileList
  switch(process.env.OUTPUT) {
    case 'markup':
      fileList = [`${__dirname}/markup/**/*`, `!${__dirname}/markup/**/.*`]
      break
    default:
      fileList = [assetsPath]
      break
  }

  del(fileList).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'), '\n')
  })
}

module.exports = clean