'use strict'

var through = require('through2')
var gutil = require('gulp-util')
var ejs = require('ejs')
var path = require('path')
var assign = require('object-assign')

module.exports = function (data, options, settings, root) {
  data = data || {}
  options = options || {}
  settings = settings || {}

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      this.push(file)
      return cb()
    }

    if (file.isStream()) {
      this.emit(
        'error',
        new gutil.PluginError('gulp-ejs', 'Streaming not supported')
      )
    }

    data = assign({}, data, file.data)
    // customize
    root = root || file.path
    const dir = path.relative(file.path, root).match(/\//g)
    if (!dir) {
        data.ROOT_DIR = ''
    } else {
        data.ROOT_DIR = dir.map(slash => {
            return '..' + slash
        }).join('')
    }
    options.filename = file.path

    try {
      file.contents = new Buffer(
        ejs.render(file.contents.toString(), data, options)
      )

      if (typeof settings.ext !== 'undefined') {
        file.path = gutil.replaceExtension(file.path, settings.ext)
      }
    } catch (err) {
      this.emit('error', new gutil.PluginError('gulp-ejs', err.toString()))
    }

    this.push(file)
    cb()
  })
}