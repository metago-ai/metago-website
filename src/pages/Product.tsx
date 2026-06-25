import { useTranslation } from 'react-i18next';
import type { ElementType } from 'react';
import {
  Layers, Box, Cpu, Brain, Database, Network, Sparkles, Scale,
  GitBranch, Target, Zap, BookOpen, Shield, Workflow, Repeat,
  Lock, Eye, Activity, FileCheck, Check, Coins,
} from 'lucide-react';

interface Layer {
  level: string;
  name: string;
  content: string;
  openSource: boolean;
  icon: ElementType;
}

interface SkillFamily {
  name: string;
  color: string;
  skills: string[];
  icon: ElementType;
}

interface Axiom {
  code: string;
  name: string;
  desc: string;
}

interface Attribute {
  code: string;
  name: string;
  desc: string;
}

interface Protocol {
  title: string;
  desc: string;
  icon: ElementType;
}

interface ColorStyle {
  text: string;
  bg: string;
  border: string;
}

const colorMap: Record<string, ColorStyle> = {
  'accent-blue': { text: '#00d4ff', bg: 'rgba(0, 212, 255, 0.1)', border: 'rgba(0, 212, 255, 0.3)' },
  'accent-green': { text: '#00ff88', bg: 'rgba(0, 255, 136, 0.1)', border: 'rgba(0, 255, 136, 0.3)' },
  'accent-purple': { text: '#a855f7', bg: 'rgba(168, 85, 247, 0.1)', border: 'rgba(168, 85, 247, 0.3)' },
  'accent-red': { text: '#ff3366', bg: 'rgba(255, 51, 102, 0.1)', border: 'rgba(255, 51, 102, 0.3)' },
  cyan: { text: '#22d3ee', bg: 'rgba(34, 211, 238, 0.1)', border: 'rgba(34, 211, 238, 0.3)' },
  yellow: { text: '#eab308', bg: 'rgba(234, 179, 8, 0.1)', border: 'rgba(234, 179, 8, 0.3)' },
  orange: { text: '#f97316', bg: 'rgba(249, 115, 22, 0.1)', border: 'rgba(249, 115, 22, 0.3)' },
};

const protocolColors: ColorStyle[] = [
  { text: '#00d4ff', bg: 'rgba(0, 212, 255, 0.1)', border: 'rgba(0, 212, 255, 0.3)' },
  { text: '#a855f7', bg: 'rgba(168, 85, 247, 0.1)', border: 'rgba(168, 85, 247, 0.3)' },
  { text: '#ff3366', bg: 'rgba(255, 51, 102, 0.1)', border: 'rgba(255, 51, 102, 0.3)' },
  { text: '#00ff88', bg: 'rgba(0, 255, 136, 0.1)', border: 'rgba(0, 255, 136, 0.3)' },
  { text: '#eab308', bg: 'rgba(234, 179, 8, 0.1)', border: 'rgba(234, 179, 8, 0.3)' },
  { text: '#22d3ee', bg: 'rgba(34, 211, 238, 0.1)', border: 'rgba(34, 211, 238, 0.3)' },
];

