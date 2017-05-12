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
    }, 500);
  }
}
const delayTimer = new DelayTimer();

class _browser {
  start() {
    browserSync.init({
      server: { baseDir: markup }
    });

    const chokidar = require('chokidar');
    const watcher = chokidar.watch([`${markup}/**/*`]);
    watcher.on('change', () => {
     delayTimer.start()
    });
  }
}

module.exports = new _browser();