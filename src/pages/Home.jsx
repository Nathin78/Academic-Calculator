import { FiGrid, FiBarChart2, FiBookOpen } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { motion } from 'framer-motion';

const cards = [
  {
    title: '12th Cut-off Calculator',
    description: 'Quickly calculate your engineering admission cut-off using Mathematics, Physics, and Chemistry.',
    icon: FiGrid,
    to: '/cutoff-calculator',
  },
  {
    title: 'SGPA Calculator',
    description: 'Add or remove subjects dynamically and compute semester performance instantly.',
    icon: FiBarChart2,
    to: '/sgpa-calculator',
  },
  {
    title: 'CGPA Calculator',
    description: 'Track semester-wise SGPA values and convert your CGPA to percentage with one tap.',
    icon: FiBookOpen,
    to: '/cgpa-calculator',
  },
];

function Home() {
  return (
    <div>
      <Hero />

      <section id="learn-more" className="section-shell py-20">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-300">
            Calculators
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            Everything students need, organized into three focused tools.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {cards.map(({ title, description, icon: Icon, to }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card group"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-2xl text-cyan-600 transition group-hover:scale-110 dark:text-cyan-300">
                <Icon />
              </div>
              <h3 className="mt-5 text-xl font-bold text-slate-950 dark:text-white">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p>
              <Link to={to} className="btn-secondary mt-6">
                Open Calculator
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
