import strings from '@/content/i18n/en.json'

export type StringKey = keyof typeof strings

export function t(key: StringKey): string {
  return strings[key]
}
