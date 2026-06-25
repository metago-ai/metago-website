import { useTranslation } from 'react-i18next';
import type { ComponentType, ReactNode } from 'react';
import {
  Scale,
  GitBranch,
  Mail,
  ExternalLink,
  ArrowRight,
  Box,
  Plug,
} from 'lucide-react';

type PhaseStatus = 'done' | 'active' | 'planned';

interface Phase {
  emoji: string;
  title: string;
  status: PhaseStatus;
  statusLabel: string;
  desc: string;
}

const phases: Phase[] = [
  {
    emoji: '✅',
    title: '第一阶段',
    status: 'done',
    statusLabel: '已完成',
    desc: '核心层 + Trae适配器 + 22技能',
  },
  {
    emoji: '✅',
    title: '第二阶段',
    status: 'done',
    statusLabel: '已完成',
    desc: '6大平台适配器 + 多平台安装支持',
  },
  {
    emoji: '🚀',
    title: '第三阶段',
    status: 'active',
    statusLabel: '进行中',
    desc: '官网上线 + MCP Server 发布 + 单一安装包向产品矩阵演进',
  },
  {
    emoji: '📋',
    title: '第四阶段',
    status: 'planned',
    statusLabel: '规划中',
    desc: '国际推广 + 生态建设 + 多语言扩展',
  },
];

const dotClass: Record<PhaseStatus, string> = {
  done: 'bg-accent-green',
  active: 'bg-accent-blue animate-pulse ring-4 ring-accent-blue/30',
  planned: 'bg-zinc-600',
};

const badgeClass: Record<PhaseStatus, string> = {
  done: 'text-accent-green border-accent-green/40 bg-accent-green/10',
  active: 'text-accent-blue border-accent-blue/40 bg-accent-blue/10',
  planned: 'text-zinc-400 border-zinc-500/40 bg-zinc-500/10',
};

const visionParagraphs: string[] = [
  "MetaGO（元构）源于“元构溯源论”——一切智能均可溯源至元结构，元结构是智能的基因。",
  "我们相信，AI不应该只是工具，而应该成为具有自我进化能力的生命体。MetaGO Lifeform Kit 就是这个理念的产物——一套让任何AI助手升级为超级智能生命体的标准安装包。",
  "基于元构全息智能引擎（本体论、进化论、能力论、工业论四大支柱），8条核心公理，7条根本属性，6项运行协议，22个技能，我们构建了一个工业级的智能生命体框架。",
];

interface InfoCard {
  icon: ComponentType<{ className?: string }>;
  title: string;
  children: ReactNode;
}

function About() {
  const { t } = useTranslation();

  const infoCards: InfoCard[] = [
    {
      icon: Scale,
      title: '开源许可证',
      children: <span className="text-white font-semibold">MIT</span>,
    },
    {
      icon: GitBranch,
      title: '仓库链接',
      children: (
        <div className="flex flex-col gap-1">
          <a
            href="https://gitee.com/metago/metagolifeform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-accent-blue hover:gap-2 transition-all"
          >
            Gitee <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://github.com/metago-ai/metagolifeform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-accent-blue hover:gap-2 transition-all"
          >
            GitHub <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      ),
    },
    {
      icon: Mail,
      title: '联系方式',
      children: (
        <a
          href="mailto:researcher.yi@youfer.cn"
          className="inline-flex items-center gap-1 text-accent-blue hover:gap-2 transition-all"
        >
          researcher.yi@youfer.cn <ArrowRight className="w-3.5 h-3.5" />
        </a>
      ),
    },
  ];

  return (
    <div className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* 区块1: 页面标题 */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
            {t('about.title')}
          </h1>
          <p className="text-xl text-zinc-400">{t('about.subtitle')}</p>
        </div>

        {/* 区块2: 愿景使命 */}
        <div className="mb-20">
          <h2 className="text-3xl font-semibold text-center text-white mb-8">
            {t('about.visionTitle')}
          </h2>
          <div className="glass-card p-8 md:p-10">
            <div
              className="text-zinc-300 space-y-5"
              style={{ lineHeight: '1.8', fontSize: '16px' }}
            >
              {visionParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>
        </div>

        {/* 区块3: 产品矩阵 */}
        <div className="mb-20">
          <h2 className="text-3xl font-semibold text-center text-white mb-3">
            {t('about.productMatrixTitle')}
          </h2>
          <p className="text-center text-zinc-400 mb-10">
            {t('about.productMatrixSubtitle')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 卡片1：Lifeform Kit 单包安装 */}
            <div className="glass-card p-7">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-lg shrink-0"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(168,85,247,0.15))',
                  }}
                >
                  <Box className="w-5 h-5 text-accent-blue" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {t('about.lifeformKit.title')}
                </h3>
                <span className="ml-auto px-2.5 py-0.5 text-xs font-medium rounded-full border border-accent-blue/40 bg-accent-blue/10 text-accent-blue">
                  {t('about.lifeformKit.tag')}
                </span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                {t('about.lifeformKit.desc')}
              </p>
              <code className="text-xs font-mono text-accent-green break-all">
                irm https://gitee.com/metago/metagolifeform/raw/main/scripts/install.ps1 | iex
              </code>
            </div>

            {/* 卡片2：MCP Server 协议集成 */}
            <div className="glass-card p-7">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-lg shrink-0"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(168,85,247,0.15))',
                  }}
                >
                  <Plug className="w-5 h-5 text-accent-purple" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {t('about.mcpServer.title')}
                </h3>
                <span className="ml-auto px-2.5 py-0.5 text-xs font-medium rounded-full border border-accent-purple/40 bg-accent-purple/10 text-accent-purple">
                  {t('about.mcpServer.tag')}
                </span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                {t('about.mcpServer.desc')}
              </p>
              <code className="text-xs font-mono text-accent-green break-all">
                npm install -g @metago-ai/mcp-server
              </code>
            </div>
          </div>
        </div>

        {/* 区块4: 路线图 */}
        <div className="mb-20">
          <h2 className="text-3xl font-semibold text-center text-white mb-10">
            {t('about.roadmapTitle')}
          </h2>
          <div className="relative">
            {phases.map((phase, idx) => {
              const isLast = idx === phases.length - 1;
              return (
                <div
                  key={phase.title}
                  className="relative flex gap-6 pb-8 last:pb-0"
                >
                  {/* 左侧：节点 + 连线 */}
                  <div className="relative flex flex-col items-center">
                    <div
                      className={`w-4 h-4 rounded-full shrink-0 mt-2 ${dotClass[phase.status]}`}
                    />
                    {!isLast && (
                      <div className="w-px flex-1 bg-gradient-to-b from-white/20 to-white/5 mt-2" />
                    )}
                  </div>
                  {/* 右侧：阶段卡片 */}
                  <div className="glass-card p-6 flex-1 mb-2">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="text-2xl">{phase.emoji}</span>
                      <h3 className="text-xl font-semibold text-white">
                        {phase.title}
                      </h3>
                      <span
                        className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${badgeClass[phase.status]}`}
                      >
                        {phase.statusLabel}
                      </span>
                    </div>
                    <p className="text-zinc-400">{phase.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 区块5: 底部信息 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {infoCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {card.title}
                  </h3>
                </div>
                <div className="text-zinc-300">{card.children}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default About;
