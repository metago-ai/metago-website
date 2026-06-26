import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, GitFork, Star } from 'lucide-react';

const navItems = [
  { key: 'nav.home', path: '/' },
  { key: 'nav.product', path: '/product' },
  { key: 'nav.platforms', path: '/platforms' },
  { key: 'nav.docs', path: '/docs' },
  { key: 'nav.enterprise', path: '/enterprise' },
  { key: 'nav.about', path: '/about' },
];

const GITEE_URL = 'https://gitee.com/metago/metagolifeform';
const GITHUB_URL = 'https://github.com/metago-ai/metagolifeform';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const st = window.scrollY;
      setScrolled(st > 8);
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(1, st / max) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleLang = () => {
    const next = i18n.language === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(next);
    localStorage.setItem('metago-lang', next);
  };

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <>
      {/* 滚动进度条：生命色三段渐变 */}
      <div
        className="scroll-progress"
        style={{ width: `${progress * 100}%` }}
        aria-hidden="true"
      />

      <header
        className={`fixed top-0 inset-x-0 z-50 h-16 flex items-center justify-between px-6 transition-all duration-300 ${
          scrolled ? 'py-0' : 'py-0'
        }`}
        style={{
          background: scrolled
            ? 'rgba(8, 12, 20, 0.85)'
            : 'rgba(8, 12, 20, 0.55)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          borderBottom: '1px solid rgba(148, 163, 184, 0.08)',
          boxShadow: scrolled
            ? '0 8px 32px -8px rgba(0, 0, 0, 0.4), inset 0 -1px 0 rgba(94, 234, 212, 0.05)'
            : 'none',
        }}
      >
        <Link to="/" className="flex items-center group">
          <img
            src="/metago-logo.png"
            alt="MetaGO"
            className="h-8 transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  active
                    ? 'text-life-bright'
                    : 'text-zinc-300 hover:text-white'
                }`}
              >
                {t(item.key)}
                {/* 激活态下划线：渐变细线 + 光晕 */}
                {active && (
                  <span
                    className="absolute left-1/2 -translate-x-1/2 bottom-0 h-px w-8 rounded-full"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, #5eead4, transparent)',
                      boxShadow: '0 0 6px rgba(94, 234, 212, 0.6)',
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={GITEE_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-white/10 text-sm text-zinc-200 transition-all duration-300 hover:border-life-bright/60 hover:text-life-bright hover:bg-life-bright/5"
          >
            <GitFork size={15} /> {t('nav.repo')}
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-white/10 text-sm text-zinc-200 transition-all duration-300 hover:border-gov-bright/60 hover:text-gov-bright hover:bg-gov-bright/5"
          >
            <Star size={15} /> {t('nav.github')}
          </a>
          <button
            onClick={toggleLang}
            className="px-3.5 py-2 rounded-lg border border-white/10 text-sm text-zinc-200 transition-all duration-300 hover:border-evo-bright/60 hover:text-evo-bright hover:bg-evo-bright/5"
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
              background: 'rgba(8, 12, 20, 0.96)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              borderBottom: '1px solid rgba(148, 163, 184, 0.08)',
            }}
          >
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`text-sm py-1 ${
                    active ? 'text-life-bright' : 'text-zinc-300'
                  }`}
                >
                  {t(item.key)}
                </Link>
              );
            })}
            <div className="flex gap-3 pt-2">
              <a
                href={GITEE_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary text-sm"
              >
                {t('nav.repo')}
              </a>
              <a
                href={GITHUB_URL}
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
    </>
  );
}
