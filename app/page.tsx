import Link from 'next/link'
import { t } from '@/lib/i18n'
import { SITE_NAME_DEVANAGARI } from '@/lib/site'

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6 py-8">
      <div>
        <h1 className="text-2xl font-semibold text-[#1A1A1A]">
          After a road accident in India
        </h1>
        <p className="text-[#6B7280] mt-1" lang="hi">
          {SITE_NAME_DEVANAGARI}
        </p>
      </div>
      <p className="text-[#6B7280] max-prose">
        Choose what applies to your situation.
      </p>

      <div className="flex flex-col gap-4">
        <Link
          href="/first-72-hours"
          className="block border-2 border-[#1D4ED8] bg-[#1D4ED8] text-white no-underline px-6 py-6 hover:bg-[#1e40af]"
          style={{ textDecoration: 'none' }}
        >
          <span className="block text-xl font-semibold mb-1">
            {t('home.primaryAction')}
          </span>
          <span className="block text-sm opacity-90">
            {t('home.primarySub')}
          </span>
        </Link>

        <Link
          href="/compensation"
          className="block border-2 border-[#1A1A1A] text-[#1A1A1A] no-underline px-6 py-6 hover:bg-[#f0f0f0]"
          style={{ textDecoration: 'none' }}
        >
          <span className="block text-xl font-semibold mb-1">
            {t('home.secondaryAction')}
          </span>
          <span className="block text-sm text-[#6B7280]">
            {t('home.secondarySub')}
          </span>
        </Link>
      </div>

      <nav aria-label="Quick links" className="mt-4">
        <p className="text-sm text-[#6B7280] mb-2">Other sections</p>
        <ul className="flex flex-col gap-1 text-sm list-none p-0 m-0">
          <li><Link href="/documents">{t('nav.documents')}</Link></li>
          <li><Link href="/cashless-treatment">{t('nav.cashless')}</Link></li>
          <li><Link href="/insurance">{t('nav.insurance')}</Link></li>
          <li><Link href="/grief">{t('nav.grief')}</Link></li>
          <li><Link href="/help-near-me">{t('nav.helpNearMe')}</Link></li>
          <li><Link href="/numbers">{t('nav.numbers')}</Link></li>
          <li><Link href="/data">{t('nav.data')}</Link></li>
        </ul>
      </nav>

      <aside className="mt-10 pt-6 border-t border-[#E5E7EB] max-prose">
        <p className="text-[#1A1A1A]">
          If you found this page by chance rather than by need, and the people you
          love are all still well, tell them so today. Nobody has ever regretted
          saying it.
        </p>
      </aside>
    </div>
  )
}
