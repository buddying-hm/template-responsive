import assert from 'assert';

describe('sample', () => {
  it('sample', () => {
    document.body.innerHTML = __html__['test/sample/index.test.html'];

    let elem = document.getElementById('container');
    assert.strictEqual(elem.innerText, 'i am containers');
  });
});
