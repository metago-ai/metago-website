import { useTranslation } from 'react-i18next';
import { Play, Terminal, Zap, Shield, Sparkles } from 'lucide-react';

function Demo() {
  const { t } = useTranslation();

  const scenarios = [
    {
      icon: Shield,
      hue: '#f85149',
      name: t('demo.scenario.risk.name'),
      type: t('demo.scenario.risk.type'),
      verdict: t('demo.scenario.risk.verdict'),
      gain: t('demo.scenario.risk.gain'),
    },
    {
      icon: Terminal,
      hue: '#58a6ff',
      name: t('demo.scenario.codeReview.name'),
      type: t('demo.scenario.codeReview.type'),
      verdict: t('demo.scenario.codeReview.verdict'),
      gain: t('demo.scenario.codeReview.gain'),
    },
    {
      icon: Sparkles,
      hue: '#bc8cff',
      name: t('demo.scenario.metaEvolve.name'),
      type: t('demo.scenario.metaEvolve.type'),
      verdict: t('demo.scenario.metaEvolve.verdict'),
      gain: t('demo.scenario.metaEvolve.gain'),
    },
  ];

  return (
    <div className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-life-bright/30 bg-life-bright/5 text-life-bright text-xs font-mono mb-4">
            <Play size={12} /> {t('demo.badge')}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4 font-display">
            {t('demo.title')}
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            {t('demo.subtitle')}
          </p>
        </div>

        {/* 在线动画演示 iframe */}
        <div className="mb-12">
          <div
            className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            style={{
              boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.6), 0 0 40px rgba(94, 234, 212, 0.08)',
            }}
          >
            <iframe
              src="/demo-animation.html"
              title="MetaGO Lifeform Demo"
              style={{
                width: '100%',
                height: '720px',
                border: 'none',
                background: '#0d1117',
                display: 'block',
              }}
              allowFullScreen
              loading="lazy"
            />
          </div>
          <p className="text-center text-sm text-zinc-500 mt-3">
            {t('demo.interactionHint')}
          </p>
        </div>

        {/* 交互说明 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16">
          {[
            { icon: Play, label: t('demo.controls.play') },
            { icon: Zap, label: t('demo.controls.speed') },
            { icon: Terminal, label: t('demo.controls.keyboard') },
            { icon: Sparkles, label: t('demo.controls.auto') },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-white/8 bg-white/[0.02]"
            >
              <item.icon size={16} className="text-life-bright shrink-0" />
              <span className="text-sm text-zinc-300">{item.label}</span>
            </div>
          ))}
        </div>

        {/* 三场景对比 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-2 font-display">
            {t('demo.scenariosTitle')}
          </h2>
          <p className="text-text-secondary mb-8">{t('demo.scenariosSubtitle')}</p>
          <div className="grid md:grid-cols-3 gap-5">
            {scenarios.map((sc, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                style={{ borderTop: `2px solid ${sc.hue}` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: `${sc.hue}15`, border: `1px solid ${sc.hue}40` }}
                  >
                    <sc.icon size={18} style={{ color: sc.hue }} />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-zinc-500">{t('demo.scenarioLabel')}</div>
                    <div className="text-sm font-semibold text-white">{sc.type}</div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{sc.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">{t('demo.fields.verdict')}</span>
                    <span
                      className="font-mono"
                      style={{
                        color: sc.verdict.includes('通过') ? '#3fb950' : '#f85149',
                      }}
                    >
                      {sc.verdict}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-zinc-500 shrink-0">{t('demo.fields.gain')}</span>
                    <span className="text-zinc-300 text-right">{sc.gain}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 本地运行 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-2 font-display">
            {t('demo.localTitle')}
          </h2>
          <p className="text-text-secondary mb-6">{t('demo.localSubtitle')}</p>
          <div
            className="rounded-xl p-6 font-mono text-sm overflow-x-auto"
            style={{
              background: '#010409',
              border: '1px solid #30363d',
            }}
          >
            <div className="text-zinc-500 mb-2"># {t('demo.localComment')}</div>
            <div className="text-emerald-400">
              <span className="text-zinc-600">$</span> npm run demo
            </div>
            <div className="text-zinc-400 mt-1">
              <span className="text-zinc-600">$</span> node packages/demo/killer-demo.mjs --scenario risk
            </div>
            <div className="text-zinc-400 mt-1">
              <span className="text-zinc-600">$</span> node packages/demo/killer-demo.mjs --scenario code-review
            </div>
            <div className="text-zinc-400 mt-1">
              <span className="text-zinc-600">$</span> node packages/demo/killer-demo.mjs --scenario meta-evolve
            </div>
          </div>
          <p className="text-sm text-zinc-500 mt-3">{t('demo.localNote')}</p>
        </div>

        {/* 闭环架构说明 */}
        <div
          className="p-8 rounded-2xl border border-white/8"
          style={{
            background:
              'linear-gradient(135deg, rgba(94, 234, 212, 0.04), rgba(188, 140, 255, 0.04))',
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-4 font-display">
            {t('demo.architectureTitle')}
          </h2>
          <p className="text-text-secondary mb-6">{t('demo.architectureSubtitle')}</p>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { phase: t('demo.phase.1.name'), desc: t('demo.phase.1.desc'), hue: '#5eead4' },
              { phase: t('demo.phase.2.name'), desc: t('demo.phase.2.desc'), hue: '#fbbf24' },
              { phase: t('demo.phase.3.name'), desc: t('demo.phase.3.desc'), hue: '#f85149' },
              { phase: t('demo.phase.4.name'), desc: t('demo.phase.4.desc'), hue: '#bc8cff' },
            ].map((p, idx) => (
              <div key={idx} className="text-center">
                <div
                  className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center text-sm font-bold"
                  style={{
                    background: `${p.hue}15`,
                    border: `1px solid ${p.hue}50`,
                    color: p.hue,
                  }}
                >
                  {idx + 1}
                </div>
                <div className="text-sm font-semibold text-white mb-1">{p.phase}</div>
                <div className="text-xs text-zinc-500">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Demo;
