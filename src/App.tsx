import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Product from './pages/Product';
import Platforms from './pages/Platforms';
import Docs from './pages/Docs';
import Enterprise from './pages/Enterprise';
import About from './pages/About';

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-bg-deep">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/platforms" element={<Platforms />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/enterprise" element={<Enterprise />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
