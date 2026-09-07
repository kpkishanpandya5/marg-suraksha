import Link from 'next/link'
import T from '@/components/T'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'It just happened',
  description:
    'A brief orientation for right after a road accident in India: call 112, get to a hospital designated for cashless treatment, and say the words "road accident case".',
  path: '/just-happened/',
})

export default function JustHappenedPage() {
  return (
    <div className="max-prose">
      <h1 className="text-2xl font-semibold mb-4"><T k="justHappened.h1" /></h1>
      <p className="text-[#6B7280] mb-6">
        <T k="justHappened.intro" />
      </p>

      <div className="mb-8">
        <Link
          href="/first-72-hours"
          className="inline-block bg-[#1D4ED8] text-white no-underline px-5 py-3 font-semibold hover:bg-[#1e40af]"
          style={{ textDecoration: 'none' }}
        >
          Go to the first 72 hours checklist
        </Link>
      </div>

      <h2 className="text-lg font-semibold mb-3">The three most important things right now</h2>
      <ol className="list-decimal pl-6 space-y-3 mb-8">
        <li>
          <strong>Call 112.</strong> This is the national emergency number. It
          dispatches ambulances and can identify the nearest hospital that
          provides cashless treatment under the government scheme.
        </li>
        <li>
          <strong>Get to a designated hospital.</strong> Cashless treatment up to
          ₹1.5 lakh is available — but only at hospitals designated under the
          2025 scheme. Ask the hospital whether it is designated. If not, ask
          about transfer.
        </li>
        <li>
          <strong>Tell the hospital this is a road accident case.</strong> Use
          those exact words. This triggers the cashless treatment protocol and the
          police notification process.
        </li>
      </ol>

      <h2 className="text-lg font-semibold mb-3">Key numbers to know</h2>
      <ul className="list-disc pl-6 space-y-2 mb-8">
        <li><strong>112</strong> — National emergency (ambulance, police)</li>
        <li><strong>108</strong> — Ambulance in most states</li>
        <li><strong>14555</strong> — National Health Authority (cashless treatment problems)</li>
      </ul>

      <div className="border-l-4 border-[#1D4ED8] pl-4 py-2 mb-8">
        <p className="text-sm text-[#6B7280]">
          You are legally entitled to a free copy of the FIR immediately after it
          is recorded. You are entitled to cashless emergency treatment. You do not
          need to pay a lawyer — the District Legal Services Authority provides
          free legal help for road accident cases.
        </p>
      </div>

      <p>
        <Link href="/first-72-hours">
          Full step-by-step checklist for the first 72 hours
        </Link>
      </p>
      <p>
        <Link href="/numbers">All helpline numbers</Link>
      </p>
    </div>
  )
}
