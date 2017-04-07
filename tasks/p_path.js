/**
 * Project Path
 */
const path = require('path');
const pkg = require('../package.json');

const TARGET = process.env.TARGET ? process.env.TARGET : 'markup';
const PROJECT_ROOT = path.dirname(path.resolve(__dirname, '../package.json'));
const targetPath = process.env.NODE_ENV === 'production' ?
                   path.join(PROJECT_ROOT, pkg.config.server_assets_path) :
                   path.join(PROJECT_ROOT, pkg.config[`${TARGET}_assets_path`]) || '';

module.exports = {
  ROOT   : PROJECT_ROOT,
  TARGET : targetPath,
  SERVER : pkg.config.server_assets_path,
  MARKUP : pkg.config.markup_assets_path,
  _assets: path.resolve(__dirname, '../_assets'),
};