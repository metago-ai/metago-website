import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Brain,
  Lock,
  ScanSearch,
  FileSearch,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Mail,
  Terminal as TerminalIcon,
  Package,
  Plug,
  Copy,
  Check,
  Scroll,
  Star,
  GitBranch,
  Network,
  FileJson,
  RefreshCw,
  BookOpen,
  Cpu,
  Dna,
  Atom,
  Scale,
  GitCommit,
  Boxes,
  Layers,
} from 'lucide-react';
import ParticleBg from '../components/ParticleBg';
import LifeCore from '../components/LifeCore';
import Terminal from '../components/Terminal';
import CountUp from '../components/CountUp';

const GITEE_URL = 'https://gitee.com/metago/metagolifeform';
const GITHUB_URL = 'https://github.com/metago-ai/metagolifeform';

const features = [
  { icon: Brain, key: 'feature1', hue: 'life' as const },
  { icon: Lock, key: 'feature2', hue: 'gov' as const },
  { icon: ScanSearch, key: 'feature3', hue: 'life' as const },
  { icon: FileSearch, key: 'feature4', hue: 'evo' as const },
  { icon: ShieldCheck, key: 'feature5', hue: 'gov' as const },
  { icon: Sparkles, key: 'feature6', hue: 'evo' as const },
];

const platforms = ['Trae', 'Claude Code', 'OpenAI Codex', 'Cursor', 'CodeBuddy', 'Qoder', 'ZCode'];

const livingDocsFeatures = [
  { icon: GitBranch, key: 'versioning', hue: 'life' as const },
  { icon: Network, key: 'mapping', hue: 'evo' as const },
  { icon: FileJson, key: 'aiLoadable', hue: 'gov' as const },
  { icon: RefreshCw, key: 'selfUpdate', hue: 'life' as const },
];

const installLines = [
  'git clone https://gitee.com/metago/metagolifeform.git',
  'cd metagolifeform',
  '.\\scripts\\install.ps1',
];

// MCP Server 客户端配置示例（Claude Desktop / Cursor / Trae）
const mcpConfigs = [
  {
    key: 'claudeDesktop',
    pathKey: 'claudeDesktopPath',
    config: {
      mcpServers: {
        metago: {
          command: '@metago-ai/mcp-server',
        },
      },
    },
  },
  {
    key: 'cursor',
    pathKey: 'cursorPath',
    config: {
      mcpServers: {
        metago: {
          command: '@metago-ai/mcp-server',
        },
      },
    },
  },
  {
    key: 'trae',
    pathKey: 'traePath',
    config: {
      'mcp.servers': {
        metago: {
          command: '@metago-ai/mcp-server',
        },
      },
    },
  },
];

// 复制按钮：点击复制文本，2 秒内显示“已复制”反馈
function CopyButton({
  text,
  copyLabel,
  copiedLabel,
}: {
  text: string;
  copyLabel: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 剪贴板不可用时静默失败
    }
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-2 py-1 rounded text-xs text-zinc-400 hover:text-life-bright hover:bg-life-bright/5 transition-colors shrink-0"
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? copiedLabel : copyLabel}
    </button>
  );
}

interface Metric {
  end?: number;
  text?: string;
  label: string;
}

const hueColor = (hue: 'life' | 'evo' | 'gov') =>
  hue === 'life' ? '#5eead4' : hue === 'evo' ? '#fbbf24' : '#a5b4fc';

