import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, GitFork } from 'lucide-react';

const navItems = [
  { key: 'nav.home', path: '/' },
  { key: 'nav.product', path: '/product' },
  { key: 'nav.platforms', path: '/platforms' },
  { key: 'nav.docs', path: '/docs' },
  { key: 'nav.enterprise', path: '/enterprise' },
  { key: 'nav.about', path: '/about' },
];

const GITEE_URL = 'https://gitee.com/metago/metago';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const toggleLang = () => {
    const next = i18n.language === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(next);
    localStorage.setItem('metago-lang', next);
  };

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 h-16 flex items-center justify-between px-6"
      style={{
        background: 'rgba(10,10,15,0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <Link to="/">
        <img src="/metago-logo.png" alt="MetaGO" className="h-8" />
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`text-sm font-medium transition-colors ${
              isActive(item.path)
                ? 'text-accent-blue'
                : 'text-zinc-300 hover:text-white'
            }`}
          >
            {t(item.key)}
          </Link>
        ))}
      </nav>

      <div className="hidden md:flex items-center gap-3">
        <a
          href={GITEE_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-sm text-zinc-200 hover:border-accent-blue hover:text-accent-blue transition-colors"
        >
          <GitFork size={16} /> {t('nav.github')}
        </a>
        <button
          onClick={toggleLang}
          className="px-4 py-2 rounded-lg border border-white/10 text-sm text-zinc-200 hover:border-accent-purple hover:text-accent-purple transition-colors"
        >
          {t('nav.lang')}
        </button>
      </div>

      <button
        className="md:hidden text-zinc-200"
        onClick={() => setOpen((v) => !v)}
        aria-label="menu"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <div
          className="md:hidden absolute top-16 left-0 right-0 px-6 py-4 flex flex-col gap-3"
          style={{
            background: 'rgba(10,10,15,0.95)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`text-sm py-1 ${
                isActive(item.path) ? 'text-accent-blue' : 'text-zinc-300'
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
          <div className="flex gap-3 pt-2">
            <a
              href={GITEE_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary text-sm"
            >
              {t('nav.github')}
            </a>
            <button onClick={toggleLang} className="btn-secondary text-sm">
              {t('nav.lang')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
