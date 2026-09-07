import Link from 'next/link'
import T from '@/components/T'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'Cashless treatment scheme (2025)',
  description:
    'Road accident victims in India can get cashless emergency treatment up to Rs 1.5 lakh for 7 days at designated hospitals, regardless of fault or insurance. How to use it and what to do if refused.',
  path: '/cashless-treatment/',
})

export default function CashlessTreatmentPage() {
  return (
    <div className="max-prose">
      <h1 className="text-2xl font-semibold mb-2"><T k="cashless.title" /></h1>
      <p className="text-[#6B7280] mb-6">
        <T k="cashless.intro" />
      </p>

      <section className="mb-8" aria-labelledby="what-heading">
        <h2 id="what-heading" className="text-xl font-semibold mb-3">What the scheme covers</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Emergency treatment up to <strong>₹1.5 lakh</strong></li>
          <li>Treatment for up to <strong>7 days</strong> from the date of the accident</li>
          <li>Available at hospitals <strong>designated under the scheme</strong> only</li>
          <li>No upfront payment required from the victim or family</li>
          <li>Covers all road accident victims — pedestrians, passengers, and drivers</li>
        </ul>
      </section>

      <section className="mb-8" aria-labelledby="find-hospital-heading">
        <h2 id="find-hospital-heading" className="text-xl font-semibold mb-3">How to find a designated hospital</h2>
        <p className="mb-3">
          Not every hospital is designated under the scheme. The fastest way to find one is to
          call <strong>112</strong> — the operator can identify the nearest designated hospital
          and dispatch an ambulance.
        </p>
        <p className="mb-3">
          You can also check the National Health Authority portal at{' '}
          <a href="https://nha.gov.in" target="_blank" rel="noopener noreferrer">nha.gov.in</a>.
          Search for "designated hospitals cashless road accident" on that site to find the
          current list for your area. The list is maintained by the State Road Safety Council
          in each state and may be updated periodically.
        </p>
        <p className="mb-3">
          If you are already at a non-designated hospital, the hospital must at minimum provide
          stabilisation. Ask for a transfer to the nearest designated hospital after stabilisation.
        </p>
      </section>

      <section className="mb-8" aria-labelledby="how-heading">
        <h2 id="how-heading" className="text-xl font-semibold mb-3">How to use it</h2>
        <ol className="list-decimal pl-6 space-y-3">
          <li>
            <strong>Get to a designated hospital.</strong> Call 112 — they can
            identify the nearest designated hospital. Not every hospital is
            designated. If the nearest hospital is not on the list, ask whether
            the patient can be stabilised and transferred.
          </li>
          <li>
            <strong>Tell the hospital staff this is a road accident case.</strong>{' '}
            Use those exact words. This triggers the cashless treatment protocol.
          </li>
          <li>
            <strong>The hospital requests the eDAR Victim ID from police.</strong>{' '}
            This ID links the treatment record to the accident case. The hospital
            is responsible for initiating this — you do not need to do it yourself,
            but it helps to know it must happen.
          </li>
          <li>
            <strong>Treatment begins immediately.</strong> In life-threatening
            cases, treatment must start before any documents are checked.
          </li>
        </ol>
      </section>

      <section className="mb-8" aria-labelledby="refusal-heading">
        <h2 id="refusal-heading" className="text-xl font-semibold mb-3">If the hospital refuses</h2>
        <p className="mb-3">
          A designated hospital cannot legally refuse cashless treatment to a road
          accident victim. If you are refused:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Ask to speak to the medical superintendent immediately.</li>
          <li>
            Call <strong>14555</strong> — the National Health Authority helpline
            for grievances about this scheme.
          </li>
          <li>
            Call <strong>112</strong> and report the refusal.
          </li>
        </ol>
      </section>

      <section className="mb-8" aria-labelledby="after-heading">
        <h2 id="after-heading" className="text-xl font-semibold mb-3">After the 7-day period</h2>
        <p className="mb-3">
          The cashless scheme covers emergency treatment for 7 days. After that,
          the family is responsible for ongoing treatment costs — but you can
          include these in a compensation claim through the MACT tribunal.
        </p>
        <p>
          See <Link href="/compensation">the compensation page</Link>{' '}
          for how to claim ongoing costs.
        </p>
      </section>

      <section className="mb-4" aria-labelledby="source-heading">
        <h2 id="source-heading" className="text-xl font-semibold mb-3">Sources</h2>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li>
            <a
              href="https://cdnbbsr.s3waas.gov.in/s3250413d2982f1f83aa62a3a323cd2a87/uploads/2025/05/202505151230594664.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              MoRTH / NHA scheme guidelines (May 2025)
            </a>
          </li>
          <li>National Health Authority helpline: 14555</li>
        </ul>
      </section>
    </div>
  )
}
