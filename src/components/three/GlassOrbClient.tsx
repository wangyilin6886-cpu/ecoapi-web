'use client';

import dynamic from 'next/dynamic';

// R3F can't render during SSR (needs window), so load the Canvas client-side only.
const GlassOrbClient = dynamic(
  () => import('./GlassOrb').then((m) => m.GlassOrbCanvas),
  { ssr: false },
);

export default GlassOrbClient;
