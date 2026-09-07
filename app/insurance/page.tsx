import Link from 'next/link'
import T from '@/components/T'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'Insurance schemes you may already have',
  description:
    'Government and bank-linked insurance that often pays out after a road accident in India: PMSBY, PMJJBY, Jan Dhan cover, and how to trace policies you did not know about.',
  path: '/insurance/',
})

export default function InsurancePage() {
  return (
    <div className="max-prose">
      <h1 className="text-2xl font-semibold mb-2"><T k="insurance.title" /></h1>
      <p className="text-[#6B7280] mb-8">
        <T k="insurance.intro" />
      </p>

      <section className="mb-10" aria-labelledby="pmsby-heading">
        <h2 id="pmsby-heading" className="text-xl font-semibold mb-3">
          Pradhan Mantri Suraksha Bima Yojana (PMSBY)
        </h2>
        <p className="mb-3">
          PMSBY is an accidental death and disability insurance scheme run by the Government of
          India. If the deceased or injured person held a savings bank account and had opted into
          PMSBY (which many banks enrol customers into automatically), there may be a valid claim.
        </p>

        <dl className="space-y-4 mt-4">
          <div>
            <dt className="font-semibold">What it covers</dt>
            <dd className="mt-1 text-[#1A1A1A]">
              ₹2 lakh for accidental death or total permanent disability. ₹1 lakh for partial
              permanent disability (loss of one eye, one hand, or one foot).
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Who is eligible</dt>
            <dd className="mt-1 text-[#1A1A1A]">
              Savings bank account holders aged 18 to 70 who opted in. The scheme renews annually
              and the premium is debited from the account automatically.
            </dd>
          </div>
          <div>
            <dt className="font-semibold">How to check if the person was enrolled</dt>
            <dd className="mt-1 text-[#1A1A1A]">
              Visit any branch of the bank where the person held a savings account. Ask whether PMSBY
              was active on the account. Bring a copy of the passbook or account number. The bank
              can confirm enrollment and provide the claim form.
            </dd>
          </div>
          <div>
            <dt className="font-semibold">How to claim</dt>
            <dd className="mt-1 text-[#1A1A1A]">
              Collect the PMSBY claim form from the bank. Submit it with: the FIR, the post-mortem
              report (in death cases) or the disability certificate (in injury cases), and the death
              certificate (in death cases). The bank forwards the claim to the insurer.
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Time limit</dt>
            <dd className="mt-1 text-[#1A1A1A]">
              Claims should be submitted as soon as possible. Check with the bank for the specific
              deadline, as it may vary by insurer.
            </dd>
          </div>
        </dl>
        <p className="text-sm text-[#6B7280] mt-4">
          Source:{' '}
          <a
            href="https://jansuraksha.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            jansuraksha.gov.in
          </a>
        </p>
      </section>

      <section className="mb-10" aria-labelledby="pmjjby-heading">
        <h2 id="pmjjby-heading" className="text-xl font-semibold mb-3">
          Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)
        </h2>
        <p className="mb-3">
          PMJJBY is a life insurance scheme, not accident-specific, but it pays out on death from
          any cause including road accidents. If the deceased held a savings account and was enrolled,
          the family can claim.
        </p>
        <dl className="space-y-4 mt-4">
          <div>
            <dt className="font-semibold">What it covers</dt>
            <dd className="mt-1 text-[#1A1A1A]">₹2 lakh for death from any cause.</dd>
          </div>
          <div>
            <dt className="font-semibold">Who is eligible</dt>
            <dd className="mt-1 text-[#1A1A1A]">
              Savings account holders aged 18 to 50 who opted in. Renewable annually.
            </dd>
          </div>
          <div>
            <dt className="font-semibold">How to claim</dt>
            <dd className="mt-1 text-[#1A1A1A]">
              Visit the bank branch. Submit the claim form with the death certificate and FIR. The
              bank processes the claim through the linked insurer.
            </dd>
          </div>
        </dl>
        <p className="text-sm text-[#6B7280] mt-4">
          Source:{' '}
          <a
            href="https://jansuraksha.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            jansuraksha.gov.in
          </a>
        </p>
      </section>

      <section className="mb-10" aria-labelledby="bank-schemes-heading">
        <h2 id="bank-schemes-heading" className="text-xl font-semibold mb-3">
          Bank-linked accident insurance on savings accounts
        </h2>
        <p className="mb-3">
          Several public sector banks offer accident insurance as a benefit on specific savings
          account products — separate from PMSBY. These are sometimes bundled with zero-balance
          accounts (Jan Dhan accounts under PMJDY), salary accounts, or premium savings accounts.
          The coverage amount and conditions differ by bank and account type.
        </p>
        <p className="mb-3">
          To check whether the deceased or injured person had this coverage, visit the bank branch
          with the account details and ask specifically: "Does this account have any accident
          insurance benefit?" Do not assume the bank will volunteer this information — ask directly.
        </p>
        <p className="mb-3">
          For Jan Dhan (PMJDY) accounts specifically: the scheme has included accident insurance
          with the RuPay debit card. Check whether the account had an active RuPay card and whether
          the card was used in the 90 days before the accident — this is often a condition of
          eligibility.
        </p>
        <div className="border-l-4 border-[#E5E7EB] pl-4 py-2">
          <p className="text-sm text-[#6B7280]">
            The specific terms (coverage amount, eligibility conditions, claim process) vary by
            bank, account product, and year of account opening. This page gives general guidance.
            Verify the specific terms with the bank branch before assuming a claim exists or does
            not exist.
          </p>
        </div>
      </section>

      <section className="mb-10" aria-labelledby="finding-heading">
        <h2 id="finding-heading" className="text-xl font-semibold mb-3">
          How to find policies you did not know about
        </h2>
        <p className="mb-3">
          Families often discover months later that a policy existed and the claim window has
          closed. People rarely tell their family about every policy they hold, and premiums are
          usually debited automatically without anyone noticing. It is worth spending an hour
          looking, even if you are fairly sure there was nothing.
        </p>

        <div className="space-y-5 mt-5">
          <div>
            <h3 className="font-semibold mb-1">Go through their SMS inbox</h3>
            <p>
              Insurers and banks send premium debit alerts, renewal reminders, and policy
              confirmations by SMS. Search the messages for policy, premium, insurance, renewal,
              LIC, and insurer names. These messages usually carry a policy number, which is all
              you need to start a claim.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-1">Go through their email</h3>
            <p>
              Search for the same words. Insurers email annual statements and renewal notices, and
              these often survive in an inbox long after the paper document has been lost. Check
              the spam and promotions folders too.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-1">Go through bank statements</h3>
            <p>
              This is the most reliable method. Pull twelve to eighteen months of statements for
              every account and look for recurring debits to an insurer. A small annual debit of a
              few hundred rupees is easy to overlook but often means an active policy. PMSBY and
              PMJJBY premiums show up exactly this way. Note the precise name on the debit line,
              because that identifies the insurer.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-1">Ask the bank directly</h3>
            <p>
              Visit the branch with the death certificate and account details. Ask them to check
              for insurance linked to the account, any policy sold through the branch, and any
              cover attached to a debit or credit card. Banks sell insurance on behalf of insurers,
              so the branch often holds records that appear nowhere else. Ask them to check every
              account the person held, not only the main one.
            </p>
          </div>
        </div>

        <div className="border-l-4 border-[#E5E7EB] pl-4 py-2 mt-5">
          <p className="text-sm text-[#6B7280]">
            If you find a policy number but cannot work out which insurer it belongs to, the
            Insurance Regulatory and Development Authority of India (IRDAI) runs a grievance
            service that can help trace it.
          </p>
        </div>
      </section>

      <section className="mb-10" aria-labelledby="employer-heading">
        <h2 id="employer-heading" className="text-xl font-semibold mb-3">
          Employer-provided insurance
        </h2>
        <p className="mb-3">
          If the injured or deceased person was employed, check whether the employer provided a
          group accident insurance policy. This is common in organised-sector jobs and government
          service. Ask the employer's HR department directly.
        </p>
        <p>
          For government employees and their dependents, Employees' State Insurance (ESI) may
          also apply. Contact the nearest ESI office or ask the employer.
        </p>
      </section>

      <section className="mb-8" aria-labelledby="order-heading">
        <h2 id="order-heading" className="text-xl font-semibold mb-3">
          These claims do not affect your MACT compensation
        </h2>
        <p>
          Insurance payouts under PMSBY, PMJJBY, or bank schemes are separate from the
          compensation claim through the Motor Accident Claims Tribunal (MACT). Receiving an
          insurance payout does not disqualify you from MACT compensation. Pursue both.
        </p>
        <p className="mt-3">
          <Link href="/compensation">
            Read about MACT compensation
          </Link>
        </p>
      </section>
    </div>
  )
}
