import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/sections/Hero';

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return (
    <main>
      <Hero />
    </main>
  );
}
