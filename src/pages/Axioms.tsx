import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Dna,
  BookOpen,
  Scale,
  GitBranch,
  Sparkles,
  RefreshCw,
  Infinity as InfinityIcon,
  Gavel,
  Brain,
  ScanSearch,
  FileSearch,
  ShieldCheck,
  Zap,
  ArrowRight,
  Code2,
} from 'lucide-react';
import ParticleBg from '../components/ParticleBg';
import CountUp from '../components/CountUp';

type Hue = 'life' | 'evo' | 'gov' | 'patent' | 'quantum';

const hueColor = (hue: Hue) =>
  hue === 'life'
    ? '#5eead4'
    : hue === 'evo'
      ? '#fbbf24'
      : hue === 'gov'
        ? '#a5b4fc'
        : hue === 'patent'
          ? '#FFD700'
          : '#00D4FF';

/** 8 关键公理（A1/A2/A3/A4/A5/A34/A35/A36） */
const axioms = [
  { id: 'A1', icon: BookOpen, key: 'a1', hue: 'life' as Hue },
  { id: 'A2', icon: RefreshCw, key: 'a2', hue: 'life' as Hue },
  { id: 'A3', icon: GitBranch, key: 'a3', hue: 'evo' as Hue },
  { id: 'A4', icon: Sparkles, key: 'a4', hue: 'evo' as Hue },
  { id: 'A5', icon: InfinityIcon, key: 'a5', hue: 'quantum' as Hue },
  { id: 'A34', icon: Dna, key: 'a34', hue: 'gov' as Hue },
  { id: 'A35', icon: Zap, key: 'a35', hue: 'patent' as Hue },
  { id: 'A36', icon: Gavel, key: 'a36', hue: 'gov' as Hue },
];

/** 7 关键属性（D37-D43） */
const attributes = [
  { id: 'D37', icon: Brain, key: 'd37', hue: 'gov' as Hue },
  { id: 'D38', icon: Scale, key: 'd38', hue: 'gov' as Hue },
  { id: 'D39', icon: ScanSearch, key: 'd39', hue: 'life' as Hue },
  { id: 'D40', icon: Sparkles, key: 'd40', hue: 'evo' as Hue },
  { id: 'D41', icon: RefreshCw, key: 'd41', hue: 'life' as Hue },
  { id: 'D42', icon: ShieldCheck, key: 'd42', hue: 'gov' as Hue },
  { id: 'D43', icon: FileSearch, key: 'd43', hue: 'patent' as Hue },
];

