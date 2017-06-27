import test from 'ava';
import resolveLocalPath from '../resolve-local-path';


test('same root', t => {
  const from = '/root/_view';
  const to = '/root/_view/index.html';
  const result = resolveLocalPath(from, to);
  t.is(result, '.');
});

test('one floor', t => {
  const from = '/root/_view';
  const to = '/root/_view/somedir/index.html';
  const result = resolveLocalPath(from, to);
  t.is(result, '..');
});

test('two floor', t => {
  const from = '/root/_view';
  const to = '/root/_view/somedir/somedir2/index.html';
  const result = resolveLocalPath(from, to);
  t.is(result, '../..');
});

test('three floor', t => {
  const from = '/root/_view';
  const to = '/root/_view/somedir/somedir2/somedir3/index.html';
  const result = resolveLocalPath(from, to);
  t.is(result, '../../..');
});
