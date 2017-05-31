/**
 * サムネイルなど、縦長か横長か判断してトリミングする
 * 依存: jquery
 */
export default class ImageTrimmer {
  constructor(wrapperSelector) {
    var self = this;
    this.boxes = [];
    $(wrapperSelector).each(function() {
      const box = new Box($(this));
      self.boxes.push(box);
    });

    $(window).on('load resize', () => {
      this.setup();
    });
  }

  setup() {
    this.boxes.forEach(box => {
      box.setup();
    });
  }
}

class Box {
  constructor($box) {
    this.$box = $box;
    this.$img = $('img', $box);
  }

  setup() {
    const box_par = this.getAspectRatio(this.$box);
    const img_par = this.getAspectRatio(this.$img);
    if (this.isHorizon(this.$img)) {
      this.autoWidth();
    } else if (this.isVertical(this.$img)) {
      this.autoHeight();
    } else {
      if (this.isHorizon(this.$box)) {
        this.autoHeight();
      } else {
        this.autoWidth();
      }
    }

    // サイズ修正後、親が横長
    if (this.isHorizon(this.$box)) {
      if (this.$box.width() - this.$img.width() > 0) {
        this.$img.addClass('small');
      } else {
        this.$img.addClass('big');
      }
    } else {
      if (this.$box.height() - this.$img.height() > 0) {
        this.$img.addClass('small');
      } else {
        this.$img.addClass('big');
      }
    }

  }

  autoWidth() {
    this.$img.css({
      width: 'auto',
      height: '100%'
    });
  }

  autoHeight() {
    this.$img.css({
      width: '100%',
      height: 'auto'
    });
  }

  /**
   * 画像の縦横比取得関数
   * @param {jQueryElement} $elem
   */
  getAspectRatio($elem) {
    return $elem.width() / $elem.height();
  }

  isVertical($elem) {
    return $elem.height() - $elem.width() > 0;
  }

  isHorizon($elem) {
    return $elem.width() - $elem.height() > 0;
  }
}
