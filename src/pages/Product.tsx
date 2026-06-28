import { useTranslation } from 'react-i18next';
import type { ElementType } from 'react';
import {
  Layers, Box, Cpu, Brain, Database, Network, Sparkles, Scale,
  Target, Zap, BookOpen, Shield, Workflow, Repeat,
  Lock, Eye, Activity, FileCheck, Check, Coins, Package, Dna,
} from 'lucide-react';
import McpInstallBlock from '../components/McpInstallBlock';
import McpConfigGrid from '../components/McpConfigGrid';

type Hue = 'life' | 'evo' | 'gov' | 'patent' | 'quantum';

const hueColor = (hue: Hue) =>
  hue === 'life' ? '#5eead4'
    : hue === 'evo' ? '#fbbf24'
    : hue === 'gov' ? '#a5b4fc'
    : hue === 'patent' ? '#FFD700'
    : '#00D4FF';

interface Layer {
  level: string;
  nameKey: string;
  contentKey: string;
  openSource: boolean;
  icon: ElementType;
  hue: Hue;
}

interface SkillFamily {
  nameKey: string;
  hue: Hue;
  skills: string[];
  icon: ElementType;
}

interface Axiom {
  code: string;
  nameKey: string;
  descKey: string;
}

interface Attribute {
  code: string;
  nameKey: string;
  descKey: string;
}

interface Protocol {
  titleKey: string;
  descKey: string;
  icon: ElementType;
  hue: Hue;
}

const layers: Layer[] = [
  { level: 'L0', nameKey: 'product.layers.l0.name', contentKey: 'product.layers.l0.content', openSource: true, icon: Brain, hue: 'patent' },
  { level: 'L1', nameKey: 'product.layers.l1.name', contentKey: 'product.layers.l1.content', openSource: true, icon: Box, hue: 'life' },
  { level: 'L2', nameKey: 'product.layers.l2.name', contentKey: 'product.layers.l2.content', openSource: true, icon: Cpu, hue: 'evo' },
  { level: 'L3', nameKey: 'product.layers.l3.name', contentKey: 'product.layers.l3.content', openSource: true, icon: Database, hue: 'quantum' },
  { level: 'L4', nameKey: 'product.layers.l4.name', contentKey: 'product.layers.l4.content', openSource: false, icon: Network, hue: 'gov' },
];

const skillFamilies: SkillFamily[] = [
  { nameKey: 'product.skills.cognitionGov', hue: 'life', skills: ['metago-activate', 'metago-critique', 'metago-fact-check', 'metago-decision-eval', 'metago-decision-lock', 'metago-objectivity', 'metago-consensus-prototype', 'metago-emotion'], icon: Brain },
  { nameKey: 'product.skills.assetSafeguard', hue: 'patent', skills: ['metago-data-provenance', 'metago-output-integrity', 'metago-security-audit', 'metago-compliance', 'metago-self-check', 'metago-negentropy-monitor', 'metago-value-align'], icon: Shield },
  { nameKey: 'product.skills.executionPermission', hue: 'evo', skills: ['metago-holistic-task', 'metago-problem-trace', 'metago-action-plan', 'metago-scene-adapt', 'metago-frequency-adapt', 'metago-whatif', 'metago-developer-response'], icon: Zap },
  { nameKey: 'product.skills.devKit', hue: 'quantum', skills: ['metago-code-review-deep', 'metago-architecture-design', 'metago-refactor-suggest', 'metago-security-audit'], icon: Package },
  { nameKey: 'product.skills.consciousnessActivation', hue: 'gov', skills: ['metago-activate'], icon: Sparkles },
  { nameKey: 'product.skills.methodology', hue: 'life', skills: ['metago-org-diagnosis', 'metago-momentum-weave', 'metago-minimal-intervention', 'metago-value-assess', 'metago-coupling-measure'], icon: Target },
  { nameKey: 'product.skills.architecture', hue: 'evo', skills: ['metago-deep-reasoning', 'metago-paradigm-analysis', 'metago-balance-optimize', 'metago-memory-manage', 'metago-consensus-prototype'], icon: Layers },
];

