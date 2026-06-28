import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Activity,
  Brain,
  Shield,
  Zap,
  Lock,
  GitBranch,
  Cpu,
  Eye,
  Scale,
  Network,
  Code2,
  Database,
  Workflow,
  Boxes,
  Layers,
  Atom,
  ArrowRight,
} from 'lucide-react';
import ParticleBg from '../components/ParticleBg';
import CountUp from '../components/CountUp';

type Hue = 'life' | 'evo' | 'gov' | 'patent';

const hueColor = (hue: Hue) =>
  hue === 'life'
    ? '#5eead4'
    : hue === 'evo'
      ? '#fbbf24'
      : hue === 'gov'
        ? '#a5b4fc'
        : '#FFD700';

/** 5 大能力族 → 17 核心引擎分组（每组对应若干引擎） */
const engineGroups: {
  familyKey: string;
  familyHue: Hue;
  engines: { icon: typeof Activity; key: string; hue: Hue }[];
}[] = [
  {
    familyKey: 'evolution',
    familyHue: 'evo',
    engines: [
      { icon: GitBranch, key: 'metaEvolve', hue: 'evo' },
      { icon: Atom, key: 'metaCreate', hue: 'evo' },
      { icon: Activity, key: 'freqAdapt', hue: 'life' },
      { icon: Workflow, key: 'paradigm', hue: 'evo' },
    ],
  },
  {
    familyKey: 'cognition',
    familyHue: 'life',
    engines: [
      { icon: Brain, key: 'critique', hue: 'life' },
      { icon: Eye, key: 'whatif', hue: 'gov' },
      { icon: Scale, key: 'objectivity', hue: 'gov' },
      { icon: Activity, key: 'emotion', hue: 'life' },
    ],
  },
  {
    familyKey: 'governance',
    familyHue: 'gov',
    engines: [
      { icon: Shield, key: 'compliance', hue: 'gov' },
      { icon: Layers, key: 'valueAlign', hue: 'gov' },
      { icon: Lock, key: 'security', hue: 'patent' },
    ],
  },
  {
    familyKey: 'execution',
    familyHue: 'patent',
    engines: [
      { icon: Zap, key: 'actionPlan', hue: 'patent' },
      { icon: Activity, key: 'decisionEval', hue: 'patent' },
      { icon: Network, key: 'holisticTask', hue: 'life' },
    ],
  },
  {
    familyKey: 'safeguard',
    familyHue: 'life',
    engines: [
      { icon: Lock, key: 'decisionLock', hue: 'gov' },
      { icon: Eye, key: 'outputIntegrity', hue: 'life' },
      { icon: Shield, key: 'selfCheck', hue: 'life' },
    ],
  },
];

/** 顶部核心仪表盘数据 */
const meters = [
  { end: 125, label: 'engines', hue: 'patent' as Hue, suffix: '' },
  { end: 927, label: 'algorithms', hue: 'evo' as Hue, suffix: '' },
  { end: 984, label: 'atoms', hue: 'life' as Hue, suffix: '' },
  { end: 108, label: 'protocols', hue: 'gov' as Hue, suffix: '' },
];

