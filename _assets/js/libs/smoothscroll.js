/**
 * #で始まるアンカーをクリックした場合に処理
 * 依存: jquery
 * スクロールの速度: ミリ秒
 */
export default function smoothScroll(param) {
  $('a[href^="#"]').click(() => {
    const scrollSpeed = param.speed || 400
    const href= $(this).attr('href')
    const target = $(href === '#' || href === '' ? 'html' : href)
    const position = target.offset().top
    $('body,html').animate({scrollTop:position}, scrollSpeed, 'swing')
    return
  })
}