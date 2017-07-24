import add from './add.js';

test('sample test', () => {
  expect(1).toBe(1);
});

test('add function test', () => {
  expect(add(1, 1)).toBe(2);
});

test('html test', () => {
  document.body.innerHTML = require('fs').readFileSync(`${__dirname}/index.test.html`).toString();

  let text = document.querySelector('#container').textContent;
  expect(text).toBe('i am container');
});
