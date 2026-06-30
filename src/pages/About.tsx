import { useTranslation } from 'react-i18next';
import type { ComponentType, CSSProperties, ReactNode } from 'react';
import {
  Scale,
  GitBranch,
  Mail,
  ExternalLink,
  ArrowRight,
  Box,
  Plug,
  Code,
  Terminal,
  Palette,
  Package,
  Store,
  Award,
  Cpu,
  Sparkles,
  Dna,
  ShieldCheck,
  Atom,
  Layers,
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

type PhaseStatus = 'done' | 'active' | 'planned';

interface Phase {
  emoji: string;
  titleKey: string;
  statusLabelKey: string;
  descKey: string;
  status: PhaseStatus;
  hue: Hue;
}

const dotStyle: Record<PhaseStatus, (hue: Hue) => CSSProperties> = {
  done: (hue) => ({
    background: hueColor(hue),
    boxShadow: `0 0 12px -2px ${hueColor(hue)}88`,
  }),
  active: (hue) => ({
    background: hueColor(hue),
    boxShadow: `0 0 20px -2px ${hueColor(hue)}, 0 0 0 4px ${hueColor(hue)}22`,
    animation: 'heartbeat 2s ease-in-out infinite',
  }),
  planned: () => ({
    background: '#52525b',
  }),
};

const badgeStyle: Record<PhaseStatus, (hue: Hue) => CSSProperties> = {
  done: (hue) => ({
    color: hueColor(hue),
    borderColor: `${hueColor(hue)}55`,
    background: `${hueColor(hue)}11`,
  }),
  active: (hue) => ({
    color: hueColor(hue),
    borderColor: `${hueColor(hue)}66`,
    background: `${hueColor(hue)}1A`,
  }),
  planned: () => ({
    color: '#a1a1aa',
    borderColor: 'rgba(82, 82, 91, 0.55)',
    background: 'rgba(82, 82, 91, 0.1)',
  }),
};

const phases: Phase[] = [
  {
    emoji: '✅',
    titleKey: 'about.roadmapV3650.title',
    statusLabelKey: 'about.roadmapV3650.statusLabel',
    descKey: 'about.roadmapV3650.desc',
    status: 'done',
    hue: 'life',
  },
  {
    emoji: '✅',
    titleKey: 'about.roadmapV3660.title',
    statusLabelKey: 'about.roadmapV3660.statusLabel',
    descKey: 'about.roadmapV3660.desc',
    status: 'done',
    hue: 'evo',
  },
  {
    emoji: '🎉',
    titleKey: 'about.roadmapV3670.title',
    statusLabelKey: 'about.roadmapV3670.statusLabel',
    descKey: 'about.roadmapV3670.desc',
    status: 'done',
    hue: 'patent',
  },
  {
    emoji: '🚀',
    titleKey: 'about.roadmapV370.title',
    statusLabelKey: 'about.roadmapV370.statusLabel',
    descKey: 'about.roadmapV370.desc',
    status: 'planned',
    hue: 'quantum',
  },
];

interface Stat {
  end: number;
  labelKey: string;
  hue: Hue;
  icon: ComponentType<{ className?: string; style?: CSSProperties; size?: number }>;
}

const stats: Stat[] = [
  { end: 36, labelKey: 'about.statsAxioms', hue: 'patent', icon: Dna },
  { end: 43, labelKey: 'about.statsAttributes', hue: 'life', icon: Sparkles },
  { end: 108, labelKey: 'about.statsProtocols', hue: 'gov', icon: ShieldCheck },
  { end: 37, labelKey: 'about.statsSkills', hue: 'evo', icon: Cpu },
  { end: 35, labelKey: 'about.statsMcpTools', hue: 'life', icon: Plug },
  { end: 125, labelKey: 'about.statsEngines', hue: 'patent', icon: Layers },
  { end: 927, labelKey: 'about.statsAlgorithms', hue: 'evo', icon: Atom },
  { end: 984, labelKey: 'about.statsAtoms', hue: 'life', icon: Box },
  { end: 754, labelKey: 'about.statsPatents', hue: 'patent', icon: Award },
  { end: 19, labelKey: 'about.statsMetaIdeas', hue: 'quantum', icon: Sparkles },
  { end: 13, labelKey: 'about.statsFamilies', hue: 'gov', icon: GitBranch },
  { end: 7, labelKey: 'about.statsPlatforms', hue: 'evo', icon: Terminal },
];

interface ProductCard {
  icon: ComponentType<{ className?: string; style?: CSSProperties }>;
  titleKey: string;
  tagKey: string;
  descKey: string;
  hue: Hue;
  code?: string;
}

const productCards: ProductCard[] = [
  {
    icon: Cpu,
    titleKey: 'about.engine.title',
    tagKey: 'about.engine.tag',
    descKey: 'about.engine.desc',
    hue: 'patent',
    code: 'npm install @metago-ai/engine',
  },
  {
    icon: Box,
    titleKey: 'about.lifeformKit.title',
    tagKey: 'about.lifeformKit.tag',
    descKey: 'about.lifeformKit.desc',
    hue: 'life',
    code: 'irm https://gitee.com/metago/metagolifeform/raw/main/scripts/bootstrap-install.ps1 | iex',
  },
  {
    icon: Plug,
    titleKey: 'about.mcpServer.title',
    tagKey: 'about.mcpServer.tag',
    descKey: 'about.mcpServer.desc',
    hue: 'quantum',
    code: 'npm install -g @metago-ai/mcp-server',
  },
  {
    icon: Code,
    titleKey: 'about.devKit.title',
    tagKey: 'about.devKit.tag',
    descKey: 'about.devKit.desc',
    hue: 'evo',
  },
  {
    icon: Terminal,
    titleKey: 'about.cli.title',
    tagKey: 'about.cli.tag',
    descKey: 'about.cli.desc',
    hue: 'gov',
  },
  {
    icon: Palette,
    titleKey: 'about.studio.title',
    tagKey: 'about.studio.tag',
    descKey: 'about.studio.desc',
    hue: 'life',
  },
  {
    icon: Package,
    titleKey: 'about.skillsSdk.title',
    tagKey: 'about.skillsSdk.tag',
    descKey: 'about.skillsSdk.desc',
    hue: 'evo',
  },
  {
    icon: Store,
    titleKey: 'about.skillsHub.title',
    tagKey: 'about.skillsHub.tag',
    descKey: 'about.skillsHub.desc',
    hue: 'gov',
  },
  {
    icon: Award,
    titleKey: 'about.certify.title',
    tagKey: 'about.certify.tag',
    descKey: 'about.certify.desc',
    hue: 'patent',
  },
];

interface InfoCard {
  icon: ComponentType<{ className?: string; style?: CSSProperties }>;
  titleKey: string;
  children: ReactNode;
  hue: Hue;
}

function About() {
  const { t } = useTranslation();

  const infoCards: InfoCard[] = [
    {
      icon: Scale,
      titleKey: 'about.infoLicenseTitle',
      hue: 'life',
      children: <span className="text-white font-semibold">MIT</span>,
    },
    {
      icon: GitBranch,
      titleKey: 'about.infoRepoTitle',
      hue: 'gov',
      children: (
        <div className="flex flex-col gap-1.5">
          <a
            href="https://gitee.com/metago/metagolifeform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:gap-2 transition-all"
            style={{ color: '#5eead4' }}
          >
            Gitee <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://github.com/metago-ai/metagolifeform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:gap-2 transition-all"
            style={{ color: '#5eead4' }}
          >
            GitHub <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://www.npmjs.com/package/@metago-ai/engine"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:gap-2 transition-all"
            style={{ color: '#5eead4' }}
          >
            NPM <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      ),
    },
    {
      icon: Mail,
      titleKey: 'about.infoContactTitle',
      hue: 'evo',
      children: (
        <a
          href="mailto:researcher.yi@youfer.cn"
          className="inline-flex items-center gap-1.5 hover:gap-2 transition-all"
          style={{ color: '#5eead4' }}
        >
          researcher.yi@youfer.cn <ArrowRight className="w-3.5 h-3.5" />
        </a>
      ),
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* ===== Hero：基因卷首 ===== */}
      <section className="relative min-h-[60vh] flex items-center px-6 pt-32 pb-16">
        <ParticleBg />
        <div className="relative z-10 max-w-5xl mx-auto w-full text-center animate-blur-in">
          <div className="life-badge mb-6 inline-flex">
            <Sparkles size={12} />
            {t('about.badge')} · {t('about.versionTag')}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight font-display">
            <span
              style={{
                background: 'linear-gradient(135deg, #5eead4 0%, #fbbf24 50%, #a5b4fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t('about.title')}
            </span>
          </h1>
          <p className="text-base md:text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            {t('about.subtitle')}
          </p>
        </div>
      </section>

      <div className="hex-divider max-w-5xl mx-auto" />

      {/* ===== 全息数据成就汇总条：12 维 ===== */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <div className="patent-badge mb-4 inline-flex">
            <Dna size={12} /> {t('about.statsTitle')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-display">
            <span className="gradient-text">{t('about.statsTitle')}</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">{t('about.statsSubtitle')}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            const color = hueColor(s.hue);
            return (
              <div
                key={s.labelKey}
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
                    animationDelay: `${idx * 0.15}s`,
                  }}
                >
                  <CountUp end={s.end} />
                </div>
                <div className="text-[10px] font-mono text-text-secondary">
                  {t(s.labelKey)}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="hex-divider max-w-5xl mx-auto" />

      {/* ===== 愿景使命（重写内容） ===== */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <div className="life-badge mb-4 inline-flex">
            <Sparkles size={12} /> {t('about.visionTitle')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display">
            <span className="gradient-text">{t('about.visionTitle')}</span>
          </h2>
        </div>
        <div className="glass-card p-8 md:p-10">
          <div
            className="text-text-secondary space-y-5"
            style={{ lineHeight: '1.8', fontSize: '16px' }}
          >
            <p>{t('about.visionParagraph1')}</p>
            <p>{t('about.visionParagraph2')}</p>
            <p>{t('about.visionParagraph3')}</p>
            <p
              className="font-display font-semibold"
              style={{ color: '#5eead4' }}
            >
              {t('about.visionParagraph4')}
            </p>
          </div>
        </div>
      </section>

      {/* ===== 产品矩阵：9 张卡片（新增引擎卡） ===== */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <div className="quantum-badge mb-4 inline-flex">
            <Layers size={12} /> {t('about.productMatrixTitle')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-display">
            <span className="gradient-text">{t('about.productMatrixTitle')}</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {t('about.productMatrixSubtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productCards.map((card, idx) => {
            const Icon = card.icon;
            const color = hueColor(card.hue);
            return (
              <div
                key={card.titleKey}
                className="glass-card p-7 group animate-slide-up"
                style={{
                  animationDelay: `${idx * 0.06}s`,
                  borderColor: `${color}22`,
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-lg shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${color}22, ${color}08)`,
                      boxShadow: `inset 0 0 0 1px ${color}33`,
                    }}
                  >
                    <Icon style={{ color }} className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-white font-display">
                    {t(card.titleKey)}
                  </h3>
                  <span
                    className="ml-auto px-2.5 py-0.5 text-xs font-medium rounded-full border"
                    style={{
                      color,
                      borderColor: `${color}55`,
                      background: `${color}11`,
                    }}
                  >
                    {t(card.tagKey)}
                  </span>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  {t(card.descKey)}
                </p>
                {card.code && (
                  <code
                    className="text-xs font-mono break-all block px-3 py-2 rounded"
                    style={{
                      background: 'rgba(8, 12, 20, 0.6)',
                      border: `1px solid ${color}22`,
                      color: '#5eead4',
                    }}
                  >
                    {card.code}
                  </code>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <div className="hex-divider max-w-5xl mx-auto" />

      {/* ===== 路线图（v36.5/v36.6/v36.7/v37.0+） ===== */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <div className="evo-badge mb-4 inline-flex">
            <GitBranch size={12} /> {t('about.roadmapTitle')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display">
            <span className="gradient-text">{t('about.roadmapTitle')}</span>
          </h2>
        </div>
        <div className="relative">
          {phases.map((phase, idx) => {
            const isLast = idx === phases.length - 1;
            const color = hueColor(phase.hue);
            return (
              <div
                key={phase.titleKey}
                className="relative flex gap-6 pb-8 last:pb-0 animate-tree-grow"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* 左侧：节点 + 连线 */}
                <div className="relative flex flex-col items-center">
                  <div
                    className="w-4 h-4 rounded-full shrink-0 mt-2"
                    style={dotStyle[phase.status](phase.hue)}
                  />
                  {!isLast && (
                    <div
                      className="w-px flex-1 mt-2"
                      style={{
                        background: `linear-gradient(to bottom, ${color}55, ${color}11)`,
                      }}
                    />
                  )}
                </div>
                {/* 右侧：阶段卡片 */}
                <div
                  className="glass-card p-6 flex-1 mb-2"
                  style={{ borderColor: `${color}22` }}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-2xl">{phase.emoji}</span>
                    <h3 className="text-base md:text-lg font-semibold text-white font-display">
                      {t(phase.titleKey)}
                    </h3>
                    <span
                      className="px-2.5 py-0.5 text-xs font-medium rounded-full border"
                      style={badgeStyle[phase.status](phase.hue)}
                    >
                      {t(phase.statusLabelKey)}
                    </span>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {t(phase.descKey)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== 创始人署名 ===== */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div
          className="glass-card p-8 md:p-10 text-center"
          style={{
            borderColor: 'rgba(94, 234, 212, 0.25)',
            background:
              'linear-gradient(135deg, rgba(94, 234, 212, 0.05), rgba(251, 191, 36, 0.03), rgba(13, 18, 25, 0.55))',
          }}
        >
          <div className="quantum-badge mb-4 inline-flex">
            <Sparkles size={12} /> {t('about.founderTitle')}
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-2 font-display gradient-text">
            {t('about.founderName')}
          </h3>
          <p className="text-sm text-text-secondary mb-4 font-mono">
            {t('about.founderRole')}
          </p>
          <p
            className="text-base md:text-lg font-display italic max-w-2xl mx-auto"
            style={{ color: '#5eead4', lineHeight: '1.7' }}
          >
            {t('about.founderQuote')}
          </p>
        </div>
      </section>

      {/* ===== 底部信息卡 ===== */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {infoCards.map((card) => {
            const Icon = card.icon;
            const color = hueColor(card.hue);
            return (
              <div
                key={card.titleKey}
                className="glass-card p-6"
                style={{ borderColor: `${color}22` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-lg"
                    style={{
                      background: `linear-gradient(135deg, ${color}22, ${color}08)`,
                      boxShadow: `inset 0 0 0 1px ${color}33`,
                    }}
                  >
                    <Icon style={{ color }} className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-white font-display">
                    {t(card.titleKey)}
                  </h3>
                </div>
                <div className="text-zinc-300">{card.children}</div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default About;
