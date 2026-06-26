import { useEffect, useRef } from 'react';

interface LifeCoreProps {
  /** 整体尺寸（px），默认 360 */
  size?: number;
  className?: string;
}

// 三色语义系统
const C = {
  lifeBright: '#5eead4',
  life: '#06b6d4',
  evoBright: '#fbbf24',
  evo: '#f97316',
  gov: '#818cf8',
};

/** hex → rgba */
function rgba(hex: string, a: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

/** 心跳曲线：双峰（咚-哒），周期 1.2s */
function heartbeat(t: number): number {
  const p = (t % 1.2) / 1.2;
  if (p < 0.08) return 1 + 0.07 * Math.sin((p / 0.08) * Math.PI);
  if (p < 0.25) return 1 + 0.03 * Math.sin(((p - 0.08) / 0.17) * Math.PI);
  return 1;
}

/** 轨道粒子 */
interface OrbitParticle {
  angle: number;
  speed: number;
  radius: number;
  color: string;
  size: number;
  trail: { x: number; y: number }[];
}

/**
 * LifeCore — 量子生命核心（Quantum Life Core）
 *
 * 六层结构（从外到内）：
 *   1. 深空星云背景（最远）
 *   2. 外层能量场（多层光晕 screen 叠加）
 *   3. 轨道粒子流（60 粒子带拖尾 + 噪声扰动）
 *   4. 中层能量带（8 公理节点 + 能量弧线）
 *   5. 核心脉冲波（有机波形 + 相位差）
 *   6. 中央生命核（六边形 + 玻璃质感 + 心跳 + 内部光线）
 *
 * 交互：鼠标视差（各层不同幅度）+ 引力效应
 * Canvas 2D 渲染，零依赖，60fps，支持 reduced-motion
 */
export default function LifeCore({ size = 360, className = '' }: LifeCoreProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = size;
    const H = size;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);

    const cx = W / 2;
    const cy = H / 2;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ===== 初始化 =====

    // 静态星点
    const stars: { x: number; y: number; r: number; a: number; tw: number }[] = [];
    for (let i = 0; i < 90; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 0.9,
        a: 0.15 + Math.random() * 0.35,
        tw: Math.random() * Math.PI * 2,
      });
    }

    // 轨道粒子流（60 个，三色交替）
    const orbitColors = [C.lifeBright, C.evoBright, C.gov];
    const outerR = W * 0.42;
    const orbitParticles: OrbitParticle[] = [];
    for (let i = 0; i < 60; i++) {
      orbitParticles.push({
        angle: Math.random() * Math.PI * 2,
        speed: 0.0025 + Math.random() * 0.003,
        radius: outerR * (0.9 + Math.random() * 0.2),
        color: orbitColors[i % 3],
        size: 0.8 + Math.random() * 1.4,
        trail: [],
      });
    }

    // 8 公理节点
    const nodeCount = 8;
    const nodeR = W * 0.28;
    const nodeColors = [
      C.lifeBright, C.evoBright, C.gov, C.lifeBright,
      C.evoBright, C.gov, C.lifeBright, C.evoBright,
    ];

    // 平滑鼠标位移
    let smoothMx = 0;
    let smoothMy = 0;

    // ===== 鼠标交互 =====
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left - cx;
      mouseRef.current.y = e.clientY - rect.top - cy;
      mouseRef.current.active = true;
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let rafId = 0;
    const startTime = performance.now();

    // ===== 渲染循环 =====
    const render = (now: number) => {
      const t = (now - startTime) / 1000;

      // 平滑鼠标视差
      const targetMx = mouseRef.current.active ? mouseRef.current.x * 0.015 : 0;
      const targetMy = mouseRef.current.active ? mouseRef.current.y * 0.015 : 0;
      smoothMx += (targetMx - smoothMx) * 0.06;
      smoothMy += (targetMy - smoothMy) * 0.06;

      // 引力效应
      const mouseDist = mouseRef.current.active
        ? Math.hypot(mouseRef.current.x, mouseRef.current.y)
        : 999;
      const gravity = mouseDist < W * 0.28 ? 1 - mouseDist / (W * 0.28) : 0;

      ctx.clearRect(0, 0, W, H);

      // ===== 第 1 层：深空星云背景 =====
      const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.6);
      bgGrad.addColorStop(0, 'rgba(12, 22, 38, 0.5)');
      bgGrad.addColorStop(1, 'rgba(8, 12, 20, 0)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // 星点（闪烁）
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (const s of stars) {
        const twinkle = 0.5 + 0.5 * Math.sin(t * 0.6 + s.tw);
        ctx.globalAlpha = s.a * twinkle;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(s.x + smoothMx * 0.3, s.y + smoothMy * 0.3, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // ===== 第 2 层：外层能量场（多层光晕 screen 叠加）=====
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const breathe = prefersReduced ? 0.5 : (0.45 + 0.2 * Math.sin(t * 0.7));
      const haloLayers = [
        { r: W * 0.5, color: C.life, alpha: 0.1 * breathe },
        { r: W * 0.42, color: C.lifeBright, alpha: 0.09 * breathe },
        { r: W * 0.34, color: C.gov, alpha: 0.07 * breathe },
      ];
      for (const layer of haloLayers) {
        const g = ctx.createRadialGradient(
          cx + smoothMx, cy + smoothMy, 0,
          cx + smoothMx, cy + smoothMy, layer.r,
        );
        g.addColorStop(0, rgba(layer.color, layer.alpha));
        g.addColorStop(1, rgba(layer.color, 0));
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }
      ctx.restore();

      // ===== 第 3 层：轨道粒子流（带拖尾 + 噪声扰动）=====
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      // 极淡轨道线
      ctx.strokeStyle = rgba(C.lifeBright, 0.035);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx + smoothMx * 1.5, cy + smoothMy * 1.5, outerR, 0, Math.PI * 2);
      ctx.stroke();

      for (const p of orbitParticles) {
        // 更新位置（带噪声扰动）
        if (!prefersReduced) {
          const noise = 0.3 * Math.sin(t * 0.4 + p.angle * 3);
          p.angle += p.speed * (1 + noise);
        }
        const px = cx + smoothMx * 1.5 + p.radius * Math.cos(p.angle);
        const py = cy + smoothMy * 1.5 + p.radius * Math.sin(p.angle);

        // 拖尾记录
        p.trail.push({ x: px, y: py });
        if (p.trail.length > 10) p.trail.shift();

        // 绘制拖尾（渐变线段）
        for (let i = 0; i < p.trail.length - 1; i++) {
          const tp = p.trail[i];
          const ratio = i / p.trail.length;
          ctx.globalAlpha = ratio * 0.35;
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size * ratio;
          ctx.beginPath();
          ctx.moveTo(tp.x, tp.y);
          ctx.lineTo(p.trail[i + 1].x, p.trail[i + 1].y);
          ctx.stroke();
        }

        // 粒子光晕
        ctx.globalAlpha = 0.9;
        const pg = ctx.createRadialGradient(px, py, 0, px, py, p.size * 5);
        pg.addColorStop(0, p.color);
        pg.addColorStop(0.4, rgba(p.color, 0.3));
        pg.addColorStop(1, rgba(p.color, 0));
        ctx.fillStyle = pg;
        ctx.beginPath();
        ctx.arc(px, py, p.size * 5, 0, Math.PI * 2);
        ctx.fill();

        // 核心亮点
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(px, py, p.size * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // ===== 第 4 层：中层能量带（8 公理节点 + 能量弧线）=====
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      // 极淡轨道线
      ctx.strokeStyle = rgba(C.lifeBright, 0.05);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx + smoothMx * 2.5, cy + smoothMy * 2.5, nodeR, 0, Math.PI * 2);
      ctx.stroke();

      // 节点位置
      const nodePositions: { x: number; y: number; color: string }[] = [];
      for (let i = 0; i < nodeCount; i++) {
        const angle = (Math.PI * 2 / nodeCount) * i + (prefersReduced ? 0 : t * 0.04);
        const nx = cx + smoothMx * 2.5 + nodeR * Math.cos(angle);
        const ny = cy + smoothMy * 2.5 + nodeR * Math.sin(angle);
        nodePositions.push({ x: nx, y: ny, color: nodeColors[i] });
      }

      // 节点间能量弧线（贝塞尔）+ 流动光点
      for (let i = 0; i < nodeCount; i++) {
        const a = nodePositions[i];
        const b = nodePositions[(i + 1) % nodeCount];
        // 弧线
        ctx.strokeStyle = rgba(C.lifeBright, 0.08);
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const len = Math.hypot(dx, dy);
        const nx = -dy / len * 8; // 法线偏移
        const ny = dx / len * 8;
        ctx.quadraticCurveTo(mx + nx, my + ny, b.x, b.y);
        ctx.stroke();

        // 流动光点（沿弧线移动）
        const flowT = prefersReduced ? 0.5 : ((t * 0.3 + i * 0.125) % 1);
        const fx = a.x + (b.x - a.x) * flowT + nx * Math.sin(flowT * Math.PI);
        const fy = a.y + (b.y - a.y) * flowT + ny * Math.sin(flowT * Math.PI);
        ctx.globalAlpha = (1 - Math.abs(flowT - 0.5) * 2) * 0.6;
        const fg = ctx.createRadialGradient(fx, fy, 0, fx, fy, 4);
        fg.addColorStop(0, a.color);
        fg.addColorStop(1, rgba(a.color, 0));
        ctx.fillStyle = fg;
        ctx.beginPath();
        ctx.arc(fx, fy, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // 节点本身（脉冲呼吸，不同相位）
      for (let i = 0; i < nodeCount; i++) {
        const n = nodePositions[i];
        const pulse = prefersReduced ? 0.6 : (0.5 + 0.5 * Math.sin(t * 1.1 + i * 0.85));

        // 光晕
        ctx.globalAlpha = 1;
        const ng = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 14);
        ng.addColorStop(0, rgba(n.color, 0.7 * pulse));
        ng.addColorStop(0.4, rgba(n.color, 0.15 * pulse));
        ng.addColorStop(1, rgba(n.color, 0));
        ctx.fillStyle = ng;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 14, 0, Math.PI * 2);
        ctx.fill();

        // 核心
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = n.color;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.8 + pulse * 0.8, 0, Math.PI * 2);
        ctx.fill();

        // 白色高光
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(n.x, n.y, 0.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // ===== 第 5 层：核心脉冲波（有机波形 + 相位差）=====
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const hexR = W * 0.12;
      const waveColors = [C.lifeBright, C.evoBright, C.gov];
      for (let wave = 0; wave < 3; wave++) {
        const phase = prefersReduced ? 0.5 : ((t * 0.45 + wave * 0.33) % 1);
        const waveR = hexR + phase * W * 0.38;
        const waveAlpha = (1 - phase) * 0.25;
        ctx.strokeStyle = rgba(waveColors[wave], waveAlpha);
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        const steps = 80;
        for (let s = 0; s <= steps; s++) {
          const a = (Math.PI * 2 / steps) * s;
          const distort = prefersReduced ? 0 : Math.sin(a * 6 + t * 1.8) * 2.5;
          const r = waveR + distort;
          const wx = cx + smoothMx * 4 + r * Math.cos(a);
          const wy = cy + smoothMy * 4 + r * Math.sin(a);
          if (s === 0) ctx.moveTo(wx, wy);
          else ctx.lineTo(wx, wy);
        }
        ctx.closePath();
        ctx.stroke();
      }
      ctx.restore();

      // ===== 第 6 层：中央生命核 =====
      ctx.save();

      const hb = prefersReduced ? 1 : heartbeat(t);
      const coreHexR = hexR * (0.95 + gravity * 0.08);
      const coreCx = cx + smoothMx * 5;
      const coreCy = cy + smoothMy * 5;

      // 多层 bloom 光晕（screen 叠加）
      ctx.globalCompositeOperation = 'screen';
      const blooms = [
        { r: coreHexR * 2.8, color: C.life, alpha: 0.12 },
        { r: coreHexR * 2.0, color: C.lifeBright, alpha: 0.16 },
        { r: coreHexR * 1.4, color: C.lifeBright, alpha: 0.22 },
      ];
      for (const b of blooms) {
        const bg = ctx.createRadialGradient(coreCx, coreCy, 0, coreCx, coreCy, b.r * hb);
        bg.addColorStop(0, rgba(b.color, b.alpha));
        bg.addColorStop(1, rgba(b.color, 0));
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, W, H);
      }

      // 六边形核心
      ctx.globalCompositeOperation = 'source-over';
      ctx.translate(coreCx, coreCy);
      ctx.rotate(prefersReduced ? 0 : t * 0.08);
      ctx.scale(hb, hb);

      // 玻璃质感填充
      const hexGrad = ctx.createLinearGradient(-coreHexR, -coreHexR, coreHexR, coreHexR);
      hexGrad.addColorStop(0, rgba(C.lifeBright, 0.12));
      hexGrad.addColorStop(0.5, rgba(C.life, 0.22));
      hexGrad.addColorStop(1, rgba(C.gov, 0.12));
      ctx.fillStyle = hexGrad;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 2;
        const x = coreHexR * Math.cos(a);
        const y = coreHexR * Math.sin(a);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();

      // 六边形描边（双层）
      ctx.strokeStyle = rgba(C.lifeBright, 0.85);
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.strokeStyle = rgba(C.lifeBright, 0.3);
      ctx.lineWidth = 3;
      ctx.stroke();

      // 内部光线纹路（三层旋转三角形，呼应 DNA）
      for (let i = 0; i < 3; i++) {
        const rotAngle = (prefersReduced ? 0 : t * 0.4) + (i * Math.PI * 2 / 3);
        const triColors = [C.lifeBright, C.evoBright, C.gov];
        ctx.strokeStyle = rgba(triColors[i], 0.35);
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        for (let j = 0; j < 3; j++) {
          const a = (Math.PI * 2 / 3) * j + rotAngle - Math.PI / 2;
          const r = coreHexR * 0.62;
          const x = r * Math.cos(a);
          const y = r * Math.sin(a);
          if (j === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      }

      // 内层小六边形（呼应 Logo）
      ctx.strokeStyle = rgba(C.lifeBright, 0.5);
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 2;
        const r = coreHexR * 0.35;
        const x = r * Math.cos(a);
        const y = r * Math.sin(a);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      // 中心亮点（白色高光）
      const centerGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, coreHexR * 0.3);
      centerGrad.addColorStop(0, 'rgba(255,255,255,0.9)');
      centerGrad.addColorStop(0.5, rgba(C.lifeBright, 0.4));
      centerGrad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = centerGrad;
      ctx.beginPath();
      ctx.arc(0, 0, coreHexR * 0.3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [size]);

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block" style={{ width: size, height: size }} />
    </div>
  );
}
