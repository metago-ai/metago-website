import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * 引擎启动序列演示组件
 * 模拟终端逐行打印 metago-engine status 真实输出
 * 自动循环，强冲击力
 */
export default function EngineStartup() {
  const { i18n } = useTranslation();
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // 启动序列脚本（真实 CLI 输出 + 启动过程美化）
  const zhScript: string[] = [
    '$ metago-engine status',
    '',
    'MetaGO Engine CLI v1.0.0  (c) 易霄 / MetaGO Lightyear',
    '═══════════════════════════════════════════════════',
    '',
    '[1/8] 加载 GENOME.json ............... ✓',
    '[2/8] 校验 CONSTITUTION/AXIOMS.md .... ✓',
    '[3/8] 校验 CORE/ATTRIBUTES.md ........ ✓',
    '[4/8] 校验 CORE/PROTOCOLS.md ......... ✓',
    '[5/8] 校验 INDEX/engines.json ........ ✓',
    '[6/8] 校验 INDEX/skills.json ......... ✓',
    '[7/8] 校验 RUNTIME/dist/ ............. ✓',
    '[8/8] 校验 ADAPTERS/ ................. ✓',
    '',
    '◆ MetaGO Engine 2.0.0 加载成功',
    '───────────────────────────────────────────────────',
    'Metago 版本      : V36.8',
    '包版本           : 36.8.0',
    '公理             : 36   (8 条关键)',
    '属性             : 43   (7 条关键)',
    '协议             : 108  (6 项关键)',
    '引擎             : 125  (17 核心)',
    '算法             : 927',
    '原子             : 984',
    '专利             : 754  (85 受理 / 669 储备)',
    '平台适配器       : 7',
    '───────────────────────────────────────────────────',
    '✓ 引擎就绪。运行 metago-engine verify 验证输出合规性',
  ];

  const enScript: string[] = [
    '$ metago-engine status',
    '',
    'MetaGO Engine CLI v1.0.0  (c) Yi Xiao / MetaGO Lightyear',
    '═══════════════════════════════════════════════════',
    '',
    '[1/8] Loading GENOME.json ............ ✓',
    '[2/8] Verifying CONSTITUTION/AXIOMS.md ✓',
    '[3/8] Verifying CORE/ATTRIBUTES.md .... ✓',
    '[4/8] Verifying CORE/PROTOCOLS.md .... ✓',
    '[5/8] Verifying INDEX/engines.json .... ✓',
    '[6/8] Verifying INDEX/skills.json ..... ✓',
    '[7/8] Verifying RUNTIME/dist/ ........ ✓',
    '[8/8] Verifying ADAPTERS/ ............. ✓',
    '',
    '◆ MetaGO Engine 2.0.0 loaded successfully',
    '───────────────────────────────────────────────────',
    'Metago Version   : V36.8',
    'Package Version  : 36.8.0',
    'Axioms           : 36   (8 critical)',
    'Attributes       : 43   (7 critical)',
    'Protocols        : 108  (6 critical)',
    'Engines          : 125  (17 core)',
    'Algorithms       : 927',
    'Atoms            : 984',
    'Patents          : 754  (85 accepted / 669 reserved)',
    'Platform Adapters: 7',
    '───────────────────────────────────────────────────',
    '✓ Engine ready. Run metago-engine verify to validate outputs',
  ];

  const script = i18n.language === 'zh' ? zhScript : enScript;
  const scriptLen = script.length;

  // 光标闪烁
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((v) => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // 逐行打印 + 自动循环（单一 useEffect，避免死循环）
  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const getDelay = (line: string, idx: number) => {
      if (idx === 0) return 600;
      if (line.startsWith('◆')) return 500;
      if (line.startsWith('✓') && idx === scriptLen - 1) return 600;
      if (line.startsWith('[1/8]') || line.startsWith('[2/8]')) return 280;
      if (line.startsWith('[')) return 120;
      if (line.startsWith('─')) return 100;
      if (line.startsWith('═══')) return 30;
      if (line === '') return 150;
      return 80;
    };

    const runCycle = async () => {
      setDisplayedLines([]);
      setProgress(0);
      setCompleted(false);

      for (let i = 0; i < scriptLen; i++) {
        if (cancelled) return;

        const line = script[i];
        const delay = getDelay(line, i);

        await new Promise<void>((resolve) => {
          timer = setTimeout(resolve, delay);
        });

        if (cancelled) return;

        setDisplayedLines((prev) => [...prev, line]);
        setProgress(Math.round(((i + 1) / scriptLen) * 100));
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }

      setCompleted(true);

      // 等待 4.5s 后重启
      await new Promise<void>((resolve) => {
        timer = setTimeout(resolve, 4500);
      });

      if (!cancelled) {
        runCycle();
      }
    };

    runCycle();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  // 颜色映射：根据行内容上色（使用内联 style 确保颜色生效）
  const colorize = (line: string, idx: number): React.CSSProperties => {
    if (line.startsWith('$')) return { color: '#5eead4' };
    if (line.startsWith('MetaGO Engine CLI')) return { color: '#64748b' };
    if (line.startsWith('═══')) return { color: '#FFD700' };
    if (line.startsWith('[')) {
      if (line.includes('✓')) return { color: '#5eead4' };
      return { color: '#94a3b8' };
    }
    if (line.startsWith('◆')) return { color: '#FFD700', fontWeight: 700 };
    if (line.startsWith('─')) return { color: '#475569' };
    if (line.startsWith('✓') && idx === scriptLen - 1)
      return { color: '#5eead4', fontWeight: 700 };
    if (line.startsWith('✓')) return { color: '#5eead4' };
    return { color: '#f8fafc' };
  };

  const renderLine = (line: string, idx: number) => {
    // 键值对行：键 + 值分别着色
    if (line.includes(':') && !line.startsWith('http') && !line.startsWith('$')) {
      const colonIdx = line.indexOf(':');
      if (colonIdx > 0) {
        const key = line.substring(0, colonIdx);
        const val = line.substring(colonIdx + 1);
        const valColor = /^\s*\d/.test(val) ? '#FFE54A' : '#5eead4';
        return (
          <>
            <span style={{ color: '#94a3b8' }}>{key}</span>
            <span style={{ color: '#64748b' }}>:</span>
            <span style={{ color: valColor }}>{val}</span>
          </>
        );
      }
    }
    return <span style={colorize(line, idx)}>{line || '\u00A0'}</span>;
  };

  return (
    <div
      className="code-window max-w-3xl mx-auto"
      style={{
        boxShadow:
          '0 0 0 1px rgba(255, 215, 0, 0.15), 0 30px 80px -20px rgba(255, 215, 0, 0.2), 0 0 100px -30px rgba(94, 234, 212, 0.25)',
      }}
    >
      {/* 终端窗口标题栏 */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{
          background: 'linear-gradient(180deg, rgba(20, 26, 36, 0.95), rgba(13, 18, 25, 0.95))',
          borderBottom: '1px solid rgba(148, 163, 184, 0.08)',
        }}
      >
        <div className="flex items-center gap-2">
          {/* 红黄绿三圆点 */}
          <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
        </div>
        <div className="flex items-center gap-2 text-xs font-mono" style={{ color: '#64748b' }}>
          <span
            className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: '#5eead4' }}
          />
          <span>metago-engine — bash — 80×24</span>
        </div>
        <div className="text-xs font-mono" style={{ color: '#64748b' }}>v1.0.0</div>
      </div>

      {/* 终端内容 */}
      <div
        ref={containerRef}
        className="px-5 py-4 font-mono text-[13px] leading-relaxed overflow-hidden"
        style={{
          background: '#0a0f16',
          minHeight: '420px',
          maxHeight: '420px',
          position: 'relative',
        }}
      >
        {/* 扫描线效果 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'repeating-linear-gradient(0deg, rgba(94, 234, 212, 0.015) 0px, rgba(94, 234, 212, 0.015) 1px, transparent 1px, transparent 3px)',
            pointerEvents: 'none',
          }}
        />
        {displayedLines.map((line, idx) => (
          <div key={idx} className="whitespace-pre relative">
            {renderLine(line, idx)}
          </div>
        ))}
        {/* 光标 */}
        {showCursor && !completed && (
          <span
            className="inline-block w-2 h-4 ml-0.5 align-middle"
            style={{ background: '#5eead4', animation: 'blink 1s steps(2) infinite' }}
          />
        )}
        {/* 完成态光标 */}
        {completed && (
          <span
            className="inline-block w-2 h-4 ml-0.5 align-middle"
            style={{ background: showCursor ? '#FFD700' : 'transparent' }}
          />
        )}
      </div>

      {/* 底部状态栏 */}
      <div
        className="flex items-center justify-between px-4 py-2 text-[10px] font-mono"
        style={{
          background: 'rgba(20, 26, 36, 0.9)',
          borderTop: '1px solid rgba(148, 163, 184, 0.08)',
          color: '#64748b',
        }}
      >
        <div className="flex items-center gap-3">
          <span>
            {completed
              ? i18n.language === 'zh'
                ? '引擎就绪 · 等待下一次循环演示'
                : 'Engine Ready · Awaiting next cycle'
              : i18n.language === 'zh'
                ? `加载中 ${progress}%`
                : `Loading ${progress}%`}
          </span>
          {/* 进度条 */}
          <div
            style={{
              width: '120px',
              height: '4px',
              background: 'rgba(94, 234, 212, 0.1)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                background: completed
                  ? 'linear-gradient(90deg, #FFD700, #5eead4)'
                  : 'linear-gradient(90deg, #5eead4, #06b6d4)',
                transition: 'width 0.3s ease',
                boxShadow: completed
                  ? '0 0 8px rgba(255, 215, 0, 0.6)'
                  : '0 0 8px rgba(94, 234, 212, 0.4)',
              }}
            />
          </div>
        </div>
        <span style={{ color: '#5eead4' }}>● LIVE</span>
      </div>

      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
