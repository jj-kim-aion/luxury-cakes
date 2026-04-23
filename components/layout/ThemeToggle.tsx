'use client';

import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    setTheme(current);
  }, []);

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    try {
      localStorage.setItem('maison-theme', next);
    } catch {}
  }

  // Avoid mismatch: render a stable placeholder until mounted.
  if (!theme) {
    return (
      <button
        aria-label="Toggle theme"
        className="h-9 w-9 border border-[color:var(--rule)] flex items-center justify-center text-xs"
      >
        ◐
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="h-9 w-9 border border-[color:var(--rule)] flex items-center justify-center text-sm
                 transition-colors duration-300 hover:border-[color:var(--fg)]
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)]"
    >
      <span aria-hidden="true">{theme === 'dark' ? '☾' : '☀'}</span>
    </button>
  );
}
