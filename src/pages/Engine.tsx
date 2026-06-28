import { useState } from 'react';
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
  Copy,
  Check,
  FileText,
  FileJson,
  FileType,
  Package,
  Terminal,
  Award,
} from 'lucide-react';
import ParticleBg from '../components/ParticleBg';
import CountUp from '../components/CountUp';
import EngineStartup from '../components/EngineStartup';

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

/** 三层架构定义 */
const archLayersData = [
  {
    key: 'drive' as const,
    icon: FileText,
    hue: 'life' as Hue,
    formatLabel: 'Markdown',
  },
  {
    key: 'control' as const,
    icon: FileJson,
    hue: 'gov' as Hue,
    formatLabel: 'JSON',
  },
  {
    key: 'execute' as const,
    icon: FileType,
    hue: 'patent' as Hue,
    formatLabel: 'TypeScript',
  },
];

/** 6 层命名体系 */
const layers6Data = [
  { key: 'constitution' as const, hue: 'patent' as Hue },
  { key: 'core' as const, hue: 'gov' as Hue },
  { key: 'index' as const, hue: 'life' as Hue },
  { key: 'runtime' as const, hue: 'evo' as Hue },
  { key: 'adapters' as const, hue: 'life' as Hue },
  { key: 'evolution' as const, hue: 'evo' as Hue },
];

/** 5 大代码技术壁垒 */
const barriersData = [
  {
    key: 'loader' as const,
    icon: Package,
    hue: 'life' as Hue,
  },
  {
    key: 'validators' as const,
    icon: Shield,
    hue: 'gov' as Hue,
  },
  {
    key: 'decisionLock' as const,
    icon: Lock,
    hue: 'patent' as Hue,
  },
  {
    key: 'evolutionEngine' as const,
    icon: GitBranch,
    hue: 'evo' as Hue,
  },
  {
    key: 'perception' as const,
    icon: Eye,
    hue: 'life' as Hue,
  },
];

/** 7 大平台适配器 */
const adapters = ['trae', 'claude', 'codex', 'cursor', 'codebuddy', 'qoder', 'zcode'];