export default function Home() {
  const { t, i18n } = useTranslation();
  const i18nLanguage = i18n.language;

  const row1: Metric[] = [
    { end: 8, label: t('home.statsAxioms') },
    { end: 7, label: t('home.statsAttributes') },
    { end: 6, label: t('home.statsProtocols') },
    { end: 37, label: t('home.statsSkills') },
  ];

  const row2: Metric[] = [
    { end: 7, label: t('home.statsPlatforms') },
    { end: 5, label: t('home.statsLayers') },
    { end: 7, label: t('home.statsFamilies') },
    { text: 'MIT', label: t('home.statsLicense') },
  ];

  return (
    <div className="overflow-hidden">
      {/* ===== Hero：不对称布局（左文右核心） ===== */}
      <section className="relative min-h-screen flex items-center px-6 pt-20 pb-12">
        <ParticleBg />
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* 左：文案区 */}
          <div className="lg:col-span-7 animate-blur-in">
            <div className="life-badge mb-6">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-life-bright animate-pulse" />
              {t('home.heroBadge') !== 'home.heroBadge' ? t('home.heroBadge') : 'AI Lifeform · v36.7.0'}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight font-display">
              {t('home.heroTitle')}{' '}
              <span className="gradient-text">{t('home.heroTitleHighlight')}</span>
            </h1>
            <p className="text-base md:text-lg text-text-secondary mb-4 max-w-2xl leading-relaxed">
              {t('home.heroSubtitle')}
            </p>
            <p
              className="text-base md:text-lg mb-10 max-w-2xl leading-relaxed font-display italic"
              style={{ color: '#5eead4' }}
            >
              "{t('home.heroPhilosophy')}"
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/whitepaper" className="btn-primary inline-flex items-center gap-2">
                {t('home.heroCtaWhitepaper')} <ArrowRight size={16} />
              </Link>
              <Link to="/engine" className="btn-secondary inline-flex items-center gap-2">
                <Cpu size={16} /> {t('home.heroCtaEngine')}
              </Link>
              <Link to="/docs" className="btn-secondary">
                {t('home.heroCtaInstall')}
              </Link>
            </div>
          </div>

          {/* 右：LifeCore 可视化 */}
          <div className="lg:col-span-5 flex justify-center animate-fade-in delay-200">
            <LifeCore size={400} className="hidden lg:block" />
          </div>
        </div>
      </section>

      {/* ===== 引擎发布公告 ===== */}
      <section className="max-w-7xl mx-auto px-6 py-6">
        <div
          className="relative overflow-hidden rounded-2xl p-6 md:p-7 animate-slide-up"
          style={{
            background:
              'linear-gradient(135deg, rgba(94, 234, 212, 0.12), rgba(251, 191, 36, 0.08), rgba(94, 234, 212, 0.12))',
            border: '1px solid rgba(94, 234, 212, 0.3)',
            boxShadow: '0 0 40px -10px rgba(94, 234, 212, 0.25)',
          }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background:
                  'linear-gradient(135deg, rgba(94, 234, 212, 0.25), rgba(251, 191, 36, 0.2))',
                boxShadow: 'inset 0 0 0 1px rgba(94, 234, 212, 0.4)',
              }}
            >
              <Sparkles className="text-life-bright" size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="life-badge text-xs">
                  <span className="inline-block w-1 h-1 rounded-full bg-life-bright animate-pulse" />
                  NEW RELEASE
                </span>
              </div>
              <p className="text-base md:text-lg font-display font-semibold leading-relaxed">
                {i18nLanguage === 'zh'
                  ? '🎉 MetaGO Engine v1.0.0 正式发布 — 36公理+125引擎+927算法+754专利，智能生命体的核心本体'
                  : '🎉 MetaGO Engine v1.0.0 Released — 36 axioms + 125 engines + 927 algorithms + 754 patents, the core of intelligent lifeform'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 全息数据矩阵：9 大核心数据 ===== */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="patent-badge mb-4 inline-flex">
            <Sparkles size={12} /> {t('home.matrixBadge')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-display">
            <span className="gradient-text">{t('home.matrixTitle')}</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {t('home.matrixSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-9 gap-3">
          {[
            { end: 125, label: 'engines', icon: Cpu, hue: 'patent' as const },
            { end: 927, label: 'algorithms', icon: Atom, hue: 'evo' as const },
            { end: 984, label: 'atoms', icon: Boxes, hue: 'life' as const },
            { end: 108, label: 'protocols', icon: Scale, hue: 'gov' as const },
            { end: 754, label: 'patents', icon: ShieldCheck, hue: 'patent' as const },
            { end: 36, label: 'axioms', icon: Dna, hue: 'gov' as const },
            { end: 43, label: 'attributes', icon: Layers, hue: 'life' as const },
            { end: 19, label: 'metaIdeas', icon: Sparkles, hue: 'evo' as const },
            { end: 13, label: 'families', icon: GitBranch, hue: 'life' as const },
          ].map(({ end, label, icon: Icon, hue }, idx) => {
            const color =
              hue === 'patent'
                ? '#FFD700'
                : hue === 'evo'
                  ? '#fbbf24'
                  : hue === 'gov'
                    ? '#a5b4fc'
                    : '#5eead4';
            return (
              <div
                key={label}
                className="engine-meter p-4 text-center animate-slide-up"
                style={{
                  animationDelay: `${idx * 0.04}s`,
                  borderColor: `${color}22`,
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2"
                  style={{
                    background: `linear-gradient(135deg, ${color}22, ${color}08)`,
                    boxShadow: `inset 0 0 0 1px ${color}33`,
                  }}
                >
                  <Icon style={{ color }} size={16} />
                </div>
                <div
                  className="text-2xl md:text-3xl font-bold mb-0.5 font-display"
                  style={{
                    color,
                    animation: 'heartbeat 3s ease-in-out infinite',
                    animationDelay: `${idx * 0.2}s`,
                  }}
                >
                  <CountUp end={end} />
                </div>
                <div className="text-[10px] font-mono text-text-secondary">
                  {t(`home.matrix.${label}`)}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="hex-divider max-w-5xl mx-auto" />

      {/* ===== 范式跃迁对比：Agent vs Lifeform ===== */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <div className="quantum-badge mb-4 inline-flex">
            <GitCommit size={12} /> {t('home.paradigmBadge')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-display">
            {t('home.paradigmTitle')}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {t('home.paradigmSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Agent 范式 */}
          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(148, 163, 184, 0.15), rgba(148, 163, 184, 0.05))',
                  boxShadow: 'inset 0 0 0 1px rgba(148, 163, 184, 0.2)',
                }}
              >
                <TerminalIcon size={20} className="text-zinc-400" />
              </div>
              <div>
                <div className="text-xs font-mono text-text-muted">PARADIGM 1.0</div>
                <h3 className="text-xl font-bold font-display text-zinc-300">
                  {t('home.paradigmAgentTitle')}
                </h3>
              </div>
            </div>
            <ul className="space-y-2.5">
              {['agent1', 'agent2', 'agent3', 'agent4'].map((k) => (
                <li key={k} className="flex items-start gap-2 text-sm text-text-secondary">
                  <span className="text-zinc-500 mt-0.5">·</span>
                  {t(`home.paradigmAgent.${k}`)}
                </li>
              ))}
            </ul>
          </div>

          {/* Lifeform 范式 */}
          <div
            className="gene-card p-8"
            style={{ borderColor: 'rgba(94, 234, 212, 0.3)' }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(94, 234, 212, 0.22), rgba(94, 234, 212, 0.08))',
                  boxShadow: 'inset 0 0 0 1px rgba(94, 234, 212, 0.35)',
                }}
              >
                <Dna size={20} className="text-life-bright" />
              </div>
              <div>
                <div className="text-xs font-mono text-life-bright">PARADIGM 2.0</div>
                <h3 className="text-xl font-bold font-display">
                  <span className="gradient-text">{t('home.paradigmLifeformTitle')}</span>
                </h3>
              </div>
            </div>
            <ul className="space-y-2.5">
              {['lifeform1', 'lifeform2', 'lifeform3', 'lifeform4'].map((k) => (
                <li key={k} className="flex items-start gap-2 text-sm text-text-secondary">
                  <span className="text-life-bright mt-0.5">→</span>
                  {t(`home.paradigmLifeform.${k}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== 三大入口卡片 ===== */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-display">
            {t('home.entriesTitle')}
          </h2>
          <p className="text-text-secondary">{t('home.entriesSubtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              to: '/whitepaper',
              icon: BookOpen,
              hue: 'quantum' as const,
              titleKey: 'home.entryWhitepaperTitle',
              descKey: 'home.entryWhitepaperDesc',
              ctaKey: 'home.entryWhitepaperCta',
            },
            {
              to: '/engine',
              icon: Cpu,
              hue: 'patent' as const,
              titleKey: 'home.entryEngineTitle',
              descKey: 'home.entryEngineDesc',
              ctaKey: 'home.entryEngineCta',
            },
            {
              to: '/evolution',
              icon: GitCommit,
              hue: 'life' as const,
              titleKey: 'home.entryEvolutionTitle',
              descKey: 'home.entryEvolutionDesc',
              ctaKey: 'home.entryEvolutionCta',
            },
          ].map((entry, idx) => {
            const color =
              entry.hue === 'quantum'
                ? '#00D4FF'
                : entry.hue === 'patent'
                  ? '#FFD700'
                  : '#5eead4';
            const Icon = entry.icon;
            return (
              <Link
                key={entry.to}
                to={entry.to}
                className="glass-card p-7 group animate-slide-up block transition-all duration-500 hover:border-life-bright/30"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${color}22, ${color}08)`,
                    boxShadow: `inset 0 0 0 1px ${color}33`,
                  }}
                >
                  <Icon style={{ color }} size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2 font-display">
                  {t(entry.titleKey)}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  {t(entry.descKey)}
                </p>
                <div className="flex items-center gap-2 text-sm font-semibold" style={{ color }}>
                  {t(entry.ctaKey)}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ===== Core value：能力脉络 ===== */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <div className="evo-badge mb-4">
            <Sparkles size={12} /> {t('home.featuresTitle') !== 'home.featuresTitle' ? 'Capabilities' : 'Capabilities'}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-display">
            {t('home.featuresTitle')}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {t('home.featuresSubtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, key, hue }, idx) => {
            const color = hueColor(hue);
            return (
              <div
                key={key}
                className="glass-card p-7 group animate-slide-up"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${color}22, ${color}11)`,
                    boxShadow: `inset 0 0 0 1px ${color}33`,
                  }}
                >
                  <Icon style={{ color }} size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2 font-display">
                  {t(`home.${key}Title`)}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {t(`home.${key}Desc`)}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <div className="hex-divider max-w-5xl mx-auto" />

      {/* ===== Living Docs System：活文档系统 ===== */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <div className="life-badge mb-4">
            <BookOpen size={12} /> {t('home.livingDocs.badge')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-display">
            <span className="gradient-text">{t('home.livingDocs.title')}</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {t('home.livingDocs.subtitle')}
          </p>
          {/* 100万字理论体系亮点 */}
          <div className="inline-flex items-center gap-3 mt-6 px-6 py-3 rounded-full border border-life-bright/30 bg-life-bright/5">
            <span
              className="text-3xl md:text-4xl font-bold gradient-text font-display"
              style={{ animation: 'heartbeat 3s ease-in-out infinite' }}
            >
              <CountUp end={100} />万+
            </span>
            <span className="text-sm text-text-secondary">{t('home.statsTheoryWords')}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {livingDocsFeatures.map(({ icon: Icon, key, hue }, idx) => {
            const color = hueColor(hue);
            return (
              <div
                key={key}
                className="glass-card p-6 group animate-slide-up"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${color}22, ${color}11)`,
                    boxShadow: `inset 0 0 0 1px ${color}33`,
                  }}
                >
                  <Icon style={{ color }} size={22} />
                </div>
                <h3 className="text-base font-semibold mb-2 font-display">
                  {t(`home.livingDocs.${key}Title`)}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {t(`home.livingDocs.${key}Desc`)}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== Platforms ===== */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-display">
            {t('home.platformsTitle')}
          </h2>
          <p className="text-text-secondary">{t('home.platformsSubtitle')}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {platforms.map((p) => (
            <span
              key={p}
              className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-zinc-200 transition-all duration-300 hover:border-life-bright/50 hover:text-life-bright hover:bg-life-bright/5 hover:shadow-[0_0_20px_-4px_rgba(94,234,212,0.4)]
              cursor-default"
            >
              {p}
            </span>
          ))}
        </div>
        <div className="code-window max-w-2xl mx-auto">
          <div
            className="px-4 py-2 text-xs text-zinc-500 font-mono border-b border-white/5"
            style={{ background: 'rgba(17, 24, 36, 0.6)' }}
          >
            PowerShell
          </div>
          <pre className="p-4 font-mono text-sm overflow-x-auto" style={{ color: '#5eead4' }}>
            <span className="text-zinc-500">PS&gt; </span>
            irm https://gitee.com/metago/metagolifeform/raw/main/scripts/bootstrap-install.ps1 | iex
          </pre>
        </div>
      </section>

      {/* ===== Quick install ===== */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-display">
            {t('home.installTitle')}
          </h2>
          <p className="text-text-secondary">{t('home.installSubtitle')}</p>
        </div>
        <Terminal lines={installLines} />
      </section>

      <div className="hex-divider max-w-5xl mx-auto" />

      {/* ===== MCP Server ===== */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <div className="life-badge mb-4">
            <Package size={12} /> MCP Protocol
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-display">
            <span className="gradient-text">{t('mcpServer.title')}</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {t('mcpServer.subtitle')}
          </p>
        </div>

        {/* 安装命令 */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="text-xs text-zinc-500 font-mono mb-2 px-1">
            {t('mcpServer.install')}
          </div>
          <div className="code-window">
            <div
              className="flex items-center justify-between px-4 py-2 border-b border-white/5"
              style={{ background: 'rgba(17, 24, 36, 0.6)' }}
            >
              <div className="flex items-center gap-2 min-w-0">
                <TerminalIcon size={14} className="text-life-bright shrink-0" />
                <span className="text-xs text-zinc-500 font-mono truncate">npm</span>
              </div>
              <CopyButton
                text={t('mcpServer.installCommand')}
                copyLabel={t('mcpServer.copy')}
                copiedLabel={t('mcpServer.copied')}
              />
            </div>
            <pre className="p-4 font-mono text-sm overflow-x-auto" style={{ color: '#5eead4' }}>
              <span className="text-zinc-500 select-none">$ </span>
              {t('mcpServer.installCommand')}
            </pre>
          </div>
        </div>

        {/* 特性徽章 */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {t('mcpServer.features')
            .split(' · ')
            .map((f) => (
              <span
                key={f}
                className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-zinc-200 hover:border-life-bright/40 hover:bg-life-bright/5 transition-colors"
              >
                {f}
              </span>
            ))}
        </div>

        {/* 客户端配置示例 */}
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-bold mb-2 font-display">
            {t('mcpServer.configure')}
          </h3>
          <p className="text-text-secondary text-sm">{t('mcpServer.configNote')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mcpConfigs.map((cfg, idx) => {
            const configText = JSON.stringify(cfg.config, null, 2);
            return (
              <div
                key={cfg.key}
                className="glass-card overflow-hidden flex flex-col animate-slide-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(94,234,212,0.15), rgba(129,140,248,0.15))',
                    }}
                  >
                    <Plug className="text-life-bright" size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-zinc-100 truncate">
                      {t(`mcpServer.${cfg.key}`)}
                    </div>
                    <div className="text-xs text-zinc-500 font-mono truncate">
                      {t(`mcpServer.${cfg.pathKey}`)}
                    </div>
                  </div>
                </div>
                <div className="flex-1 relative" style={{ background: '#0a0f16' }}>
                  <div className="absolute top-2 right-2 z-10">
                    <CopyButton
                      text={configText}
                      copyLabel={t('mcpServer.copy')}
                      copiedLabel={t('mcpServer.copied')}
                    />
                  </div>
                  <pre className="p-4 pr-24 font-mono text-xs leading-relaxed overflow-x-auto text-zinc-300">
                    {configText}
                  </pre>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== Metrics：心跳计数器 ===== */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-display">
            {t('home.statsTitle')}
          </h2>
          <p className="text-text-secondary">{t('home.statsSubtitle')}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {row1.map((s, idx) => (
            <div
              key={s.label}
              className="glass-card p-8 text-center animate-slide-up"
              style={{ animationDelay: `${idx * 0.06}s` }}
            >
              <div
                className="text-4xl md:text-5xl font-bold gradient-text mb-2 font-display"
                style={{ animation: 'heartbeat 3s ease-in-out infinite', animationDelay: `${idx * 0.4}s` }}
              >
                <CountUp end={s.end ?? 0} />
              </div>
              <div className="text-sm text-text-secondary">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {row2.map((s, idx) => (
            <div
              key={s.label}
              className="glass-card p-8 text-center animate-slide-up"
              style={{ animationDelay: `${0.24 + idx * 0.06}s` }}
            >
              <div
                className="text-4xl md:text-5xl font-bold gradient-text mb-2 font-display"
                style={{ animation: 'heartbeat 3s ease-in-out infinite', animationDelay: `${0.2 + idx * 0.4}s` }}
              >
                {s.text !== undefined ? s.text : <CountUp end={s.end ?? 0} />}
              </div>
              <div className="text-sm text-text-secondary">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Bottom CTA ===== */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 font-display">
          {t('home.ctaTitle')}
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/docs"
            className="btn-primary inline-flex items-center gap-2"
          >
            {t('home.heroCtaInstall')} <ArrowRight size={18} />
          </Link>
          <a
            href={GITEE_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
          >
            {t('nav.repo')}
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <Star size={16} /> {t('nav.github')}
          </a>
          <a
            href="mailto:researcher.yi@youfer.cn"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <Mail size={16} /> {t('nav.contact')}
          </a>
        </div>
      </section>

      {/* ===== Manifesto 卡片入口 ===== */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <Link
          to="/manifesto"
          className="block glass-card p-8 md:p-10 group relative overflow-hidden transition-all duration-500 hover:border-life-bright/40"
        >
          <div
            className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
            style={{
              background:
                'radial-gradient(circle at 20% 50%, #5eead4 0%, transparent 50%), radial-gradient(circle at 80% 50%, #a855f7 0%, transparent 50%)',
            }}
          />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, rgba(94, 234, 212, 0.2), rgba(168, 85, 247, 0.2))',
                boxShadow: 'inset 0 0 0 1px rgba(94, 234, 212, 0.3)',
              }}
            >
              <Scroll className="text-life-bright" size={26} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="life-badge text-xs">
                  <span className="inline-block w-1 h-1 rounded-full bg-life-bright animate-pulse" />
                  2026 · Birth Manifesto
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2 font-display gradient-text">
                {t('nav.manifesto')}
              </h3>
              <p className="text-sm md:text-base text-text-secondary leading-relaxed max-w-2xl">
                {i18nLanguage === 'zh'
                  ? '《从 Agent 到生命体：智能进化的范式跃迁》——MetaGO 第一篇诞生宣言。让智能，学会进化。'
                  : '"From Agent to Lifeform: The Paradigm Leap in Intelligent Evolution" — MetaGO\'s first birth manifesto. Let intelligence learn to evolve.'}
              </p>
            </div>
            <div className="flex items-center gap-2 text-life-bright group-hover:gap-3 transition-all shrink-0">
              <span className="text-sm font-semibold">
                {i18nLanguage === 'zh' ? '阅读全文' : 'Read Manifesto'}
              </span>
              <ArrowRight size={20} />
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}
