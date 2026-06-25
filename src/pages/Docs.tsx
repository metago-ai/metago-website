import { useTranslation } from 'react-i18next';
import type { ComponentType } from 'react';
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
} from 'lucide-react';
import McpInstallBlock from '../components/McpInstallBlock';

interface DocItem {
  key: 'quickStart' | 'architecture' | 'customization' | 'faq' | 'mcpServer';
  icon: ComponentType<{ className?: string }>;
  desc: string;
  link: string;
}

const docs: DocItem[] = [
  {
    key: 'quickStart',
    icon: Rocket,
    desc: '一键安装、验证、卸载',
    link: 'https://gitee.com/metago/metagolifeform/blob/main/docs/GETTING_STARTED.md',
  },
  {
    key: 'architecture',
    icon: Layers,
    desc: '五层架构、22技能、公理属性',
    link: 'https://gitee.com/metago/metagolifeform/blob/main/docs/ARCHITECTURE.md',
  },
  {
    key: 'customization',
    icon: Settings,
    desc: '技能创建、规则修改、平台适配',
    link: 'https://gitee.com/metago/metagolifeform/blob/main/docs/CUSTOMIZATION.md',
  },
  {
    key: 'mcpServer',
    icon: Package,
    desc: 'MCP 安装、配置、22 Tools、8 Prompts',
    link: 'https://gitee.com/metago/metagolifeform/blob/main/docs/MCP_SERVER.md',
  },
  {
    key: 'faq',
    icon: CircleQuestionMark,
    desc: '安装问题、平台差异、升级方法',
    link: 'https://gitee.com/metago/metagolifeform/blob/main/docs/GETTING_STARTED.md#常见问题-faq',
  },
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
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
            {t('docs.title')}
          </h1>
          <p className="text-xl text-zinc-400">{t('docs.subtitle')}</p>
        </div>

        {/* 区块2: 文档卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {docs.map((doc) => {
            const Icon = doc.icon;
            return (
              <a
                key={doc.key}
                href={doc.link}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-8 block group"
              >
                <div className="flex items-start gap-5">
                  <div className="shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      {t(`docs.${doc.key}`)}
                    </h3>
                    <p className="text-zinc-400 mb-4">{doc.desc}</p>
                    <span className="inline-flex items-center gap-1 text-accent-blue group-hover:gap-2 transition-all">
                      查看文档 <ArrowRight className="w-4 h-4" />
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
            <Terminal className="w-6 h-6 text-accent-green" />
            <h2 className="text-2xl font-semibold text-white">快速安装</h2>
          </div>
          <pre className="glass-card p-6 overflow-x-auto">
            <code className="font-mono text-sm leading-relaxed text-accent-green whitespace-pre">
              {installCommands}
            </code>
          </pre>
        </div>

        {/* 区块4: MCP Server 快速开始 */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Package className="w-6 h-6 text-accent-blue" />
            <h2 className="text-2xl font-semibold text-white">
              {t('docs.mcpServer.title')}
            </h2>
          </div>
          <div className="glass-card p-6 md:p-8 mb-6">
            <p className="text-zinc-400 mb-6 leading-relaxed">
              {t('docs.mcpServer.desc')}
            </p>
            {/* npm 安装命令 */}
            <McpInstallBlock className="mb-6" />
            {/* 22 Tools / 8 Prompts 概览 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-lg border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Wrench className="w-5 h-5 text-accent-blue" />
                  <span className="text-sm font-semibold text-zinc-100">
                    {t('docs.mcpServer.toolsTitle')}
                  </span>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {t('docs.mcpServer.toolsDesc')}
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-accent-purple" />
                  <span className="text-sm font-semibold text-zinc-100">
                    {t('docs.mcpServer.promptsTitle')}
                  </span>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">
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

        {/* 区块5: 底部CTA */}
        <div className="glass-card p-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CircleAlert className="w-8 h-8 text-accent-purple" />
            <h2 className="text-2xl font-semibold text-white">有其他问题？</h2>
          </div>
          <p className="text-zinc-400 mb-6">
            在 Gitee Issues 中提交您的问题，我们会尽快回复
          </p>
          <a
            href="https://gitee.com/metago/metagolifeform/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            前往 Issues <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Docs;
