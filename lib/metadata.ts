import type { Metadata } from 'next'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const DEFAULT_DESCRIPTION =
  'What to do in the first 72 hours after a road accident in India: documents to collect, cashless treatment, insurance schemes, and how to claim compensation.'

// Hindi + Hinglish + English so the site is findable for searches like
// "सड़क दुर्घटना", "sadak durghatna", "marg suraksha", "road accident compensation".
const KEYWORDS = [
  'सड़क दुर्घटना',
  'मार्ग सुरक्षा',
  'सड़क हादसा',
  'दुर्घटना के बाद क्या करें',
  'सड़क दुर्घटना मुआवज़ा',
  'कैशलेस इलाज',
  'MACT दावा',
  'हिट एंड रन मुआवज़ा',
  'ज़िला विधिक सेवा प्राधिकरण',
  'sadak durghatna',
  'marg suraksha',
  'sadak suraksha',
  'road accident India',
  'road accident help India',
  'accident compensation India',
  'cashless treatment road accident',
  'PM-RAHAT',
  'PM RAHAT scheme',
  'MACT claim',
  'MACT compensation calculation',
  'motor accident compensation formula',
  'FIR after road accident India',
]

// Generated into public/ by scripts/gen-og-image.ts (see prebuild).
const OG_IMAGE = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} — help after a road accident in India`,
}

type PageMeta = {
  /** Page title, usually the page H1. Not including the site name. */
  title: string
  /** Meta description, roughly 140-160 characters. */
  description: string
  /** Route path with leading and trailing slash, e.g. '/documents/'. Use '/' for the homepage. */
  path: string
}

/**
 * Builds a complete Metadata object for a route. openGraph and twitter are
 * shallow-merged by Next (a page that sets them replaces the layout's), so every
 * page needs the full object, not just the fields that differ.
 */
export function pageMetadata({ title, description, path }: PageMeta): Metadata {
  const isHome = path === '/'
  const fullTitle = isHome ? title : `${title}: ${SITE_NAME}`
  const url = new URL(path, SITE_URL).toString()

  return {
    title: fullTitle,
    description,
    keywords: KEYWORDS,
    alternates: {
      canonical: path,
      // One URL serves both languages (toggled client-side), so the hreflang
      // alternates point back at the same page.
      languages: { 'en-IN': path, 'hi-IN': path, 'x-default': path },
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_IN',
      alternateLocale: ['hi_IN'],
      url,
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
  }
}

export { DEFAULT_DESCRIPTION, OG_IMAGE, KEYWORDS }
