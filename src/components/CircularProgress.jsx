function CircularProgress({ value = 0, max = 10, size = 140, strokeWidth = 12, label = 'Progress' }) {
  const normalized = Math.min(max, Math.max(0, value));
  const percentage = (normalized / max) * 100;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width={size} height={size} className="-rotate-90 transform">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="fill-none stroke-slate-200 dark:stroke-slate-800"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="fill-none stroke-cyan-500 transition-all duration-700"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="-mt-[92px] flex flex-col items-center">
        <span className="text-3xl font-bold text-slate-900 dark:text-white">{normalized.toFixed(2)}</span>
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
          {label}
        </span>
      </div>
    </div>
  );
}

export default CircularProgress;
