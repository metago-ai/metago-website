import { useTranslation } from 'react-i18next';
import { Plug } from 'lucide-react';
import CopyButton from './CopyButton';

// MCP Server 客户端配置示例数据（Claude Desktop / Cursor / Trae）
// 与 Home.tsx 的 mcpConfigs 保持一致，确保配置 JSON 一致
interface McpConfig {
  key: string;
  pathKey: string;
  config: Record<string, unknown>;
}

const mcpConfigs: McpConfig[] = [
  {
    key: 'claudeDesktop',
    pathKey: 'claudeDesktopPath',
    config: {
      mcpServers: {
        metago: {
          command: '@metago-ai/mcp-server',
        },
      },
    },
  },
  {
    key: 'cursor',
    pathKey: 'cursorPath',
    config: {
      mcpServers: {
        metago: {
          command: '@metago-ai/mcp-server',
        },
      },
    },
  },
  {
    key: 'trae',
    pathKey: 'traePath',
    config: {
      'mcp.servers': {
        metago: {
          command: '@metago-ai/mcp-server',
        },
      },
    },
  },
];

// MCP Server 客户端配置网格：3 列卡片，展示各客户端的 JSON 配置 + 复制按钮
// 复用 mcpServer.{claudeDesktop,cursor,trae,*Path} 通用文案
export default function McpConfigGrid({ className = '' }: { className?: string }) {
  const { t } = useTranslation();

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
      {mcpConfigs.map((cfg) => {
        const configText = JSON.stringify(cfg.config, null, 2);
        return (
          <div key={cfg.key} className="glass-card overflow-hidden flex flex-col">
            <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(168,85,247,0.15))',
                }}
              >
                <Plug className="text-accent-blue" size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-zinc-100 truncate">
                  {t(`mcpServer.${cfg.key}`)}
                </div>
                <div className="text-xs text-zinc-500 font-mono truncate">
                  {t(`mcpServer.${cfg.pathKey}`)}
                </div>
              </div>
            </div>
            <div className="flex-1 relative" style={{ background: '#0d1117' }}>
              <div className="absolute top-2 right-2 z-10">
                <CopyButton text={configText} />
              </div>
              <pre className="p-4 pr-24 font-mono text-xs leading-relaxed overflow-x-auto text-zinc-300">
                {configText}
              </pre>
            </div>
          </div>
        );
      })}
    </div>
  );
}
