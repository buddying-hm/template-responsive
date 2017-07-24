/**
 * #で始まるアンカーをクリックした場合に処理
 * 依存: jquery
 * スクロールの速度: ミリ秒
 * @param {objcet} param { speed: number }
 * @returns {boolean} true
 */
export default function smoothScroll(param) {
  const scrollSpeed = param.speed || 400;

  $('a[href^="#"]').on('click', /* @this HTMLElement */ function() {
    const href = $(this).attr('href');
    const target = $(href === '#' || href === '' ? 'html' : href);
    const offset = target.offset();
    if (!offset) return;

    $('body,html').animate({ scrollTop: offset.top }, scrollSpeed, 'swing');
    return true;
  });
}
