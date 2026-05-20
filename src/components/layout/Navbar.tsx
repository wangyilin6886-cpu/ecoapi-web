'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Globe, Leaf, SunMoon, Check } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { Link, usePathname, useRouter, routing, type Locale } from '@/i18n/routing';

const SPRING = [0.34, 1.56, 0.64, 1] as const;

const NAV_ITEMS = [
  { key: 'home', href: '/' },
  { key: 'profile', href: '/profile' },
  { key: 'topup', href: '/topup' },
] as const;

const LOCALES: { code: Locale; label: string; short: string }[] = [
  { code: 'zh', label: '简体中文', short: '中文' },
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'id', label: 'Bahasa Indonesia', short: 'ID' },
];

export default function Navbar() {
  const t = useTranslations('nav');
  const { scrolled } = useScrollPosition(50);
  const pathname = usePathname();

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 h-16"
      animate={{
        backgroundColor: scrolled
          ? 'rgba(255,255,255,0.95)'
          : 'rgba(255,255,255,0.70)',
        borderBottomWidth: scrolled ? 0.5 : 0,
      }}
      transition={{ duration: 0.2 }}
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottomColor: 'rgba(29,158,117,0.15)',
        borderBottomStyle: 'solid',
      }}
    >
      <BrandGradientDef />
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        {/* Left: logo */}
        <Link href="/" className="flex items-center gap-2">
          <Leaf size={24} stroke="url(#leafGradient)" strokeWidth={2.2} />
          <span className="text-[18px] font-medium text-text-primary">EcoAPI</span>
        </Link>

        {/* Center: nav with sliding active capsule */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.key}
                href={item.href}
                className="relative rounded-pill px-4 py-2 text-sm transition-colors duration-200"
              >
                {active && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-pill bg-brand-gradient shadow-glow"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    active ? 'font-medium text-white' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {t(item.key)}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Right: language, theme, login */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button
            aria-label="toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-pill text-text-secondary transition-all duration-200 hover:bg-bg-warm hover:text-text-primary"
          >
            <SunMoon size={18} />
          </button>
          <button className="rounded-pill bg-brand-gradient px-5 py-2 text-sm font-medium text-white shadow-card transition-all duration-200 hover:scale-105 hover:shadow-card-hover">
            {t('login')}
          </button>
        </div>
      </div>
    </motion.header>
  );
}

function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  const switchTo = (code: Locale) => {
    setOpen(false);
    if (code === locale) return;
    router.replace(pathname, { locale: code });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="change language"
        className="flex h-9 items-center gap-1.5 rounded-pill px-3 text-sm text-text-secondary transition-all duration-200 hover:bg-bg-warm hover:text-text-primary"
      >
        <Globe size={18} />
        <span className="font-medium">{current.short}</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.ul
              initial={{ opacity: 0, scale: 0.9, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -8 }}
              transition={{ duration: 0.28, ease: SPRING }}
              className="glass absolute right-0 z-50 mt-2 w-44 origin-top-right overflow-hidden rounded-lg p-1 shadow-card-hover"
            >
              {LOCALES.map((l) => (
                <li key={l.code}>
                  <button
                    onClick={() => switchTo(l.code)}
                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-text-primary transition-colors duration-200 hover:bg-bg-soft"
                  >
                    {l.label}
                    {l.code === locale && <Check size={15} className="text-brand-start" />}
                  </button>
                </li>
              ))}
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function BrandGradientDef() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden>
      <defs>
        <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1D9E75" />
          <stop offset="45%" stopColor="#5DCAA5" />
          <stop offset="80%" stopColor="#378ADD" />
          <stop offset="100%" stopColor="#185FA5" />
        </linearGradient>
      </defs>
    </svg>
  );
}
