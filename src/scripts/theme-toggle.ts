const KEY = 'dfir-theme';

function apply(theme: 'light' | 'dark') {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

function currentTheme(): 'light' | 'dark' {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement | null;
  if (!target) return;
  const btn = target.closest('[data-theme-toggle]') as HTMLElement | null;
  if (!btn) return;
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  apply(next);
  try { localStorage.setItem(KEY, next); } catch { /* ignore */ }
});
