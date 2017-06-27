'use strict'

var through = require('through2')
var gutil = require('gulp-util')
var ejs = require('ejs')
var assign = require('object-assign')
var resolveLocalPath = require('./resolve-local-path')

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
    data.ROOT_DIR = resolveLocalPath(root, file.path)

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
