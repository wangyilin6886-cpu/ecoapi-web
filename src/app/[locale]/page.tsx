import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return <HomeContent />;
}

function HomeContent() {
  const tNav = useTranslations('nav');
  const t = useTranslations('hero');

  return (
    <main className="min-h-screen bg-bg-primary">
      <header className="glass sticky top-0 z-50 flex items-center justify-between px-8 py-4">
        <span className="text-xl font-bold text-gradient">EcoAPI</span>
        <nav className="hidden gap-8 text-sm text-text-secondary md:flex">
          <span>{tNav('features')}</span>
          <span>{tNav('pricing')}</span>
          <span>{tNav('docs')}</span>
        </nav>
        <button className="rounded-pill bg-brand-gradient px-5 py-2 text-sm font-medium text-white shadow-glow">
          {tNav('console')}
        </button>
      </header>

      <section className="mx-auto flex max-w-4xl flex-col items-center px-6 py-32 text-center">
        <span className="mb-6 rounded-pill border border-brand-mid/30 bg-bg-soft px-4 py-1 text-xs font-medium text-brand-start">
          {t('badge')}
        </span>
        <h1 className="text-5xl font-extrabold leading-tight text-text-primary md:text-6xl">
          <span className="text-gradient">{t('title')}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-text-secondary">
          {t('subtitle')}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button className="rounded-pill bg-brand-gradient px-7 py-3 font-medium text-white shadow-card transition hover:shadow-card-hover">
            {t('ctaPrimary')}
          </button>
          <button className="glass rounded-pill px-7 py-3 font-medium text-text-primary transition hover:shadow-card">
            {t('ctaSecondary')}
          </button>
        </div>
      </section>
    </main>
  );
}
