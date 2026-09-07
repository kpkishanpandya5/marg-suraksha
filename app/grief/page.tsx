import Link from 'next/link'
import T from '@/components/T'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'Grief and support',
  description:
    'Support for families after a death on the road in India: what grief after sudden loss can look like, helping children cope, counselling helplines, and managing paperwork while grieving.',
  path: '/grief/',
})

export default function GriefPage() {
  return (
    <div className="max-prose">
      <h1 className="text-2xl font-semibold mb-4"><T k="grief.title" /></h1>
      <p className="text-[#6B7280] mb-8">
        <T k="grief.intro" />
      </p>

      <section className="mb-10" aria-labelledby="grief-normal-heading">
        <h2 id="grief-normal-heading" className="text-xl font-semibold mb-3">
          What grief looks like after sudden loss
        </h2>
        <p className="mb-3">
          Grief after a sudden death, especially one that was violent, unexpected, and preventable,
          often does not look like the quiet sadness people expect. It can come as anger, numbness,
          inability to eat or sleep, difficulty concentrating, physical pain, or a compulsive need
          to keep doing tasks. All of these are normal responses to an abnormal event.
        </p>
        <p className="mb-3">
          You may be spending the first days filling out forms, speaking to police, managing
          hospital paperwork, and making calls, while running on very little sleep and almost
          nothing to eat. This is a kind of shock. The practical tasks can feel like the only
          thing keeping you upright. That is also normal.
        </p>
        <p className="mb-3">
          Grief does not stay constant. Your mind will sometimes try to forget, to act normally,
          to carry on as if nothing happened. You may catch yourself laughing at something, or
          going an hour without thinking about the accident, and then feeling guilty about it.
          Let whatever is happening happen. Do not question it or argue with your own feelings.
        </p>
        <p className="mb-3">
          Do not worry about what other people will think. If you do not cry when others expect
          you to, that is fine. If you smile or laugh at something, that is fine too. There is
          no correct way to grieve, and no feeling during this time makes you a bad person or
          means you loved someone less. It is all completely normal.
        </p>
        <p className="mb-3">
          There is no correct timeline. There is no stage you should be at by a certain point.
          Do not let anyone, including yourself, set a deadline for when you should be "over it"
          or "back to normal."
        </p>
      </section>

      <section className="mb-10" aria-labelledby="grief-children-heading">
        <h2 id="grief-children-heading" className="text-xl font-semibold mb-3">
          If there are children in the family
        </h2>
        <p className="mb-3">
          Children grieve differently from adults. They may seem to be coping well and then
          break down weeks later. They may ask practical questions that seem jarring ("Who will
          take me to school now?") — this is not insensitivity, it is how children process loss.
        </p>
        <p className="mb-3">
          Tell them the truth in plain language appropriate to their age. Children who are not
          told the truth often imagine something worse, or feel excluded from the family's grief,
          which makes it harder to process.
        </p>
        <p>
          If a child's school performance or behaviour changes significantly in the months after
          the accident, speak to the school counsellor. School counsellors in government schools
          are available for this.
        </p>
      </section>

      <section className="mb-10" aria-labelledby="support-heading">
        <h2 id="support-heading" className="text-xl font-semibold mb-3">
          Where to get support
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-1">iCall — TISS (Tata Institute of Social Sciences)</h3>
            <p className="text-[#1A1A1A] mb-1">
              Free and low-cost psychological counselling, offered in English and Hindi. Provided
              by trained counsellors and supervised psychology students. Available to anyone in
              India.
            </p>
            <p className="text-sm text-[#6B7280]">
              Search "iCall TISS" for current contact details. The number may change — verify at
              the official TISS or iCall website.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-1">Vandrevala Foundation</h3>
            <p className="text-[#1A1A1A] mb-1">
              24-hour mental health helpline, free, available in multiple languages.
            </p>
            <p className="text-sm text-[#6B7280]">
              Search "Vandrevala Foundation helpline" for the current number.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-1">iManas</h3>
            <p className="text-[#1A1A1A] mb-1">
              National Tele Mental Health Programme run by NIMHANS and the Government of India.
              Available in multiple languages across states.
            </p>
            <p className="text-sm text-[#6B7280]">
              The national helpline number is listed on the NIMHANS website and the National
              Health Authority portal. Search "iManas NIMHANS helpline" for current contact.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-1">SNEHI</h3>
            <p className="text-[#1A1A1A] mb-1">
              Emotional support helpline, run by volunteers. Available in English and Hindi.
            </p>
            <p className="text-sm text-[#6B7280]">
              Search "SNEHI India helpline" for the current number.
            </p>
          </div>
        </div>

        <div className="border-l-4 border-[#E5E7EB] pl-4 py-2 mt-6">
          <p className="text-sm text-[#6B7280]">
            Phone numbers for mental health helplines change more frequently than this site can
            track. The organisations named above are real and verified. Please search for their
            current contact details rather than relying on a number printed here.
          </p>
        </div>
      </section>

      <section className="mb-10" aria-labelledby="practical-heading">
        <h2 id="practical-heading" className="text-xl font-semibold mb-3">
          Managing the practical tasks while grieving
        </h2>
        <p className="mb-3">
          The documents and claims process can feel overwhelming on top of grief. A few things
          that help:
        </p>
        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>You do not have to do this alone.</strong> The District Legal Services
            Authority (DLSA) provides free legal aid and can guide you through the process.
            A DLSA lawyer can also appear at the MACT tribunal on your behalf, so you do not need
            to attend every hearing.
          </li>
          <li>
            <strong>Delegate where you can.</strong> If there is a trusted family member or friend
            who is better positioned to deal with police or hospital staff, let them handle those
            interactions while you rest.
          </li>
          <li>
            <strong>Write things down.</strong> Keep a simple diary: who you spoke to, what they
            said, which documents you received and when. Memory is unreliable under stress, and
            this record will matter later.
          </li>
          <li>
            <strong>Do not sign anything you do not understand.</strong> Insurance agents or
            representatives of the vehicle's insurer may approach you early with a settlement
            offer. Do not accept or sign without speaking to a DLSA lawyer first. Early
            settlements are almost always below what a tribunal would award.
          </li>
        </ul>
      </section>

      <section className="mb-8" aria-labelledby="links-heading">
        <h2 id="links-heading" className="text-xl font-semibold mb-3">Related pages</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><Link href="/first-72-hours">What to do in the first 72 hours</Link></li>
          <li><Link href="/compensation">Claiming compensation</Link></li>
          <li><Link href="/help-near-me">Find your District Legal Services Authority</Link></li>
          <li><Link href="/numbers">All helpline numbers</Link></li>
        </ul>
      </section>
    </div>
  )
}
