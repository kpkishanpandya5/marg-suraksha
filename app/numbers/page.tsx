import helplinesData from '@/content/data/helplines.json'
import PrintButton from '@/components/PrintButton'
import T from '@/components/T'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'All helpline numbers',
  description:
    'Helpline numbers for after a road accident in India: 112 emergency, 108 ambulance, 14555 for cashless treatment problems, and NALSA 15100 for free legal aid.',
  path: '/numbers/',
})

export default function NumbersPage() {
  return (
    <div className="max-prose">
      <h1 className="text-2xl font-semibold mb-2"><T k="numbers.title" /></h1>
      <p className="text-[#6B7280] mb-2">
        <T k="numbers.intro" />
      </p>
      <div className="mb-8 no-print">
        <PrintButton label="Print this page" />
      </div>

      <div className="space-y-6">
        {helplinesData.map((h) => (
          <div key={h.id} className="border-b border-[#E5E7EB] pb-6">
            <div className="flex items-baseline gap-4 mb-1">
              <a
                href={`tel:${h.number}`}
                className="text-3xl font-bold text-[#1D4ED8] no-underline"
                aria-label={`Call ${h.number}`}
              >
                {h.number}
              </a>
            </div>
            <p className="font-semibold mb-1">{h.whatItIsFor}</p>
            <p className="text-[#6B7280] text-sm mb-2">{h.whenToUse}</p>
            <p className="text-xs text-[#6B7280]">
              Source:{' '}
              <a href={h.sourceUrl} target="_blank" rel="noopener noreferrer">
                {h.sourceUrl}
              </a>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 border border-[#E5E7EB] p-4">
        <p className="font-semibold mb-1">Other useful contacts</p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>
            <strong>District Legal Services Authority (DLSA)</strong> — for free
            legal aid. Search online for your district&apos;s DLSA number.
          </li>
          <li>
            <strong>National Legal Services Authority (NALSA)</strong> —{' '}
            <a
              href="tel:15100"
              aria-label="Call NALSA at 15100"
              className="inline-flex items-center min-h-[44px] px-1 -my-2 font-semibold no-underline"
            >
              15100
            </a>
          </li>
          <li>
            <strong>Motor Vehicles Accident Claims Portal</strong>{' '}
            <a href="https://mact.hcnlservices.in/" target="_blank" rel="noopener noreferrer">
              mact.hcnlservices.in
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
