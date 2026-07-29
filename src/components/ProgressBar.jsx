function ProgressBar({ value = 0, label, max = 100 }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="space-y-2">
      {label ? (
        <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
          <span>{label}</span>
          <span>{percentage.toFixed(0)}%</span>
        </div>
      ) : null}
      <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
