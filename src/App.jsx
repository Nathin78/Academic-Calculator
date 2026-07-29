import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CutoffCalculator from './pages/CutoffCalculator';
import SgpaCalculator from './pages/SgpaCalculator';
import CgpaCalculator from './pages/CgpaCalculator';
import About from './pages/About';

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.14),transparent_30%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_25%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.08),transparent_30%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_25%)]">
      <Navbar />
      <Sidebar />
      <main className="xl:pl-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cutoff-calculator" element={<CutoffCalculator />} />
          <Route path="/sgpa-calculator" element={<SgpaCalculator />} />
          <Route path="/cgpa-calculator" element={<CgpaCalculator />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
