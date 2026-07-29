import { useMemo, useRef, useState } from 'react';
import { FiCopy, FiDownload, FiPrinter, FiRotateCcw, FiGrid, FiShare2, FiZap } from 'react-icons/fi';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import ProgressBar from '../components/ProgressBar';
import ResultCard from '../components/ResultCard';
import { calculateCutoff } from '../utils/cutoffFormula';
import { generatePdfFromElement } from '../utils/pdfGenerator';
import { clampNumber, validateCutoffInputs } from '../utils/validation';
import { getPerformanceBadgeClass } from '../utils/performance';
import CalculationHistory from '../components/CalculationHistory';
import { addCalculationHistory, clearCalculationHistory, getCalculationHistory, shareOrCopyResult } from '../utils/calculationHistory';

const HISTORY_KEY = 'academic-calculator-cutoff-history';

function CutoffCalculator() {
  const [inputs, setInputs] = useState({ mathematics: '', physics: '', chemistry: '' });
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState(() => getCalculationHistory(HISTORY_KEY));
  const resultRef = useRef(null);

  const displayValues = useMemo(() => ({
    mathematics: clampNumber(inputs.mathematics || 0, 0, 100),
    physics: clampNumber(inputs.physics || 0, 0, 100),
    chemistry: clampNumber(inputs.chemistry || 0, 0, 100),
  }), [inputs]);

  const handleChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleCalculate = () => {
    const validationMessage = validateCutoffInputs(inputs);
    if (validationMessage) {
      toast.error(validationMessage);
      return;
    }
    const computed = calculateCutoff(inputs);
    setResult(computed);
    setHistory(addCalculationHistory(HISTORY_KEY, {
      id: Date.now(),
      date: new Date().toLocaleString(),
      summary: `Math ${computed.mathematics} / Physics ${computed.physics} / Chemistry ${computed.chemistry}`,
      value: computed.cutoff.toFixed(2),
    }));
    toast.success('Cut-off calculated successfully');
  };

  const loadSample = () => {
    setInputs({ mathematics: '92', physics: '88', chemistry: '90' });
    toast('Sample marks loaded');
  };

  const handleReset = () => {
    setInputs({ mathematics: '', physics: '', chemistry: '' });
    setResult(null);
    toast('Form reset');
  };

  const copyResult = async () => {
    if (!result) return;
    const text = `Mathematics: ${result.mathematics}\nPhysics: ${result.physics}\nChemistry: ${result.chemistry}\nCut-off: ${result.cutoff}\nPercentage: ${result.percentage}%\nPerformance: ${result.performance}`;
    await navigator.clipboard.writeText(text);
    toast.success('Result copied');
  };

  const downloadPdf = async () => {
    await generatePdfFromElement(resultRef.current, 'cutoff-result');
    toast.success('PDF downloaded');
  };

  const shareResult = async () => {
    if (!result) return;
    const text = `12th Cut-off: ${result.cutoff}\nPercentage: ${result.percentage}%\nPerformance: ${result.performance}`;
    const method = await shareOrCopyResult('Academic Calculator', text);
    toast.success(method === 'shared' ? 'Share sheet opened' : 'Result copied');
  };

  return (
    <section className="section-shell py-10 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-300">
              <FiGrid className="text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-950 dark:text-white">12th Cut-off Calculator</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">Formula: Mathematics + Physics/2 + Chemistry/2</p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { label: 'Mathematics', name: 'mathematics' },
              { label: 'Physics', name: 'physics' },
              { label: 'Chemistry', name: 'chemistry' },
            ].map(({ label, name }) => (
              <label key={name}>
                <span className="label-text">{label}</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={inputs[name]}
                  onChange={(e) => handleChange(name, e.target.value)}
                  className="input-field"
                  placeholder="0-100"
                />
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  Current: {displayValues[name]}
                </p>
              </label>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className="btn-secondary" onClick={loadSample}>
              <FiZap /> Try Sample
            </button>
            <button type="button" className="btn-primary" onClick={handleCalculate}>
              Calculate
            </button>
            <button type="button" className="btn-secondary" onClick={handleReset}>
              <FiRotateCcw /> Reset
            </button>
            <button type="button" className="btn-secondary" onClick={copyResult} disabled={!result}>
              <FiCopy /> Copy Result
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

          <div className="mt-8">
            <ProgressBar value={result ? result.cutoff : 0} max={200} label="Cut-off progress" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div ref={resultRef} className="card space-y-5">
            <ResultCard
              title="Final Cut-off"
              value={result ? result.cutoff.toFixed(2) : '0.00'}
              subtitle="Maximum score: 200"
              badge={result ? result.performance : 'Awaiting input'}
              badgeClass={result ? getPerformanceBadgeClass(result.performance) : 'performance-good'}
              accent="cyan"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                <p className="text-sm text-slate-500 dark:text-slate-400">Mathematics</p>
                <p className="mt-1 text-2xl font-bold">{result ? result.mathematics : '0'}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                <p className="text-sm text-slate-500 dark:text-slate-400">Physics</p>
                <p className="mt-1 text-2xl font-bold">{result ? result.physics : '0'}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                <p className="text-sm text-slate-500 dark:text-slate-400">Chemistry</p>
                <p className="mt-1 text-2xl font-bold">{result ? result.chemistry : '0'}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                <p className="text-sm text-slate-500 dark:text-slate-400">Percentage</p>
                <p className="mt-1 text-2xl font-bold">{result ? `${result.percentage}%` : '0%'}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">Performance Guide</h2>
            <div className="mt-4 grid gap-3">
              {['Excellent', 'Very Good', 'Good', 'Average', 'Needs Improvement'].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm dark:bg-slate-950">
                  <span>{item}</span>
                  <span className="text-slate-500 dark:text-slate-400">Based on percentage</span>
                </div>
              ))}
            </div>
          </div>
          <CalculationHistory entries={history} onClear={() => { clearCalculationHistory(HISTORY_KEY); setHistory([]); }} />
        </motion.div>
      </div>
    </section>
  );
}

export default CutoffCalculator;
