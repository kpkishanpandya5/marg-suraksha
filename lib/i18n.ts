import en from '@/content/i18n/en.json'
import hi from '@/content/i18n/hi.json'

export type StringKey = keyof typeof en
export type Lang = 'en' | 'hi'

export const LANGS: Lang[] = ['en', 'hi']

const dictionaries: Record<Lang, Record<string, string>> = { en, hi }

/** English string for a key. Kept for callers that render a single language. */
export function t(key: StringKey): string {
  return en[key]
}

/** String for a key in a given language, falling back to English. */
export function tr(key: StringKey, lang: Lang): string {
  return dictionaries[lang][key] ?? en[key]
}
