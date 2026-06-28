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

type Hue = 'life' | 'evo' | 'gov' | 'patent' | 'quantum';

const hueColor = (hue: Hue) =>
  hue === 'life' ? '#5eead4'
    : hue === 'evo' ? '#fbbf24'
    : hue === 'gov' ? '#a5b4fc'
    : hue === 'patent' ? '#FFD700'
    : '#00D4FF';

interface FeatureRow {
  labelKey: string;
  openSource: boolean;
  enterprise: boolean;
}

const features: FeatureRow[] = [
  { labelKey: 'enterprise.features.coreAxioms', openSource: true, enterprise: true },
  { labelKey: 'enterprise.features.skills', openSource: true, enterprise: true },
  { labelKey: 'enterprise.features.platforms', openSource: true, enterprise: true },
  { labelKey: 'enterprise.features.install', openSource: true, enterprise: true },
  { labelKey: 'enterprise.features.industryPack', openSource: false, enterprise: true },
  { labelKey: 'enterprise.features.privateDeploy', openSource: false, enterprise: true },
  { labelKey: 'enterprise.features.techSupport', openSource: false, enterprise: true },
  { labelKey: 'enterprise.features.sla', openSource: false, enterprise: true },
  { labelKey: 'enterprise.features.customSkill', openSource: false, enterprise: true },
  { labelKey: 'enterprise.features.training', openSource: false, enterprise: true },
];

interface Industry {
  icon: ComponentType<{ className?: string; style?: CSSProperties }>;
  key: string;
  hue: Hue;
}

// 9 行业 3×3 矩阵：hue 交错使网格色彩饱满
const industries: Industry[] = [
  { icon: Landmark, key: 'finance', hue: 'gov' },
  { icon: Scale, key: 'legal', hue: 'gov' },
  { icon: Building2, key: 'government', hue: 'gov' },
  { icon: Factory, key: 'manufacturing', hue: 'evo' },
  { icon: GraduationCap, key: 'education', hue: 'evo' },
  { icon: Zap, key: 'energy', hue: 'evo' },
  { icon: HeartPulse, key: 'healthcare', hue: 'life' },
  { icon: Radio, key: 'telecom', hue: 'life' },
  { icon: Truck, key: 'logistics', hue: 'life' },
];

function Enterprise() {
  const { t } = useTranslation();

  return (
    <div className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* 区块1: 页面标题 */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4 font-display">
            {t('enterprise.title')}
          </h1>
          <p className="text-xl text-text-secondary">{t('enterprise.subtitle')}</p>
        </div>

        {/* 区块2: 版本对比表 */}
        <div className="mb-20">
          <h2 className="text-3xl font-semibold text-center text-white mb-8 font-display">
            {t('enterprise.compareTitle')}
          </h2>
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="text-left px-6 py-5 text-lg font-semibold text-white font-display">
                      {t('enterprise.tableHeaders.feature')}
                    </th>
                    <th className="px-6 py-5 text-lg font-semibold font-display" style={{ color: hueColor('life') }}>
                      {t('enterprise.tableHeaders.openSource')}
                    </th>
                    <th className="px-6 py-5 text-lg font-semibold font-display" style={{ color: hueColor('gov') }}>
                      {t('enterprise.tableHeaders.enterprise')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((row, idx) => (
                    <tr
                      key={row.labelKey}
                      className={
                        idx % 2 === 0
                          ? 'border-b border-white/5'
                          : 'border-b border-white/5 bg-white/[0.02]'
                      }
                    >
                      <td className="px-6 py-4 text-zinc-200">{t(row.labelKey)}</td>
                      <td className="px-6 py-4 text-center">
                        {row.openSource ? (
                          <CircleCheck className="w-6 h-6 inline-block" style={{ color: hueColor('life') }} />
                        ) : (
                          <CircleX className="w-6 h-6 inline-block" style={{ color: '#f97316' }} />
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <CircleCheck className="w-6 h-6 inline-block" style={{ color: hueColor('gov') }} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 区块3: 行业定制 —— 9 行业 3×3 矩阵 */}
        <div className="mb-20">
          <h2 className="text-3xl font-semibold text-center text-white mb-3 font-display">
            {t('enterprise.industriesTitle')}
          </h2>
          <p className="text-center text-text-secondary mb-10 max-w-2xl mx-auto text-sm">
            {t('enterprise.industriesSubtitle')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, idx) => {
              const Icon = industry.icon;
              const color = hueColor(industry.hue);
              const points = t(`enterprise.industries.${industry.key}.points`, { returnObjects: true }) as string[];
              const title = t(`enterprise.industries.${industry.key}.title`);
              return (
                <div
                  key={industry.key}
                  className="glass-card p-7 group animate-slide-up"
                  style={{ animationDelay: `${idx * 0.06}s`, borderColor: `${color}22` }}
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
                    {title}
                  </h3>
                  <ul className="space-y-2">
                    {Array.isArray(points) && points.map((point) => (
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
          <h2 className="text-3xl font-semibold text-white mb-4 font-display">
            {t('enterprise.contactTitle')}
          </h2>
          <p className="text-text-secondary mb-2">
            {t('enterprise.contactDesc')}
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
              {t('enterprise.contactButton')} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Enterprise;
