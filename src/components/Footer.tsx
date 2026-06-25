import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GitFork, ExternalLink } from 'lucide-react';

const GITEE_URL = 'https://gitee.com/metago/metago';
const GITHUB_URL = 'https://github.com/metago/metago';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-white/10 bg-bg-card/40 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="text-2xl font-display font-bold gradient-text mb-3">
            MetaGO
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed">
            {t('about.subtitle')}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-4">
            {t('footer.docs')}
          </h4>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li>
              <Link
                to="/docs"
                className="hover:text-accent-blue transition-colors"
              >
                {t('docs.quickStart')}
              </Link>
            </li>
            <li>
              <Link
                to="/docs"
                className="hover:text-accent-blue transition-colors"
              >
                {t('docs.architecture')}
              </Link>
            </li>
            <li>
              <Link
                to="/docs"
                className="hover:text-accent-blue transition-colors"
              >
                {t('docs.customization')}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-4">
            {t('footer.repo')}
          </h4>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li>
              <a
                href={GITEE_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-accent-blue transition-colors"
              >
                <GitFork size={14} /> Gitee <ExternalLink size={12} />
              </a>
            </li>
            <li>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-accent-blue transition-colors"
              >
                <GitFork size={14} /> GitHub <ExternalLink size={12} />
              </a>
            </li>
            <li className="pt-2 text-zinc-500">{t('footer.license')}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 text-center text-xs text-zinc-500">
          {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
}
