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
  const t = useTranslations('nav');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-4xl font-extrabold text-gradient">EcoAPI Home</h1>
      <nav className="flex flex-wrap items-center justify-center gap-6 text-text-secondary">
        <span>{t('home')}</span>
        <span>{t('profile')}</span>
        <span>{t('topup')}</span>
        <span>{t('login')}</span>
      </nav>
    </main>
  );
}
