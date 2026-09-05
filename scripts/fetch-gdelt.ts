import fs from 'fs'
import path from 'path'

const DENYLIST = ['killed', 'crash kills', 'accident kills', 'dead', 'died', 'fatalities', 'toll']
const GDELT_URL =
  'https://api.gdeltproject.org/api/v2/doc/doc?query=(MACT%20OR%20%22motor%20accident%20claims%22%20OR%20%22cashless%20treatment%22%20OR%20%22road%20safety%22)%20sourcecountry:IN&mode=artlist&format=json&maxrecords=50&timespan=3months'

const OUTPUT = path.join(process.cwd(), 'content/data/updates.json')

function isSafeHttpUrl(raw: string | undefined): boolean {
  if (!raw) return false
  try {
    const proto = new URL(raw).protocol
    return proto === 'http:' || proto === 'https:'
  } catch {
    return false
  }
}

async function main() {
  let existing: unknown = null
  try {
    existing = JSON.parse(fs.readFileSync(OUTPUT, 'utf-8'))
  } catch {
    // no existing file
  }

  try {
    const res = await fetch(GDELT_URL, { signal: AbortSignal.timeout(60000) })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = (await res.json()) as { articles?: Array<Record<string, string>> }
    const articles = (data.articles || []).filter((a) => {
      // Only ever store http(s) links. Blocks javascript:/data: injection via the feed.
      if (!isSafeHttpUrl(a.url)) return false
      const title = (a.title || '').toLowerCase()
      return !DENYLIST.some((word) => title.includes(word))
    })
    const output = {
      fetchedAt: new Date().toISOString(),
      articles: articles.map((a) => ({
        title: a.title,
        url: a.url,
        domain: a.domain,
        language: a.language,
        seendate: a.seendate,
        sourcecountry: a.sourcecountry,
      })),
    }
    fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2))
    console.log(`Fetched ${articles.length} articles.`)
  } catch (err) {
    console.warn('GDELT fetch failed, keeping existing data:', err)
    if (!existing) {
      fs.writeFileSync(OUTPUT, JSON.stringify({ fetchedAt: null, articles: [] }, null, 2))
    }
  }
}

main()
