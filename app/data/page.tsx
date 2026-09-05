import statsData from '@/content/data/stats.json'
import { t } from '@/lib/i18n'

// Placeholder time-of-day data — needs real MoRTH breakdown
// TODO: replace with actual MoRTH time-of-day figures when available
const timeOfDayPlaceholder = [
  { period: '12am–3am', share: 8 },
  { period: '3am–6am', share: 6 },
  { period: '6am–9am', share: 12 },
  { period: '9am–12pm', share: 11 },
  { period: '12pm–3pm', share: 13 },
  { period: '3pm–6pm', share: 16 },
  { period: '6pm–9pm', share: 20 },
  { period: '9pm–12am', share: 14 },
]

export default function DataPage() {
  const mainStats = statsData.filter((s) => !s.isNote)
  const notes = statsData.filter((s) => s.isNote)

  return (
    <div className="max-prose">
      <h1 className="text-2xl font-semibold mb-2">{t('data.title')}</h1>
      <p className="text-[#6B7280] mb-8">
        All figures from official government sources. Sources are linked for each
        item.
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

      <section className="mb-10" aria-labelledby="time-heading">
        <h2 id="time-heading" className="text-xl font-semibold mb-2">
          Accidents by time of day
        </h2>
        <p className="text-sm text-[#6B7280] mb-4">
          <strong>Note:</strong> These figures are placeholder estimates. The
          exact MoRTH time-of-day breakdown was not available at the time of
          publication. This chart needs to be replaced with the actual MoRTH
          data. {/* TODO: replace with real MoRTH time-of-day data */}
        </p>
        <div className="border border-[#E5E7EB] p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E7EB]">
                <th className="text-left py-1 pr-4 font-semibold">Period</th>
                <th className="text-right py-1 font-semibold">Share of accidents</th>
              </tr>
            </thead>
            <tbody>
              {timeOfDayPlaceholder.map((row) => (
                <tr key={row.period} className="border-b border-[#E5E7EB]">
                  <td className="py-1 pr-4">{row.period}</td>
                  <td className="py-1 text-right">{row.share}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-[#6B7280] mt-2 italic">
            Placeholder data — do not cite. Replace before publishing.
          </p>
        </div>
      </section>

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
