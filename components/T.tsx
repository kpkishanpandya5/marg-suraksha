import type { ElementType } from 'react'
import { tr, type StringKey } from '@/lib/i18n'

/**
 * Renders a translated string in both English and Hindi. Exactly one is visible;
 * the other is hidden with CSS keyed off `data-lang` on <html> (see globals.css)
 * and flipped by the LangToggle. Both stay in the DOM so search engines index the
 * Hindi text too.
 */
export default function T({
  k,
  as: Tag = 'span' as ElementType,
  className,
}: {
  k: StringKey
  as?: ElementType
  className?: string
}) {
  const base = className ? ` ${className}` : ''
  return (
    <>
      <Tag className={`lang-en${base}`}>{tr(k, 'en')}</Tag>
      <Tag lang="hi" className={`lang-hi${base}`}>
        {tr(k, 'hi')}
      </Tag>
    </>
  )
}
