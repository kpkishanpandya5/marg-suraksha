import Link from 'next/link'
import T from '@/components/T'
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
      <h1 className="text-2xl font-semibold mb-2"><T k="compensation.title" /></h1>
      <p className="text-[#6B7280] mb-6">
        <T k="compensation.intro" />
      </p>

      <div className="border-l-4 border-[#1D4ED8] pl-4 py-2 mb-8">
        <p className="text-[#1A1A1A]">
          Compensation at MACT is a fixed calculation, not a negotiation. One missing step in
          that calculation cost one family about ₹16 lakh.{' '}
          <Link href="/mact-claim">
            See how compensation is worked out, and what a lawyer can charge
          </Link>
          .
        </p>
      </div>

      <section className="mb-10" aria-labelledby="mact-heading">
        <h2 id="mact-heading" className="text-xl font-semibold mb-3">
          Motor Accidents Claims Tribunal (MACT)
        </h2>
        <p className="mb-3">
          MACT is the main route for compensation from the vehicle owner&apos;s
          insurance. You may not need to pay a lawyer: free legal aid is available if you
          qualify, and most families do (see below).
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
            The claim form asks for the victim&apos;s age, occupation, income, and the
            circumstances of the accident. The tribunal determines compensation using a fixed
            formula. See <Link href="/mact-claim">how compensation is worked out</Link>.
          </li>
          <li>
            File within six months of the accident if you possibly can. If longer has passed,
            file anyway and say why you were delayed. Do not assume you are out of time.
          </li>
        </ol>
        <p className="text-sm text-[#6B7280]">
          Source:{' '}
          <a
            href="https://mact.hcnlservices.in/forms/acts/MV_1988.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Motor Vehicles Act, 1988, section 166
          </a>{' '}
          &middot;{' '}
          <a
            href="https://static.pib.gov.in/WriteReadData/specificdocs/documents/2022/feb/doc202222720401.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gazette S.O. 859(E), 25 February 2022
          </a>{' '}
          &middot;{' '}
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
          Being a road accident victim is not, by itself, a ground for free legal aid. But most
          families qualify on another ground: any woman, any child, a person with a disability, a
          member of a Scheduled Caste or Scheduled Tribe, or anyone whose annual income is below
          the state limit (₹3,00,000 in most states). A widow claiming for her husband qualifies
          as a woman, with no income test.
        </p>
        <p className="mb-3">
          Free legal aid covers the lawyer, the filing and the process fees, during the case and
          after it. <Link href="/mact-claim">How to apply, and what a lawyer can charge you.</Link>
        </p>
        <p className="mb-3 text-sm text-[#6B7280]">
          Source:{' '}
          <a
            href="https://www.indiacode.nic.in/bitstream/123456789/19023/1/legal_service_authorities_act,_1987.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Legal Services Authorities Act, 1987, section 12
          </a>{' '}
          &middot;{' '}
          <a href="https://nalsa.gov.in/legal-aid/" target="_blank" rel="noopener noreferrer">
            NALSA, Legal Aid
          </a>
        </p>
        <p>
          Find your DLSA:{' '}
          <Link href="/help-near-me">Help near me</Link>
        </p>
      </section>
    </div>
  )
}
