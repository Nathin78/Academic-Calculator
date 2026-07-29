import { FiMoon, FiSun } from 'react-icons/fi';

function ThemeToggle({ theme, setTheme, compact = false }) {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-cyan-300 ${
        compact ? 'w-full justify-start' : ''
      }`}
      aria-label="Toggle theme"
    >
      {isDark ? <FiSun /> : <FiMoon />}
      <span>{isDark ? 'Light' : 'Dark'} Mode</span>
    </button>
  );
}

export default ThemeToggle;
