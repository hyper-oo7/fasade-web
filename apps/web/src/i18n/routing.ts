import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'fr', 'it', 'de', 'es', 'nl', 'pl', 'pt', 'sv'] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  localePrefix: 'as-needed', // English at /, French at /fr/, Italian at /it/, etc.
});

// Human-readable locale names for UI display
export const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  it: 'Italiano',
  de: 'Deutsch',
  es: 'Español',
  nl: 'Nederlands',
  pl: 'Polski',
  pt: 'Português',
  sv: 'Svenska',
};

// Locale to country for hreflang
export const localeCountry: Record<Locale, string> = {
  en: 'en-US',
  fr: 'fr-FR',
  it: 'it-IT',
  de: 'de-DE',
  es: 'es-ES',
  nl: 'nl-NL',
  pl: 'pl-PL',
  pt: 'pt-PT',
  sv: 'sv-SE',
};
