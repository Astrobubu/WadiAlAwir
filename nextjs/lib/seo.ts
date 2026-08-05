import type { Metadata } from 'next'

export const SITE_URL = 'https://wadialawir.com'
export const SITE_NAME = 'Wadi Al Awir Car Accessories'
export const LOCALES = ['en', 'ar'] as const

export type Locale = (typeof LOCALES)[number]

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale)
}

export function absoluteUrl(locale: Locale, path = '') {
  const normalizedPath = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}/${locale}${normalizedPath}`
}

export function localizedAlternates(locale: Locale, path = ''): Metadata['alternates'] {
  return {
    canonical: absoluteUrl(locale, path),
    languages: {
      en: absoluteUrl('en', path),
      ar: absoluteUrl('ar', path),
      'x-default': absoluteUrl('en', path),
    },
  }
}

export function localeName(locale: Locale) {
  return locale === 'ar' ? 'العربية' : 'English'
}

export function safeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}