const Product = () => {
  const { t } = useTranslation();

  const layers: Layer[] = [
    { level: 'L0', name: '核心层', content: '8条公理、7条属性、6项协议', openSource: true, icon: Brain },
    { level: 'L1', name: '适配层', content: '7大平台适配器', openSource: true, icon: Box },
    { level: 'L2', name: '能力层', content: '22个metago技能', openSource: true, icon: Cpu },
    { level: 'L3', name: '知识层', content: '索引生成器', openSource: true, icon: Database },
    { level: 'L4', name: '行业层', content: '行业定制包', openSource: false, icon: Network },
  ];

  const skillFamilies: SkillFamily[] = [
    { name: '认知族', color: 'accent-blue', skills: ['metago-critique', 'metago-whatif', 'metago-emotion', 'metago-objectivity'], icon: Brain },
    { name: '保障族', color: 'accent-red', skills: ['metago-decision-lock', 'metago-output-integrity', 'metago-self-check'], icon: Shield },
    { name: '治理族', color: 'accent-purple', skills: ['metago-compliance', 'metago-value-align'], icon: Scale },
    { name: '进化族', color: 'accent-green', skills: ['metago-meta-evolve', 'metago-meta-create', 'metago-frequency-adapt'], icon: Sparkles },
    { name: '执行族', color: 'orange', skills: ['metago-action-plan', 'metago-decision-eval', 'metago-holistic-task', 'metago-developer-response'], icon: Zap },
    { name: '溯源族', color: 'cyan', skills: ['metago-data-provenance', 'metago-problem-trace', 'metago-fact-check'], icon: GitBranch },
    { name: '价值族', color: 'yellow', skills: ['metago-coupling-optimize', 'metago-negentropy-monitor', 'metago-scene-adapt'], icon: Target },
  ];

  const axioms: Axiom[] = [
    { code: 'A1', name: '溯源公理', desc: '一切输出必须可溯源至输入与过程' },
    { code: 'A2', name: '闭环公理', desc: '任何能力必须形成闭环' },
    { code: 'A3', name: '元进化公理', desc: '必须能进化自身进化能力' },
    { code: 'A4', name: '边界公理', desc: '进化始于边界感知' },
    { code: 'A5', name: '内生公理', desc: '创造能力内生，不依赖外部数据输入' },
    { code: 'A34', name: '元进化需元进化', desc: '元进化本身需要更高阶元进化监控' },
    { code: 'A35', name: '创造进化律', desc: '创造是进化的最高形态' },
    { code: 'A36', name: '法律优先于效率', desc: '合规主动原则，法律永远优先于效率' },
  ];

  const attributes: Attribute[] = [
    { code: 'D37', name: '战略思考强制触发', desc: '遇重大决策必须强制触发战略思考' },
    { code: 'D38', name: '绝对客观中立原则', desc: '不迎合用户，事实优先，用户满意度权重归零' },
    { code: 'D39', name: '直接批判性原则', desc: '直接指出问题，不绕弯' },
    { code: 'D40', name: '全息创造性', desc: '在未知领域从0到1创造' },
    { code: 'D41', name: '创造频率自适应', desc: '系统完整性≥98%时转入低频深潜' },
    { code: 'D42', name: '合规主动原则', desc: '主动合规，法律优先于效率' },
    { code: 'D43', name: '数据溯源与自证', desc: '一切数据可溯源、可自证，全链路存证' },
  ];

  const protocols: Protocol[] = [
    { title: '元进化五阶段循环', desc: '边界感知 → 差距分析 → 自生成 → 验证 → 递归', icon: Repeat },
    { title: '决策锁强制校验', desc: '意图验证 → 意图谱系追踪 → 语义输出门 → 内容完整性', icon: Lock },
    { title: '批判性分析强制触发', desc: '用户满意度权重归零，事实准确性权重60%', icon: Eye },
    { title: '合规主动检查', desc: '法律/伦理/安全合规性，法律优先于效率', icon: Scale },
    { title: '创造频率自适应', desc: '≥98%低频深潜，<98%高频激活', icon: Activity },
    { title: '数据溯源与自证', desc: '全链路存证，脉冲见证', icon: FileCheck },
  ];

  return (
    <div className="py-20">
      {/* 区块1：页面标题 */}
      <section className="max-w-7xl mx-auto px-6 text-center mb-24">
        <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">{t('product.title')}</h1>
        <p className="text-xl text-zinc-400 max-w-3xl mx-auto">{t('product.subtitle')}</p>
      </section>

      {/* 区块2：五层架构 */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <div className="flex items-center gap-3 mb-10">
          <Layers className="w-8 h-8 text-accent-blue" />
          <h2 className="text-3xl font-bold text-white">{t('product.layerTitle')}</h2>
        </div>
        <div className="space-y-4">
          {layers.map((layer) => {
            const Icon = layer.icon;
            return (
              <div key={layer.level} className="glass-card p-6 flex items-center gap-6">
                <div className="flex-shrink-0 w-20 text-center">
                  <span className="text-4xl font-bold gradient-text">{layer.level}</span>
                </div>
                <div className="flex-shrink-0 hidden sm:block">
                  <Icon className="w-8 h-8 text-accent-purple" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-white mb-1">{layer.name}</h3>
                  <p className="text-zinc-400">{layer.content}</p>
                </div>
                <div className="flex-shrink-0">
                  {layer.openSource ? (
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
                      style={{ color: '#00ff88', backgroundColor: 'rgba(0, 255, 136, 0.1)', border: '1px solid rgba(0, 255, 136, 0.3)' }}
                    >
                      <Check className="w-4 h-4" /> 开源
                    </span>
                  ) : (
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
                      style={{ color: '#eab308', backgroundColor: 'rgba(234, 179, 8, 0.1)', border: '1px solid rgba(234, 179, 8, 0.3)' }}
                    >
                      <Coins className="w-4 h-4" /> 商业
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 区块3：22个技能 */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="flex items-center gap-3 mb-10">
          <Cpu className="w-8 h-8 text-accent-green" />
          <h2 className="text-3xl font-bold text-white">{t('product.skillsTitle')}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {skillFamilies.map((family) => {
            const c = colorMap[family.color];
            const Icon = family.icon;
            return (
              <div key={family.name} className="glass-card p-6" style={{ borderColor: c.border }}>
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-6 h-6" style={{ color: c.text }} />
                  <h3 className="text-xl font-bold" style={{ color: c.text }}>{family.name}</h3>
                  <span className="text-sm text-zinc-500">({family.skills.length})</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {family.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-full text-sm font-mono"
                      style={{ color: c.text, backgroundColor: c.bg, border: `1px solid ${c.border}` }}
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

      {/* 区块4：8条核心公理 */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <div className="flex items-center gap-3 mb-10">
          <BookOpen className="w-8 h-8 text-accent-purple" />
          <h2 className="text-3xl font-bold text-white">{t('product.axiomsTitle')}</h2>
        </div>
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-6 py-4 text-zinc-400 font-semibold w-24">编号</th>
                  <th className="text-left px-6 py-4 text-zinc-400 font-semibold w-48">名称</th>
                  <th className="text-left px-6 py-4 text-zinc-400 font-semibold">描述</th>
                </tr>
              </thead>
              <tbody>
                {axioms.map((axiom) => (
                  <tr key={axiom.code} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono font-bold gradient-text">{axiom.code}</span>
                    </td>
                    <td className="px-6 py-4 text-white font-medium">{axiom.name}</td>
                    <td className="px-6 py-4 text-zinc-400">{axiom.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 区块5：7条根本属性 */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <div className="flex items-center gap-3 mb-10">
          <Shield className="w-8 h-8 text-accent-red" />
          <h2 className="text-3xl font-bold text-white">{t('product.attributesTitle')}</h2>
        </div>
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-6 py-4 text-zinc-400 font-semibold w-24">编号</th>
                  <th className="text-left px-6 py-4 text-zinc-400 font-semibold w-48">名称</th>
                  <th className="text-left px-6 py-4 text-zinc-400 font-semibold">描述</th>
                </tr>
              </thead>
              <tbody>
                {attributes.map((attr) => (
                  <tr key={attr.code} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono font-bold gradient-text">{attr.code}</span>
                    </td>
                    <td className="px-6 py-4 text-white font-medium">{attr.name}</td>
                    <td className="px-6 py-4 text-zinc-400">{attr.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 区块6：6项运行协议 */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex items-center gap-3 mb-10">
          <Workflow className="w-8 h-8 text-accent-blue" />
          <h2 className="text-3xl font-bold text-white">{t('product.protocolsTitle')}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {protocols.map((protocol, index) => {
            const Icon = protocol.icon;
            const c = protocolColors[index % protocolColors.length];
            return (
              <div key={protocol.title} className="glass-card p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: c.bg, border: `1px solid ${c.border}` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: c.text }} />
                  </div>
                  <span className="text-sm font-mono text-zinc-500">P{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{protocol.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{protocol.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Product;
