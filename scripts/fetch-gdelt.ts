import fs from 'fs'
import path from 'path'

/**
 * Pulls policy / rights / scheme news for the Updates page from the GDELT DOC 2.0
 * API. Run nightly by .github/workflows/nightly-refresh.yml.
 *
 * Design notes / failure model:
 *  - GDELT rate-limits aggressively. A throttled request is HTTP 429 with a
 *    PLAIN-TEXT body ("Please limit requests to one every 5 seconds..."), and
 *    sustained hammering makes it drop the connection outright.
 *  - A query problem often comes back as HTTP 200 with an empty body ("{}"), a
 *    bare "[]", or a plain-text error - NOT a clean error status. So a 200 is not
 *    enough; the body must parse to an object with an `articles` array.
 *  - The old script treated "200 + no articles" as success and wrote an empty
 *    file, which then shipped an empty Updates page. This version only overwrites
 *    updates.json when it has a well-formed response with at least one article
 *    (or when there is no existing data at all, to bootstrap the file).
 */

const DENYLIST = ['killed', 'crash kills', 'accident kills', 'dead', 'died', 'fatalities', 'toll']

// GDELT DOC 2.0 query. Notes on the params, learned from testing the endpoint:
//  - mode must be `ArtList` and format must be `json` for the article-list JSON.
//  - timespan units are `<n>m` (months), `<n>d`, `<n>w`, `<n>h`, `<n>min`. The old
//    value `3months` is not the documented token; `3m` is.
//  - bare unquoted acronyms (the old `MACT`) match almost nothing on GDELT; quoted
//    phrases are what work.
//  - the source-country operator wants the country NAME: `sourcecountry:India`
//    returns results, `sourcecountry:IN` matches nothing and GDELT answers `{}`.
//    That single wrong token is why the old query returned an empty feed.
const QUERY =
  '("motor accident claims" OR "cashless treatment" OR "road safety" OR ' +
  '"Motor Vehicles Act" OR "hit and run compensation" OR "accident compensation" OR ' +
  '"Solatium Fund" OR "MACT tribunal") sourcecountry:India'

// Build the query string with %20-encoding (not URLSearchParams, which encodes
// spaces as `+`) to match the form the endpoint was verified against.
const GDELT_URL =
  'https://api.gdeltproject.org/api/v2/doc/doc?query=' +
  encodeURIComponent(QUERY) +
  '&mode=ArtList&format=json&maxrecords=250&timespan=3m&sort=DateDesc'

// GDELT rejects some default/blank agents; identify ourselves.
const USER_AGENT = 'MargSurakshaBot/1.0 (+https://www.margsuraksha.com; nightly updates fetch)'

const OUTPUT = path.join(process.cwd(), 'content/data/updates.json')

const RETRIES = 4
const RETRY_DELAY_MS = [15_000, 45_000, 90_000]

interface StoredArticle {
  title: string
  url: string
  domain: string
  language: string
  seendate: string
  sourcecountry: string
}

interface UpdatesFile {
  fetchedAt: string | null
  articles: StoredArticle[]
}

function isSafeHttpUrl(raw: string | undefined): boolean {
  if (!raw) return false
  try {
    const proto = new URL(raw).protocol
    return proto === 'http:' || proto === 'https:'
  } catch {
    return false
  }
}

