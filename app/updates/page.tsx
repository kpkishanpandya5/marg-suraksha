import updatesData from '@/content/data/updates.json'
import { t } from '@/lib/i18n'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'Recent policy and rights news',
  description:
    'Recent policy news, court rulings, and rights updates on road accidents, compensation, and cashless treatment in India, drawn from Indian news sources.',
  path: '/updates/',
})

interface Article {
  title: string
  url: string
  domain: string
  language: string
  seendate: string
  sourcecountry: string
}

// The feed is third-party, so never emit a non-http href even if the JSON is edited by hand.
function isSafeHttpUrl(raw: string | undefined): boolean {
  if (!raw) return false
  try {
    const proto = new URL(raw).protocol
    return proto === 'http:' || proto === 'https:'
  } catch {
    return false
  }
}

function formatDate(seendate: string): string {
  // GDELT dates come as YYYYMMDDTHHmmssZ
  if (!seendate) return ''
  try {
    const y = seendate.slice(0, 4)
    const m = seendate.slice(4, 6)
    const d = seendate.slice(6, 8)
    return `${y}-${m}-${d}`
  } catch {
    return seendate
  }
}

export default function UpdatesPage() {
  const articles = ((updatesData.articles || []) as Article[]).filter((a) =>
    isSafeHttpUrl(a.url)
  )

  return (
    <div className="max-prose">
      <h1 className="text-2xl font-semibold mb-2">{t('updates.title')}</h1>
      <p className="text-[#6B7280] mb-2">
        Policy news, court rulings, and rights updates from Indian sources.
        Fetched from GDELT at build time.
      </p>
      {updatesData.fetchedAt && (
        <p className="text-xs text-[#6B7280] mb-6">
          Last fetched: {new Date(updatesData.fetchedAt).toLocaleDateString('en-IN')}
        </p>
      )}

      {articles.length === 0 ? (
        <div className="border-l-4 border-[#E5E7EB] pl-4 py-3">
          <p className="text-[#6B7280] text-sm">
            Policy news is fetched nightly from the GDELT Project. No articles have been
            loaded yet. Check back after the first nightly build completes, or see{' '}
            <a href="https://morth.nic.in" target="_blank" rel="noopener noreferrer">
              morth.nic.in
            </a>{' '}
            and{' '}
            <a href="https://nha.gov.in" target="_blank" rel="noopener noreferrer">
              nha.gov.in
            </a>{' '}
            directly for the latest updates.
          </p>
        </div>
      ) : (
        <ul className="list-none p-0 space-y-6">
          {articles.map((article, i) => (
            <li key={i} className="border-b border-[#E5E7EB] pb-5">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold block mb-1"
              >
                {article.title}
              </a>
              <p className="text-sm text-[#6B7280]">
                {article.domain}
                {article.seendate && ` · ${formatDate(article.seendate)}`}
                {article.language && article.language !== 'English' && ` · ${article.language}`}
              </p>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-8 text-sm text-[#6B7280]">
        Source: GDELT Project DOC 2.0 API. Articles filtered to policy, legal,
        and scheme-related content only. Incident-specific reporting is excluded.
      </p>
    </div>
  )
}
