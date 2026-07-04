import { useTranslation } from 'react-i18next';
import { Table, Terminal, FileText, Check, Plug } from 'lucide-react';
import McpInstallBlock from '../components/McpInstallBlock';
import McpConfigGrid from '../components/McpConfigGrid';

type Hue = 'life' | 'evo' | 'gov' | 'patent' | 'quantum';

const hueColor = (hue: Hue) =>
  hue === 'life' ? '#5eead4'
    : hue === 'evo' ? '#fbbf24'
    : hue === 'gov' ? '#a5b4fc'
    : hue === 'patent' ? '#FFD700'
    : '#00D4FF';

interface PlatformRow {
  name: string;
  configFile: string;
  globalPath: string;
  projectPath: string;
  adapterDir: string;
  hue: Hue;
}

const platforms: PlatformRow[] = [
  { name: 'Trae', configFile: 'rules.md', globalPath: '~/.trae-cn/rules.md', projectPath: '-', adapterDir: 'adapters/trae/', hue: 'life' },
  { name: 'Claude Code', configFile: 'CLAUDE.md', globalPath: '~/.claude/CLAUDE.md', projectPath: './CLAUDE.md', adapterDir: 'adapters/claude-code/', hue: 'evo' },
  { name: 'OpenAI Codex', configFile: 'AGENTS.md', globalPath: '~/.codex/AGENTS.md', projectPath: './AGENTS.md', adapterDir: 'adapters/codex/', hue: 'gov' },
  { name: 'Cursor', configFile: '.mdc', globalPath: '-', projectPath: '.cursor/rules/metago.mdc', adapterDir: 'adapters/cursor/', hue: 'patent' },
  { name: 'CodeBuddy', configFile: 'CODEBUDDY.md', globalPath: '-', projectPath: './CODEBUDDY.md', adapterDir: 'adapters/codebuddy/', hue: 'quantum' },
  { name: 'Qoder', configFile: '.md', globalPath: '-', projectPath: '.qoder/rules/metago.md', adapterDir: 'adapters/qoder/', hue: 'life' },
  { name: 'ZCode', configFile: 'CLAUDE.md', globalPath: '~/.claude/CLAUDE.md', projectPath: './CLAUDE.md', adapterDir: 'adapters/zcode/', hue: 'evo' },
];

interface InstallCommand {
  cmd: string;
  bashCmd?: string;
  commentKey?: string;
}

const installCommands: InstallCommand[] = [
  { cmd: 'git clone https://gitee.com/metago/metagolifeform.git' },
  { cmd: 'cd metagolifeform' },
  { cmd: '.\\scripts\\install.ps1', bashCmd: 'bash scripts/install.sh', commentKey: 'platforms.installCommands.default' },
  { cmd: '.\\scripts\\install.ps1 -Platform claude-code', bashCmd: 'bash scripts/install.sh --platform claude-code', commentKey: 'platforms.installCommands.claudeCode' },
  { cmd: '.\\scripts\\install.ps1 -Platform codex', bashCmd: 'bash scripts/install.sh --platform codex', commentKey: 'platforms.installCommands.codex' },
  { cmd: '.\\scripts\\install.ps1 -Platform cursor', bashCmd: 'bash scripts/install.sh --platform cursor', commentKey: 'platforms.installCommands.cursor' },
  { cmd: '.\\scripts\\install.ps1 -Platform codebuddy', bashCmd: 'bash scripts/install.sh --platform codebuddy', commentKey: 'platforms.installCommands.codebuddy' },
  { cmd: '.\\scripts\\install.ps1 -Platform qoder', bashCmd: 'bash scripts/install.sh --platform qoder', commentKey: 'platforms.installCommands.qoder' },
  { cmd: '.\\scripts\\install.ps1 -Platform zcode', bashCmd: 'bash scripts/install.sh --platform zcode', commentKey: 'platforms.installCommands.zcode' },
];

const agentsCompatible = ['OpenAI Codex', 'Cursor', 'CodeBuddy', 'Qoder'];

