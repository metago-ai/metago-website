import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, GitFork, Star, Package } from 'lucide-react';
import logoUrl from '../assets/metago-logo.png';

type NavGroup = 'home' | 'paradigm' | 'product' | 'practice' | 'meta';

interface NavItem {
  key: string;
  path: string;
  group: NavGroup;
}

const navItems: NavItem[] = [
  { key: 'nav.home', path: '/', group: 'home' },
  // 范式组
  { key: 'nav.whitepaper', path: '/whitepaper', group: 'paradigm' },
  { key: 'nav.engine', path: '/engine', group: 'paradigm' },
  { key: 'nav.axioms', path: '/axioms', group: 'paradigm' },
  { key: 'nav.evolution', path: '/evolution', group: 'paradigm' },
  // 产品组
  { key: 'nav.product', path: '/product', group: 'product' },
  { key: 'nav.platforms', path: '/platforms', group: 'product' },
  // 实践组
  { key: 'nav.docs', path: '/docs', group: 'practice' },
  { key: 'nav.enterprise', path: '/enterprise', group: 'practice' },
  // 元信息
  { key: 'nav.about', path: '/about', group: 'meta' },
  { key: 'nav.manifesto', path: '/manifesto', group: 'meta' },
];

const GITEE_URL = 'https://gitee.com/metago/metagolifeform';
const GITHUB_URL = 'https://github.com/metago-ai/metagolifeform';
const NPM_URL = 'https://www.npmjs.com/package/metago-lifeform';

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
            src={logoUrl}
            alt="MetaGO"
            className="h-8 transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {(['home', 'paradigm', 'product', 'practice', 'meta'] as NavGroup[]).map((group, gIdx) => {
            const items = navItems.filter((i) => i.group === group);
            if (items.length === 0) return null;
            return (
              <div key={group} className="flex items-center">
                {/* 组间分隔符 */}
                {gIdx > 0 && (
                  <span
                    className="mx-1 h-4 w-px shrink-0"
                    style={{ background: 'rgba(148, 163, 184, 0.15)' }}
                    aria-hidden="true"
                  />
                )}
                {/* 范式组前缀小标识 */}
                {group === 'paradigm' && (
                  <span
                    className="mx-1 px-1.5 py-0.5 rounded text-[9px] font-mono shrink-0"
                    style={{
                      background: 'rgba(255, 215, 0, 0.08)',
                      border: '1px solid rgba(255, 215, 0, 0.2)',
                      color: '#FFD700',
                    }}
                  >
                    {t('nav.paradigmTag')}
                  </span>
                )}
                {items.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
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
              </div>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
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
          <a
            href={NPM_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-white/10 text-sm text-zinc-200 transition-all duration-300 hover:border-evo-bright/60 hover:text-evo-bright hover:bg-evo-bright/5"
          >
            <Package size={15} /> {t('nav.npm')}
          </a>
          <button
            onClick={toggleLang}
            className="px-3.5 py-2 rounded-lg border border-white/10 text-sm text-zinc-200 transition-all duration-300 hover:border-evo-bright/60 hover:text-evo-bright hover:bg-evo-bright/5"
          >
            {t('nav.lang')}
          </button>
        </div>

        <button
          className="lg:hidden text-zinc-200"
          onClick={() => setOpen((v) => !v)}
          aria-label="menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {open && (
          <div
            className="lg:hidden absolute top-16 left-0 right-0 px-6 py-4 flex flex-col gap-2 max-h-[80vh] overflow-y-auto"
            style={{
              background: 'rgba(8, 12, 20, 0.96)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              borderBottom: '1px solid rgba(148, 163, 184, 0.08)',
            }}
          >
            {(['home', 'paradigm', 'product', 'practice', 'meta'] as NavGroup[]).map((group) => {
              const items = navItems.filter((i) => i.group === group);
              if (items.length === 0) return null;
              return (
                <div key={group} className="py-1">
                  {group !== 'home' && (
                    <div
                      className="text-[10px] font-mono px-1 mb-1.5"
                      style={{ color: 'rgba(148, 163, 184, 0.5)' }}
                    >
                      {t(`nav.groupLabel.${group}`)}
                    </div>
                  )}
                  {items.map((item) => {
                    const active = isActive(item.path);
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setOpen(false)}
                        className={`block text-sm py-1.5 ${
                          active ? 'text-life-bright' : 'text-zinc-300'
                        }`}
                      >
                        {t(item.key)}
                      </Link>
                    );
                  })}
                </div>
              );
            })}
            <div className="flex flex-wrap gap-2 pt-3">
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
              <a
                href={NPM_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary text-sm"
              >
                {t('nav.npm')}
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