export default function Engine() {
  const { t, i18n } = useTranslation();

  return (
    <div className="overflow-hidden">
      {/* ===== NPM 发布公告 ===== */}
      <div
        className="w-full px-6 py-3 text-center text-sm"
        style={{
          background:
            'linear-gradient(90deg, rgba(94, 234, 212, 0.12), rgba(251, 191, 36, 0.08), rgba(94, 234, 212, 0.12))',
          borderBottom: '1px solid rgba(94, 234, 212, 0.2)',
        }}
      >
        <span className="font-mono">📦</span>{' '}
        <span className="text-zinc-200">
          {i18n.language === 'zh'
            ? '@metago-ai/engine@1.0.0 已发布到 NPM — 智能生命体的核心引擎，npm install @metago-ai/engine 即可使用'
            : '@metago-ai/engine@1.0.0 released on NPM — the core engine of the intelligent lifeform, npm install @metago-ai/engine'}
        </span>
      </div>

      {/* ===== Hero：心脏跳动仪表盘 ===== */}
      <section className="relative min-h-[80vh] flex items-center px-6 pt-32 pb-16">
        <ParticleBg />
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="text-center mb-12 animate-blur-in">
            <div className="patent-badge mb-6 inline-flex">
              <Cpu size={12} /> {t('engine.badge')}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight font-display">
              {t('engine.heroTitle')}{' '}
              <span className="gradient-text-evo">{t('engine.heroTitleHighlight')}</span>
            </h1>
            <p className="text-base md:text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
              {t('engine.heroSubtitle')}
            </p>
          </div>

          {/* 顶部 4 大数据仪表盘 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 animate-slide-up">
            {meters.map((m) => {
              const color = hueColor(m.hue);
              return (
                <div
                  key={m.label}
                  className="engine-meter text-center"
                  style={{ borderColor: `${color}33` }}
                >
                  <div
                    className="text-5xl md:text-6xl font-bold mb-2 font-display animate-engine-pulse"
                    style={{
                      color,
                      textShadow: `0 0 24px ${color}55`,
                    }}
                  >
                    <CountUp end={m.end} suffix={m.suffix} />
                  </div>
                  <div className="text-xs font-mono text-text-secondary">
                    {t(`engine.meters.${m.label}`)}
                  </div>
                  {/* 流光带 */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-px animate-data-flow"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* 辅助数据 */}
          <div className="mt-6 grid grid-cols-3 md:grid-cols-5 gap-3">
            {[
              { end: 754, label: 'patents', hue: 'patent' as Hue },
              { end: 19, label: 'metaIdeas', hue: 'patent' as Hue },
              { end: 13, label: 'families', hue: 'evo' as Hue },
              { end: 36, label: 'axiomsCount', hue: 'gov' as Hue },
              { end: 43, label: 'attributesCount', hue: 'life' as Hue },
            ].map((m) => {
              const color = hueColor(m.hue);
              return (
                <div
                  key={m.label}
                  className="glass-card p-4 text-center"
                >
                  <div
                    className="text-2xl md:text-3xl font-bold mb-1 font-display"
                    style={{ color }}
                  >
                    <CountUp end={m.end} />
                  </div>
                  <div className="text-[10px] font-mono text-text-muted">
                    {t(`engine.meters.${m.label}`)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="hex-divider max-w-5xl mx-auto" />

      {/* ===== 5 大族 × 17 核心引擎 ===== */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-display">
            {t('engine.groupsTitle')}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {t('engine.groupsSubtitle')}
          </p>
        </div>

        <div className="space-y-10">
          {engineGroups.map((group) => {
            const famColor = hueColor(group.familyHue);
            return (
              <div key={group.familyKey} className="animate-slide-up">
                {/* 族标题 */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="px-4 py-1.5 rounded-lg font-mono text-sm"
                    style={{
                      background: `${famColor}1A`,
                      border: `1px solid ${famColor}33`,
                      color: famColor,
                    }}
                  >
                    {t(`engine.families.${group.familyKey}`)}
                  </div>
                  <div
                    className="flex-1 h-px"
                    style={{
                      background: `linear-gradient(90deg, ${famColor}55, transparent)`,
                    }}
                  />
                  <span className="text-xs font-mono text-text-muted">
                    {group.engines.length} {t('engine.engineUnit')}
                  </span>
                </div>

                {/* 引擎卡片网格 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {group.engines.map(({ icon: Icon, key, hue }) => {
                    const color = hueColor(hue);
                    return (
                      <div
                        key={key}
                        className="glass-card p-5 group transition-all duration-300"
                        style={{ animationDelay: '0s' }}
                      >
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                          style={{
                            background: `linear-gradient(135deg, ${color}22, ${color}11)`,
                            boxShadow: `inset 0 0 0 1px ${color}33`,
                          }}
                        >
                          <Icon style={{ color }} size={20} />
                        </div>
                        <h3 className="text-sm font-semibold mb-1.5 font-display">
                          {t(`engine.engines.${key}.title`)}
                        </h3>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          {t(`engine.engines.${key}.desc`)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== 算法 / 原子 / 协议 三栏对比 ===== */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-display">
            {t('engine.layersTitle')}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {t('engine.layersSubtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Code2, key: 'algorithms', end: 927, hue: 'evo' as Hue },
            { icon: Boxes, key: 'atoms', end: 984, hue: 'life' as Hue },
            { icon: Database, key: 'protocols', end: 108, hue: 'gov' as Hue },
          ].map(({ icon: Icon, key, end, hue }) => {
            const color = hueColor(hue);
            return (
              <div key={key} className="engine-meter">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${color}22, ${color}11)`,
                      boxShadow: `inset 0 0 0 1px ${color}33`,
                    }}
                  >
                    <Icon style={{ color }} size={22} />
                  </div>
                  <h3 className="text-lg font-bold font-display">
                    {t(`engine.layers.${key}.title`)}
                  </h3>
                </div>
                <div
                  className="text-5xl font-bold mb-3 font-display"
                  style={{ color }}
                >
                  <CountUp end={end} />
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {t(`engine.layers.${key}.desc`)}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="max-w-4xl mx-auto px-6 pb-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-5 font-display">
          {t('engine.ctaTitle')}
        </h2>
        <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
          {t('engine.ctaSubtitle')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/axioms" className="btn-primary inline-flex items-center gap-2">
            {t('engine.ctaAxioms')} <ArrowRight size={16} />
          </Link>
          <Link to="/whitepaper" className="btn-secondary">
            {t('engine.ctaWhitepaper')}
          </Link>
        </div>
      </section>
    </div>
  );
}
