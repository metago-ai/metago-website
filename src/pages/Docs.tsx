import { useTranslation } from 'react-i18next';
import type { ComponentType, CSSProperties } from 'react';
import {
  Rocket,
  Layers,
  Settings,
  CircleQuestionMark,
  ArrowRight,
  Terminal,
  CircleAlert,
  Package,
  Wrench,
  MessageSquare,
  BookOpen,
} from 'lucide-react';
import McpInstallBlock from '../components/McpInstallBlock';

type Hue = 'life' | 'evo' | 'gov' | 'patent' | 'quantum';

const hueColor = (hue: Hue) =>
  hue === 'life' ? '#5eead4'
    : hue === 'evo' ? '#fbbf24'
    : hue === 'gov' ? '#a5b4fc'
    : hue === 'patent' ? '#FFD700'
    : '#00D4FF';

interface DocItem {
  key: 'quickStart' | 'architecture' | 'customization' | 'faq' | 'mcpServer' | 'whitepaper';
  icon: ComponentType<{ className?: string; style?: CSSProperties }>;
  descKey: string;
  link: string;
  hue: Hue;
}

const docs: DocItem[] = [
  { key: 'whitepaper', icon: BookOpen, descKey: 'docs.docList.whitepaper', link: 'https://gitee.com/metago/metagolifeform/blob/main/docs/WHITEPAPER.md', hue: 'patent' },
  { key: 'quickStart', icon: Rocket, descKey: 'docs.docList.quickStart', link: 'https://gitee.com/metago/metagolifeform/blob/main/docs/GETTING_STARTED.md', hue: 'life' },
  { key: 'architecture', icon: Layers, descKey: 'docs.docList.architecture', link: 'https://gitee.com/metago/metagolifeform/blob/main/docs/ARCHITECTURE.md', hue: 'evo' },
  { key: 'customization', icon: Settings, descKey: 'docs.docList.customization', link: 'https://gitee.com/metago/metagolifeform/blob/main/docs/CUSTOMIZATION.md', hue: 'gov' },
  { key: 'mcpServer', icon: Package, descKey: 'docs.docList.mcpServer', link: 'https://gitee.com/metago/metagolifeform/blob/main/docs/MCP_SERVER.md', hue: 'quantum' },
  { key: 'faq', icon: CircleQuestionMark, descKey: 'docs.docList.faq', link: 'https://gitee.com/metago/metagolifeform/blob/main/docs/GETTING_STARTED.md#常见问题-faq', hue: 'life' },
];

const installCommands = `git clone https://gitee.com/metago/metagolifeform.git
cd metagolifeform
.\\scripts\\install.ps1`;

