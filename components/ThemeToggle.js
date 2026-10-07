'use client';
import { useState, useEffect } from 'react';
export default function ThemeToggle() {
  const [theme, setTheme] = useState('dark');
  useEffect(() => { setTheme(document.documentElement.dataset.theme || 'dark'); }, []);
  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next); document.documentElement.dataset.theme = next;
    try { localStorage.setItem('nk-theme',next); } catch {}
  };
  return <button id="themeToggle" onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}><i className={`fas fa-${theme === 'dark' ? 'sun' : 'moon'}`} aria-hidden="true"/></button>;
}
