function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/60 py-8 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/60">
      <div className="section-shell flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:text-slate-400">
        <p>Academic Calculator. Built for fast, accurate academic planning.</p>
        <p>Client-side only. No backend, no storage, no external API.</p>
      </div>
    </footer>
  );
}

export default Footer;
