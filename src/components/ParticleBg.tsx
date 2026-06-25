import { useEffect, useRef } from 'react';

interface ParticleBgProps {
  className?: string;
}

interface HexNode {
  x: number;
  y: number;
  /** 0..1 phase offset for node breathing */
  phase: number;
  /** layer depth: 0 = far, 1 = mid, 2 = near */
  layer: number;
}

interface Edge {
  a: number;
  b: number;
}

interface Pulse {
  /** edge index */
  edge: number;
  /** 0..1 travel progress */
  progress: number;
  /** speed in progress units per ms */
  speed: number;
  /** color: 'life' | 'evo' | 'gov' */
  hue: 'life' | 'evo' | 'gov';
}

/** Hex grid pointy-top spacing. */
const HEX_SIZE = 56;
const HEX_W = HEX_SIZE * Math.sqrt(3);
const HEX_H = HEX_SIZE * 1.5;

const COLORS = {
  life: '#5eead4',
  lifeDeep: '#06b6d4',
  evo: '#fbbf24',
  gov: '#a5b4fc',
} as const;

export default function ParticleBg({ className = '' }: ParticleBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let nodes: HexNode[] = [];
    let edges: Edge[] = [];
    let pulses: Pulse[] = [];
    let dpr = 1;
    let lastPulseSpawn = 0;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid();
    };

    /** Build a hexagonal lattice of nodes with neighbor edges. */
    const buildGrid = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      nodes = [];
      edges = [];

      // Generate hex centers (offset coordinates, pointy-top).
      const cols = Math.ceil(w / HEX_W) + 2;
      const rows = Math.ceil(h / HEX_H) + 2;

      const grid: number[][] = [];
      for (let r = -1; r < rows; r++) {
        grid[r + 1] = [];
        for (let c = -1; c < cols; c++) {
          const x = c * HEX_W + (r % 2 === 0 ? 0 : HEX_W / 2);
          const y = r * HEX_H;
          // Three depth layers (random assignment keeps the field organic).
          const layerRand = Math.random();
          let layer: number;
          if (layerRand < 0.5) layer = 0;          // far layer (50%)
          else if (layerRand < 0.85) layer = 1;    // mid layer (35%)
          else layer = 2;                           // near layer (15%)

          // Skip some far-layer nodes to keep airy.
          if (layer === 0 && Math.random() < 0.35) {
            grid[r + 1][c + 1] = -1;
            continue;
          }
          // Subtle positional jitter to break mechanical regularity.
          const jx = (Math.random() - 0.5) * 6;
          const jy = (Math.random() - 0.5) * 6;

          nodes.push({
            x: x + jx,
            y: y + jy,
            phase: Math.random() * Math.PI * 2,
            layer,
          });
          grid[r + 1][c + 1] = nodes.length - 1;
        }
      }

      // Connect each node to its east & south-east & south-west neighbors.
      const link = (a: number, b: number) => {
        if (a < 0 || b < 0 || a === undefined || b === undefined) return;
        if (a >= nodes.length || b >= nodes.length) return;
        edges.push({ a, b });
      };
      for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
          const cur = grid[r][c];
          if (cur < 0) continue;
          // East neighbor.
          if (c + 1 < grid[r].length) link(cur, grid[r][c + 1]);
          // South-east / south-west depending on row parity.
          if (r + 1 < grid.length) {
            const offset = r % 2 === 0 ? 0 : 1;
            if (c + offset < grid[r + 1].length) link(cur, grid[r + 1][c + offset]);
            if (c + offset - 1 >= 0 && c + offset - 1 < grid[r + 1].length) {
              link(cur, grid[r + 1][c + offset - 1]);
            }
          }
        }
      }
    };

    const spawnPulse = () => {
      if (edges.length === 0) return;
      const edgeIdx = Math.floor(Math.random() * edges.length);
      const hueRoll = Math.random();
      const hue: Pulse['hue'] = hueRoll < 0.7 ? 'life' : hueRoll < 0.88 ? 'evo' : 'gov';
      pulses.push({
        edge: edgeIdx,
        progress: 0,
        speed: 0.0006 + Math.random() * 0.001,
        hue,
      });
      // Cap concurrent pulses for perf.
      if (pulses.length > 9) pulses.shift();
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const draw = (now: number) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // Ease mouse for parallax.
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      // —— Layer 1: faint hex grid lines (background structure) ——
      ctx.lineWidth = 0.6;
      for (const e of edges) {
        const a = nodes[e.a];
        const b = nodes[e.b];
        const layerBoost = a.layer === 0 ? 0.4 : a.layer === 1 ? 0.7 : 1;
        const px = mouse.x * (a.layer + 1) * 6;
        const py = mouse.y * (a.layer + 1) * 6;
        ctx.strokeStyle = `rgba(94, 234, 212, ${0.05 * layerBoost})`;
        ctx.beginPath();
        ctx.moveTo(a.x + px, a.y + py);
        ctx.lineTo(
          b.x + mouse.x * (b.layer + 1) * 6,
          b.y + mouse.y * (b.layer + 1) * 6,
        );
        ctx.stroke();
      }

      // —— Layer 2: nodes breathing (life pulse) ——
      for (const n of nodes) {
        const px = mouse.x * (n.layer + 1) * 6;
        const py = mouse.y * (n.layer + 1) * 6;
        const breath = 0.5 + 0.5 * Math.sin(now * 0.0008 + n.phase);
        const layerAlpha = n.layer === 0 ? 0.18 : n.layer === 1 ? 0.42 : 0.85;
        const radius = n.layer === 0 ? 1.1 : n.layer === 1 ? 1.6 : 2.3;
        const alpha = layerAlpha * (0.6 + 0.4 * breath);
        ctx.beginPath();
        ctx.arc(n.x + px, n.y + py, radius, 0, Math.PI * 2);
        ctx.fillStyle =
          n.layer === 2
            ? `rgba(94, 234, 212, ${alpha})`
            : `rgba(6, 182, 212, ${alpha * 0.6})`;
        if (n.layer === 2) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = COLORS.life;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // —— Layer 3: traveling pulses (signal flow) ——
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed * 16; // approx per frame at 60fps
        if (p.progress >= 1) {
          pulses.splice(i, 1);
          continue;
        }
        const edge = edges[p.edge];
        if (!edge) {
          pulses.splice(i, 1);
          continue;
        }
        const a = nodes[edge.a];
        const b = nodes[edge.b];
        // Pulse head position (use near-layer parallax only).
        const px = mouse.x * 12;
        const py = mouse.y * 12;
        const headX = a.x + (b.x - a.x) * p.progress + px;
        const headY = a.y + (b.y - a.y) * p.progress + py;
        // Tail trails.
        const tailLen = 0.22;
        const tailStart = Math.max(0, p.progress - tailLen);
        const tailX = a.x + (b.x - a.x) * tailStart + px;
        const tailY = a.y + (b.y - a.y) * tailStart + py;

        const color =
          p.hue === 'life'
            ? COLORS.life
            : p.hue === 'evo'
              ? COLORS.evo
              : COLORS.gov;

        // Gradient trail.
        const grad = ctx.createLinearGradient(tailX, tailY, headX, headY);
        grad.addColorStop(0, `rgba(94, 234, 212, 0)`);
        grad.addColorStop(1, color);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.stroke();

        // Head glow.
        ctx.beginPath();
        ctx.arc(headX, headY, 2.6, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowBlur = 14;
        ctx.shadowColor = color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Spawn pulses at intervals.
      if (now - lastPulseSpawn > 280) {
        spawnPulse();
        lastPulseSpawn = now;
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full z-0 pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
