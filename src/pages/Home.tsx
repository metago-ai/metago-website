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
} from 'lucide-react';
import ParticleBg from '../components/ParticleBg';
import Terminal from '../components/Terminal';
import CountUp from '../components/CountUp';

const GITEE_URL = 'https://gitee.com/metago/metagolifeform';

const features = [
  { icon: Brain, key: 'feature1' },
  { icon: Lock, key: 'feature2' },
  { icon: ScanSearch, key: 'feature3' },
  { icon: FileSearch, key: 'feature4' },
  { icon: ShieldCheck, key: 'feature5' },
  { icon: Sparkles, key: 'feature6' },
];

const platforms = ['Trae', 'Claude Code', 'Codex', 'Cursor', 'CodeBuddy', 'Qoder', 'ZCode'];

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
          command: 'metago-mcp-server',
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
          command: 'metago-mcp-server',
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
          command: 'metago-mcp-server',
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
      // 剪贴板不可用时静默失败，不影响页面渲染
    }
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-2 py-1 rounded text-xs text-zinc-400 hover:text-accent-blue hover:bg-white/5 transition-colors shrink-0"
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

export default function Home() {
  const { t } = useTranslation();

  const row1: Metric[] = [
    { end: 8, label: t('home.statsAxioms') },
    { end: 7, label: t('home.statsAttributes') },
    { end: 6, label: t('home.statsProtocols') },
    { end: 22, label: t('home.statsSkills') },
  ];

  const row2: Metric[] = [
    { end: 7, label: t('home.statsPlatforms') },
    { end: 5, label: t('home.statsLayers') },
    { end: 7, label: t('home.statsFamilies') },
    { text: 'MIT', label: t('home.statsLicense') },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-6 pt-16">
        <ParticleBg />
        <div className="relative z-10 max-w-4xl mx-auto animate-fade-in">
          <img src="/metago-logo.png" alt="MetaGO" className="h-16 md:h-24 mx-auto mb-6 animate-fade-in" />
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            {t('home.heroTitle')}{' '}
            <span className="gradient-text">{t('home.heroTitleHighlight')}</span>
          </h1>
          <p className="text-base md:text-lg text-zinc-400 mb-10">
            {t('home.heroSubtitle')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/docs" className="btn-primary">
              {t('home.heroCtaInstall')}
            </Link>
            <Link to="/docs" className="btn-secondary">
              {t('home.heroCtaDocs')}
            </Link>
          </div>
        </div>
      </section>

      {/* Core value */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {t('home.featuresTitle')}
          </h2>
          <p className="text-zinc-400">{t('home.featuresSubtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, key }) => (
            <div key={key} className="glass-card p-7">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(168,85,247,0.15))',
                }}
              >
                <Icon className="text-accent-blue" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {t(`home.${key}Title`)}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {t(`home.${key}Desc`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Platforms */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {t('home.platformsTitle')}
          </h2>
          <p className="text-zinc-400">{t('home.platformsSubtitle')}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {platforms.map((p) => (
            <span
              key={p}
              className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-zinc-200 hover:border-accent-blue hover:text-accent-blue transition-colors"
            >
              {p}
            </span>
          ))}
        </div>
        <div
          className="max-w-2xl mx-auto rounded-lg overflow-hidden border border-white/10"
          style={{ background: '#0d1117' }}
        >
          <div
            className="px-4 py-2 text-xs text-zinc-500 font-mono border-b border-white/5"
            style={{ background: '#161b22' }}
          >
            PowerShell
          </div>
          <pre className="p-4 font-mono text-sm overflow-x-auto" style={{ color: '#00ff88' }}>
            <span className="text-zinc-500">PS&gt; </span>
            irm https://gitee.com/metago/metagolifeform/raw/main/scripts/install.ps1 | iex
          </pre>
        </div>
      </section>

      {/* Quick install */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {t('home.installTitle')}
          </h2>
          <p className="text-zinc-400">{t('home.installSubtitle')}</p>
        </div>
        <Terminal lines={installLines} />
      </section>

      {/* MCP Server 介绍 */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-blue/30 bg-accent-blue/5 text-accent-blue text-xs font-mono mb-4">
            <Package size={14} /> MCP Protocol
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="gradient-text">{t('mcpServer.title')}</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            {t('mcpServer.subtitle')}
          </p>
        </div>

        {/* 安装命令 */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="text-xs text-zinc-500 font-mono mb-2 px-1">
            {t('mcpServer.install')}
          </div>
          <div
            className="rounded-lg overflow-hidden border border-white/10"
            style={{ background: '#0d1117' }}
          >
            <div
              className="flex items-center justify-between px-4 py-2 border-b border-white/5"
              style={{ background: '#161b22' }}
            >
              <div className="flex items-center gap-2 min-w-0">
                <TerminalIcon size={14} className="text-accent-green shrink-0" />
                <span className="text-xs text-zinc-500 font-mono truncate">npm</span>
              </div>
              <CopyButton
                text={t('mcpServer.installCommand')}
                copyLabel={t('mcpServer.copy')}
                copiedLabel={t('mcpServer.copied')}
              />
            </div>
            <pre
              className="p-4 font-mono text-sm overflow-x-auto"
              style={{ color: '#00ff88' }}
            >
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
                className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-zinc-200 hover:border-accent-blue/40 transition-colors"
              >
                {f}
              </span>
            ))}
        </div>

        {/* 客户端配置示例 */}
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-bold mb-2">
            {t('mcpServer.configure')}
          </h3>
          <p className="text-zinc-400 text-sm">{t('mcpServer.configNote')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mcpConfigs.map((cfg) => {
            const configText = JSON.stringify(cfg.config, null, 2);
            return (
              <div key={cfg.key} className="glass-card overflow-hidden flex flex-col">
                <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(168,85,247,0.15))',
                    }}
                  >
                    <Plug className="text-accent-blue" size={18} />
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
                <div className="flex-1 relative" style={{ background: '#0d1117' }}>
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

      {/* Metrics */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {t('home.statsTitle')}
          </h2>
          <p className="text-zinc-400">{t('home.statsSubtitle')}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {row1.map((s) => (
            <div key={s.label} className="glass-card p-8 text-center">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                <CountUp end={s.end ?? 0} />
              </div>
              <div className="text-sm text-zinc-400">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {row2.map((s) => (
            <div key={s.label} className="glass-card p-8 text-center">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                {s.text !== undefined ? s.text : <CountUp end={s.end ?? 0} />}
              </div>
              <div className="text-sm text-zinc-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
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
            href="mailto:researcher.yi@youfer.cn"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <Mail size={18} /> {t('nav.contact')}
          </a>
        </div>
      </section>
    </div>
  );
}
