import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Copy, Check } from 'lucide-react';

// 复制按钮：点击复制文本，2 秒内显示“已复制”反馈
// 复用 mcpServer.copy / mcpServer.copied 通用文案
export default function CopyButton({ text }: { text: string }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 剪贴板不可用时静默失败，不影响页面渲染
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-2 py-1 rounded text-xs text-zinc-400 hover:text-accent-blue hover:bg-white/5 transition-colors shrink-0"
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? t('mcpServer.copied') : t('mcpServer.copy')}
    </button>
  );
}
