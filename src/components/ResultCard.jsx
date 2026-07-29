function ResultCard({ title, value, subtitle, badge, badgeClass = '', accent = 'cyan', children }) {
  const accentMap = {
    cyan: 'from-cyan-500/15 to-blue-500/10 border-cyan-200/70 dark:border-cyan-500/20',
    emerald: 'from-emerald-500/15 to-teal-500/10 border-emerald-200/70 dark:border-emerald-500/20',
    amber: 'from-amber-500/15 to-orange-500/10 border-amber-200/70 dark:border-amber-500/20',
    rose: 'from-rose-500/15 to-pink-500/10 border-rose-200/70 dark:border-rose-500/20',
  };

  return (
    <div className={`rounded-3xl border bg-gradient-to-br p-6 ${accentMap[accent] || accentMap.cyan}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{title}</p>
          <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {value}
          </h3>
          {subtitle ? <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{subtitle}</p> : null}
        </div>
        {badge ? <span className={`metric-pill ${badgeClass}`.trim()}>{badge}</span> : null}
      </div>
      {children ? <div className="mt-5">{children}</div> : null}
    </div>
  );
}

export default ResultCard;
