/**
 * サムネイルなど、縦長か横長か判断してトリミングする
 * 依存: jquery
 */

export default class ImageTrimmer {
  constructor(wrapperSelector) {
    this.boxes = [];
    $(wrapperSelector).each(function() {
      const box = new Box($(this));
      this.boxes.push(box);
    })

    $(window).on('load resize', () => {
      this.setup();
    })
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
    if (img_par > box_par) {
      //画像が枠より横長の場合高さ100%で幅左右を切る
      this.autoWidth();
    } else {
      //画像が枠より縦長または同じの場合幅100%にして高さの上下を切る
      this.autoHeight();
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
}
