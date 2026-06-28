import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ScrollText,
  Sparkles,
  Brain,
  GitBranch,
  ShieldCheck,
  Network,
  Cpu,
  Infinity as InfinityIcon,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import ParticleBg from '../components/ParticleBg';
import CountUp from '../components/CountUp';

/** 白皮书 8 章主题（图标 + hue），与 i18n key 对齐 */
const chapters = [
  { icon: Sparkles, key: 'ch1', hue: 'quantum' as const },
  { icon: Brain, key: 'ch2', hue: 'life' as const },
  { icon: GitBranch, key: 'ch3', hue: 'evo' as const },
  { icon: ShieldCheck, key: 'ch4', hue: 'gov' as const },
  { icon: Network, key: 'ch5', hue: 'life' as const },
  { icon: Cpu, key: 'ch6', hue: 'evo' as const },
  { icon: InfinityIcon, key: 'ch7', hue: 'gov' as const },
  { icon: ScrollText, key: 'ch8', hue: 'quantum' as const },
];

const hueColor = (hue: 'life' | 'evo' | 'gov' | 'quantum' | 'patent') =>
  hue === 'life'
    ? '#5eead4'
    : hue === 'evo'
      ? '#fbbf24'
      : hue === 'gov'
        ? '#a5b4fc'
        : hue === 'patent'
          ? '#FFD700'
          : '#00D4FF';

export default function Whitepaper() {
  const { t } = useTranslation();
  const [activeIdx, setActiveIdx] = useState(0);

  // 滚动时高亮当前章节序号
  useEffect(() => {
    const headings = Array.from(document.querySelectorAll('[data-chapter-idx]'));
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.chapterIdx);
            if (!Number.isNaN(idx)) setActiveIdx(idx);
          }
        }
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="overflow-hidden">
      {/* ===== Hero：卷轴展开 ===== */}
      <section className="relative min-h-[80vh] flex items-center px-6 pt-32 pb-20">
        <ParticleBg />
        <div className="relative z-10 max-w-5xl mx-auto w-full text-center animate-scroll-unroll">
          <div className="quantum-badge mb-6 inline-flex">
            <ScrollText size={12} /> {t('whitepaper.badge')}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight font-display">
            {t('whitepaper.heroTitle')}{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00D4FF 0%, #5eead4 50%, #a5b4fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t('whitepaper.heroTitleHighlight')}
            </span>
          </h1>
          <p className="text-base md:text-lg text-text-secondary mb-10 max-w-3xl mx-auto leading-relaxed">
            {t('whitepaper.heroSubtitle')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <div className="quantum-badge">
              <BookOpen size={12} /> {t('whitepaper.chaptersCount')}
            </div>
            <div className="patent-badge">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-patent animate-pulse" />
              {t('whitepaper.theoryScale')}
            </div>
          </div>
          {/* 大数字：100万字 */}
          <div className="inline-flex items-baseline gap-2 px-8 py-6 rounded-2xl border border-quantum/30 bg-quantum/5">
            <span
              className="text-6xl md:text-7xl font-bold font-display animate-engine-pulse"
              style={{ color: '#00D4FF' }}
            >
              <CountUp end={100} />
            </span>
            <span className="text-2xl text-patent font-display">万+ 字</span>
            <span className="text-sm text-text-secondary ml-2">{t('whitepaper.theoryWordsLabel')}</span>
          </div>
        </div>
      </section>

      <div className="hex-divider max-w-5xl mx-auto" />

      {/* ===== 章节导航：8 章序号浮动 ===== */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {chapters.map((c, idx) => {
            const Icon = c.icon;
            const isActive = idx === activeIdx;
            const color = hueColor(c.hue);
            return (
              <a
                key={c.key}
                href={`#chapter-${idx + 1}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono transition-all duration-300"
                style={{
                  borderColor: isActive ? color : 'rgba(148, 163, 184, 0.15)',
                  background: isActive ? `${color}1A` : 'rgba(255,255,255,0.02)',
                  color: isActive ? color : '#94a3b8',
                  boxShadow: isActive ? `0 0 20px -4px ${color}66` : 'none',
                }}
              >
                <Icon size={12} />
                <span>{String(idx + 1).padStart(2, '0')}</span>
                <span className="hidden md:inline">
                  {t(`whitepaper.chapterList.${c.key}`)}
                </span>
              </a>
            );
          })}
        </div>
      </section>

      {/* ===== 8 章正文：卷轴式垂直展开 ===== */}
      <section className="max-w-5xl mx-auto px-6 pb-32">
        {chapters.map((c, idx) => {
          const Icon = c.icon;
          const color = hueColor(c.hue);
          return (
            <article
              key={c.key}
              id={`chapter-${idx + 1}`}
              data-chapter-idx={idx}
              className="scroll-chapter animate-scroll-unroll"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="flex items-start gap-5 mb-6">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${color}22, ${color}11)`,
                    boxShadow: `inset 0 0 0 1px ${color}33`,
                  }}
                >
                  <Icon style={{ color }} size={26} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="text-xs font-mono px-2 py-0.5 rounded"
                      style={{ background: `${color}1A`, color }}
                    >
                      CH.{String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs text-text-muted font-mono">
                      {t(`whitepaper.chapters.${c.key}.tag`)}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2 font-display">
                    {t(`whitepaper.chapters.${c.key}.title`)}
                  </h2>
                  <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                    {t(`whitepaper.chapters.${c.key}.subtitle`)}
                  </p>
                </div>
              </div>

              <div className="pl-0 md:pl-[4.75rem]">
                <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-5">
                  {t(`whitepaper.chapters.${c.key}.body`)}
                </p>
                {/* 章节核心要点：3 条 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((n) => {
                    const pointKey = `whitepaper.chapters.${c.key}.point${n}`;
                    const pointText = t(pointKey);
                    if (!pointText || pointText === pointKey) return null;
                    return (
                      <div
                        key={n}
                        className="glass-card p-4 text-xs text-text-secondary leading-relaxed"
                      >
                        <div
                          className="font-mono text-[10px] mb-1.5"
                          style={{ color }}
                        >
                          {String(n).padStart(2, '0')}
                        </div>
                        {pointText}
                      </div>
                    );
                  })}
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* ===== 末尾 CTA ===== */}
      <section className="max-w-4xl mx-auto px-6 pb-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-5 font-display">
          {t('whitepaper.ctaTitle')}
        </h2>
        <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
          {t('whitepaper.ctaSubtitle')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/engine" className="btn-primary inline-flex items-center gap-2">
            {t('whitepaper.ctaEngine')} <ArrowRight size={16} />
          </Link>
          <Link to="/axioms" className="btn-secondary inline-flex items-center gap-2">
            {t('whitepaper.ctaAxioms')} <ArrowRight size={16} />
          </Link>
          <Link to="/evolution" className="btn-secondary">
            {t('whitepaper.ctaEvolution')}
          </Link>
        </div>
      </section>
    </div>
  );
}
