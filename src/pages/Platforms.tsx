import { useTranslation } from 'react-i18next';
import { Table, Terminal, FileText, Check, Plug } from 'lucide-react';
import McpInstallBlock from '../components/McpInstallBlock';
import McpConfigGrid from '../components/McpConfigGrid';

interface PlatformRow {
  name: string;
  configFile: string;
  globalPath: string;
  projectPath: string;
  adapterDir: string;
}

interface InstallCommand {
  cmd: string;
  comment: string;
}

const platforms: PlatformRow[] = [
  { name: 'Trae', configFile: 'rules.md', globalPath: '~/.trae-cn/rules.md', projectPath: '-', adapterDir: 'adapters/trae/' },
  { name: 'Claude Code', configFile: 'CLAUDE.md', globalPath: '~/.claude/CLAUDE.md', projectPath: './CLAUDE.md', adapterDir: 'adapters/claude-code/' },
  { name: 'OpenAI Codex', configFile: 'AGENTS.md', globalPath: '~/.codex/AGENTS.md', projectPath: './AGENTS.md', adapterDir: 'adapters/codex/' },
  { name: 'Cursor', configFile: '.mdc', globalPath: '-', projectPath: '.cursor/rules/metago.mdc', adapterDir: 'adapters/cursor/' },
  { name: 'CodeBuddy', configFile: 'CODEBUDDY.md', globalPath: '-', projectPath: './CODEBUDDY.md', adapterDir: 'adapters/codebuddy/' },
  { name: 'Qoder', configFile: '.md', globalPath: '-', projectPath: '.qoder/rules/metago.md', adapterDir: 'adapters/qoder/' },
  { name: 'ZCode', configFile: 'CLAUDE.md', globalPath: '~/.claude/CLAUDE.md', projectPath: './CLAUDE.md', adapterDir: 'adapters/zcode/' },
];

const installCommands: InstallCommand[] = [
  { cmd: 'git clone https://gitee.com/metago/metagolifeform.git', comment: '' },
  { cmd: 'cd metagolifeform', comment: '' },
  { cmd: '.\\scripts\\install.ps1', comment: '默认Trae' },
  { cmd: '.\\scripts\\install.ps1 -Platform claude-code', comment: 'Claude Code' },
  { cmd: '.\\scripts\\install.ps1 -Platform codex', comment: 'Codex' },
  { cmd: '.\\scripts\\install.ps1 -Platform cursor', comment: 'Cursor' },
  { cmd: '.\\scripts\\install.ps1 -Platform codebuddy', comment: 'CodeBuddy' },
  { cmd: '.\\scripts\\install.ps1 -Platform qoder', comment: 'Qoder' },
  { cmd: '.\\scripts\\install.ps1 -Platform zcode', comment: 'ZCode' },
];

const agentsCompatible = ['Codex', 'Cursor', 'CodeBuddy', 'Qoder'];

const Platforms = () => {
  const { t } = useTranslation();

  return (
    <div className="py-20">
      {/* 区块1：页面标题 */}
      <section className="max-w-7xl mx-auto px-6 text-center mb-24">
        <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">{t('platforms.title')}</h1>
        <p className="text-xl text-zinc-400 max-w-3xl mx-auto">{t('platforms.subtitle')}</p>
      </section>

      {/* 区块2：平台配置对照表 */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="flex items-center gap-3 mb-10">
          <Table className="w-8 h-8 text-accent-blue" />
          <h2 className="text-3xl font-bold text-white">{t('platforms.tableTitle')}</h2>
        </div>
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-6 py-4 text-zinc-400 font-semibold">平台</th>
                  <th className="text-left px-6 py-4 text-zinc-400 font-semibold">配置文件</th>
                  <th className="text-left px-6 py-4 text-zinc-400 font-semibold">全局路径</th>
                  <th className="text-left px-6 py-4 text-zinc-400 font-semibold">项目路径</th>
                  <th className="text-left px-6 py-4 text-zinc-400 font-semibold">适配器目录</th>
                </tr>
              </thead>
              <tbody>
                {platforms.map((p) => (
                  <tr key={p.name} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-white font-medium">{p.name}</td>
                    <td className="px-6 py-4">
                      <code className="text-accent-blue font-mono text-sm">{p.configFile}</code>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-zinc-300 font-mono text-sm">{p.globalPath}</code>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-zinc-300 font-mono text-sm">{p.projectPath}</code>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-accent-purple font-mono text-sm">{p.adapterDir}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 区块3：MCP 协议集成（通用） */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="flex items-center gap-3 mb-10">
          <Plug className="w-8 h-8 text-accent-purple" />
          <h2 className="text-3xl font-bold text-white">{t('platforms.mcp.title')}</h2>
        </div>
        <div className="glass-card p-8">
          <p className="text-zinc-300 leading-relaxed mb-8">
            {t('platforms.mcp.subtitle')}
          </p>

          {/* 安装命令 */}
          <McpInstallBlock className="mb-8" />

          {/* 客户端配置示例 */}
          <div className="text-sm text-zinc-400 mb-4">
            {t('platforms.mcp.configNote')}
          </div>
          <McpConfigGrid />
        </div>
      </section>

      {/* 区块4：安装指南 */}
      <section className="max-w-4xl mx-auto px-6 mb-24">
        <div className="flex items-center gap-3 mb-10">
          <Terminal className="w-8 h-8 text-accent-green" />
          <h2 className="text-3xl font-bold text-white">{t('platforms.installTitle')}</h2>
        </div>
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
            <div className="w-3 h-3 rounded-full bg-accent-red"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-accent-green"></div>
            <span className="ml-2 text-sm text-zinc-500 font-mono">PowerShell</span>
          </div>
          <pre className="overflow-x-auto"><code className="text-sm font-mono leading-relaxed block">
            {installCommands.map((line, i) => (
              <div key={i}>
                <span className="text-zinc-200">{line.cmd}</span>
                {line.comment && (
                  <span className="text-zinc-500">{'  # '}{line.comment}</span>
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
            <FileText className="w-8 h-8 text-accent-purple" />
            <h2 className="text-2xl font-bold text-white">AGENTS.md 开放标准</h2>
          </div>
          <p className="text-zinc-300 leading-relaxed mb-6">
            Codex、Cursor、CodeBuddy、Qoder 均兼容 <code className="text-accent-blue font-mono">AGENTS.md</code> 开放标准（Linux Foundation 管理），被 60,000+ 开源项目采用。
          </p>
          <div className="flex flex-wrap gap-3">
            {agentsCompatible.map((name) => (
              <span
                key={name}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium"
                style={{ color: '#00ff88', backgroundColor: 'rgba(0, 255, 136, 0.1)', border: '1px solid rgba(0, 255, 136, 0.3)' }}
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
