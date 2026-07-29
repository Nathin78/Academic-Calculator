import { useRef, useState } from 'react';
import { FiPlus, FiMinus, FiCopy, FiDownload, FiPrinter, FiRotateCcw, FiShare2, FiZap } from 'react-icons/fi';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import CircularProgress from '../components/CircularProgress';
import ResultCard from '../components/ResultCard';
import { calculateCgpa } from '../utils/cgpaFormula';
import { generatePdfFromElement } from '../utils/pdfGenerator';
import { getPerformanceBadgeClass } from '../utils/performance';
import { validateSemesters } from '../utils/validation';
import CalculationHistory from '../components/CalculationHistory';
import { addCalculationHistory, clearCalculationHistory, getCalculationHistory, shareOrCopyResult } from '../utils/calculationHistory';

const HISTORY_KEY = 'academic-calculator-cgpa-history';

const createSemester = (index) => ({
  id: `${Date.now()}-${index}`,
  name: `Semester ${index}`,
  sgpa: 0,
});

function CgpaCalculator() {
  const [semesters, setSemesters] = useState([createSemester(1), createSemester(2)]);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState(() => getCalculationHistory(HISTORY_KEY));
  const resultRef = useRef(null);

  const updateSemester = (id, field, value) => {
    setSemesters((prev) =>
      prev.map((semester) => (semester.id === id ? { ...semester, [field]: value } : semester)),
    );
  };

  const addSemester = () => setSemesters((prev) => [...prev, createSemester(prev.length + 1)]);
  const removeSemester = (id) =>
    setSemesters((prev) => (prev.length > 1 ? prev.filter((semester) => semester.id !== id) : prev));

  const handleCalculate = () => {
    const validationMessage = validateSemesters(semesters);
    if (validationMessage) {
      toast.error(validationMessage);
      return;
    }
    const computed = calculateCgpa(semesters);
    setResult(computed);
    setHistory(addCalculationHistory(HISTORY_KEY, {
      id: Date.now(),
      date: new Date().toLocaleString(),
      summary: `${computed.semesters.length} semesters`,
      value: computed.averageCgpa.toFixed(2),
    }));
    toast.success('CGPA calculated successfully');
  };

  const loadSample = () => {
    setSemesters([
      { id: `${Date.now()}-1`, name: 'Semester 1', sgpa: 8.2 },
      { id: `${Date.now()}-2`, name: 'Semester 2', sgpa: 8.7 },
      { id: `${Date.now()}-3`, name: 'Semester 3', sgpa: 9.1 },
    ]);
    toast('Sample semesters loaded');
  };

  const handleReset = () => {
    setSemesters([createSemester(1), createSemester(2)]);
    setResult(null);
    toast('Form reset');
  };

  const copyResult = async () => {
    if (!result) return;
    const text = `CGPA: ${result.averageCgpa}\nPercentage: ${result.percentage}%\nPerformance: ${result.performance}`;
    await navigator.clipboard.writeText(text);
    toast.success('Result copied');
  };

  const downloadPdf = async () => {
    await generatePdfFromElement(resultRef.current, 'cgpa-result');
    toast.success('PDF downloaded');
  };

  const shareResult = async () => {
    if (!result) return;
    const text = `CGPA: ${result.averageCgpa}\nPercentage: ${result.percentage}%\nPerformance: ${result.performance}`;
    const method = await shareOrCopyResult('Academic Calculator', text);
    toast.success(method === 'shared' ? 'Share sheet opened' : 'Result copied');
  };

  return (
    <section className="section-shell py-10 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="card">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-950 dark:text-white">CGPA Calculator</h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Formula: Average of semester SGPA values
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
            <div className="grid grid-cols-[1.5fr_1fr_0.4fr] gap-3 bg-slate-100 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:bg-slate-950 dark:text-slate-400">
              <span>Semester Name</span>
              <span>SGPA</span>
              <span>Action</span>
            </div>
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {semesters.map((semester, index) => (
                <div key={semester.id} className="grid grid-cols-1 gap-4 px-4 py-4 md:grid-cols-[1.5fr_1fr_0.4fr] md:items-center">
                  <div>
                    <label className="label-text">Semester {index + 1}</label>
                    <input
                      className="input-field"
                      value={semester.name}
                      onChange={(e) => updateSemester(semester.id, 'name', e.target.value)}
                      placeholder="Semester name"
                    />
                  </div>
                  <div>
                    <label className="label-text">SGPA</label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.01"
                      className="input-field"
                      value={semester.sgpa}
                      onChange={(e) => updateSemester(semester.id, 'sgpa', e.target.value)}
                    />
                  </div>
                  <div className="flex justify-start md:justify-end">
                    <button
                      type="button"
                      onClick={() => removeSemester(semester.id)}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:border-rose-300 hover:text-rose-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                    >
                      <FiMinus />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className="btn-secondary" onClick={loadSample}>
              <FiZap /> Try Sample
            </button>
            <button type="button" className="btn-secondary" onClick={addSemester}>
              <FiPlus /> Add Semester
            </button>
            <button type="button" className="btn-primary" onClick={handleCalculate}>
              Calculate
            </button>
            <button type="button" className="btn-secondary" onClick={handleReset}>
              <FiRotateCcw /> Reset
            </button>
            <button type="button" className="btn-secondary" onClick={copyResult} disabled={!result}>
              <FiCopy /> Copy
            </button>
            <button type="button" className="btn-secondary" onClick={downloadPdf} disabled={!result}>
              <FiDownload /> Download PDF
            </button>
            <button type="button" className="btn-secondary" onClick={shareResult} disabled={!result}>
              <FiShare2 /> Share
            </button>
            <button type="button" className="btn-secondary" onClick={() => window.print()} disabled={!result}>
              <FiPrinter /> Print
            </button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div ref={resultRef} className="card space-y-6">
            <ResultCard
              title="Average CGPA"
              value={result ? result.averageCgpa.toFixed(2) : '0.00'}
              subtitle={`Percentage: ${result ? result.percentage.toFixed(2) : '0.00'}%`}
              badge={result ? result.performance : 'Awaiting input'}
              badgeClass={result ? getPerformanceBadgeClass(result.performance) : 'performance-good'}
              accent="amber"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                <p className="text-sm text-slate-500 dark:text-slate-400">Percentage</p>
                <p className="mt-1 text-2xl font-bold">{result ? `${result.percentage}%` : '0%'}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                <p className="text-sm text-slate-500 dark:text-slate-400">Performance</p>
                <p className="mt-1 text-2xl font-bold">{result ? result.performance : 'Waiting'}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">Animated Circular Progress</h2>
            <div className="mt-6 flex justify-center">
              <CircularProgress value={result ? result.averageCgpa : 0} max={10} label="CGPA" />
            </div>
          </div>
          <CalculationHistory entries={history} onClear={() => { clearCalculationHistory(HISTORY_KEY); setHistory([]); }} />

          <div className="card">
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">Semester Table Summary</h2>
            <div className="mt-4 space-y-3">
              {semesters.map((semester) => (
                <div key={semester.id} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm dark:bg-slate-950">
                  <span>{semester.name}</span>
                  <span className="text-slate-500 dark:text-slate-400">SGPA {semester.sgpa || 0}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CgpaCalculator;
