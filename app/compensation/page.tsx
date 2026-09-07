import Link from 'next/link'
import { t } from '@/lib/i18n'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'Claiming compensation',
  description:
    'How to claim compensation after a road accident in India through the Motor Accidents Claims Tribunal (MACT) and the hit-and-run Solatium Fund, with free legal aid from the DLSA.',
  path: '/compensation/',
})

export default function CompensationPage() {
  return (
    <div className="max-prose">
      <h1 className="text-2xl font-semibold mb-2">{t('compensation.title')}</h1>
      <p className="text-[#6B7280] mb-8">
        There are two separate routes for compensation after a road accident in
        India. Both can run in parallel.
      </p>

      <section className="mb-10" aria-labelledby="mact-heading">
        <h2 id="mact-heading" className="text-xl font-semibold mb-3">
          Motor Accidents Claims Tribunal (MACT)
        </h2>
        <p className="mb-3">
          MACT is the main route for compensation from the vehicle owner's
          insurance. You do not need to hire a lawyer — the District Legal Services
          Authority (DLSA) provides free legal help for this.
        </p>
        <h3 className="font-semibold mb-2">What you can claim</h3>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li>Medical expenses (current and future)</li>
          <li>Loss of income during treatment</li>
          <li>Permanent disability compensation</li>
          <li>In death cases: loss of dependency for the family</li>
          <li>Funeral expenses</li>
          <li>Pain and suffering</li>
        </ul>
        <h3 className="font-semibold mb-2">How to file</h3>
        <ol className="list-decimal pl-6 space-y-2 mb-4">
          <li>
            Collect the FIR, MLC, Form-I, Form-XII, and the eDAR Victim ID first.
            See <Link href="/documents">the documents page</Link>.
          </li>
          <li>
            Visit the MACT tribunal for your district, or contact the DLSA and ask
            for free legal help to file a claim.
          </li>
          <li>
            The claim form asks for the victim's age, occupation, income, and the
            circumstances of the accident. The tribunal determines compensation.
          </li>
          <li>
            There is no strict deadline, but file as soon as you can. Claims filed
            many years after the accident are harder to prove.
          </li>
        </ol>
        <p className="text-sm text-[#6B7280]">
          Source:{' '}
          <a href="https://mact.hcnlservices.in/" target="_blank" rel="noopener noreferrer">
            mact.hcnlservices.in
          </a>
        </p>
      </section>

      <hr className="border-[#E5E7EB] mb-8" />

      <section className="mb-10" aria-labelledby="hitrun-heading">
        <h2 id="hitrun-heading" className="text-xl font-semibold mb-3">
          Hit-and-run cases (untraced vehicle)
        </h2>
        <p className="mb-3">
          If the vehicle cannot be identified or traced, you can still claim
          compensation from the government's Solatium Fund.
        </p>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li>
            <strong>Death:</strong> ₹2 lakh
          </li>
          <li>
            <strong>Grievous injury:</strong> ₹50,000
          </li>
        </ul>
        <p className="mb-3">
          To claim, contact the Claims Enquiry Officer at the District Collector's
          office or any police station. File within six months of the accident.
        </p>
        <p className="text-sm text-[#6B7280]">
          Source:{' '}
          <a href="https://mact.hcnlservices.in/" target="_blank" rel="noopener noreferrer">
            mact.hcnlservices.in
          </a>
        </p>
      </section>

      <hr className="border-[#E5E7EB] mb-8" />

      <section className="mb-8" aria-labelledby="free-legal-heading">
        <h2 id="free-legal-heading" className="text-xl font-semibold mb-3">
          Free legal aid
        </h2>
        <p className="mb-3">
          You do not need to spend money on a lawyer to file a MACT claim. The
          District Legal Services Authority (DLSA) in your district provides free
          lawyers for road accident cases.
        </p>
        <p>
          Find your DLSA:{' '}
          <Link href="/help-near-me">Help near me</Link>
        </p>
      </section>
    </div>
  )
}
