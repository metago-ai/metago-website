import { useTranslation } from 'react-i18next';
import type { ComponentType } from 'react';
import {
  CircleCheck,
  CircleX,
  Landmark,
  Factory,
  HeartPulse,
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
  icon: ComponentType<{ className?: string }>;
  title: string;
  points: string[];
}

const industries: Industry[] = [
  {
    icon: Landmark,
    title: '金融行业',
    points: ['合规审计', '风险决策锁', '数据溯源'],
  },
  {
    icon: Factory,
    title: '制造业',
    points: ['工业互联', '模数共振', '智能体产线'],
  },
  {
    icon: HeartPulse,
    title: '医疗行业',
    points: ['数据隐私', '诊断辅助', '合规主动'],
  },
];

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
                    <th className="px-6 py-5 text-lg font-semibold text-accent-green">
                      开源版
                    </th>
                    <th className="px-6 py-5 text-lg font-semibold text-accent-blue">
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
                          <CircleCheck className="w-6 h-6 text-accent-green inline-block" />
                        ) : (
                          <CircleX className="w-6 h-6 text-accent-red inline-block" />
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <CircleCheck className="w-6 h-6 text-accent-blue inline-block" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 区块3: 行业定制 */}
        <div className="mb-20">
          <h2 className="text-3xl font-semibold text-center text-white mb-8">
            行业定制
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <div key={industry.title} className="glass-card p-8">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple mb-5">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {industry.title}
                  </h3>
                  <ul className="space-y-2">
                    {industry.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2 text-zinc-400"
                      >
                        <CircleCheck className="w-4 h-4 text-accent-blue shrink-0" />
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
            className="inline-flex items-center gap-2 text-accent-blue mb-6 hover:gap-3 transition-all"
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
