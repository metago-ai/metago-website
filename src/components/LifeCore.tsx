import { useId } from 'react';

interface LifeCoreProps {
  /** Overall size in px. Default 360. */
  size?: number;
  className?: string;
}

/**
 * LifeCore — MetaGO 生命体核心可视化。
 *
 * 由四层组成：
 *   1. 外层六边轨道环（象征 6 协议）—— 顺时针缓转
 *   2. 中层粒子环（8 个公理节点）—— 逆时针中速
 *   3. 内层脉冲波（自核心扩散）—— 三波交错
 *   4. 中央六边核（呼应 Logo）—— 呼吸 + 三色渐变
 *
 * 全部使用 SVG + CSS 动画，零依赖、60fps、自动支持 reduced-motion。
 */
export default function LifeCore({ size = 360, className = '' }: LifeCoreProps) {
  const uid = useId().replace(/:/g, '');
  const cx = 200;
  const cy = 200;

  // Hex vertices (pointy-top) for the central core.
  const hexR = 48;
  const hexPoints = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    return [
      (cx + hexR * Math.cos(angle)).toFixed(2),
      (cy + hexR * Math.sin(angle)).toFixed(2),
    ].join(',');
  }).join(' ');

  // Outer hex ring (protocols) — 6 vertices.
  const outerR = 168;
  const outerPoints = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    return [
      (cx + outerR * Math.cos(angle)).toFixed(2),
      (cy + outerR * Math.sin(angle)).toFixed(2),
    ].join(',');
  }).join(' ');

  return (
    <div
      className={`relative animate-float ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes lc-rotate-cw-${uid} { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes lc-rotate-ccw-${uid} { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes lc-pulse-${uid} {
          0%   { transform: scale(0.6); opacity: 0; }
          20%  { opacity: 0.55; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes lc-core-breathe-${uid} {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(1.04); opacity: 0.92; }
        }
        .lc-outer-${uid} { animation: lc-rotate-cw-${uid} 30s linear infinite; transform-origin: ${cx}px ${cy}px; }
        .lc-middle-${uid} { animation: lc-rotate-ccw-${uid} 18s linear infinite; transform-origin: ${cx}px ${cy}px; }
        .lc-core-${uid} { animation: lc-core-breathe-${uid} 4s ease-in-out infinite; transform-origin: ${cx}px ${cy}px; }
        .lc-pulse-1-${uid} { animation: lc-pulse-${uid} 3.2s ease-out infinite; transform-origin: ${cx}px ${cy}px; }
        .lc-pulse-2-${uid} { animation: lc-pulse-${uid} 3.2s ease-out infinite 1.06s; transform-origin: ${cx}px ${cy}px; }
        .lc-pulse-3-${uid} { animation: lc-pulse-${uid} 3.2s ease-out infinite 2.12s; transform-origin: ${cx}px ${cy}px; }
        @media (prefers-reduced-motion: reduce) {
          .lc-outer-${uid}, .lc-middle-${uid}, .lc-core-${uid},
          .lc-pulse-1-${uid}, .lc-pulse-2-${uid}, .lc-pulse-3-${uid} { animation: none; }
        }
      `}</style>

      <svg
        viewBox="0 0 400 400"
        width={size}
        height={size}
        className="block"
        style={{ filter: 'drop-shadow(0 0 40px rgba(6, 182, 212, 0.25))' }}
      >
        <defs>
          <linearGradient id={`lc-core-grad-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5eead4" />
            <stop offset="55%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
          <radialGradient id={`lc-glow-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5eead4" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`lc-ring-grad-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5eead4" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#a5b4fc" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Radial halo. */}
        <circle cx={cx} cy={cy} r={190} fill={`url(#lc-glow-${uid})`} />

        {/* Outer rotating hex ring (protocols). */}
        <g className={`lc-outer-${uid}`}>
          <polygon
            points={outerPoints}
            fill="none"
            stroke={`url(#lc-ring-grad-${uid})`}
            strokeWidth="1"
            strokeDasharray="3 6"
            opacity="0.55"
          />
          {Array.from({ length: 6 }, (_, i) => {
            const angle = (Math.PI / 3) * i - Math.PI / 2;
            const x = cx + outerR * Math.cos(angle);
            const y = cy + outerR * Math.sin(angle);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={3}
                fill="#5eead4"
                style={{ filter: 'drop-shadow(0 0 4px #5eead4)' }}
              />
            );
          })}
        </g>

        {/* Middle counter-rotating ring (axioms) — 8 dots on a circle. */}
        <g className={`lc-middle-${uid}`}>
          <circle
            cx={cx}
            cy={cy}
            r={110}
            fill="none"
            stroke="rgba(94, 234, 212, 0.18)"
            strokeWidth="1"
          />
          {Array.from({ length: 8 }, (_, i) => {
            const angle = (Math.PI / 4) * i;
            const x = cx + 110 * Math.cos(angle);
            const y = cy + 110 * Math.sin(angle);
            const hue = i % 4 === 0 ? '#fbbf24' : i % 4 === 2 ? '#a5b4fc' : '#5eead4';
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={2.4}
                fill={hue}
                opacity="0.85"
                style={{ filter: `drop-shadow(0 0 3px ${hue})` }}
              />
            );
          })}
        </g>

        {/* Three staggered pulse waves emanating from the core. */}
        <circle cx={cx} cy={cy} r={hexR} fill="none" stroke="#5eead4" strokeWidth="1.5" className={`lc-pulse-1-${uid}`} />
        <circle cx={cx} cy={cy} r={hexR} fill="none" stroke="#fbbf24" strokeWidth="1.5" className={`lc-pulse-2-${uid}`} />
        <circle cx={cx} cy={cy} r={hexR} fill="none" stroke="#a5b4fc" strokeWidth="1.5" className={`lc-pulse-3-${uid}`} />

        {/* Central hex core. */}
        <g className={`lc-core-${uid}`}>
          <polygon
            points={hexPoints}
            fill={`url(#lc-core-grad-${uid})`}
            opacity="0.92"
            style={{ filter: 'drop-shadow(0 0 18px rgba(94, 234, 212, 0.55))' }}
          />
          <polygon
            points={hexPoints}
            fill="none"
            stroke="#5eead4"
            strokeWidth="1.5"
            opacity="0.9"
          />
          {/* Inner glyph: smaller hex echoing the brand. */}
          <polygon
            points={Array.from({ length: 6 }, (_, i) => {
              const angle = (Math.PI / 3) * i - Math.PI / 2;
              return [
                (cx + 18 * Math.cos(angle)).toFixed(2),
                (cy + 18 * Math.sin(angle)).toFixed(2),
              ].join(',');
            }).join(' ')}
            fill="rgba(8, 12, 20, 0.5)"
            stroke="#5eead4"
            strokeWidth="1"
            opacity="0.7"
          />
        </g>
      </svg>
    </div>
  );
}