export default function Engine() {
  const { t, i18n } = useTranslation();
  const [copied, setCopied] = useState(false);

  const copyInstall = () => {
    const cmd = 'npm install @metago-ai/engine';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(cmd).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="overflow-hidden">
      {/* ===== 段 1: NPM 发布横幅 + Hero ===== */}
      <div
        className="w-full px-6 py-3 text-center text-sm"
        style={{
          background:
            'linear-gradient(90deg, rgba(94, 234, 212, 0.12), rgba(251, 191, 36, 0.08), rgba(94, 234, 212, 0.12))',
          borderBottom: '1px solid rgba(94, 234, 212, 0.2)',
        }}
      >
        <span className="font-mono">📦</span>{' '}
        <span className="text-zinc-200">{t('engine.npmBanner')}</span>
      </div>

      <section className="relative min-h-[80vh] flex items-center px-6 pt-32 pb-16">
        <ParticleBg />
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="text-center mb-12 animate-blur-in">
            <div className="patent-badge mb-6 inline-flex">
              <Cpu size={12} /> {t('engine.badge')}
            </div>
            <div className="text-xs font-mono text-text-muted mb-3 tracking-widest uppercase">
              {t('engine.heroKicker')}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight font-display">
              {t('engine.heroTitle')}{' '}
              <span className="gradient-text-evo">{t('engine.heroTitleHighlight')}</span>
            </h1>
            <p className="text-base md:text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
              {t('engine.heroSubtitle')}
            </p>

            {/* 一行可复制的 NPM 安装命令 */}
            <div className="mt-8 max-w-xl mx-auto">
              <button
                onClick={copyInstall}
                className="w-full code-window flex items-center justify-between px-4 py-3 group"
                style={{ textAlign: 'left' }}
                aria-label={t('engine.npmCopyHint')}
              >
                <code className="font-mono text-sm md:text-base text-life-bright">
                  <span className="text-text-muted">$ </span>
                  {t('engine.npmInstall')}
                </code>
                <span className="flex items-center gap-1.5 text-xs text-text-muted group-hover:text-life-bright transition-colors">
                  {copied ? (
                    <>
                      <Check size={14} /> {t('engine.npmCopied')}
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> {t('engine.npmCopyHint')}
                    </>
                  )}
                </span>
              </button>
            </div>
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
                <div key={m.label} className="glass-card p-4 text-center">
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

      {/* ===== 段 2: 引擎启动序列（炫酷交互式 CLI 演示） ===== */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <div className="quantum-badge mb-5 inline-flex">
            <Terminal size={12} /> LIVE DEMO
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-display">
            {t('engine.startupTitle')}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {t('engine.startupSubtitle')}
          </p>
        </div>

        <EngineStartup />
      </section>

      <div className="hex-divider max-w-5xl mx-auto" />

      {/* ===== 段 3: 「宗」与「变」关系图 ===== */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-display">
            {t('engine.relationTitle')}
          </h2>
          <p className="text-text-secondary max-w-3xl mx-auto">
            {t('engine.relationSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* metago-engine */}
          <div
            className="glass-card p-8 relative overflow-hidden"
            style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}
          >
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-3xl"
              style={{ background: '#FFD700' }}
            />
            <div className="patent-badge mb-4 inline-flex">
              <Cpu size={12} /> {t('engine.relationEngine.role')}
            </div>
            <h3 className="text-2xl font-bold mb-3 font-mono font-display">
              {t('engine.relationEngine.title')}
            </h3>
            <p className="text-text-secondary leading-relaxed">
              {t('engine.relationEngine.desc')}
            </p>
          </div>

          {/* metago-lifeform */}
          <div
            className="glass-card p-8 relative overflow-hidden"
            style={{ borderColor: 'rgba(94, 234, 212, 0.3)' }}
          >
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-3xl"
              style={{ background: '#5eead4' }}
            />
            <div className="life-badge mb-4 inline-flex">
              <Package size={12} /> {t('engine.relationLifeform.role')}
            </div>
            <h3 className="text-2xl font-bold mb-3 font-mono font-display">
              {t('engine.relationLifeform.title')}
            </h3>
            <p className="text-text-secondary leading-relaxed">
              {t('engine.relationLifeform.desc')}
            </p>
          </div>
        </div>

        {/* 类比提示 */}
        <div
          className="text-center py-4 px-6 rounded-xl font-mono text-sm"
          style={{
            background: 'rgba(0, 212, 255, 0.05)',
            border: '1px solid rgba(0, 212, 255, 0.15)',
            color: '#00D4FF',
          }}
        >
          💡 {t('engine.relationAnalogy')}
        </div>
      </section>

      <div className="hex-divider max-w-5xl mx-auto" />

      {/* ===== 段 4: 三层架构金字塔 ===== */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-display">
            {t('engine.archTitle')}
          </h2>
          <p className="text-text-secondary max-w-3xl mx-auto">
            {t('engine.archSubtitle')}
          </p>
        </div>

        {/* 金字塔堆叠：从顶到底，宽度递增 */}
        <div className="max-w-4xl mx-auto space-y-3">
          {archLayersData.map((layer, idx) => {
            const color = hueColor(layer.hue);
            const Icon = layer.icon;
            // 金字塔效果：顶部最窄，底部最宽
            const widths = ['max-w-2xl', 'max-w-3xl', 'max-w-4xl'];
            const widthClass = widths[idx];
            return (
              <div
                key={layer.key}
                className={`${widthClass} mx-auto glass-card p-6 group transition-all duration-500`}
                style={{
                  borderColor: `${color}33`,
                  background: `linear-gradient(135deg, ${color}08, rgba(13, 18, 25, 0.55))`,
                }}
              >
                <div className="flex items-start gap-5">
                  {/* 大图标 */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${color}22, ${color}11)`,
                      boxShadow: `inset 0 0 0 1px ${color}44, 0 0 20px ${color}22`,
                    }}
                  >
                    <Icon style={{ color }} size={26} />
                  </div>

                  {/* 内容 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-3 mb-2">
                      <h3 className="text-xl font-bold font-display">
                        {t(`engine.archLayers.${layer.key}.name`)}
                      </h3>
                      <span
                        className="font-mono text-xs px-2 py-0.5 rounded"
                        style={{
                          background: `${color}1A`,
                          color,
                          border: `1px solid ${color}33`,
                        }}
                      >
                        {layer.formatLabel}
                      </span>
                    </div>
                    <div className="text-sm font-mono text-text-muted mb-3">
                      {t(`engine.archLayers.${layer.key}.reader`)} → {t(`engine.archLayers.${layer.key}.role`)}
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed mb-3">
                      {t(`engine.archLayers.${layer.key}.desc`)}
                    </p>
                    <div
                      className="text-xs font-mono inline-flex items-center gap-1.5 px-2 py-1 rounded"
                      style={{ background: `${color}0D`, color }}
                    >
                      <Award size={11} />
                      {t(`engine.archLayers.${layer.key}.techLevel`)}
                    </div>
                  </div>

                  {/* 层级标号 */}
                  <div
                    className="text-6xl font-bold font-display opacity-20"
                    style={{ color }}
                  >
                    {idx + 1}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="hex-divider max-w-5xl mx-auto" />

      {/* ===== 段 5: 六层命名体系 ===== */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-display">
            {t('engine.layers6Title')}
          </h2>
          <p className="text-text-secondary max-w-3xl mx-auto">
            {t('engine.layers6Subtitle')}
          </p>
        </div>

        {/* 垂直堆叠卡片：从顶 CONSTITUTION 到底 EVOLUTION */}
        <div className="max-w-3xl mx-auto space-y-4">
          {layers6Data.map((layer, idx) => {
            const color = hueColor(layer.hue);
            return (
              <div
                key={layer.key}
                className="glass-card p-5 flex items-center gap-4 group transition-all duration-300 hover:translate-x-2"
                style={{ borderColor: `${color}22` }}
              >
                {/* 层级编号 */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-mono text-sm font-bold shrink-0"
                  style={{
                    background: `${color}1A`,
                    color,
                    border: `1px solid ${color}33`,
                  }}
                >
                  L{idx + 1}
                </div>

                {/* 名称 */}
                <div className="font-mono text-base font-bold shrink-0 min-w-[140px]" style={{ color }}>
                  {t(`engine.layers6.${layer.key}.name`)}
                </div>

                {/* 中文标签 */}
                <div className="text-sm font-semibold text-text-primary shrink-0">
                  {t(`engine.layers6.${layer.key}.label`)}
                </div>

                {/* 描述 */}
                <div className="text-xs text-text-secondary flex-1 min-w-0 truncate">
                  {t(`engine.layers6.${layer.key}.desc`)}
                </div>

                {/* 徽章 */}
                <div
                  className="text-[10px] font-mono px-2 py-1 rounded shrink-0"
                  style={{
                    background: `${color}14`,
                    color,
                    border: `1px solid ${color}33`,
                  }}
                >
                  {t(`engine.layers6.${layer.key}.badge`)}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="hex-divider max-w-5xl mx-auto" />

      {/* ===== 段 6: 五大代码技术壁垒 ===== */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <div className="patent-badge mb-5 inline-flex">
            <Award size={12} /> PATENT-PROTECTED
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-display">
            {t('engine.barriersTitle')}
          </h2>
          <p className="text-text-secondary max-w-3xl mx-auto">
            {t('engine.barriersSubtitle')}
          </p>
        </div>

        {/* 5 张专利证书风格卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {barriersData.map((barrier) => {
            const color = hueColor(barrier.hue);
            const Icon = barrier.icon;
            return (
              <div
                key={barrier.key}
                className="gene-card p-6 group transition-all duration-300"
              >
                {/* 顶部：图标 + 专利标号 */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${color}22, ${color}11)`,
                      boxShadow: `inset 0 0 0 1px ${color}33`,
                    }}
                  >
                    <Icon style={{ color }} size={22} />
                  </div>
                  <div
                    className="text-[10px] font-mono px-2 py-1 rounded"
                    style={{
                      background: `${color}1A`,
                      color,
                      border: `1px solid ${color}33`,
                    }}
                  >
                    #{barrier.key.toUpperCase()}
                  </div>
                </div>

                {/* 名称 */}
                <h3 className="text-base font-bold mb-1 font-display">
                  {t(`engine.barriers.${barrier.key}.name`)}
                </h3>

                {/* 文件名 */}
                <div className="font-mono text-xs text-text-muted mb-3">
                  {t(`engine.barriers.${barrier.key}.file`)}
                </div>

                {/* 功能描述 */}
                <p className="text-xs text-text-secondary leading-relaxed mb-4">
                  {t(`engine.barriers.${barrier.key}.function`)}
                </p>

                {/* 底部：专利点 + 代码量 */}
                <div
                  className="pt-3 border-t flex items-center justify-between text-[10px] font-mono"
                  style={{ borderColor: 'rgba(148, 163, 184, 0.08)' }}
                >
                  <div className="flex items-center gap-1" style={{ color }}>
                    <Award size={10} />
                    {t('engine.barriersPatentLabel')}
                  </div>
                  <div className="text-text-muted">
                    {t(`engine.barriers.${barrier.key}.lines`)}
                  </div>
                </div>

                {/* 专利名 */}
                <div
                  className="mt-2 text-[11px] leading-relaxed italic"
                  style={{ color }}
                >
                  「{t(`engine.barriers.${barrier.key}.patent`)}」
                </div>
              </div>
            );
          })}

          {/* 第 6 格：总结卡片 */}
          <div
            className="glass-card p-6 flex flex-col items-center justify-center text-center"
            style={{
              borderColor: 'rgba(255, 215, 0, 0.3)',
              background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.06), rgba(13, 18, 25, 0.55))',
            }}
          >
            <div
              className="text-5xl font-bold mb-2 font-display animate-engine-pulse"
              style={{ color: '#FFD700' }}
            >
              5
            </div>
            <div className="text-sm font-semibold text-text-primary mb-1">
              {i18n.language === 'zh' ? '五大技术壁垒' : 'Five Barriers'}
            </div>
            <div className="text-xs text-text-secondary">
              {i18n.language === 'zh' ? '5 项可申请专利的核心算法' : '5 patentable core algorithms'}
            </div>
          </div>
        </div>
      </section>

      <div className="hex-divider max-w-5xl mx-auto" />

      {/* ===== 段 7: CLI 安装使用 + 7 平台适配器 ===== */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-display">
            {t('engine.cliTitle')}
          </h2>
          <p className="text-text-secondary max-w-3xl mx-auto">
            {t('engine.cliSubtitle')}
          </p>
        </div>

        {/* 三步骤 */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {(['install', 'import', 'run'] as const).map((step, idx) => {
            const color = idx === 0 ? '#5eead4' : idx === 1 ? '#a5b4fc' : '#FFD700';
            return (
              <div key={step} className="glass-card p-5">
                <div
                  className="text-xs font-mono mb-3 px-2 py-1 rounded inline-block"
                  style={{
                    background: `${color}1A`,
                    color,
                    border: `1px solid ${color}33`,
                  }}
                >
                  {t(`engine.cliSteps.${step}.title`)}
                </div>
                <div
                  className="code-window p-3 font-mono text-xs leading-relaxed break-all"
                  style={{ background: '#0a0f16' }}
                >
                  <span className="text-text-muted">$ </span>
                  <span style={{ color }}>{t(`engine.cliSteps.${step}.cmd`)}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 7 大平台适配器 */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold mb-2 font-display">
            {t('engine.cliAdaptersTitle')}
          </h3>
          <p className="text-sm text-text-secondary">
            {t('engine.cliAdaptersSubtitle')}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {adapters.map((adapter) => (
            <div
              key={adapter}
              className="glass-card px-5 py-3 font-mono text-sm text-text-primary transition-all duration-300 hover:border-life-bright/40 hover:text-life-bright"
            >
              <span className="text-life-bright mr-1.5">▸</span>
              {adapter}
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://www.npmjs.com/package/@metago-ai/engine"
            target="_blank"
            rel="noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Package size={16} /> {t('engine.cliDocsLink')} <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <div className="hex-divider max-w-5xl mx-auto" />

      {/* ===== 段 8: 5 大族 × 17 核心引擎（保留） ===== */}
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {group.engines.map(({ icon: Icon, key, hue }) => {
                    const color = hueColor(hue);
                    return (
                      <div key={key} className="glass-card p-5 group transition-all duration-300">
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

      {/* ===== 段 9: 算法 / 原子 / 协议 三栏对比（保留） ===== */}
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
                <div className="text-5xl font-bold mb-3 font-display" style={{ color }}>
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

      {/* ===== 段 10: CTA ===== */}
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
