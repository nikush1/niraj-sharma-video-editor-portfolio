import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { readStoredTheme } from '../lib/theme.js';

test('theme toggle reflects the saved user preference in rendered markup', () => {
  const storage = new Map([['nk-theme', 'dark']]);
  Object.defineProperty(globalThis, 'localStorage', {
    value: {
      getItem(key) { return storage.has(key) ? storage.get(key) : null; },
      setItem(key, value) { storage.set(key, String(value)); },
      removeItem(key) { storage.delete(key); },
    },
    configurable: true,
    writable: true,
  });

  Object.defineProperty(globalThis, 'document', {
    value: {
      documentElement: { dataset: { theme: 'light' } },
      body: { style: { overflow: '' } },
    },
    configurable: true,
    writable: true,
  });

  function ThemeToggle() {
    const theme = React.useState(() => readStoredTheme())[0];
    return React.createElement(
      'button',
      {
        id: 'themeToggle',
        'aria-label': `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`,
        title: `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`,
      },
      React.createElement('i', {
        className: `fas fa-${theme === 'dark' ? 'sun' : 'moon'}`,
        'aria-hidden': 'true',
      })
    );
  }

  const html = renderToStaticMarkup(React.createElement(ThemeToggle));
  assert.match(html, /aria-label="Switch to light theme"/);
  assert.match(html, /fa-sun/);

  delete globalThis.document;
  delete globalThis.localStorage;
});
