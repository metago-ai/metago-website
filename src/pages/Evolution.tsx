import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  GitCommit,
  Sparkles,
  ShieldCheck,
  Brain,
  Zap,
  Lock,
  Eye,
  BookOpen,
  Activity,
  Atom,
  Cpu,
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

/** 20 个版本节点（V1.0 → V36.3），关键版本高亮 */
type VersionNode = {
  version: string;
  key: string;
  hue: Hue;
  highlight?: boolean;
  icon: typeof GitCommit;
};

const versionNodes: VersionNode[] = [
  { version: 'V1.0', key: 'v1', hue: 'life', icon: Sparkles },
  { version: 'V3.2', key: 'v3_2', hue: 'life', icon: BookOpen },
  { version: 'V5.0', key: 'v5', hue: 'evo', icon: Atom },
  { version: 'V8.4', key: 'v8_4', hue: 'evo', icon: Zap },
  { version: 'V10.0', key: 'v10', hue: 'life', icon: GitCommit },
  { version: 'V12.5', key: 'v12_5', hue: 'gov', icon: ShieldCheck },
  { version: 'V15.0', key: 'v15', hue: 'life', icon: Brain },
  { version: 'V18.0', key: 'v18', hue: 'evo', icon: Atom },
  { version: 'V21.3', key: 'v21_3', hue: 'gov', icon: Lock },
  { version: 'V24.0', key: 'v24', hue: 'life', icon: Eye },
  { version: 'V26.7', key: 'v26_7', hue: 'evo', icon: Sparkles },
  { version: 'V28.0', key: 'v28', hue: 'patent', highlight: true, icon: Zap },
  { version: 'V30.0', key: 'v30', hue: 'life', icon: Activity },
  { version: 'V31.5', key: 'v31_5', hue: 'gov', icon: ShieldCheck },
  { version: 'V32.0', key: 'v32', hue: 'evo', icon: Brain },
  { version: 'V33.2', key: 'v33_2', hue: 'life', icon: Eye },
  { version: 'V34.0', key: 'v34', hue: 'patent', highlight: true, icon: ShieldCheck },
  { version: 'V35.0', key: 'v35', hue: 'gov', icon: BookOpen },
  { version: 'V36.0', key: 'v36', hue: 'life', icon: Cpu },
  { version: 'V36.3', key: 'v36_3', hue: 'patent', highlight: true, icon: Atom },
];

