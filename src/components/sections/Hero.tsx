'use client';

import { motion, type Variants } from 'framer-motion';
import { ArrowUp, Boxes, Cloud, Cpu, Hexagon, Triangle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import GlassOrbClient from '@/components/three/GlassOrbClient';

const EASE = [0.65, 0, 0.35, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const TRUST_LOGOS = [Boxes, Cloud, Cpu, Hexagon, Triangle];

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center gap-8 px-6 py-12 lg:flex-row lg:gap-4 lg:py-0">
      {/* Left 55% — text */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full lg:w-[55%]"
      >
        <motion.p
          variants={item}
          className="text-[11px] font-semibold uppercase tracking-[4px] text-[#0F6E56]"
        >
          {t('tagline')}
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-5 text-5xl font-medium leading-[1.05] text-text-primary md:text-7xl lg:text-[80px]"
        >
          {t('title1')}
        </motion.h1>
        <motion.h1
          variants={item}
          className="text-gradient text-5xl font-medium leading-[1.05] md:text-7xl lg:text-[80px]"
        >
          {t('title2')}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-4 text-[18px] text-text-secondary"
        >
          {t('subtitle')}
        </motion.p>
        <motion.p
          variants={item}
          className="mt-2 text-[14px] text-text-tertiary"
        >
          {t('description')}
        </motion.p>

        {/* Input */}
        <motion.div variants={item} className="mt-8 max-w-xl">
          <div className="glass flex h-14 items-center gap-2 rounded-[24px] pl-5 pr-2">
            <input
              type="text"
              placeholder={t('placeholder')}
              className="h-full flex-1 bg-transparent text-[15px] text-text-primary placeholder:text-text-tertiary focus:outline-none"
            />
            <button
              aria-label="send"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white shadow-card transition-transform duration-200 hover:scale-105"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div variants={item} className="mt-5 flex flex-wrap items-center gap-4">
          <button
            className="rounded-[24px] px-7 py-3 text-[15px] font-medium text-white transition-shadow duration-200 hover:shadow-glow"
            style={{ backgroundImage: 'linear-gradient(90deg, #1D9E75, #378ADD)' }}
          >
            {t('cta1')}
          </button>
          <button className="rounded-[24px] border border-brand-start px-7 py-3 text-[15px] font-medium text-brand-start transition-colors duration-200 hover:bg-brand-start/5">
            {t('cta2')}
          </button>
        </motion.div>

        {/* Trust bar */}
        <motion.div variants={item} className="mt-10 flex flex-col gap-3">
          <span className="text-[14px] text-text-tertiary">{t('trust')}</span>
          <div className="flex items-center gap-6 opacity-50 grayscale">
            {TRUST_LOGOS.map((Logo, i) => (
              <Logo key={i} size={26} className="text-text-tertiary" strokeWidth={1.5} />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Right 45% — 3D orb */}
      <div className="relative h-[60vh] min-h-[600px] w-full lg:h-auto lg:w-[45%] lg:self-stretch">
        <GlassOrbClient className="!h-full !w-full" />
      </div>
    </section>
  );
}
