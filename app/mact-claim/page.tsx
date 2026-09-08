import type { ReactNode } from 'react'
import Link from 'next/link'
import T from '@/components/T'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'How MACT compensation is worked out',
  description:
    'MACT compensation is a fixed calculation, not a negotiation. The formula step by step, a worked example (₹48-50 lakh, or ₹32 lakh if one step is missed), what a lawyer may and may not charge, and free legal aid.',
  path: '/mact-claim/',
})

const src = {
  pranaySethi: 'https://aphc.gov.in/docs/imp_judgements/PRANAY%20SETHI%20AND%20ORS.pdf',
  sarlaVerma: 'https://mact.hcnlservices.in/forms/judgements/sarla.pdf',
  sidram: 'https://mact.hcnlservices.in/forms/judgements/sidram.pdf',
  kirti: 'https://indiankanoon.org/doc/106405133/',
  pathmavathi:
    'https://www.livelaw.in/pdf_upload/2026/03/16/2026-livelaw-sc-132-v-pathmavathi-v-bharthi-axa-general-insurance-co-ltd-6-feb-2026-661821.pdf',
  sameemBegum:
    'https://www.verdictum.in/pdf_upload/2026/08/17/sameem-begum-v-k-venkat-swamy-1782663.pdf',
  bhagatSinghRawat: 'https://www.lawweb.in/2024/12/supreme-court-compensation-for-loss-of.html',
  bSunitha:
    'https://images.assettype.com/barandbench/import/2017/12/B-Sunitha-v.-State-of-Telengana-judgment.pdf',
  suspension2025:
    'https://www.livelaw.in/pdf_upload/29609202531962509order21-jul-2025-1-644035.pdf',
  himalayanCoop: 'https://indiankanoon.org/doc/131435358/',
  goharMohammed: 'https://mact.hcnlservices.in/forms/judgements/jud_4.pdf',
  magma: 'https://mact.hcnlservices.in/forms/judgements/magma.pdf',
  bciRules: 'https://www.barcouncilofindia.org/info/rules-on-an-advocates-duty-towards-the-client',
  bciFullText: 'https://barcouncilkerala.org/professional-etiquette',
  mvAct: 'https://mact.hcnlservices.in/forms/acts/MV_1988.pdf',
  lsaAct:
    'https://www.indiacode.nic.in/bitstream/123456789/19023/1/legal_service_authorities_act,_1987.pdf',
  advocatesAct:
    'https://www.indiacode.nic.in/bitstream/123456789/15341/1/advocate_1961.pdf',
  gazette2022:
    'https://static.pib.gov.in/WriteReadData/specificdocs/documents/2022/feb/doc202222720401.pdf',
  nalsaLegalAid: 'https://nalsa.gov.in/legal-aid/',
  lsamsApply: 'https://scourtapp.nic.in/lsams/',
  mactPortal: 'https://mact.hcnlservices.in/',
}

function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

