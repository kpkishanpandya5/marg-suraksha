import Link from 'next/link'
import T from '@/components/T'
import { SITE_NAME, SITE_NAME_DEVANAGARI } from '@/lib/site'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: `${SITE_NAME} (${SITE_NAME_DEVANAGARI}): help after a road accident in India`,
  description:
    'What to do in the first 72 hours after a road accident in India: documents, cashless treatment, insurance, and compensation. सड़क दुर्घटना के बाद क्या करें: ज़रूरी दस्तावेज़, कैशलेस इलाज, बीमा और मुआवज़े का दावा।',
  path: '/',
})

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6 py-8">
      <div>
        <h1 className="text-2xl font-semibold text-[#1A1A1A]">
          <T k="home.h1" />
        </h1>
        <p className="text-[#6B7280] mt-1" lang="hi">
          {SITE_NAME_DEVANAGARI}
        </p>
      </div>
      <p className="text-[#6B7280] max-prose">
        <T k="home.intro" />
      </p>

      <div className="flex flex-col gap-4">
        <Link
          href="/first-72-hours"
          className="block border-2 border-[#1D4ED8] bg-[#1D4ED8] text-white no-underline px-6 py-6 hover:bg-[#1e40af]"
          style={{ textDecoration: 'none' }}
        >
          <T as="span" k="home.primaryAction" className="block text-xl font-semibold mb-1" />
          <T as="span" k="home.primarySub" className="block text-sm opacity-90" />
        </Link>

        <Link
          href="/compensation"
          className="block border-2 border-[#1A1A1A] text-[#1A1A1A] no-underline px-6 py-6 hover:bg-[#f0f0f0]"
          style={{ textDecoration: 'none' }}
        >
          <T as="span" k="home.secondaryAction" className="block text-xl font-semibold mb-1" />
          <T as="span" k="home.secondarySub" className="block text-sm text-[#6B7280]" />
        </Link>
      </div>

      <nav aria-label="Quick links" className="mt-4">
        <p className="text-sm text-[#6B7280] mb-2">
          <T k="nav.otherSections" />
        </p>
        <ul className="flex flex-col gap-1 text-sm list-none p-0 m-0">
          <li><Link href="/documents"><T k="nav.documents" /></Link></li>
          <li><Link href="/cashless-treatment"><T k="nav.cashless" /></Link></li>
          <li><Link href="/insurance"><T k="nav.insurance" /></Link></li>
          <li><Link href="/grief"><T k="nav.grief" /></Link></li>
          <li><Link href="/help-near-me"><T k="nav.helpNearMe" /></Link></li>
          <li><Link href="/numbers"><T k="nav.numbers" /></Link></li>
          <li><Link href="/data"><T k="nav.data" /></Link></li>
        </ul>
      </nav>

      <aside className="mt-10 pt-6 border-t border-[#E5E7EB] max-prose">
        <p className="text-[#1A1A1A] mb-3">
          <T k="home.asideLine1" />
        </p>
        <p className="text-[#1A1A1A]">
          <T k="home.asideLine2" />
        </p>
      </aside>
    </div>
  )
}
