import { useTranslation } from 'react-i18next';
import { Terminal as TerminalIcon } from 'lucide-react';
import CopyButton from './CopyButton';

// MCP Server npm 安装命令块：终端风格 + 复制按钮
// 复用 mcpServer.install / mcpServer.installCommand 通用文案
export default function McpInstallBlock({ className = '' }: { className?: string }) {
  const { t } = useTranslation();
  const command = t('mcpServer.installCommand');

  return (
    <div className={className}>
      <div className="text-xs text-zinc-500 font-mono mb-2 px-1">
        {t('mcpServer.install')}
      </div>
      <div
        className="rounded-lg overflow-hidden border border-white/10"
        style={{ background: '#0d1117' }}
      >
        <div
          className="flex items-center justify-between px-4 py-2 border-b border-white/5"
          style={{ background: '#161b22' }}
        >
          <div className="flex items-center gap-2 min-w-0">
            <TerminalIcon size={14} className="text-accent-green shrink-0" />
            <span className="text-xs text-zinc-500 font-mono truncate">npm</span>
          </div>
          <CopyButton text={command} />
        </div>
        <pre
          className="p-4 font-mono text-sm overflow-x-auto"
          style={{ color: '#00ff88' }}
        >
          <span className="text-zinc-500 select-none">$ </span>
          {command}
        </pre>
      </div>
    </div>
  );
}
