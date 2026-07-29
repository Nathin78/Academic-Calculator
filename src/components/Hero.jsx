import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiTrendingUp } from 'react-icons/fi';

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-grid bg-[length:24px_24px] opacity-40 dark:opacity-20" />
      <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl" />

      <div className="section-shell relative grid min-h-[calc(100vh-5rem)] items-center gap-12 py-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200/70 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-700 dark:border-cyan-500/20 dark:text-cyan-300">
            <FiTrendingUp />
            Fast academic calculations in one place
          </span>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
            Calculate your <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">12th cut-off</span>, SGPA, and CGPA with confidence.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            A polished, client-side academic toolkit for school and college students. Get quick results, visual performance feedback, and ready-to-share PDFs without leaving your browser.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link to="/cutoff-calculator" className="btn-primary">
              Start Calculating <FiArrowRight />
            </Link>
            <a href="#learn-more" className="btn-secondary">
              Learn More
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative mx-auto w-full max-w-xl"
        >
          <div className="glass animate-float rounded-[2rem] p-6 shadow-2xl shadow-cyan-500/10">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 p-6 text-white">
                <p className="text-sm opacity-90">12th Cut-off</p>
                <p className="mt-3 text-4xl font-black">187.50</p>
                <p className="mt-2 text-sm opacity-90">Excellent performance</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-sm text-slate-500 dark:text-slate-400">SGPA</p>
                <p className="mt-3 text-4xl font-black text-slate-900 dark:text-white">8.72</p>
                <p className="mt-2 text-sm text-emerald-600 dark:text-emerald-300">Very Good</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-sm text-slate-500 dark:text-slate-400">CGPA</p>
                <p className="mt-3 text-4xl font-black text-slate-900 dark:text-white">8.21</p>
                <p className="mt-2 text-sm text-cyan-600 dark:text-cyan-300">82.0%</p>
              </div>
              <div className="rounded-3xl bg-slate-950 p-6 text-white dark:bg-white dark:text-slate-950">
                <p className="text-sm opacity-70">Instant output</p>
                <div className="mt-4 h-40 rounded-2xl bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.35),transparent_50%),linear-gradient(135deg,rgba(15,23,42,0.95),rgba(30,41,59,0.98))] dark:bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.22),transparent_50%),linear-gradient(135deg,rgba(255,255,255,0.95),rgba(226,232,240,0.96))]" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
