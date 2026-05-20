import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function ProfilePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('nav');
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-4xl font-extrabold text-gradient">{t('profile')}</h1>
    </main>
  );
}
