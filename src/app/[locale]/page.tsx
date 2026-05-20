import { setRequestLocale } from 'next-intl/server';

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-5xl font-extrabold text-gradient">EcoAPI Home</h1>
      <p className="text-text-secondary">Scroll & switch language to test the navbar.</p>
      <div className="h-[150vh]" />
    </main>
  );
}
