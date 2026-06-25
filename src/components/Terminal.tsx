import { useEffect, useState } from 'react';

interface TerminalProps {
  lines: string[];
  className?: string;
}

export default function Terminal({ lines, className = '' }: TerminalProps) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [current, setCurrent] = useState('');
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    if (lineIdx >= lines.length) return;
    const line = lines[lineIdx];

    if (charIdx < line.length) {
      const t = setTimeout(() => {
        setCurrent(line.slice(0, charIdx + 1));
        setCharIdx(charIdx + 1);
      }, 40);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setDisplayed((prev) => [...prev, line]);
      setCurrent('');
      setLineIdx(lineIdx + 1);
      setCharIdx(0);
    }, 500);
    return () => clearTimeout(t);
  }, [charIdx, lineIdx, lines]);

  return (
    <div
      className={`rounded-lg overflow-hidden border border-white/10 ${className}`}
      style={{ background: '#0d1117' }}
    >
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ background: '#161b22' }}
      >
        <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f56' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#27c93f' }} />
        <span className="ml-2 text-xs text-zinc-500 font-mono">PowerShell</span>
      </div>

      <div className="p-4 font-mono text-sm leading-relaxed">
        {displayed.map((l, i) => (
          <div key={i} style={{ color: '#00ff88' }}>
            <span className="text-zinc-500 select-none">PS C:\metago&gt; </span>
            {l}
          </div>
        ))}
        {lineIdx < lines.length && (
          <div style={{ color: '#00ff88' }}>
            <span className="text-zinc-500 select-none">PS C:\metago&gt; </span>
            {current}
            <span
              className="inline-block w-2 h-4 ml-0.5 align-middle animate-pulse"
              style={{ background: '#00ff88' }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
