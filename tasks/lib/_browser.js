const browserSync = require('browser-sync').create();
const p_path = require('./p_path');

const markup = `${p_path.root}/markup`;

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

class _browser {
  constructor() {
    this.timer = new DelayTimer();
  }

  start() {
    browserSync.init({
      server: { baseDir: markup }
    });

    const chokidar = require('chokidar');
    const watcher = chokidar.watch([`${markup}/**/*`, `!${markup}/**/*.css.map`]);
    watcher.on('change', this.timer.start);
  }
}

module.exports = new _browser();