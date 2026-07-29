import { useRef, useState } from 'react';
import { FiPlus, FiMinus, FiCopy, FiDownload, FiPrinter, FiRotateCcw, FiShare2, FiZap } from 'react-icons/fi';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import CircularProgress from '../components/CircularProgress';
import ResultCard from '../components/ResultCard';
import { calculateSgpa } from '../utils/sgpaFormula';
import { generatePdfFromElement } from '../utils/pdfGenerator';
import { getPerformanceBadgeClass } from '../utils/performance';
import { validateSubjects } from '../utils/validation';
import CalculationHistory from '../components/CalculationHistory';
import { addCalculationHistory, clearCalculationHistory, getCalculationHistory, shareOrCopyResult } from '../utils/calculationHistory';

const HISTORY_KEY = 'academic-calculator-sgpa-history';

const createSubject = (index) => ({
  id: `${Date.now()}-${index}`,
  name: '',
  credits: 0,
  gradePoint: 0,
});

function SgpaCalculator() {
  const [subjects, setSubjects] = useState([createSubject(1), createSubject(2)]);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState(() => getCalculationHistory(HISTORY_KEY));
  const resultRef = useRef(null);

  const updateSubject = (id, field, value) => {
    setSubjects((prev) =>
      prev.map((subject) => (subject.id === id ? { ...subject, [field]: value } : subject)),
    );
  };

  const addSubject = () => setSubjects((prev) => [...prev, createSubject(prev.length + 1)]);
  const removeSubject = (id) =>
    setSubjects((prev) => (prev.length > 1 ? prev.filter((subject) => subject.id !== id) : prev));

  const handleCalculate = () => {
    const validationMessage = validateSubjects(subjects);
    if (validationMessage) {
      toast.error(validationMessage);
      return;
    }
    const computed = calculateSgpa(subjects);
    setResult(computed);
    setHistory(addCalculationHistory(HISTORY_KEY, {
      id: Date.now(),
      date: new Date().toLocaleString(),
      summary: `${computed.totalCredits} credits, ${computed.subjects.length} subjects`,
      value: computed.sgpa.toFixed(2),
    }));
    toast.success('SGPA calculated successfully');
  };

  const loadSample = () => {
    setSubjects([
      { id: `${Date.now()}-1`, name: 'Mathematics', credits: 4, gradePoint: 9 },
      { id: `${Date.now()}-2`, name: 'Physics', credits: 3, gradePoint: 8 },
      { id: `${Date.now()}-3`, name: 'Programming', credits: 4, gradePoint: 10 },
    ]);
    toast('Sample subjects loaded');
  };

  const handleReset = () => {
    setSubjects([createSubject(1), createSubject(2)]);
    setResult(null);
    toast('Form reset');
  };

  const copyResult = async () => {
    if (!result) return;
    const text = `SGPA: ${result.sgpa}\nTotal Credits: ${result.totalCredits}\nTotal Credit Points: ${result.totalCreditPoints}\nPerformance: ${result.performance}`;
    await navigator.clipboard.writeText(text);
    toast.success('Result copied');
  };

  const downloadPdf = async () => {
    await generatePdfFromElement(resultRef.current, 'sgpa-result');
    toast.success('PDF downloaded');
  };

  const shareResult = async () => {
    if (!result) return;
    const text = `SGPA: ${result.sgpa}\nTotal Credits: ${result.totalCredits}\nPerformance: ${result.performance}`;
    const method = await shareOrCopyResult('Academic Calculator', text);
    toast.success(method === 'shared' ? 'Share sheet opened' : 'Result copied');
  };

  return (
    <section className="section-shell py-10 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="card">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-950 dark:text-white">SGPA Calculator</h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Formula: Sum of (Credit × Grade Point) / Sum of Credits
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
            <div className="grid grid-cols-[1.5fr_0.7fr_0.7fr_0.5fr] gap-3 bg-slate-100 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:bg-slate-950 dark:text-slate-400">
              <span>Subject Name</span>
              <span>Credits</span>
              <span>Grade Point</span>
              <span>Action</span>
            </div>
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {subjects.map((subject, index) => (
                <div key={subject.id} className="grid grid-cols-1 gap-4 px-4 py-4 md:grid-cols-[1.5fr_0.7fr_0.7fr_0.5fr] md:items-center">
                  <div>
                    <label className="label-text">Subject {index + 1}</label>
                    <input
                      className="input-field"
                      value={subject.name}
                      onChange={(e) => updateSubject(subject.id, 'name', e.target.value)}
                      placeholder="Subject name"
                    />
                  </div>
                  <div>
                    <label className="label-text">Credits</label>
                    <input
                      type="number"
                      min="0"
                      className="input-field"
                      value={subject.credits}
                      onChange={(e) => updateSubject(subject.id, 'credits', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="label-text">Grade Point</label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      className="input-field"
                      value={subject.gradePoint}
                      onChange={(e) => updateSubject(subject.id, 'gradePoint', e.target.value)}
                    />
                  </div>
                  <div className="flex justify-start md:justify-end">
                    <button
                      type="button"
                      onClick={() => removeSubject(subject.id)}
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
            <button type="button" className="btn-secondary" onClick={addSubject}>
              <FiPlus /> Add Subject
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
              title="Final SGPA"
              value={result ? result.sgpa.toFixed(2) : '0.00'}
              subtitle={`Total credits: ${result ? result.totalCredits : 0}`}
              badge={result ? result.performance : 'Awaiting input'}
              badgeClass={result ? getPerformanceBadgeClass(result.performance) : 'performance-good'}
              accent="emerald"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                <p className="text-sm text-slate-500 dark:text-slate-400">Total Credit Points</p>
                <p className="mt-1 text-2xl font-bold">{result ? result.totalCreditPoints : '0.00'}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                <p className="text-sm text-slate-500 dark:text-slate-400">Performance</p>
                <p className="mt-1 text-2xl font-bold">{result ? result.performance : 'Waiting'}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">Circular Progress</h2>
            <div className="mt-6 flex justify-center">
              <CircularProgress value={result ? result.sgpa : 0} max={10} label="SGPA" />
            </div>
          </div>
          <CalculationHistory entries={history} onClear={() => { clearCalculationHistory(HISTORY_KEY); setHistory([]); }} />

          <div className="card">
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">Subject Table Summary</h2>
            <div className="mt-4 space-y-3">
              {subjects.map((subject) => (
                <div key={subject.id} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm dark:bg-slate-950">
                  <span>{subject.name || 'Unnamed subject'}</span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {subject.credits || 0} credits x {subject.gradePoint || 0}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default SgpaCalculator;
