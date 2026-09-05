import Link from 'next/link'
import { t } from '@/lib/i18n'
import { SITE_NAME } from '@/lib/site'

export default function Nav() {
  return (
    <nav
      className="border-b border-[#E5E7EB] bg-[#FAFAFA] no-print"
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-4xl px-4 py-3 flex flex-wrap gap-x-6 gap-y-2 items-center">
        <Link
          href="/"
          className="font-semibold text-[#1A1A1A] no-underline mr-4 shrink-0"
          style={{ textDecoration: 'none' }}
        >
          {SITE_NAME}
        </Link>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <Link href="/just-happened">{t('nav.justHappened')}</Link>
          <Link href="/first-72-hours">{t('nav.first72Hours')}</Link>
          <Link href="/documents">{t('nav.documents')}</Link>
          <Link href="/compensation">{t('nav.compensation')}</Link>
          <Link href="/cashless-treatment">{t('nav.cashless')}</Link>
          <Link href="/insurance">{t('nav.insurance')}</Link>
          <Link href="/grief">{t('nav.grief')}</Link>
          <Link href="/help-near-me">{t('nav.helpNearMe')}</Link>
          <Link href="/numbers">{t('nav.numbers')}</Link>
          <Link href="/data">{t('nav.data')}</Link>
          <Link href="/updates">{t('nav.updates')}</Link>
          <Link href="/about">{t('nav.about')}</Link>
        </div>
      </div>
    </nav>
  )
}