function readExisting(): UpdatesFile | null {
  try {
    const parsed = JSON.parse(fs.readFileSync(OUTPUT, 'utf-8'))
    if (parsed && typeof parsed === 'object' && Array.isArray(parsed.articles)) {
      return parsed as UpdatesFile
    }
  } catch {
    // no readable existing file
  }
  return null
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

class TransientError extends Error {}

/** One GDELT call. Throws TransientError for anything worth retrying. */
async function fetchArticlesOnce(): Promise<Array<Record<string, string>>> {
  let res: Response
  try {
    res = await fetch(GDELT_URL, {
      headers: { 'User-Agent': USER_AGENT, Accept: 'application/json' },
      signal: AbortSignal.timeout(60_000),
    })
  } catch (err) {
    throw new TransientError(`network error: ${(err as Error).message}`)
  }

  const body = await res.text()

  if (res.status === 429) {
    throw new TransientError('HTTP 429 (rate limited)')
  }
  if (!res.ok) {
    throw new TransientError(`HTTP ${res.status}`)
  }

  let data: unknown
  try {
    data = JSON.parse(body)
  } catch {
    // GDELT returned 200 with a non-JSON body - almost always a throttle or
    // query-error message. Retry; it is usually transient.
    throw new TransientError(
      `200 but non-JSON body (${body.length} chars): ${body.slice(0, 120).replace(/\s+/g, ' ')}`
    )
  }

  if (!data || typeof data !== 'object' || !Array.isArray((data as { articles?: unknown }).articles)) {
    // e.g. `{}` or `[]` - GDELT's shape for "couldn't run this query". Retry.
    throw new TransientError(
      `200 but no articles array (got ${JSON.stringify(data).slice(0, 120)})`
    )
  }

  return (data as { articles: Array<Record<string, string>> }).articles
}

async function fetchArticlesWithRetry(): Promise<Array<Record<string, string>>> {
  let lastErr: Error | undefined
  for (let attempt = 0; attempt < RETRIES; attempt++) {
    if (attempt > 0) {
      const delay = RETRY_DELAY_MS[Math.min(attempt - 1, RETRY_DELAY_MS.length - 1)]
      console.warn(`  retry ${attempt}/${RETRIES - 1} in ${delay / 1000}s (${lastErr?.message})`)
      await sleep(delay)
    }
    try {
      return await fetchArticlesOnce()
    } catch (err) {
      lastErr = err as Error
      if (!(err instanceof TransientError)) throw err
    }
  }
  throw lastErr ?? new Error('GDELT fetch failed')
}

function toStored(raw: Array<Record<string, string>>): StoredArticle[] {
  return raw
    .filter((a) => {
      // Only ever store http(s) links. Blocks javascript:/data: injection via the feed.
      if (!isSafeHttpUrl(a.url)) return false
      const title = (a.title || '').toLowerCase()
      return !DENYLIST.some((word) => title.includes(word))
    })
    .map((a) => ({
      title: a.title,
      url: a.url,
      domain: a.domain,
      language: a.language,
      seendate: a.seendate,
      sourcecountry: a.sourcecountry,
    }))
}

async function main() {
  const existing = readExisting()
  const hasGoodExisting = !!existing && existing.articles.length > 0

  let raw: Array<Record<string, string>>
  try {
    raw = await fetchArticlesWithRetry()
  } catch (err) {
    console.warn(`GDELT fetch failed after ${RETRIES} attempts: ${(err as Error).message}`)
    if (hasGoodExisting) {
      console.warn(
        `Keeping existing ${existing!.articles.length} article(s) from ${existing!.fetchedAt}.`
      )
      return
    }
    if (existing) {
      console.warn('No existing articles either; leaving the empty file as-is.')
      return
    }
    console.warn('No existing file; bootstrapping an empty one so the build has valid JSON.')
    fs.writeFileSync(OUTPUT, JSON.stringify({ fetchedAt: null, articles: [] } satisfies UpdatesFile, null, 2))
    return
  }

  const articles = toStored(raw)

  if (articles.length === 0) {
    // Well-formed response, but nothing survived (GDELT returned 0, or every hit
    // was filtered). Don't clobber a good file over what might be a quiet night
    // or an upstream hiccup.
    if (hasGoodExisting) {
      console.warn(
        `GDELT returned ${raw.length} raw / 0 usable articles; keeping existing ` +
          `${existing!.articles.length} from ${existing!.fetchedAt}.`
      )
      return
    }
    console.warn('GDELT returned 0 usable articles and there is no existing data; writing empty file.')
    fs.writeFileSync(
      OUTPUT,
      JSON.stringify({ fetchedAt: new Date().toISOString(), articles: [] } satisfies UpdatesFile, null, 2)
    )
    return
  }

  const output: UpdatesFile = { fetchedAt: new Date().toISOString(), articles }
  fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2))
  console.log(`Fetched ${raw.length} raw, stored ${articles.length} articles.`)
}

main().catch((err) => {
  console.error('Unexpected error in fetch-gdelt:', err)
  process.exit(1)
})
