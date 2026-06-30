import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

const Whitepaper = lazy(() => import('./pages/Whitepaper'));
const Engine = lazy(() => import('./pages/Engine'));
const Axioms = lazy(() => import('./pages/Axioms'));
const Evolution = lazy(() => import('./pages/Evolution'));
const Product = lazy(() => import('./pages/Product'));
const Platforms = lazy(() => import('./pages/Platforms'));
const Docs = lazy(() => import('./pages/Docs'));
const Demo = lazy(() => import('./pages/Demo'));
const Enterprise = lazy(() => import('./pages/Enterprise'));
const About = lazy(() => import('./pages/About'));
const Manifesto = lazy(() => import('./pages/Manifesto'));

function PageLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-zinc-700 border-t-[#5eead4] rounded-full animate-spin" />
    </div>
  );
}

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
          <Suspense fallback={<PageLoading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/whitepaper" element={<Whitepaper />} />
              <Route path="/engine" element={<Engine />} />
              <Route path="/axioms" element={<Axioms />} />
              <Route path="/evolution" element={<Evolution />} />
              <Route path="/product" element={<Product />} />
              <Route path="/platforms" element={<Platforms />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/enterprise" element={<Enterprise />} />
              <Route path="/about" element={<About />} />
              <Route path="/manifesto" element={<Manifesto />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
