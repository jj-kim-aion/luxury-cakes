/**
 * Inline theme initializer — runs before paint to avoid FOUC.
 * Reads `maison-theme` from localStorage or falls back to prefers-color-scheme.
 */
export function ThemeScript() {
  const code = `
    (function() {
      try {
        var stored = localStorage.getItem('maison-theme');
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        var theme = stored || (prefersDark ? 'dark' : 'light');
        if (theme === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
      } catch (e) {}
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