function Docs() {
  const { t } = useTranslation();

  return (
    <div className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* 区块1: 页面标题 */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4 font-display">
            {t('docs.title')}
          </h1>
          <p className="text-xl text-text-secondary">{t('docs.subtitle')}</p>
        </div>

        {/* 区块2: 文档卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {docs.map((doc) => {
            const Icon = doc.icon;
            const color = hueColor(doc.hue);
            return (
              <a
                key={doc.key}
                href={doc.link}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-8 block group transition-all duration-300 hover:scale-[1.01]"
                style={{ borderColor: `${color}22` }}
              >
                <div className="flex items-start gap-5">
                  <div
                    className="shrink-0 w-12 h-12 flex items-center justify-center rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, ${color}22, ${color}08)`,
                      boxShadow: `inset 0 0 0 1px ${color}33`,
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-white mb-2 font-display">
                      {doc.key === 'mcpServer' ? t('docs.mcpServer.title') : t(`docs.${doc.key}`)}
                    </h3>
                    <p className="text-text-secondary mb-4">{t(doc.descKey)}</p>
                    <span
                      className="inline-flex items-center gap-1 group-hover:gap-2 transition-all text-sm font-semibold"
                      style={{ color }}
                    >
                      {t('docs.viewDoc')} <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* 区块3: 快速安装代码块 */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Terminal className="w-6 h-6" style={{ color: hueColor('evo') }} />
            <h2 className="text-2xl font-semibold text-white font-display">
              {t('docs.quickInstall')}
            </h2>
          </div>
          <pre className="glass-card p-6 overflow-x-auto">
            <code className="font-mono text-sm leading-relaxed whitespace-pre" style={{ color: hueColor('evo') }}>
              {installCommands}
            </code>
          </pre>
        </div>

        {/* 区块4: MCP Server 快速开始 */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Package className="w-6 h-6" style={{ color: hueColor('quantum') }} />
            <h2 className="text-2xl font-semibold text-white font-display">
              {t('docs.mcpServer.title')}
            </h2>
          </div>
          <div className="glass-card p-6 md:p-8 mb-6">
            <p className="text-text-secondary mb-6 leading-relaxed">
              {t('docs.mcpServer.desc')}
            </p>
            {/* npm 安装命令 */}
            <McpInstallBlock className="mb-6" />
            {/* 35 Tools / 8 Prompts 概览 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                className="rounded-lg p-5"
                style={{ border: `1px solid ${hueColor('life')}22`, background: `${hueColor('life')}08` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Wrench className="w-5 h-5" style={{ color: hueColor('life') }} />
                  <span className="text-sm font-semibold text-zinc-100">
                    {t('docs.mcpServer.toolsTitle')}
                  </span>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {t('docs.mcpServer.toolsDesc')}
                </p>
              </div>
              <div
                className="rounded-lg p-5"
                style={{ border: `1px solid ${hueColor('gov')}22`, background: `${hueColor('gov')}08` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-5 h-5" style={{ color: hueColor('gov') }} />
                  <span className="text-sm font-semibold text-zinc-100">
                    {t('docs.mcpServer.promptsTitle')}
                  </span>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {t('docs.mcpServer.promptsDesc')}
                </p>
              </div>
            </div>
          </div>
          <a
            href="https://gitee.com/metago/metagolifeform/blob/main/docs/MCP_SERVER.md"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            {t('docs.mcpServer.viewDocs')} <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* 区块5: 活文档系统 */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6" style={{ color: hueColor('patent') }} />
            <h2 className="text-2xl font-semibold text-white font-display">
              {t('docs.livingDocs.title')}
            </h2>
          </div>
          <div className="glass-card p-6 md:p-8">
            <p className="text-text-secondary mb-6 leading-relaxed">
              {t('docs.livingDocs.description')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="rounded-lg border border-white/10 bg-white/5 p-5">
                <span className="text-sm font-semibold text-zinc-100">
                  {t('docs.livingDocs.versioning')}
                </span>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-5">
                <span className="text-sm font-semibold text-zinc-100">
                  {t('docs.livingDocs.mapping')}
                </span>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-5">
                <span className="text-sm font-semibold text-zinc-100">
                  {t('docs.livingDocs.aiLoad')}
                </span>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-5">
                <span className="text-sm font-semibold text-zinc-100">
                  {t('docs.livingDocs.sync')}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/metago-ai/metagolifeform/blob/main/docs/MAP.md"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                {t('docs.livingDocs.viewMap')} <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/metago-ai/metagolifeform/blob/main/docs/MANIFEST.json"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                {t('docs.livingDocs.viewManifest')} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* 区块6: 底部CTA */}
        <div className="glass-card p-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CircleAlert className="w-8 h-8" style={{ color: hueColor('gov') }} />
            <h2 className="text-2xl font-semibold text-white font-display">
              {t('docs.faqTitle')}
            </h2>
          </div>
          <p className="text-text-secondary mb-6">
            {t('docs.faqDesc')}
          </p>
          <a
            href="https://gitee.com/metago/metagolifeform/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            {t('docs.faqButton')} <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Docs;