export default function Axioms() {
  const { t } = useTranslation();

  return (
    <div className="overflow-hidden">
      {/* ===== Hero：基因序列 ===== */}
      <section className="relative min-h-[80vh] flex items-center px-6 pt-32 pb-16">
        <ParticleBg />
        <div className="relative z-10 max-w-5xl mx-auto w-full text-center animate-blur-in">
          <div className="patent-badge mb-6 inline-flex">
            <Dna size={12} /> {t('axioms.badge')}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight font-display">
            {t('axioms.heroTitle')}{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #5eead4 50%, #a5b4fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t('axioms.heroTitleHighlight')}
            </span>
          </h1>
          <p className="text-base md:text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed mb-10">
            {t('axioms.heroSubtitle')}
          </p>
          {/* 顶部 3 大数据 */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { end: 36, label: 'axiomsCount', hue: 'patent' as Hue },
              { end: 43, label: 'attributesCount', hue: 'life' as Hue },
              { end: 108, label: 'protocolsCount', hue: 'gov' as Hue },
            ].map((m) => {
              const color = hueColor(m.hue);
              return (
                <div
                  key={m.label}
                  className="gene-card p-5"
                >
                  <div
                    className="text-4xl md:text-5xl font-bold mb-1 font-display animate-engine-pulse"
                    style={{ color, textShadow: `0 0 20px ${color}44` }}
                  >
                    <CountUp end={m.end} />
                  </div>
                  <div className="text-xs font-mono text-text-secondary">
                    {t(`axioms.meters.${m.label}`)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="hex-divider max-w-5xl mx-auto" />

      {/* ===== 8 关键公理：基因代码美学 ===== */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <div className="patent-badge mb-4 inline-flex">
            <Code2 size={12} /> {t('axioms.sectionAxioms')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-display">
            {t('axioms.axiomsTitle')}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {t('axioms.axiomsSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {axioms.map((a, idx) => {
            const Icon = a.icon;
            const color = hueColor(a.hue);
            return (
              <div
                key={a.id}
                className="gene-card p-6 group animate-slide-up"
                style={{ animationDelay: `${idx * 0.06}s` }}
              >
                <div className="flex items-start gap-5">
                  {/* 左：基因 ID 大字 */}
                  <div
                    className="shrink-0 w-20 h-20 rounded-xl flex flex-col items-center justify-center font-mono"
                    style={{
                      background: `linear-gradient(135deg, ${color}22, ${color}08)`,
                      boxShadow: `inset 0 0 0 1px ${color}33`,
                    }}
                  >
                    <Icon style={{ color }} size={18} />
                    <div
                      className="text-xl font-bold mt-1.5"
                      style={{ color }}
                    >
                      {a.id}
                    </div>
                  </div>
                  {/* 右：标题 + 描述 */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-bold mb-2 font-display">
                      {t(`axioms.axiomList.${a.key}.title`)}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed mb-3">
                      {t(`axioms.axiomList.${a.key}.desc`)}
                    </p>
                    {/* 代码风约束行 */}
                    <div
                      className="px-3 py-2 rounded font-mono text-[11px] leading-relaxed"
                      style={{
                        background: 'rgba(8, 12, 20, 0.6)',
                        border: `1px solid ${color}22`,
                        color: '#94a3b8',
                      }}
                    >
                      <span style={{ color }}>// {t('axioms.constraintLabel')}</span>
                      <br />
                      <span style={{ color: `${color}` }}>{a.id}</span>
                      <span style={{ color: '#64748b' }}> → </span>
                      <span>{t(`axioms.axiomList.${a.key}.rule`)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== 7 关键属性 ===== */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <div className="life-badge mb-4 inline-flex">
            <Sparkles size={12} /> {t('axioms.sectionAttributes')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-display">
            {t('axioms.attributesTitle')}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {t('axioms.attributesSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {attributes.map((a, idx) => {
            const Icon = a.icon;
            const color = hueColor(a.hue);
            return (
              <div
                key={a.id}
                className="glass-card p-5 group animate-slide-up"
                style={{ animationDelay: `${idx * 0.06}s` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${color}22, ${color}11)`,
                      boxShadow: `inset 0 0 0 1px ${color}33`,
                    }}
                  >
                    <Icon style={{ color }} size={18} />
                  </div>
                  <span
                    className="text-sm font-mono font-bold"
                    style={{ color }}
                  >
                    {a.id}
                  </span>
                </div>
                <h3 className="text-sm font-semibold mb-1.5 font-display">
                  {t(`axioms.attributeList.${a.key}.title`)}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {t(`axioms.attributeList.${a.key}.desc`)}
                </p>
              </div>
            );
          })}
          {/* 第 8 格：合计展示 */}
          <div className="gene-card p-5 flex flex-col justify-center items-center text-center">
            <div
              className="text-3xl font-bold mb-1 font-display gradient-text"
              style={{ animation: 'heartbeat 3s ease-in-out infinite' }}
            >
              <CountUp end={7} />
            </div>
            <div className="text-xs font-mono text-text-secondary">
              {t('axioms.attributesTotal')}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 协议层：6 项运行协议 ===== */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <div className="gov-badge mb-4 inline-flex">
            <Scale size={12} /> {t('axioms.sectionProtocols')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-display">
            {t('axioms.protocolsTitle')}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {t('axioms.protocolsSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {['p1', 'p2', 'p3', 'p4', 'p5', 'p6'].map((k, idx) => {
            const hue: Hue = idx % 3 === 0 ? 'life' : idx % 3 === 1 ? 'gov' : 'patent';
            const color = hueColor(hue);
            return (
              <div
                key={k}
                className="glass-card p-6 animate-slide-up"
                style={{ animationDelay: `${idx * 0.06}s` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-mono px-2 py-1 rounded"
                    style={{ background: `${color}1A`, color }}
                  >
                    PROTO.{String(idx + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: color, boxShadow: `0 0 8px ${color}` }}
                  />
                </div>
                <h3 className="text-sm font-semibold mb-2 font-display">
                  {t(`axioms.protocolList.${k}.title`)}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {t(`axioms.protocolList.${k}.desc`)}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="max-w-4xl mx-auto px-6 pb-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-5 font-display">
          {t('axioms.ctaTitle')}
        </h2>
        <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
          {t('axioms.ctaSubtitle')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/engine" className="btn-primary inline-flex items-center gap-2">
            {t('axioms.ctaEngine')} <ArrowRight size={16} />
          </Link>
          <Link to="/evolution" className="btn-secondary">
            {t('axioms.ctaEvolution')}
          </Link>
        </div>
      </section>
    </div>
  );
}