function Src({ children }: { children: ReactNode }) {
  return <p className="text-sm text-[#6B7280] mt-2">Source: {children}</p>
}

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b-2 border-[#1A1A1A]">
            {head.map((h) => (
              <th key={h} className="text-left py-2 pr-4 font-semibold align-bottom">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]} className="border-b border-[#E5E7EB]">
              {r.map((c, ci) => (
                <td key={ci} className="py-2 pr-4">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function MactClaimPage() {
  return (
    <div className="max-prose">
      <h1 className="text-2xl font-semibold mb-2">
        <T k="mact.title" />
      </h1>
      <p className="text-[#6B7280] mb-6">
        <T k="mact.intro" />
      </p>

      <div className="border-l-4 border-[#1D4ED8] pl-4 py-2 mb-8">
        <p className="text-[#1A1A1A]">
          <strong>One missing step in the calculation cost one family about ₹16 lakh.</strong>{' '}
          A 35-year-old earning ₹25,000 a month, with three dependants, should receive roughly
          ₹48 to ₹50 lakh. If the tribunal leaves out the step called <em>future prospects</em>,
          the same case comes to about ₹32 lakh. The worked example below shows exactly where.
        </p>
      </div>

      <p className="mb-8">
        The Supreme Court has fixed the steps of the calculation, and the tribunal has to follow
        them. That matters to you for one reason: if you know roughly what the formula produces
        for your case, you know whether the number in front of you is fair. Without that, you are
        guessing, and the people across the table are not.
      </p>

      {/* ---------------------------------------------------------------- */}
      <section className="mb-10" aria-labelledby="formula-heading">
        <h2 id="formula-heading" className="text-xl font-semibold mb-3">
          The formula (death cases)
        </h2>
        <p className="mb-4">Five steps, in this order.</p>

        <h3 className="font-semibold mb-2">Step 1. Income</h3>
        <p className="mb-2">
          For a salaried person: the actual salary, less income tax. For someone self-employed or
          on a fixed wage: the established income, less tax.
        </p>
        <p className="mb-2">
          If there is no proof of income at all, the tribunal uses a notional income. You do not
          need documents for this. The Supreme Court has said the minimum wage of your state is
          the floor. This applies to homemakers too: running a household has an economic value
          and it is counted.
        </p>
        <Src>
          <A href={src.pranaySethi}>National Insurance Co. Ltd. v. Pranay Sethi, (2017) 16 SCC 680</A>{' '}
          &middot; <A href={src.kirti}>Kirti v. Oriental Insurance Co. Ltd., (2021) 2 SCC 166</A>{' '}
          &middot; <A href={src.sidram}>Sidram v. Divisional Manager, UIIC (2022)</A>
        </Src>
        <p className="mb-2 mt-4">
          <strong>If you have a salary certificate, produce it.</strong> In February 2026 the
          Supreme Court corrected a tribunal that had assessed a man&apos;s income at ₹6,000 a
          month when his salary certificate and his employer&apos;s affidavit both said otherwise.
          A court cannot pick a figure lower than your documents show without a reason.
        </p>
        <Src>
          <A href={src.pathmavathi}>
            V. Pathmavathi v. Bharti AXA General Insurance Co. Ltd. (6 February 2026)
          </A>
        </Src>

        <h3 className="font-semibold mb-2 mt-6">Step 2. Future prospects</h3>
        <p className="mb-2">
          The person would have earned more over their working life than on the day of the
          accident. A fixed percentage is added for this.
        </p>
        <Table
          head={['Age', 'Permanent job', 'Self-employed / fixed wage']}
          rows={[
            ['Under 40', 'add 50%', 'add 40%'],
            ['40 to 50', 'add 30%', 'add 25%'],
            ['50 to 60', 'add 15%', 'add 10%'],
            ['Over 60', 'nothing', 'nothing'],
          ]}
        />
        <p className="mb-2">
          <strong>This is not optional.</strong> The Supreme Court held in February 2026 that
          adding future prospects &quot;is not a matter of judicial discretion but a mandatory
          legal requirement.&quot; Tribunals still leave it out. If yours did, that alone is a
          ground of appeal. Future prospects also apply in injury cases where the injury caused
          permanent disability.
        </p>
        <Src>
          <A href={src.pranaySethi}>Pranay Sethi, para 61(iii)-(iv)</A> &middot;{' '}
          <A href={src.pathmavathi}>V. Pathmavathi (2026)</A> &middot;{' '}
          <A href={src.sidram}>Sidram (2022)</A>
        </Src>

        <h3 className="font-semibold mb-2 mt-6">Step 3. Deduct what the person spent on themselves</h3>
        <p className="mb-2">
          The family lost what the person contributed to the household, not the whole income. So
          a share is deducted for what they spent on themselves. If the person was married:
        </p>
        <Table
          head={['Dependants', 'Deduct']}
          rows={[
            ['2 or 3', 'one-third'],
            ['4 to 6', 'one-quarter'],
            ['More than 6', 'one-fifth'],
          ]}
        />
        <p className="mb-2">
          If the person was unmarried, 50% is normally deducted, and usually only the mother is
          counted as a dependant. If a large family depended on them, such as a widowed mother
          and younger non-earning brothers and sisters, the deduction can drop to one-third.
        </p>
        <Src>
          <A href={src.sarlaVerma}>
            Sarla Verma v. Delhi Transport Corporation, (2009) 6 SCC 121, paras 30-32
          </A>
        </Src>

        <h3 className="font-semibold mb-2 mt-6">Step 4. Multiply by the age figure</h3>
        <p className="mb-2">
          What is left is multiplied by a number fixed by the age of the person who died. It is
          their age that decides the multiplier, not the age of the family members claiming.
        </p>
        <Table
          head={['Age of the deceased', 'Multiplier']}
          rows={[
            ['Up to 15', '15'],
            ['15 to 25', '18'],
            ['26 to 30', '17'],
            ['31 to 35', '16'],
            ['36 to 40', '15'],
            ['41 to 45', '14'],
            ['46 to 50', '13'],
            ['51 to 55', '11'],
            ['56 to 60', '9'],
            ['61 to 65', '7'],
            ['66 to 70', '5'],
          ]}
        />
        <Src>
          <A href={src.sarlaVerma}>Sarla Verma, para 42</A> &middot;{' '}
          <A href={src.pranaySethi}>Pranay Sethi, para 61(vi)-(vii)</A>
        </Src>

        <h3 className="font-semibold mb-2 mt-6">Step 5. Add the fixed amounts</h3>
        <p className="mb-2">Three fixed heads are added on top:</p>
        <ul className="list-disc pl-6 space-y-1 mb-3">
          <li>
            <strong>Loss of estate</strong>
          </li>
          <li>
            <strong>Loss of consortium</strong>, the loss of the company and support of a
            husband, wife, parent or child
          </li>
          <li>
            <strong>Funeral expenses</strong>
          </li>
        </ul>
        <p className="mb-2">
          The Supreme Court set these at ₹15,000, ₹40,000 and ₹15,000 in 2017, and said they
          should rise by 10% every three years.
        </p>
        <p className="mb-2">
          <strong>
            The exact amounts today are unsettled, and you should know that before anyone quotes
            you a figure.
          </strong>{' '}
          Different courts apply the increase differently. In August 2026 the Supreme Court
          awarded ₹48,400 for consortium, the 2017 figure raised twice, but in the same judgment
          awarded the un-raised ₹15,000 for funeral expenses and ₹15,000 for loss of estate. So
          expect something in this range:
        </p>
        <Table
          head={['Head', '2017 figure', 'With two increases']}
          rows={[
            ['Loss of estate', '₹15,000', '₹18,150'],
            ['Loss of consortium', '₹40,000', '₹48,400'],
            ['Funeral expenses', '₹15,000', '₹18,150'],
          ]}
        />
        <p className="mb-2">
          There is a second open question. In August 2026 the Supreme Court awarded consortium{' '}
          <strong>separately to each family member</strong>: a widow and each of three children
          got ₹48,400 each. In March 2023 a different Supreme Court bench held the opposite, that
          the amount is a single total shared by the family. Both decisions stand. For a family
          of four this is a difference of about ₹1.45 lakh.
        </p>
        <p className="mb-2">
          If your tribunal takes the lower view on either point, that is arguable. It is not
          certain.
        </p>
        <Src>
          <A href={src.pranaySethi}>Pranay Sethi, para 61(viii)</A> &middot;{' '}
          <A href={src.sameemBegum}>
            Sameem Begum v. K. Venkat Swamy, 2026 INSC 864 (14 August 2026)
          </A>{' '}
          &middot;{' '}
          <A href={src.bhagatSinghRawat}>
            Shri Ram General Insurance Co. Ltd. v. Bhagat Singh Rawat (27 March 2023)
          </A>
        </Src>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="mb-10" aria-labelledby="example-heading">
        <h2 id="example-heading" className="text-xl font-semibold mb-3">
          A worked example
        </h2>
        <p className="mb-4">
          A man aged 35 dies in a road accident. He earned ₹25,000 a month in a permanent job. He
          leaves a wife and two children.
        </p>
        <ol className="list-decimal pl-6 space-y-3 mb-4">
          <li>
            <strong>Income.</strong> ₹25,000 &times; 12 = <strong>₹3,00,000 a year.</strong> At
            this level no income tax is payable, so nothing is deducted.
          </li>
          <li>
            <strong>Future prospects.</strong> Under 40, permanent job, so add 50%. ₹3,00,000 +
            ₹1,50,000 = <strong>₹4,50,000</strong>
          </li>
          <li>
            <strong>Personal expenses.</strong> Three dependants, so deduct one-third. ₹4,50,000
            &minus; ₹1,50,000 = <strong>₹3,00,000</strong>
          </li>
          <li>
            <strong>Multiplier.</strong> He was 35, so the multiplier is 16. ₹3,00,000 &times; 16
            = <strong>₹48,00,000</strong>
          </li>
          <li>
            <strong>Fixed heads.</strong> Three claimants.
            <ul className="list-disc pl-6 space-y-1 mt-1">
              <li>Higher view: consortium ₹48,400 &times; 3, plus estate ₹18,150, plus funeral ₹18,150</li>
              <li>Lower view: consortium ₹48,400 once, plus estate ₹15,000, plus funeral ₹15,000</li>
            </ul>
          </li>
        </ol>
        <div className="border border-[#E5E7EB] p-4 mb-4">
          <p className="mb-1">
            <strong>Higher view:</strong> 48,00,000 + (48,400 &times; 3) + 18,150 + 18,150 = about{' '}
            <strong>₹49,81,500</strong>
          </p>
          <p>
            <strong>Lower view:</strong> 48,00,000 + 48,400 + 15,000 + 15,000 = about{' '}
            <strong>₹48,78,400</strong>
          </p>
        </div>
        <p className="mb-2">So: roughly ₹48 to ₹50 lakh.</p>
        <p className="mb-2">
          <strong>If he had been self-employed instead</strong>, the addition at Step 2 would be
          40% rather than 50%, and the dependency figure at Step 4 would be ₹44,80,000 instead of
          ₹48,00,000.
        </p>
        <p className="mb-2">
          <strong>And this is what a mistake costs.</strong> If the tribunal leaves out future
          prospects, which happens often, Step 4 produces ₹32,00,000 instead of ₹48,00,000. That
          single omission is worth <strong>about ₹16 lakh</strong> in this example.
        </p>
        <p className="mb-4">
          Work through your own numbers this way before you accept anything. You do not need a
          lawyer to do the arithmetic.
        </p>
        <div className="border-l-4 border-[#E5E7EB] pl-4 py-2">
          <p className="text-sm text-[#6B7280]">
            <strong>A note on online calculators.</strong> We do not link any. Several exist,
            including some run by High Courts. We could not verify that any of them handles the
            two unsettled points above correctly, and a calculator that gives you one confident
            number is hiding a choice it has no clear basis to make. One official calculator we
            checked was on a test server and has since stopped working. Use the steps above
            instead.
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="mb-10" aria-labelledby="injury-heading">
        <h2 id="injury-heading" className="text-xl font-semibold mb-3">
          For injuries, not death
        </h2>
        <p className="mb-3">If the victim survived, the heads are different.</p>
        <h3 className="font-semibold mb-2">For money already spent or lost</h3>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li>Treatment, hospital, medicines, transport, special diet</li>
          <li>Earnings lost during treatment</li>
          <li>Future earnings lost because of permanent disability</li>
          <li>Future medical expenses</li>
          <li>Attendant charges, if you need someone to care for the injured person</li>
        </ul>
        <h3 className="font-semibold mb-2">For the harm itself</h3>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          <li>Pain, suffering and trauma</li>
          <li>Loss of amenities, what the person can no longer do</li>
          <li>Loss of expectation of life</li>
        </ul>
        <p className="mb-3">
          In a routine injury case, only treatment costs, lost earnings during treatment, and
          pain and suffering are awarded.{' '}
          <strong>
            The larger heads, future earnings, future medical expenses and loss of amenities,
            need a disability certificate and evidence from the treating doctor.
          </strong>{' '}
          Get both. Without them those heads are usually refused, and they are the big ones.
        </p>
        <p className="mb-3">
          Attendant charges are calculated the same way as income: monthly cost &times; 12
          &times; the multiplier. In one case the Supreme Court awarded ₹4,500 a month &times; 12
          &times; 18, after both the tribunal and the High Court had awarded nothing at all.
        </p>
        <Src>
          <A href={src.sidram}>
            Sidram v. Divisional Manager, United India Insurance Co. Ltd. (16 November 2022)
          </A>{' '}
          &middot; Raj Kumar v. Ajay Kumar, (2011) 1 SCC 343
        </Src>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="mb-10" aria-labelledby="fees-heading">
        <h2 id="fees-heading" className="text-xl font-semibold mb-3">
          What a lawyer can charge you
        </h2>
        <p className="mb-3">
          A lawyer may charge you a fee. A lawyer may not take a share of your compensation.
        </p>
        <p className="mb-3">
          This is not about the percentage being too high. <strong>Any</strong> percentage is
          barred: 5%, 10%, 40%, all the same. The rule bans the arrangement itself.
        </p>
        <p className="mb-2">The Bar Council of India puts it plainly on its own website:</p>
        <blockquote className="border-l-4 border-[#E5E7EB] pl-4 py-1 italic mb-2">
          &quot;An advocate should not charge for his services depending on the success of the
          matter undertaken. He also shall not charge for his services as a percentage of the
          amount or property received after the success of the matter.&quot;
        </blockquote>
        <Src>
          <A href={src.bciRules}>
            Bar Council of India, Rules on an Advocate&apos;s Duty Towards the Client, item 10
          </A>
        </Src>
        <p className="mb-2 mt-3">
          The formal rule is Rule 20 of Part VI, Chapter II, Section II of the Bar Council of
          India Rules: <em>
            &quot;An advocate shall not stipulate for a fee contingent on the results of
            litigation or agree to share the proceeds thereof.&quot;
          </em>
        </p>
        <Src>
          <A href={src.bciFullText}>Bar Council of India Rules, Part VI Chapter II, full text</A>
        </Src>

        <h3 className="font-semibold mb-2 mt-6">This has been decided in a motor accident case</h3>
        <p className="mb-3">
          A woman&apos;s husband died in a road accident in 1998. She claimed at MACT through an
          advocate. The tribunal awarded compensation. She paid him ₹10 lakh in fees.
        </p>
        <p className="mb-3">
          He then made her sign a cheque for another ₹3 lakh, though she told him she had no
          money in the account. He emailed her saying his fee was 16% of what she had received.
          When the cheque bounced, he prosecuted her criminally.
        </p>
        <p className="mb-3">
          The Supreme Court threw out his case in 2017. It held that a fee claimed as a
          percentage of the award is against public policy and is serious professional
          misconduct. When his lawyer tried to withdraw the complaint mid-hearing, the Court
          refused to let him.
        </p>
        <p className="mb-2">Two things in that judgment protect you directly:</p>
        <ul className="list-disc pl-6 space-y-1 mb-2">
          <li>
            <strong>A cheque you signed does not prove you owe the money.</strong> If you dispute
            the fee, it is the advocate who must prove there was a lawful agreement.
          </li>
          <li>
            <strong>
              A percentage-based fee claim cannot be the basis of a cheque-bouncing prosecution.
            </strong>
          </li>
        </ul>
        <Src>
          <A href={src.bSunitha}>
            B. Sunitha v. State of Telangana, (2018) 1 SCC 638 (5 December 2017)
          </A>
        </Src>
        <p className="mb-2 mt-3">
          This is not a one-off. In July 2025 the Supreme Court upheld a three-year suspension of
          an advocate who had sent a fee notice of ₹2.3 lakh to a woman who received ₹5 lakh from
          MACT for her brother&apos;s death. The Court called it gross misconduct and said it was
          considering increasing the punishment rather than reducing it.
        </p>
        <Src>
          <A href={src.suspension2025}>Supreme Court order dated 21 July 2025</A>
        </Src>

        <h3 className="font-semibold mb-2 mt-6">What to do instead</h3>
        <p className="mb-3">
          Agree a <strong>fixed amount in rupees</strong>, in writing, before you sign the
          vakalatnama. A lawyer may charge a fixed fee for the work whether the claim succeeds or
          not. That is lawful, and putting it in writing protects you more than it protects them.
        </p>
        <p className="mb-3">Never sign a blank cheque.</p>
        <p className="mb-3">
          Ask for receipts. A lawyer is required to keep accounts of your money, what was
          received, what was spent, what was taken as fees, with dates, and to give you a copy if
          you ask.
        </p>

        <h3 className="font-semibold mb-2 mt-6">If a lawyer has taken a cut</h3>
        <p className="mb-3">
          You can complain to the <strong>State Bar Council</strong> where the lawyer is
          enrolled. You do not need another lawyer to do this, and there is no court fee.
        </p>
        <p className="mb-3">
          The State Bar Council must refer a complaint of professional misconduct to its
          Disciplinary Committee, which can reprimand the advocate, suspend them, or remove their
          name from the roll. The Committee has <strong>one year</strong> to decide. If it does
          not, the case transfers automatically to the Bar Council of India. Cite this if your
          complaint is sitting untouched. You can appeal to the Bar Council of India within 60
          days, and from there to the Supreme Court.
        </p>
        <p className="mb-2">What to attach:</p>
        <ul className="list-disc pl-6 space-y-1 mb-2">
          <li>The vakalatnama</li>
          <li>
            Anything in writing that mentions a percentage: an email, a WhatsApp message, a fee
            note
          </li>
          <li>The cheque or receipt</li>
          <li>The MACT award</li>
        </ul>
        <p className="mb-3">
          The email saying &quot;16%&quot; is what decided the 2017 case. Written proof of a
          percentage is the strongest thing you can have.
        </p>
        <Src>
          <A href={src.advocatesAct}>Advocates Act, 1961, sections 35, 36B, 37 and 38</A>
        </Src>
        <p className="mb-2 mt-3">
          <strong>There is no going rate.</strong> You may hear that lawyers &quot;usually take
          about 10%.&quot; We looked for a source for that figure, in court judgments, bar
          council guidance, legal aid material and news reporting, and found none. What the
          reported cases show is 16% in one and about 46% in another, and in both the lawyer was
          found to have committed misconduct. Do not treat any percentage as normal, because none
          of them is lawful.
        </p>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="mb-10" aria-labelledby="legal-aid-heading">
        <h2 id="legal-aid-heading" className="text-xl font-semibold mb-3">
          Free legal aid
        </h2>
        <p className="mb-3">
          You may not have to pay a lawyer at all. But check which ground you qualify on, because
          it changes what you need to prove.
        </p>
        <p className="mb-2">
          Being a road accident victim is not, by itself, a qualifying ground. These are:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-3">
          <li>
            <strong>A woman</strong>, regardless of income. A widow claiming for her husband
            qualifies on this ground alone.
          </li>
          <li>
            <strong>A child</strong> under 18, regardless of income.
          </li>
          <li>
            <strong>A person with a disability.</strong> This covers many people seriously
            injured in an accident.
          </li>
          <li>
            <strong>A member of a Scheduled Caste or Scheduled Tribe</strong>, regardless of
            income.
          </li>
          <li>
            <strong>An industrial workman.</strong>
          </li>
          <li>
            <strong>Anyone whose annual income is below the state limit</strong>, ₹3,00,000 in
            most states. It is lower in some: ₹1,00,000 in Gujarat, West Bengal, Nagaland,
            Arunachal Pradesh, Ladakh and Puducherry; ₹1,50,000 in Bihar, Chhattisgarh and
            Tripura; ₹2,00,000 in Madhya Pradesh. The full list is on the NALSA page below.
          </li>
        </ul>
        <p className="mb-3">
          So in most families someone qualifies without an income test. Start there.
        </p>
        <Src>
          <A href={src.lsaAct}>Legal Services Authorities Act, 1987, section 12</A> &middot;{' '}
          <A href={src.nalsaLegalAid}>NALSA, Legal Aid</A>
        </Src>

        <h3 className="font-semibold mb-2 mt-6">Where to go</h3>
        <p className="mb-2">
          The District Legal Services Authority, at the District Court. Every DLSA has a front
          office. There are also Taluk Legal Services Committees at taluk courts, and High Court
          and Supreme Court Legal Services Committees for cases at those levels. See{' '}
          <Link href="/help-near-me">Help near you</Link> to find yours.
        </p>
        <p className="mb-3">
          <strong>Helpline: <a href="tel:15100">15100</a>.</strong>
        </p>

        <h3 className="font-semibold mb-2 mt-6">How to apply</h3>
        <p className="mb-2">
          In person, by post, by email to nalsa-dla@nic.in, or online. A written request on a
          plain sheet of paper is enough. If you cannot write, say so: a paralegal volunteer or
          an officer must fill the form for you, and you sign or give a thumb impression.
        </p>
        <p className="mb-3">
          Apply online: <A href={src.lsamsApply}>scourtapp.nic.in/lsams</A>
        </p>

        <h3 className="font-semibold mb-2 mt-6">What it costs, and what to expect</h3>
        <p className="mb-2">
          Nothing. Not the form, not the filing, not the lawyer. Process fees, drafting, typing
          and the panel lawyer&apos;s fee are all paid by the legal services authority, during
          the case and after it.
        </p>
        <p className="mb-2">
          A decision within 7 days. For the income ground, an affidavit stating your income is
          normally enough; you do not need a certificate. You may ask for a particular lawyer
          from the panel by name.
        </p>
        <p className="mb-2">
          <strong>If you are refused</strong>, appeal to the Chairman or Executive Chairman of
          the same legal services institution.
        </p>
        <p className="mb-2">
          <strong>If the lawyer they give you is not doing the work</strong>, complain in writing
          to the authority that assigned them, or email nalsa-dla@nic.in. The authority can take
          the case away from that lawyer at any stage and remove them from the panel. Say clearly
          what the problem is.
        </p>
        <p className="mb-3">
          One warning: if you are granted legal aid and then hire a private lawyer instead, the
          aid can be withdrawn. You can apply at any stage, including on appeal, even if you had a
          private lawyer earlier.
        </p>
        <Src>
          <A href={src.nalsaLegalAid}>NALSA, Legal Aid</A>
        </Src>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="mb-10" aria-labelledby="before-sign-heading">
        <h2 id="before-sign-heading" className="text-xl font-semibold mb-3">
          Before you sign anything
        </h2>
        <p className="mb-4">
          These are protections you already have. You do not have to ask for them.
        </p>

        <h3 className="font-semibold mb-2">A vakalatnama does not let your lawyer settle your case</h3>
        <p className="mb-2">
          Signing it lets a lawyer appear for you. It does not let them accept a settlement on
          your behalf. Your lawyer needs your express authority to compromise the claim, and you
          are not bound by admissions made without it. The Supreme Court has set aside compromises
          entered by an advocate without the client&apos;s authority.
        </p>
        <p className="mb-2">
          So: never sign a blank or partly blank vakalatnama. Keep a photocopy of everything you
          sign.
        </p>
        <Src>
          <A href={src.himalayanCoop}>
            Himalayan Cooperative Group Housing Society v. Balwan Singh, (2015) 7 SCC 373
          </A>
        </Src>

        <h3 className="font-semibold mb-2 mt-6">You get 30 days to answer an insurance company&apos;s offer</h3>
        <p className="mb-2">
          The law sets out how an insurer makes an offer. It must appoint an officer to handle
          the claim. That officer may make an offer to you <strong>before the Claims Tribunal</strong>,
          with the details set out. If you accept, the tribunal records it and the company must
          pay within 30 days. If you are not ready to answer, the tribunal must give you time, up
          to 30 days.
        </p>
        <p className="mb-2">
          Two things follow. An offer belongs in front of the tribunal, so if someone arrives at
          your house or the hospital with papers to sign, that is not this process. And nobody
          can require an answer on the spot.
        </p>
        <p className="mb-2">
          Before you accept, run the offer through the five steps above. Check that it includes
          future prospects, consortium for each family member, and, in an injury case, future
          medical expenses and attendant charges. These are the heads most often left out.
        </p>
        <Src>
          <A href={src.mvAct}>Motor Vehicles Act, 1988, section 149</A>
        </Src>

        <h3 className="font-semibold mb-2 mt-6">
          There is no &quot;full and final&quot; form to sign in a MACT claim
        </h3>
        <p className="mb-2">
          Compensation comes from a tribunal award. A settlement has to be recorded by the
          tribunal. There is no discharge voucher or receipt you are meant to sign to release the
          money.
        </p>
        <p className="mb-2">
          If anyone asks you to sign a &quot;full and final settlement&quot; outside the
          tribunal, do not sign it. Take it to the DLSA first.
        </p>

        <h3 className="font-semibold mb-2 mt-6">
          Do not take the ₹5 lakh no-fault payment if you have a real claim
        </h3>
        <p className="mb-2">
          There is a fixed no-fault payment under section 164: ₹5 lakh for death, ₹2.5 lakh for
          grievous hurt, without proving anyone&apos;s negligence. But accepting it makes the
          full claim petition <strong>lapse</strong>. The two are alternatives, not additions.
          For the 35-year-old in the worked example, taking ₹5 lakh would mean giving up roughly
          ₹49 lakh. If you are offered a quick fixed payment, ask whether it is under section 164,
          and speak to the DLSA before you sign.
        </p>
        <Src>
          <A href={src.mvAct}>Motor Vehicles Act, 1988, sections 164 and 165</A> &middot;{' '}
          <A href={src.gazette2022}>Gazette notification S.O. 859(E), 25 February 2022</A>
        </Src>

        <h3 className="font-semibold mb-2 mt-6">The documents are yours by right, and there is a timetable</h3>
        <p className="mb-2">
          The investigating officer must give you a statement of your rights within 10 days of
          the accident. The First Accident Report goes to the tribunal within 48 hours, the
          Detailed Accident Report within 90 days. You are entitled to copies of all of it, plus
          the FIR, the MLC and the post-mortem report. The tribunal&apos;s inquiry is meant to
          finish within 12 months of the accident.
        </p>
        <p className="mb-2">
          A family that knows these dates is in a much stronger position than one that does not.
          See <Link href="/documents">the documents page</Link>.
        </p>
        <Src>
          <A href={src.goharMohammed}>
            Gohar Mohammed v. Uttar Pradesh State Road Transport Corporation, (2023) 4 SCC 381
          </A>{' '}
          &middot; <A href={src.mactPortal}>mact.hcnlservices.in</A>
        </Src>

        <h3 className="font-semibold mb-2 mt-6">When to file</h3>
        <p className="mb-2">
          File within six months of the accident if you possibly can. If longer has passed, file
          anyway and say why you were delayed. Do not assume you are out of time. See{' '}
          <Link href="/compensation">the compensation page</Link>.
        </p>
        <Src>
          <A href={src.mvAct}>Motor Vehicles Act, 1988, section 166</A> &middot;{' '}
          <A href={src.gazette2022}>Gazette notification S.O. 859(E), 25 February 2022</A>
        </Src>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="mb-10" aria-labelledby="someone-heading">
        <h2 id="someone-heading" className="text-xl font-semibold mb-3">
          Find someone who has done this before
        </h2>
        <p className="mb-3">
          Somewhere in your extended family or your neighbourhood is a person who has been
          through a MACT claim, or a lawyer, or someone who works at a court. A cousin. A
          neighbour&apos;s son. Someone from your village who moved to the city.
        </p>
        <p className="mb-3">Ask them.</p>
        <p className="mb-3">
          Not because you cannot handle this. You can. But someone who has sat in that corridor
          knows things no page can tell you. Which clerk actually finds the file. Whether the
          tribunal sits in the morning. What the delay usually is in your district. Whether the
          DLSA office is where the sign says it is.
        </p>
        <p className="mb-3">
          An hour on the phone with someone who has done it once is worth more than a week of
          reading. Most people are glad to help and are never asked.
        </p>
        <p>
          If there is nobody, the DLSA is that person. That is what they are there for, and it
          costs nothing.
        </p>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="mb-4" aria-labelledby="sources-heading">
        <h2 id="sources-heading" className="text-xl font-semibold mb-3">
          Sources used on this page
        </h2>
        <h3 className="font-semibold mb-2">Law</h3>
        <ul className="list-disc pl-6 space-y-1 text-sm mb-4">
          <li>
            <A href={src.mvAct}>Motor Vehicles Act, 1988</A>, sections 149, 164, 165, 166, 168
          </li>
          <li>
            <A href={src.lsaAct}>Legal Services Authorities Act, 1987</A>, section 12
          </li>
          <li>
            <A href={src.advocatesAct}>Advocates Act, 1961</A>, sections 35, 36B, 37, 38
          </li>
          <li>
            <A href={src.bciRules}>
              Bar Council of India, Rules on an Advocate&apos;s Duty Towards the Client
            </A>
          </li>
          <li>
            <A href={src.bciFullText}>Bar Council of India Rules, Part VI Chapter II, full text</A>
          </li>
          <li>
            <A href={src.gazette2022}>Gazette notification S.O. 859(E), 25 February 2022</A>
          </li>
        </ul>
        <h3 className="font-semibold mb-2">Judgments</h3>
        <ul className="list-disc pl-6 space-y-1 text-sm mb-4">
          <li>
            <A href={src.pranaySethi}>
              National Insurance Co. Ltd. v. Pranay Sethi, (2017) 16 SCC 680
            </A>
          </li>
          <li>
            <A href={src.sarlaVerma}>
              Sarla Verma v. Delhi Transport Corporation, (2009) 6 SCC 121
            </A>
          </li>
          <li>
            <A href={src.magma}>Magma General Insurance Co. Ltd. v. Nanu Ram, (2018) 18 SCC 130</A>
          </li>
          <li>
            <A href={src.sidram}>
              Sidram v. Divisional Manager, United India Insurance Co. Ltd. (2022)
            </A>
          </li>
          <li>
            <A href={src.goharMohammed}>Gohar Mohammed v. UPSRTC, (2023) 4 SCC 381</A>
          </li>
          <li>
            <A href={src.bhagatSinghRawat}>
              Shri Ram General Insurance Co. Ltd. v. Bhagat Singh Rawat (27 March 2023)
            </A>
          </li>
          <li>
            <A href={src.pathmavathi}>
              V. Pathmavathi v. Bharti AXA General Insurance Co. Ltd. (6 February 2026)
            </A>
          </li>
          <li>
            <A href={src.sameemBegum}>
              Sameem Begum v. K. Venkat Swamy, 2026 INSC 864 (14 August 2026)
            </A>
          </li>
          <li>
            <A href={src.bSunitha}>B. Sunitha v. State of Telangana, (2018) 1 SCC 638</A>
          </li>
          <li>
            <A href={src.suspension2025}>Supreme Court order on advocate&apos;s suspension, 21 July 2025</A>
          </li>
          <li>
            <A href={src.himalayanCoop}>
              Himalayan Cooperative Group Housing Society v. Balwan Singh, (2015) 7 SCC 373
            </A>
          </li>
          <li>
            <A href={src.kirti}>Kirti v. Oriental Insurance Co. Ltd., (2021) 2 SCC 166</A>
          </li>
        </ul>
        <h3 className="font-semibold mb-2">Official portals</h3>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li>
            <A href={src.nalsaLegalAid}>NALSA, Legal Aid</A>
          </li>
          <li>
            <A href={src.lsamsApply}>Apply for legal aid online</A>
          </li>
          <li>
            <A href={src.mactPortal}>Gauhati High Court Kohima Bench, Motor Accident Claim Portal</A>
          </li>
        </ul>
      </section>
    </div>
  )
}
