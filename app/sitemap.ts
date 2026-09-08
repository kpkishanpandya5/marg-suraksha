import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

// Emit a static file for `output: export`.
export const dynamic = 'force-static'

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>

// Every route, most-important first. Paths carry a trailing slash to match
// next.config trailingSlash: true (and so the canonical URLs line up).
const ROUTES: Array<{ path: string; changeFrequency: ChangeFrequency; priority: number }> = [
  { path: '/', changeFrequency: 'monthly', priority: 1 },
  { path: '/just-happened/', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/first-72-hours/', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/documents/', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/compensation/', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/mact-claim/', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/cashless-treatment/', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/insurance/', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/grief/', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/help-near-me/', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/numbers/', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/data/', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/updates/', changeFrequency: 'daily', priority: 0.5 },
  { path: '/about/', changeFrequency: 'yearly', priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified,
    changeFrequency,
    priority,
  }))
}
