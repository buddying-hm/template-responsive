import preventPcTelLink from './libs/prevent-pc-tel-link';
import smoothscroll from './libs/smoothscroll';

function main() {
  smoothscroll(400);
  preventPcTelLink();
}

/**
 * reference
 * https://github.com/oneuijs/You-Dont-Need-jQuery/blob/master/README-ja.md#イベント
 */
if (document.readyState !== 'loading') {
  main();
} else {
  document.addEventListener('DOMContentLoaded', main);
}
