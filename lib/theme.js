export const THEME_STORAGE_KEY = 'nk-theme';

export function readStoredTheme() {
  if (typeof document === 'undefined') return 'dark';

  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {}

  return document.documentElement?.dataset?.theme === 'dark' ? 'dark' : 'light';
}

export function applyTheme(nextTheme) {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.theme = nextTheme;
  try { localStorage.setItem(THEME_STORAGE_KEY, nextTheme); } catch {}
  if (typeof window !== 'undefined') window.dispatchEvent(new Event('portfolio:theme-change'));
}

export function subscribeToTheme(callback) {
  window.addEventListener('portfolio:theme-change', callback);
  return () => window.removeEventListener('portfolio:theme-change', callback);
}

export function getServerTheme() {
  return 'dark';
}