const Platforms = () => {
  const { t } = useTranslation();

  return (
    <div className="py-20">
      {/* 区块1：页面标题 */}
      <section className="max-w-7xl mx-auto px-6 text-center mb-24">
        <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6 font-display">
          {t('platforms.title')}
        </h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">{t('platforms.subtitle')}</p>
      </section>

      {/* 区块2：平台配置对照表 */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="flex items-center gap-3 mb-10">
          <Table className="w-8 h-8" style={{ color: hueColor('life') }} />
          <h2 className="text-3xl font-bold text-white font-display">{t('platforms.tableTitle')}</h2>
        </div>
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-6 py-4 text-text-secondary font-semibold">{t('platforms.tableHeaders.platform')}</th>
                  <th className="text-left px-6 py-4 text-text-secondary font-semibold">{t('platforms.tableHeaders.configFile')}</th>
                  <th className="text-left px-6 py-4 text-text-secondary font-semibold">{t('platforms.tableHeaders.globalPath')}</th>
                  <th className="text-left px-6 py-4 text-text-secondary font-semibold">{t('platforms.tableHeaders.projectPath')}</th>
                  <th className="text-left px-6 py-4 text-text-secondary font-semibold">{t('platforms.tableHeaders.adapterDir')}</th>
                </tr>
              </thead>
              <tbody>
                {platforms.map((p) => {
                  const color = hueColor(p.hue);
                  return (
                    <tr key={p.name} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-white font-medium" style={{ color }}>{p.name}</td>
                      <td className="px-6 py-4">
                        <code className="font-mono text-sm" style={{ color: hueColor('life') }}>{p.configFile}</code>
                      </td>
                      <td className="px-6 py-4">
                        <code className="text-zinc-300 font-mono text-sm">{p.globalPath}</code>
                      </td>
                      <td className="px-6 py-4">
                        <code className="text-zinc-300 font-mono text-sm">{p.projectPath}</code>
                      </td>
                      <td className="px-6 py-4">
                        <code className="font-mono text-sm" style={{ color: hueColor('gov') }}>{p.adapterDir}</code>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 区块3：MCP 协议集成（通用） */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="flex items-center gap-3 mb-10">
          <Plug className="w-8 h-8" style={{ color: hueColor('gov') }} />
          <h2 className="text-3xl font-bold text-white font-display">{t('platforms.mcp.title')}</h2>
        </div>
        <div className="glass-card p-8">
          <p className="text-text-secondary leading-relaxed mb-8">
            {t('platforms.mcp.subtitle')}
          </p>

          {/* 安装命令 */}
          <McpInstallBlock className="mb-8" />

          {/* 客户端配置示例 */}
          <div className="text-sm text-text-secondary mb-4">
            {t('platforms.mcp.configNote')}
          </div>
          <McpConfigGrid />
        </div>
      </section>

      {/* 区块4：安装指南 */}
      <section className="max-w-4xl mx-auto px-6 mb-24">
        <div className="flex items-center gap-3 mb-10">
          <Terminal className="w-8 h-8" style={{ color: hueColor('evo') }} />
          <h2 className="text-3xl font-bold text-white font-display">{t('platforms.installTitle')}</h2>
        </div>
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
            <div className="w-3 h-3 rounded-full" style={{ background: '#f97316' }}></div>
            <div className="w-3 h-3 rounded-full" style={{ background: '#fbbf24' }}></div>
            <div className="w-3 h-3 rounded-full" style={{ background: '#5eead4' }}></div>
            <span className="ml-2 text-sm text-zinc-500 font-mono">Terminal</span>
          </div>
          <pre className="overflow-x-auto"><code className="text-sm font-mono leading-relaxed block">
            {installCommands.map((line, i) => (
              <div key={i}>
                <span className="text-zinc-500 select-none"># Windows (PowerShell)</span>{' '}
                <span className="text-zinc-200">{line.cmd}</span>
                {line.commentKey && (
                  <span className="text-zinc-500">{'  # '}{t(line.commentKey)}</span>
                )}
                {line.bashCmd && (
                  <div>
                    <span className="text-zinc-500 select-none"># macOS/Linux (Bash)</span>{' '}
                    <span className="text-zinc-200">{line.bashCmd}</span>
                  </div>
                )}
              </div>
            ))}
          </code></pre>
        </div>
      </section>

      {/* 区块5：AGENTS.md 开放标准说明 */}
      <section className="max-w-4xl mx-auto px-6 mb-12">
        <div className="glass-card p-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8" style={{ color: hueColor('gov') }} />
            <h2 className="text-2xl font-bold text-white font-display">
              {t('platforms.agentsStandard.title')}
            </h2>
          </div>
          <p className="text-text-secondary leading-relaxed mb-6">
            {t('platforms.agentsStandard.desc')}
          </p>
          <div className="flex flex-wrap gap-3">
            {agentsCompatible.map((name) => (
              <span
                key={name}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium"
                style={{ color: '#5eead4', backgroundColor: 'rgba(94, 234, 212, 0.1)', border: '1px solid rgba(94, 234, 212, 0.3)' }}
              >
                <Check className="w-4 h-4" /> {name}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Platforms;
