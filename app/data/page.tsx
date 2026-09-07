import statsData from '@/content/data/stats.json'
import T from '@/components/T'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'Road accident figures in India',
  description:
    'Key road accident figures for India from official MoRTH and government sources, with every number linked to the source it came from.',
  path: '/data/',
})

export default function DataPage() {
  const mainStats = statsData.filter((s) => !s.isNote)
  const notes = statsData.filter((s) => s.isNote)

  return (
    <div className="max-prose">
      <h1 className="text-2xl font-semibold mb-2"><T k="data.title" /></h1>
      <p className="text-[#6B7280] mb-8">
        <T k="data.intro" />
      </p>

      <section className="mb-10" aria-labelledby="key-stats-heading">
        <h2 id="key-stats-heading" className="text-xl font-semibold mb-4">
          Key figures for 2024
        </h2>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-[#1A1A1A]">
              <th className="text-left py-2 pr-4 font-semibold">Measure</th>
              <th className="text-right py-2 font-semibold">Value</th>
            </tr>
          </thead>
          <tbody>
            {mainStats.map((s) => (
              <tr key={s.id} className="border-b border-[#E5E7EB]">
                <td className="py-2 pr-4 text-[#1A1A1A]">
                  <a
                    href={s.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1A1A1A] no-underline"
                    title={`Source: ${s.source}`}
                  >
                    {s.label}
                  </a>
                </td>
                <td className="py-2 text-right font-semibold">{s.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-[#6B7280] mt-2">
          Source: MoRTH, Road Accidents in India 2024.{' '}
          <a
            href="https://morth.gov.in/road-accidents-india-2022"
            target="_blank"
            rel="noopener noreferrer"
          >
            morth.gov.in
          </a>
        </p>
      </section>

      {/*
        The "Accidents by time of day" section was removed before launch: it held
        placeholder estimates, not real MoRTH data. Restore it here once the actual
        MoRTH time-of-day breakdown is available.
      */}

      {notes.length > 0 && (
        <section className="mb-8" aria-labelledby="notes-heading">
          <h2 id="notes-heading" className="text-xl font-semibold mb-3">
            Notes on data quality
          </h2>
          {notes.map((note) => (
            <div key={note.id} className="border-l-4 border-[#E5E7EB] pl-4 mb-4">
              <p className="text-sm">{note.value}</p>
              <p className="text-xs text-[#6B7280] mt-1">
                Source: {note.source}.{' '}
                <a href={note.sourceUrl} target="_blank" rel="noopener noreferrer">
                  {note.sourceUrl}
                </a>
              </p>
            </div>
          ))}
        </section>
      )}

      <section className="mb-8" aria-labelledby="opendata-heading">
        <h2 id="opendata-heading" className="text-xl font-semibold mb-3">
          Open data sources
        </h2>
        <p className="text-sm text-[#6B7280] mb-4">
          The links below point to datasets that publish road accident data for further analysis.
          Government URLs sometimes change when portals are redesigned. If a link does not work,
          search the site name on the respective platform or search for "Road Accidents in India"
          on data.gov.in.
        </p>
        <ul className="space-y-3 text-sm">
          <li>
            <a
              href="https://morth.nic.in/road-accident-in-india"
              target="_blank"
              rel="noopener noreferrer"
            >
              MoRTH — Road Accidents in India (annual report series)
            </a>
            <span className="block text-[#6B7280]">
              The primary source. Published annually by the Ministry of Road Transport and Highways.
              If this URL is broken, go to morth.nic.in and navigate to Publications.
            </span>
          </li>
          <li>
            <a
              href="https://data.opencity.in/dataset/road-accidents-in-india-2022"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenCity — Road Accidents in India dataset
            </a>
            <span className="block text-[#6B7280]">
              Structured dataset based on MoRTH data. If broken, search opencity.in for road
              accidents.
            </span>
          </li>
          <li>
            <a
              href="https://www.ncrb.gov.in/accidental-deaths-suicides-in-india-table-content.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              NCRB — Accidental Deaths and Suicides in India
            </a>
            <span className="block text-[#6B7280]">
              Published by the National Crime Records Bureau. Covers accidental deaths including
              road accidents. If broken, go to ncrb.gov.in and look under Publications.
            </span>
          </li>
          <li>
            <a
              href="https://dataful.in/datasets/19621/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Dataful — Road accident dataset
            </a>
            <span className="block text-[#6B7280]">
              Third-party data platform. Link may be unstable.
            </span>
          </li>
        </ul>
      </section>
    </div>
  )
}
