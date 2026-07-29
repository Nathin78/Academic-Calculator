import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX, FiGrid, FiBookOpen, FiHome, FiBarChart2, FiInfo } from 'react-icons/fi';

const navItems = [
  { to: '/', label: 'Home', icon: FiHome },
  { to: '/cutoff-calculator', label: 'Cut-off Calculator', icon: FiGrid },
  { to: '/sgpa-calculator', label: 'SGPA Calculator', icon: FiBarChart2 },
  { to: '/cgpa-calculator', label: 'CGPA Calculator', icon: FiBookOpen },
  { to: '/about', label: 'About', icon: FiInfo },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-white/70 backdrop-blur-xl dark:bg-slate-950/70">
      <div className="section-shell flex h-20 items-center justify-between gap-4">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-glow">
            <FiGrid className="text-xl" />
          </div>
          <div>
            <p className="text-lg font-bold tracking-tight">Academic Calculator</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Cut-off, SGPA & CGPA</p>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `rounded-2xl px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation menu"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <div
        className={`lg:hidden ${open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden border-t border-slate-200/70 bg-white/95 transition-all duration-300 dark:border-slate-800 dark:bg-slate-950/95`}
      >
        <div className="section-shell space-y-2 py-4">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'
                }`
              }
            >
              <Icon />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
