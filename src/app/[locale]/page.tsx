import { setRequestLocale } from 'next-intl/server';
import GlassOrbClient from '@/components/three/GlassOrbClient';

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Temporary Hero mount for the 3D glass orb */}
      <div className="absolute inset-0">
        <GlassOrbClient className="!h-full !w-full" />
      </div>
      <div className="pointer-events-none relative z-10 flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 p-8 text-center">
        <h1 className="text-6xl font-extrabold text-gradient">EcoAPI</h1>
        <p className="text-text-secondary">One key, every leading LLM.</p>
      </div>
    </main>
  );
}
