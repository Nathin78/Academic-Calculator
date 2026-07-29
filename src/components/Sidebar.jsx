import { NavLink } from 'react-router-dom';
import { FiHome, FiGrid, FiBarChart2, FiBookOpen, FiInfo } from 'react-icons/fi';

const items = [
  { to: '/', icon: FiHome, label: 'Home' },
  { to: '/cutoff-calculator', icon: FiGrid, label: 'Cut-off' },
  { to: '/sgpa-calculator', icon: FiBarChart2, label: 'SGPA' },
  { to: '/cgpa-calculator', icon: FiBookOpen, label: 'CGPA' },
  { to: '/about', icon: FiInfo, label: 'About' },
];

function Sidebar() {
  return (
    <aside className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <div className="glass flex flex-col items-center gap-3 rounded-full p-3 shadow-2xl shadow-slate-900/10">
        {items.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `group relative flex h-11 w-11 items-center justify-center rounded-full transition ${
                isActive
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-cyan-600 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-cyan-300'
              }`
            }
            aria-label={label}
          >
            <Icon />
          </NavLink>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
