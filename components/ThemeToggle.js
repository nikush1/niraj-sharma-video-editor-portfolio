'use client';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('nk-theme');
    const initial = saved || (window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
    setTheme(initial);
  }, []);

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('nk-theme', next);
  };

  return (
    <div
      id="themeToggle"
      role="button"
      aria-label="Toggle light / dark mode"
      tabIndex={0}
      onClick={toggle}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } }}
    >
      <div className="tt-track">
        <div className="tt-icon tt-sun" aria-hidden="true"><i className="fas fa-sun" /></div>
        <div className="tt-pill" aria-hidden="true"><div className="tt-dot" /></div>
        <div className="tt-icon tt-moon" aria-hidden="true"><i className="fas fa-moon" /></div>
      </div>
      <span className="tt-label" id="ttLabel">{theme === 'light' ? 'Light' : 'Dark'}</span>
    </div>
  );
}
