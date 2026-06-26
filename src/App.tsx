import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Product from './pages/Product';
import Platforms from './pages/Platforms';
import Docs from './pages/Docs';
import Enterprise from './pages/Enterprise';
import About from './pages/About';
import Manifesto from './pages/Manifesto';

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-32">
      <div className="text-8xl md:text-9xl font-bold gradient-text mb-6">404</div>
      <h1 className="text-2xl md:text-3xl font-semibold text-white mb-3">
        页面未找到 / Page Not Found
      </h1>
      <p className="text-zinc-400 mb-8 max-w-md">
        抱歉，您访问的页面不存在。可能是链接已失效或地址输入有误。
      </p>
      <Link to="/" className="btn-primary inline-flex items-center gap-2">
        返回首页 →
      </Link>
    </div>
  );
}

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
            <Route path="/manifesto" element={<Manifesto />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
