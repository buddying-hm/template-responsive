import preventPcTelLink from './libs/prevent-pc-tel-link';
import smoothscroll from './libs/smoothscroll';
import FitElem from './libs/fit-elem';

/**
 * main function
 * @returns {undefined}
 */
function main() {
  smoothscroll(400);
  preventPcTelLink();
  new FitElem('.box', 'img');

  console.log('hi');
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
