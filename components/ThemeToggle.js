'use client';
import { useSyncExternalStore } from 'react';
import { readStoredTheme, applyTheme, subscribeToTheme, getServerTheme } from '@/lib/theme';

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, readStoredTheme, getServerTheme);

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    applyTheme(next);
  };

  return <button id="themeToggle" onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}><i className={`fas fa-${theme === 'dark' ? 'sun' : 'moon'}`} aria-hidden="true"/></button>;
}
