/**
 * デバイス判定
 */
class Device {
  constructor() {
    this.ua = navigator.userAgent.toLowerCase();
  }

  get isTablet() { return !!this.ua.match(/(ipad)/); }
  get isMobile() { return !!this.ua.match(/(iphone|ipod|android)/); }
  get isPC() { return !this.isTablet && !this.isMobile; }

  get isMSIE() { return this.ua.indexOf('msie') > -1 && this.ua.indexOf('opera') === -1; }
  get isIE11() { return this.ua.indexOf('trident/7') > -1; }
  get isIE() { return this.isMSIE || this.isIE11; }
  get isEdge() { return this.ua.indexOf('edge') > -1; }

  get isChrome() { return this.ua.indexOf('chrome') > -1 && this.ua.indexOf('edge') == -1; }
  get isFirefox() { return this.ua.indexOf('firefox') > -1; }
  get isSafari() { return this.ua.indexOf('safari') > -1 && this.ua.indexOf('chrome') == -1; }
  get isOpera() { return this.ua.indexOf('opera') > -1; }
}

export default new Device();
