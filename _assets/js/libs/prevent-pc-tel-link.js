/**
 * pcの時はtelリンクのイベントを発動しない
 * ※DOM読み込みの後に関数を実行する
 */
const ua = navigator.userAgent.toLowerCase();
const isTablet = !!ua.match(/(ipad)/);
const isMobile = !!ua.match(/(iphone|ipod|android)/);
const isPC     = !isTablet && !isMobile;

export default function preventPcTelLink() {
  if (isPC) {
    const telLinks = document.querySelectorAll('a[href^="tel:"]');
    for (let i = 0; i < telLinks.length; i++) {
      telLinks[i].addEventListener('click', e => {
        e.preventDefault();
      });
    }
  }
}