export default function Evolution() {
  const { t } = useTranslation();

  return (
    <div className="overflow-hidden">
      {/* ===== Hero：生命之树起点 ===== */}
      <section className="relative min-h-[80vh] flex items-center px-6 pt-32 pb-16">
        <ParticleBg />
        <div className="relative z-10 max-w-5xl mx-auto w-full text-center animate-blur-in">
          <div className="life-badge mb-6 inline-flex">
            <GitCommit size={12} /> {t('evolution.badge')}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight font-display">
            {t('evolution.heroTitle')}{' '}
            <span className="gradient-text">{t('evolution.heroTitleHighlight')}</span>
          </h1>
          <p className="text-base md:text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed mb-10">
            {t('evolution.heroSubtitle')}
          </p>
          {/* 顶部 3 数据 */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { end: 20, label: 'versions', hue: 'life' as Hue },
              { end: 3, label: 'milestones', hue: 'patent' as Hue },
              { end: 36, label: 'majorVersion', hue: 'evo' as Hue },
            ].map((m) => {
              const color = hueColor(m.hue);
              return (
                <div key={m.label} className="glass-card p-5">
                  <div
                    className="text-4xl md:text-5xl font-bold mb-1 font-display"
                    style={{ color, animation: 'heartbeat 3s ease-in-out infinite' }}
                  >
                    <CountUp end={m.end} />
                  </div>
                  <div className="text-xs font-mono text-text-secondary">
                    {t(`evolution.meters.${m.label}`)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="hex-divider max-w-5xl mx-auto" />

      {/* ===== 生命之树：时间线 ===== */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-display">
            {t('evolution.timelineTitle')}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {t('evolution.timelineSubtitle')}
          </p>
        </div>

        <div className="relative pl-2">
          {versionNodes.map((node, idx) => {
            const Icon = node.icon;
            const color = hueColor(node.hue);
            const isHighlight = node.highlight;
            return (
              <div
                key={node.version}
                className={`tree-node animate-tree-grow mb-8 ${isHighlight ? 'pb-6' : ''}`}
                style={{ animationDelay: `${Math.min(idx * 0.04, 0.6)}s` }}
              >
                <div
                  className={`glass-card p-5 md:p-6 ${isHighlight ? 'border-patent/40' : ''}`}
                  style={
                    isHighlight
                      ? {
                          borderColor: `${color}55`,
                          boxShadow: `0 0 40px -10px ${color}44, inset 0 1px 0 ${color}22`,
                        }
                      : undefined
                  }
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* 左：版本号 + 图标 */}
                    <div className="flex items-center gap-3 md:w-40 shrink-0">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${color}22, ${color}11)`,
                          boxShadow: `inset 0 0 0 1px ${color}33`,
                        }}
                      >
                        <Icon style={{ color }} size={18} />
                      </div>
                      <div>
                        <div
                          className="text-lg font-bold font-mono"
                          style={{ color }}
                        >
                          {node.version}
                        </div>
                        {isHighlight && (
                          <div
                            className="text-[10px] font-mono px-1.5 py-0.5 rounded inline-block mt-0.5"
                            style={{ background: `${color}1A`, color }}
                          >
                            {t('evolution.milestoneTag')}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* 右：版本说明 */}
                    <div className="flex-1">
                      <h3 className="text-sm md:text-base font-semibold mb-1 font-display">
                        {t(`evolution.versions.${node.key}.title`)}
                      </h3>
                      <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                        {t(`evolution.versions.${node.key}.desc`)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* 末尾：未来节点 */}
          <div className="tree-node animate-tree-grow" style={{ animationDelay: '0.8s' }}>
            <div
              className="glass-card p-6 text-center"
              style={{
                borderColor: 'rgba(94, 234, 212, 0.2)',
                background: 'linear-gradient(135deg, rgba(94, 234, 212, 0.05), rgba(13, 18, 25, 0.55))',
              }}
            >
              <div className="text-2xl font-bold mb-1 gradient-text font-display">
                {t('evolution.futureTitle')}
              </div>
              <p className="text-xs text-text-secondary">
                {t('evolution.futureDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 三个关键里程碑：V28 / V34 / V36.3 ===== */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <div className="patent-badge mb-4 inline-flex">
            <Sparkles size={12} /> {t('evolution.milestonesTitle')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-display">
            {t('evolution.milestonesSectionTitle')}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {t('evolution.milestonesSectionSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { ver: 'V28.0', code: 'OMNI-UPGRADE', key: 'v28', hue: 'patent' as Hue, icon: Zap },
            { ver: 'V34.0', code: 'CRITICAL-TRUTH', key: 'v34', hue: 'patent' as Hue, icon: ShieldCheck },
            { ver: 'V36.3', code: 'DATA-INTEGRITY', key: 'v36_3', hue: 'patent' as Hue, icon: Atom },
          ].map(({ ver, code, key, hue, icon: Icon }) => {
            const color = hueColor(hue);
            return (
              <div
                key={ver}
                className="engine-meter"
                style={{ borderColor: `${color}33` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="text-2xl font-bold font-mono"
                    style={{ color }}
                  >
                    {ver}
                  </div>
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${color}22, ${color}11)`,
                      boxShadow: `inset 0 0 0 1px ${color}33`,
                    }}
                  >
                    <Icon style={{ color }} size={20} />
                  </div>
                </div>
                <div
                  className="text-xs font-mono px-2 py-1 rounded inline-block mb-3"
                  style={{ background: `${color}1A`, color }}
                >
                  {code}
                </div>
                <h3 className="text-base font-bold mb-2 font-display">
                  {t(`evolution.milestone.${key}.title`)}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {t(`evolution.milestone.${key}.desc`)}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="max-w-4xl mx-auto px-6 pb-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-5 font-display">
          {t('evolution.ctaTitle')}
        </h2>
        <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
          {t('evolution.ctaSubtitle')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/whitepaper" className="btn-primary inline-flex items-center gap-2">
            {t('evolution.ctaWhitepaper')} <ArrowRight size={16} />
          </Link>
          <Link to="/axioms" className="btn-secondary">
            {t('evolution.ctaAxioms')}
          </Link>
        </div>
      </section>
    </div>
  );
}