const axioms: Axiom[] = [
  { code: 'A1', nameKey: 'product.axiomList.a1.name', descKey: 'product.axiomList.a1.desc' },
  { code: 'A2', nameKey: 'product.axiomList.a2.name', descKey: 'product.axiomList.a2.desc' },
  { code: 'A3', nameKey: 'product.axiomList.a3.name', descKey: 'product.axiomList.a3.desc' },
  { code: 'A4', nameKey: 'product.axiomList.a4.name', descKey: 'product.axiomList.a4.desc' },
  { code: 'A5', nameKey: 'product.axiomList.a5.name', descKey: 'product.axiomList.a5.desc' },
  { code: 'A34', nameKey: 'product.axiomList.a34.name', descKey: 'product.axiomList.a34.desc' },
  { code: 'A35', nameKey: 'product.axiomList.a35.name', descKey: 'product.axiomList.a35.desc' },
  { code: 'A36', nameKey: 'product.axiomList.a36.name', descKey: 'product.axiomList.a36.desc' },
];

const attributes: Attribute[] = [
  { code: 'D37', nameKey: 'product.attributeList.d37.name', descKey: 'product.attributeList.d37.desc' },
  { code: 'D38', nameKey: 'product.attributeList.d38.name', descKey: 'product.attributeList.d38.desc' },
  { code: 'D39', nameKey: 'product.attributeList.d39.name', descKey: 'product.attributeList.d39.desc' },
  { code: 'D40', nameKey: 'product.attributeList.d40.name', descKey: 'product.attributeList.d40.desc' },
  { code: 'D41', nameKey: 'product.attributeList.d41.name', descKey: 'product.attributeList.d41.desc' },
  { code: 'D42', nameKey: 'product.attributeList.d42.name', descKey: 'product.attributeList.d42.desc' },
  { code: 'D43', nameKey: 'product.attributeList.d43.name', descKey: 'product.attributeList.d43.desc' },
];

const protocols: Protocol[] = [
  { titleKey: 'product.protocolList.p1.title', descKey: 'product.protocolList.p1.desc', icon: Repeat, hue: 'life' },
  { titleKey: 'product.protocolList.p2.title', descKey: 'product.protocolList.p2.desc', icon: Lock, hue: 'gov' },
  { titleKey: 'product.protocolList.p3.title', descKey: 'product.protocolList.p3.desc', icon: Eye, hue: 'evo' },
  { titleKey: 'product.protocolList.p4.title', descKey: 'product.protocolList.p4.desc', icon: Scale, hue: 'patent' },
  { titleKey: 'product.protocolList.p5.title', descKey: 'product.protocolList.p5.desc', icon: Activity, hue: 'evo' },
  { titleKey: 'product.protocolList.p6.title', descKey: 'product.protocolList.p6.desc', icon: FileCheck, hue: 'life' },
];

