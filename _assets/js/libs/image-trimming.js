/**
 * サムネイルなど、縦長か横長か判断してトリミングする
 * 依存: jquery
 */

export default function imageTrimming(wrapperSelector) {
  $(wrapperSelector).each(function() {
    const $box = $(this);
    const $img = $('img', this);
    const box_par = getAspectRatio($box);
    const img_par = getAspectRatio($img);
    if (img_par > box_par) {
      //画像が枠より横長の場合高さ100%で幅左右を切る
      $img.css({
        width: 'auto',
        height: '100%'
      });
    } else {
      //画像が枠より縦長または同じの場合幅100%にして高さの上下を切る
      $img.css({
        width: '100%',
        height: 'auto'
      });
    }
  });
}

/**
 * 画像の縦横比取得関数
 * @param {jQueryElement} $elem
 */
function getAspectRatio($elem) {
  return $elem.width() / $elem.height();
}
