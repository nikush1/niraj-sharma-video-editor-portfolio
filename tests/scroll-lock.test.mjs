import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const source = await readFile(new URL('../lib/bodyScrollLock.js', import.meta.url), 'utf8');
let moduleId = 0;
const fresh = () => import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}#${moduleId++}`);

test('overlapping overlays release only their own scroll lock', async () => {
  globalThis.document = {body:{style:{overflow:''}}};
  const {acquireBodyScrollLock} = await fresh();
  const releaseIntro = acquireBodyScrollLock();
  const releaseMenu = acquireBodyScrollLock();
  assert.equal(document.body.style.overflow, 'hidden');
  releaseIntro();
  assert.equal(document.body.style.overflow, 'hidden');
  releaseIntro(); // React cleanup after an already-completed intro.
  assert.equal(document.body.style.overflow, 'hidden');
  releaseMenu();
  assert.equal(document.body.style.overflow, '');
  delete globalThis.document;
});

test('reverse close order restores the original body style', async () => {
  globalThis.document = {body:{style:{overflow:'auto'}}};
  const {acquireBodyScrollLock} = await fresh();
  const releaseVideo = acquireBodyScrollLock();
  const releaseOther = acquireBodyScrollLock();
  releaseOther();
  assert.equal(document.body.style.overflow, 'hidden');
  releaseVideo();
  assert.equal(document.body.style.overflow, 'auto');
  const releaseReopened = acquireBodyScrollLock();
  releaseReopened();
  assert.equal(document.body.style.overflow, 'auto');
  delete globalThis.document;
});

test('server rendering does not access document', async () => {
  delete globalThis.document;
  const {acquireBodyScrollLock} = await fresh();
  assert.doesNotThrow(() => acquireBodyScrollLock()());
});

test('theme preference is restored from localStorage', async () => {
  const storage = new Map();
  const value = {
    getItem(key) { return storage.has(key) ? storage.get(key) : null; },
    setItem(key, nextValue) { storage.set(key, String(nextValue)); },
    removeItem(key) { storage.delete(key); },
  };
  Object.defineProperty(globalThis, 'localStorage', { value, configurable: true, writable: true });
  globalThis.document = { documentElement: { dataset: { theme: 'light' } } };

  storage.set('nk-theme', 'dark');
  const source = await readFile(new URL('../lib/theme.js', import.meta.url), 'utf8');
  const {readStoredTheme, applyTheme} = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);

  assert.equal(readStoredTheme(), 'dark');
  applyTheme('light');
  assert.equal(document.documentElement.dataset.theme, 'light');
  assert.equal(localStorage.getItem('nk-theme'), 'light');

  delete globalThis.document;
  delete globalThis.localStorage;
});
