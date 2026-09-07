import Link from 'next/link'
import T from '@/components/T'
import LangToggle from '@/components/LangToggle'
import { SITE_NAME, SITE_NAME_DEVANAGARI } from '@/lib/site'

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
          <span className="lang-en">{SITE_NAME}</span>
          <span lang="hi" className="lang-hi">{SITE_NAME_DEVANAGARI}</span>
        </Link>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <Link href="/just-happened"><T k="nav.justHappened" /></Link>
          <Link href="/first-72-hours"><T k="nav.first72Hours" /></Link>
          <Link href="/documents"><T k="nav.documents" /></Link>
          <Link href="/compensation"><T k="nav.compensation" /></Link>
          <Link href="/cashless-treatment"><T k="nav.cashless" /></Link>
          <Link href="/insurance"><T k="nav.insurance" /></Link>
          <Link href="/grief"><T k="nav.grief" /></Link>
          <Link href="/help-near-me"><T k="nav.helpNearMe" /></Link>
          <Link href="/numbers"><T k="nav.numbers" /></Link>
          <Link href="/data"><T k="nav.data" /></Link>
          <Link href="/updates"><T k="nav.updates" /></Link>
          <Link href="/about"><T k="nav.about" /></Link>
        </div>
        <div className="ml-auto">
          <LangToggle />
        </div>
      </div>
    </nav>
  )
}