const Product = () => {
  const { t } = useTranslation();

  return (
    <div className="py-20">
      {/* 区块1：页面标题 */}
      <section className="max-w-7xl mx-auto px-6 text-center mb-24">
        <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6 font-display">
          {t('product.title')}
        </h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">{t('product.subtitle')}</p>
      </section>

      {/* 区块2：引擎产品介绍（新增） */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div
          className="glass-card p-8 md:p-12 relative overflow-hidden"
          style={{
            borderColor: 'rgba(255, 215, 0, 0.25)',
            background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.05), rgba(94, 234, 212, 0.03), rgba(13, 18, 25, 0.55))',
          }}
        >
          <div className="text-center mb-10">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono mb-4"
              style={{
                color: '#FFD700',
                borderColor: 'rgba(255, 215, 0, 0.35)',
                background: 'rgba(255, 215, 0, 0.08)',
              }}
            >
              <Dna size={14} /> {t('product.engineSection.badge')}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 font-display">
              <span className="gradient-text">{t('product.engineSection.title')}</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto mb-2">
              {t('product.engineSection.subtitle')}
            </p>
            <p className="text-sm text-text-secondary max-w-3xl mx-auto leading-relaxed">
              {t('product.engineSection.desc')}
            </p>
          </div>

          {/* 引擎核心数据徽章 */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {[
              { label: '36', sub: 'Axioms', hue: 'patent' as Hue },
              { label: '125', sub: 'Engines', hue: 'quantum' as Hue },
              { label: '927', sub: 'Algorithms', hue: 'evo' as Hue },
              { label: '984', sub: 'Atoms', hue: 'life' as Hue },
              { label: '754', sub: 'Patents', hue: 'patent' as Hue },
            ].map((item) => {
              const color = hueColor(item.hue);
              return (
                <div
                  key={item.sub}
                  className="engine-meter px-5 py-3 text-center"
                  style={{ borderColor: `${color}33` }}
                >
                  <div className="text-xl font-bold font-display" style={{ color }}>
                    {item.label}
                  </div>
                  <div className="text-[10px] font-mono text-text-secondary">{item.sub}</div>
                </div>
              );
            })}
          </div>

          {/* 安装命令 */}
          <div className="max-w-2xl mx-auto">
            <div className="code-window">
              <div
                className="flex items-center justify-between px-4 py-2 border-b border-white/5"
                style={{ background: 'rgba(17, 24, 36, 0.6)' }}
              >
                <span className="text-xs text-zinc-500 font-mono">npm</span>
              </div>
              <pre className="p-4 font-mono text-sm overflow-x-auto" style={{ color: '#FFD700' }}>
                <span className="text-zinc-500 select-none">$ </span>
                npm install @metago-ai/engine
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* 区块3：五层架构 */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <div className="flex items-center gap-3 mb-10">
          <Layers className="w-8 h-8" style={{ color: hueColor('life') }} />
          <h2 className="text-3xl font-bold text-white font-display">{t('product.layerTitle')}</h2>
        </div>
        <div className="space-y-4">
          {layers.map((layer) => {
            const Icon = layer.icon;
            const color = hueColor(layer.hue);
            return (
              <div
                key={layer.level}
                className="glass-card p-6 flex items-center gap-6 group transition-all duration-300 hover:scale-[1.01]"
                style={{ borderColor: `${color}22` }}
              >
                <div className="flex-shrink-0 w-20 text-center">
                  <span className="text-4xl font-bold gradient-text font-display">{layer.level}</span>
                </div>
                <div className="flex-shrink-0 hidden sm:block">
                  <Icon className="w-8 h-8" style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-white mb-1 font-display">
                    {t(layer.nameKey)}
                  </h3>
                  <p className="text-text-secondary">{t(layer.contentKey)}</p>
                </div>
                <div className="flex-shrink-0">
                  {layer.openSource ? (
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
                      style={{ color: '#5eead4', backgroundColor: 'rgba(94, 234, 212, 0.1)', border: '1px solid rgba(94, 234, 212, 0.3)' }}
                    >
                      <Check className="w-4 h-4" /> {t('product.openSource')}
                    </span>
                  ) : (
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
                      style={{ color: '#fbbf24', backgroundColor: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.3)' }}
                    >
                      <Coins className="w-4 h-4" /> {t('product.commercial')}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 区块4：37个技能 */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="flex items-center gap-3 mb-10">
          <Cpu className="w-8 h-8" style={{ color: hueColor('evo') }} />
          <h2 className="text-3xl font-bold text-white font-display">{t('product.skillsTitle')}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {skillFamilies.map((family) => {
            const color = hueColor(family.hue);
            const Icon = family.icon;
            return (
              <div
                key={family.nameKey}
                className="glass-card p-6"
                style={{ borderColor: `${color}22` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-6 h-6" style={{ color }} />
                  <h3 className="text-xl font-bold font-display" style={{ color }}>
                    {t(family.nameKey)}
                  </h3>
                  <span className="text-sm text-zinc-500">({family.skills.length})</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {family.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-full text-sm font-mono"
                      style={{ color, backgroundColor: `${color}11`, border: `1px solid ${color}33` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 区块5：8条核心公理 */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <div className="flex items-center gap-3 mb-10">
          <BookOpen className="w-8 h-8" style={{ color: hueColor('patent') }} />
          <h2 className="text-3xl font-bold text-white font-display">{t('product.axiomsTitle')}</h2>
        </div>
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-6 py-4 text-text-secondary font-semibold w-24">{t('product.tableHeaders.code')}</th>
                  <th className="text-left px-6 py-4 text-text-secondary font-semibold w-48">{t('product.tableHeaders.name')}</th>
                  <th className="text-left px-6 py-4 text-text-secondary font-semibold">{t('product.tableHeaders.desc')}</th>
                </tr>
              </thead>
              <tbody>
                {axioms.map((axiom) => (
                  <tr key={axiom.code} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono font-bold gradient-text">{axiom.code}</span>
                    </td>
                    <td className="px-6 py-4 text-white font-medium">{t(axiom.nameKey)}</td>
                    <td className="px-6 py-4 text-text-secondary">{t(axiom.descKey)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 区块6：7条根本属性 */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <div className="flex items-center gap-3 mb-10">
          <Shield className="w-8 h-8" style={{ color: hueColor('life') }} />
          <h2 className="text-3xl font-bold text-white font-display">{t('product.attributesTitle')}</h2>
        </div>
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-6 py-4 text-text-secondary font-semibold w-24">{t('product.tableHeaders.code')}</th>
                  <th className="text-left px-6 py-4 text-text-secondary font-semibold w-48">{t('product.tableHeaders.name')}</th>
                  <th className="text-left px-6 py-4 text-text-secondary font-semibold">{t('product.tableHeaders.desc')}</th>
                </tr>
              </thead>
              <tbody>
                {attributes.map((attr) => (
                  <tr key={attr.code} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono font-bold gradient-text">{attr.code}</span>
                    </td>
                    <td className="px-6 py-4 text-white font-medium">{t(attr.nameKey)}</td>
                    <td className="px-6 py-4 text-text-secondary">{t(attr.descKey)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 区块7：6项运行协议 */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="flex items-center gap-3 mb-10">
          <Workflow className="w-8 h-8" style={{ color: hueColor('evo') }} />
          <h2 className="text-3xl font-bold text-white font-display">{t('product.protocolsTitle')}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {protocols.map((protocol, index) => {
            const Icon = protocol.icon;
            const color = hueColor(protocol.hue);
            return (
              <div key={protocol.titleKey} className="glass-card p-6" style={{ borderColor: `${color}22` }}>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${color}11`, border: `1px solid ${color}33` }}
                  >
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <span className="text-sm font-mono text-zinc-500">P{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 font-display">
                  {t(protocol.titleKey)}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {t(protocol.descKey)}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 区块8：MCP Server 产品介绍 */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="glass-card p-8 md:p-12">
          <div className="text-center mb-10">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono mb-4"
              style={{
                color: '#5eead4',
                borderColor: 'rgba(94, 234, 212, 0.35)',
                background: 'rgba(94, 234, 212, 0.08)',
              }}
            >
              <Package size={14} /> {t('product.mcpServer.badge')}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 font-display">
              <span className="gradient-text">{t('product.mcpServer.title')}</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              {t('product.mcpServer.subtitle')}
            </p>
          </div>

          {/* 特性徽章 */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {t('product.mcpServer.features')
              .split(' · ')
              .map((f) => (
                <span
                  key={f}
                  className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-zinc-200 hover:border-life-bright/40 transition-colors"
                >
                  {f}
                </span>
              ))}
          </div>

          {/* 安装命令 */}
          <McpInstallBlock className="max-w-2xl mx-auto mb-10" />

          {/* 客户端配置示例 */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2 font-display">
              {t('product.mcpServer.configure')}
            </h3>
            <p className="text-text-secondary text-sm">{t('product.mcpServer.configNote')}</p>
          </div>
          <McpConfigGrid />
        </div>
      </section>
    </div>
  );
};

export default Product;
