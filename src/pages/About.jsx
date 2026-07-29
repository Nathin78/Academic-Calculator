function About() {
  return (
    <section className="section-shell py-10 lg:py-16">
      <div className="card max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-300">
          About
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">Built for students, tuned for speed.</h1>
        <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
          Academic Calculator is a frontend-only application designed to help students calculate 12th cut-off, SGPA, and CGPA instantly. Every result is computed locally in the browser with JavaScript, so the app stays fast, private, and easy to use.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            'Responsive layouts for mobile, tablet, and desktop',
            'Dark mode with local persistence',
            'Dynamic subject and semester rows',
            'PDF export, clipboard copy, and print support',
          ].map((item) => (
            <div key={item} className="rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-700 dark:bg-slate-950 dark:text-slate-200">
              {item}
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl bg-slate-950 p-6 text-white dark:bg-white dark:text-slate-950">
          <h2 className="text-xl font-bold">Formulas</h2>
          <div className="mt-4 grid gap-3 text-sm leading-7 opacity-90">
            <p>Cut-off = Mathematics + (Physics / 2) + (Chemistry / 2)</p>
            <p>SGPA = Σ(Credit × Grade Point) / Σ(Credits)</p>
            <p>CGPA = Sum of Semester SGPAs / Number of Semesters</p>
            <p>Percentage = CGPA × 9.5</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
