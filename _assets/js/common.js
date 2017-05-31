import preventPcTelLink from './libs/prevent-pc-tel-link';
import smoothscroll from './libs/smoothscroll';
import ImageTrimming from './libs/image-trimming';

function main() {
  smoothscroll(400);
  preventPcTelLink();
  const hoge = new ImageTrimming('.box');
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
