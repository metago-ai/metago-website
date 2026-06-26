import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GitFork, ExternalLink, Mail } from 'lucide-react';

const GITEE_URL = 'https://gitee.com/metago/metagolifeform';
const GITHUB_URL = 'https://github.com/metago-ai/metagolifeform';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative mt-20">
      {/* 六边形分隔线 */}
      <div className="hex-divider max-w-5xl mx-auto" />

      <div
        className="border-t border-white/5"
        style={{
          background:
            'linear-gradient(180deg, rgba(8,12,20,0) 0%, rgba(8,12,20,0.6) 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* 品牌 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/metago-logo.png" alt="MetaGO" className="h-7" />
              <div className="text-2xl font-display font-bold gradient-text">
                MetaGO
              </div>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              {t('about.subtitle')}
            </p>
            {/* 生命体征徽章 */}
            <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-life-bright animate-pulse" />
              <span>System Status: Alive</span>
            </div>
          </div>

          {/* 文档 */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 font-display">
              {t('footer.docs')}
            </h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <Link
                  to="/docs"
                  className="hover:text-life-bright transition-colors"
                >
                  {t('docs.quickStart')}
                </Link>
              </li>
              <li>
                <Link
                  to="/docs"
                  className="hover:text-life-bright transition-colors"
                >
                  {t('docs.architecture')}
                </Link>
              </li>
              <li>
                <Link
                  to="/docs"
                  className="hover:text-life-bright transition-colors"
                >
                  {t('docs.customization')}
                </Link>
              </li>
            </ul>
          </div>

          {/* 仓库 */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 font-display">
              {t('footer.repo')}
            </h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <a
                  href={GITEE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-life-bright transition-colors"
                >
                  <GitFork size={14} /> Gitee <ExternalLink size={11} />
                </a>
              </li>
              <li>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-gov-bright transition-colors"
                >
                  <GitFork size={14} /> GitHub <ExternalLink size={11} />
                </a>
              </li>
              <li>
                <a
                  href="mailto:metago@lifeform.dev"
                  className="flex items-center gap-2 hover:text-evo-bright transition-colors"
                >
                  <Mail size={14} /> {t('nav.contact')}
                </a>
              </li>
              <li className="pt-2 text-zinc-500">{t('footer.license')}</li>
            </ul>
          </div>
        </div>

        {/* 底部：生命体签名 */}
        <div className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
            <span>{t('footer.copyright')}</span>
            <span className="font-mono flex items-center gap-2">
              <span className="inline-block w-1 h-1 rounded-full bg-life-bright" />
              <span className="inline-block w-1 h-1 rounded-full bg-evo-bright" />
              <span className="inline-block w-1 h-1 rounded-full bg-gov-bright" />
              <span className="ml-2">Lifeform v36.4</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
