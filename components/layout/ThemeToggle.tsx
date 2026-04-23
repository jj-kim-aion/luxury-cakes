'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

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

  // Stable SSR placeholder — no icon until mount to prevent mismatch.
  if (!theme) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="h-10 w-10 grid place-items-center rounded-md border"
        style={{ borderColor: 'var(--border-soft)' }}
      >
        <span className="h-3 w-3 rounded-full bg-fg-muted opacity-40" aria-hidden="true" />
      </button>
    );
  }

  const Icon = theme === 'dark' ? Sun : Moon;
  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} mode`}
      className="h-10 w-10 grid place-items-center rounded-md border text-fg-primary
                 transition-colors duration-base ease-out-soft hover:border-border-strong
                 focus-visible:outline-none"
      style={{ borderColor: 'var(--border-soft)' }}
    >
      <Icon size={16} strokeWidth={1.5} aria-hidden="true" />
    </button>
  );
}
