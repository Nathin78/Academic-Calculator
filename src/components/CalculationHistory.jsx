import { FiClock, FiTrash2 } from 'react-icons/fi';

function CalculationHistory({ entries, onClear }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FiClock className="text-cyan-600 dark:text-cyan-300" />
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">Recent calculations</h2>
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Saved only in this browser.</p>
        </div>
        {entries.length > 0 ? (
          <button type="button" onClick={onClear} className="text-sm font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-300">
            <FiTrash2 className="mr-1 inline" /> Clear
          </button>
        ) : null}
      </div>

      {entries.length ? (
        <div className="mt-4 space-y-3">
          {entries.map((entry) => (
            <div key={entry.id} className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-950">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">{entry.summary}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{entry.date}</p>
              </div>
              <span className="shrink-0 text-lg font-black text-cyan-600 dark:text-cyan-300">{entry.value}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-5 rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-500 dark:bg-slate-950 dark:text-slate-400">
          Your calculated results will appear here.
        </p>
      )}
    </div>
  );
}

export default CalculationHistory;
