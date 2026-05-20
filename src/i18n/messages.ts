import type zh from './locales/zh.json';

// Use the default-locale file as the source of truth for message keys so that
// useTranslations / getTranslations get full key autocomplete and type checking.
export type Messages = typeof zh;

declare global {
  // Augments next-intl so message keys are type-checked across the app.
  interface IntlMessages extends Messages {}
}
