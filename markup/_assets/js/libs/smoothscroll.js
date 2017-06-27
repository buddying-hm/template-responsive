/**
 * #で始まるアンカーをクリックした場合に処理
 * 依存: jquery
 * スクロールの速度: ミリ秒
 */
export default function smoothScroll(param) {
  const scrollSpeed = param.speed || 400;
  
  $('a[href^="#"]').on('click', function() {
    const href= $(this).attr('href');
    const target = $(href === '#' || href === '' ? 'html' : href);
    const position = target.offset().top;
    $('body,html').animate({scrollTop:position}, scrollSpeed, 'swing');
    return;
  })
}
