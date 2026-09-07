import documentsData from '@/content/data/documents.json'
import T from '@/components/T'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'Documents you need',
  description:
    'The documents to collect after a road accident in India: who issues each one, why it matters for your claim, how to ask, and what to do if an office refuses.',
  path: '/documents/',
})

export default function DocumentsPage() {
  return (
    <div className="max-prose">
      <h1 className="text-2xl font-semibold mb-2"><T k="docs.title" /></h1>
      <p className="text-[#6B7280] mb-8">
        <T k="docs.intro" />
      </p>

      <div className="space-y-10">
        {documentsData.map((doc) => (
          <section key={doc.id} aria-labelledby={`doc-${doc.id}`}>
            <h2 id={`doc-${doc.id}`} className="text-xl font-semibold mb-1 text-[#1A1A1A]">
              {doc.name}
            </h2>

            <dl className="space-y-3 mt-3">
              <div>
                <dt className="text-sm font-semibold text-[#6B7280] uppercase tracking-wide">
                  Who issues it
                </dt>
                <dd className="mt-0.5">{doc.whoIssuesIt}</dd>
              </div>

              <div>
                <dt className="text-sm font-semibold text-[#6B7280] uppercase tracking-wide">
                  Why you need it
                </dt>
                <dd className="mt-0.5">{doc.whyYouNeedIt}</dd>
              </div>

              <div>
                <dt className="text-sm font-semibold text-[#6B7280] uppercase tracking-wide">
                  How to ask for it
                </dt>
                <dd className="mt-0.5">{doc.howToAskForIt}</dd>
              </div>

              <div>
                <dt className="text-sm font-semibold text-[#6B7280] uppercase tracking-wide">
                  If they refuse
                </dt>
                <dd className="mt-0.5">{doc.commonRefusalAndWhatToDo}</dd>
              </div>

              <div>
                <dt className="text-sm font-semibold text-[#6B7280] uppercase tracking-wide">
                  Source
                </dt>
                <dd className="mt-0.5 text-sm">
                  <a
                    href={doc.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {doc.sourceUrl}
                  </a>
                </dd>
              </div>
            </dl>

            <hr className="mt-8 border-[#E5E7EB]" />
          </section>
        ))}
      </div>
    </div>
  )
}
