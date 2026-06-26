import { useTranslation } from 'react-i18next';
import type { ComponentType, CSSProperties } from 'react';
import {
  CircleCheck,
  CircleX,
  Landmark,
  Factory,
  HeartPulse,
  Scale,
  Building2,
  GraduationCap,
  Zap,
  Radio,
  Truck,
  Mail,
  ArrowRight,
} from 'lucide-react';

interface FeatureRow {
  label: string;
  openSource: boolean;
  enterprise: boolean;
}

const features: FeatureRow[] = [
  { label: '核心公理+属性+协议', openSource: true, enterprise: true },
  { label: '22个技能', openSource: true, enterprise: true },
  { label: '7大平台适配', openSource: true, enterprise: true },
  { label: '一键安装脚本', openSource: true, enterprise: true },
  { label: '行业定制包', openSource: false, enterprise: true },
  { label: '私有部署支持', openSource: false, enterprise: true },
  { label: '专属技术支持', openSource: false, enterprise: true },
  { label: 'SLA服务保障', openSource: false, enterprise: true },
  { label: '定制技能开发', openSource: false, enterprise: true },
  { label: '企业培训服务', openSource: false, enterprise: true },
];

interface Industry {
  icon: ComponentType<{ className?: string; style?: CSSProperties }>;
  title: string;
  points: string[];
  /** 三色语义：life / evo / gov，决定卡片图标底色与点缀色 */
  hue: 'life' | 'evo' | 'gov';
}

// 9 行业 3×3 矩阵：覆盖元构 6 项核心协议能力。
// 排列按 hue 交错，使网格色彩饱满：gov / evo / life / gov / evo / life / gov / evo / life
const industries: Industry[] = [
  // —— 治理色组（gov）—— 合规/决策/法律 ——
  {
    icon: Landmark,
    title: '金融行业',
    points: ['合规审计', '风险决策锁', '数据溯源'],
    hue: 'gov',
  },
  {
    icon: Scale,
    title: '法律行业',
    points: ['合同合规审查', '判例溯源分析', '法律优先决策'],
    hue: 'gov',
  },
  {
    icon: Building2,
    title: '政府政务',
    points: ['政策合规审计', '决策可追溯', '公共服务智能化'],
    hue: 'gov',
  },
  // —— 进化色组（evo）—— 创造/迭代/能量 ——
  {
    icon: Factory,
    title: '制造业',
    points: ['工业互联', '模数共振', '智能体产线'],
    hue: 'evo',
  },
  {
    icon: GraduationCap,
    title: '教育科研',
    points: ['批判性思维培养', '知识溯源教学', '研究进化闭环'],
    hue: 'evo',
  },
  {
    icon: Zap,
    title: '能源电力',
    points: ['电网调度决策锁', '设备频率自适应', '能源合规审计'],
    hue: 'evo',
  },
  // —— 生命色组（life）—— 流动/溯源/闭环 ——
  {
    icon: HeartPulse,
    title: '医疗行业',
    points: ['数据隐私', '诊断辅助', '合规主动'],
    hue: 'life',
  },
  {
    icon: Radio,
    title: '通信电信',
    points: ['网络故障溯源', '用户数据合规', '决策锁校验'],
    hue: 'life',
  },
  {
    icon: Truck,
    title: '物流供应链',
    points: ['全链路追溯', '调度决策可证', '闭环物流管理'],
    hue: 'life',
  },
];

// 三色 hue → 颜色值映射（与设计系统 v2.0 一致）
const hueColor: Record<'life' | 'evo' | 'gov', string> = {
  life: '#5eead4',
  evo: '#fbbf24',
  gov: '#a5b4fc',
};

function Enterprise() {
  const { t } = useTranslation();

  return (
    <div className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* 区块1: 页面标题 */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
            {t('enterprise.title')}
          </h1>
          <p className="text-xl text-zinc-400">{t('enterprise.subtitle')}</p>
        </div>

        {/* 区块2: 版本对比表 */}
        <div className="mb-20">
          <h2 className="text-3xl font-semibold text-center text-white mb-8">
            {t('enterprise.compareTitle')}
          </h2>
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="text-left px-6 py-5 text-lg font-semibold text-white">
                      功能
                    </th>
                    <th className="px-6 py-5 text-lg font-semibold text-life-bright">
                      开源版
                    </th>
                    <th className="px-6 py-5 text-lg font-semibold text-gov-bright">
                      企业版
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((row, idx) => (
                    <tr
                      key={row.label}
                      className={
                        idx % 2 === 0
                          ? 'border-b border-white/5'
                          : 'border-b border-white/5 bg-white/[0.02]'
                      }
                    >
                      <td className="px-6 py-4 text-zinc-200">{row.label}</td>
                      <td className="px-6 py-4 text-center">
                        {row.openSource ? (
                          <CircleCheck className="w-6 h-6 text-life-bright inline-block" />
                        ) : (
                          <CircleX className="w-6 h-6 text-evo inline-block" />
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <CircleCheck className="w-6 h-6 text-gov-bright inline-block" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 区块3: 行业定制 —— 9 行业 3×3 矩阵，三色 hue 交错 */}
        <div className="mb-20">
          <h2 className="text-3xl font-semibold text-center text-white mb-3 font-display">
            行业定制
          </h2>
          <p className="text-center text-text-secondary mb-10 max-w-2xl mx-auto text-sm">
            基于元构 6 项核心协议能力，覆盖合规治理 / 创造进化 / 流动闭环 三大场景维度
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, idx) => {
              const Icon = industry.icon;
              const color = hueColor[industry.hue];
              return (
                <div
                  key={industry.title}
                  className="glass-card p-7 group animate-slide-up"
                  style={{ animationDelay: `${idx * 0.06}s` }}
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center rounded-xl mb-5 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${color}22, ${color}11)`,
                      boxShadow: `inset 0 0 0 1px ${color}33`,
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color }} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4 font-display">
                    {industry.title}
                  </h3>
                  <ul className="space-y-2">
                    {industry.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2 text-sm text-text-secondary"
                      >
                        <CircleCheck
                          className="w-4 h-4 shrink-0"
                          style={{ color }}
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* 区块4: 联系方式 */}
        <div className="glass-card p-10 text-center">
          <h2 className="text-3xl font-semibold text-white mb-4">
            {t('enterprise.contactTitle')}
          </h2>
          <p className="text-zinc-400 mb-2">
            联系我们获取企业版方案和报价
          </p>
          <a
            href="mailto:researcher.yi@youfer.cn"
            className="inline-flex items-center gap-2 text-life-bright mb-6 hover:gap-3 transition-all"
          >
            <Mail className="w-5 h-5" />
            researcher.yi@youfer.cn
          </a>
          <div>
            <a
              href="mailto:researcher.yi@youfer.cn"
              className="btn-primary inline-flex items-center gap-2"
            >
              联系我们 <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Enterprise;
