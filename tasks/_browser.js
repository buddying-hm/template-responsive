const browserSync = require('browser-sync').create();
const p_path = require('./p_path');

const markup = `${p_path.ROOT}/markup`;

class DelayTimer {
  constructor() {
    this.isStart = false
  }

  start() {
    if (this.isStart) return;

    this.isStart = true;
    setTimeout(() => {
      browserSync.reload();
      this.isStart = false;
    }, 1000);
  }
}

const _browser = {
  start() {
    const timer = new DelayTimer();
    browserSync.init({
      server: { baseDir: markup }
    });

    const chokidar = require('chokidar');
    const watcher = chokidar.watch([`${markup}/**/*`, `!${markup}/**/*.css.map`]);
    watcher.on('change', timer.start);
  }
}

module.exports = _browser;