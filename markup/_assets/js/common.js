function main() {
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
