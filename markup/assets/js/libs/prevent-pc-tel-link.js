/**
 * pcの時はtelリンクのイベントを発動しない
 * ※DOM読み込みの後に関数を実行する
 */
import Device from './device';

export default function preventPcTelLink() {
  if (Device.isPC) {
    const telLinks = document.querySelectorAll('a[href^="tel:"]');

    for (let i = 0; i < telLinks.length; i++) {
      telLinks[i].addEventListener('click', e => {
        e.preventDefault();
      });
    }
  }
}
