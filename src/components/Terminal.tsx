import { useEffect, useState } from 'react';

interface TerminalProps {
  lines: string[];
  className?: string;
}

/**
 * 活体代码窗口：
 * 顶部光带（呼应 .code-window::before）+ 三色 mac 灯 + 打字机 + 末尾光标脉冲。
 */
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
      }, 38);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setDisplayed((prev) => [...prev, line]);
      setCurrent('');
      setLineIdx(lineIdx + 1);
      setCharIdx(0);
    }, 460);
    return () => clearTimeout(t);
  }, [charIdx, lineIdx, lines]);

  return (
    <div className={`code-window ${className}`}>
      <div
        className="flex items-center gap-2 px-4 py-3 border-b border-white/5"
        style={{ background: 'rgba(17, 24, 36, 0.6)' }}
      >
        <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f56', boxShadow: '0 0 6px rgba(255,95,86,0.4)' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e', boxShadow: '0 0 6px rgba(255,189,46,0.4)' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#27c93f', boxShadow: '0 0 6px rgba(39,201,63,0.4)' }} />
        <span className="ml-2 text-xs text-zinc-500 font-mono">PowerShell</span>
      </div>

      <div className="p-4 font-mono text-sm leading-relaxed">
        {displayed.map((l, i) => (
          <div key={i} style={{ color: '#5eead4' }}>
            <span className="text-zinc-500 select-none">PS C:\metago&gt; </span>
            {l}
          </div>
        ))}
        {lineIdx < lines.length && (
          <div style={{ color: '#5eead4' }}>
            <span className="text-zinc-500 select-none">PS C:\metago&gt; </span>
            {current}
            <span
              className="inline-block w-2 h-4 ml-0.5 align-middle animate-pulse"
              style={{ background: '#5eead4', boxShadow: '0 0 6px #5eead4' }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
