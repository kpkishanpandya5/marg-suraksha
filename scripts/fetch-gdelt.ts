import fs from 'fs'
import path from 'path'
import { filterFeed, type FeedArticle } from '../lib/updates-filter'

/**
 * Pulls road-safety / rights / scheme news for the Updates page from the GDELT
 * DOC 2.0 API. Run nightly by .github/workflows/nightly-refresh.yml.
 *
 * Two stages, on purpose:
 *  1. Fetch BROAD from GDELT (recall). GDELT matches query terms in the body too,
 *     so a broad query is easier to keep working than a narrow one, and it does
 *     not need tuning against GDELT's quirky syntax.
 *  2. Filter for relevance in code (precision), in lib/updates-filter.ts, which
 *     is pure and unit-tested. Every rejection is written to updates-rejected.json
 *     with a reason so the term lists can be tuned from real data.
 *
 * Failure model:
 *  - GDELT rate-limits aggressively. A throttled request is HTTP 429 with a
 *    PLAIN-TEXT body ("Please limit requests to one every 5 seconds..."), and
 *    sustained hammering makes it drop the connection outright. -> retry+backoff.
 *  - A query problem often comes back as HTTP 200 with an empty body ("{}"), a
 *    bare "[]", or a plain-text error - NOT a clean error status. -> the body must
 *    parse to an object with an `articles` array or it is treated as a failure.
 *  - updates.json is only overwritten when the filtered feed has at least
 *    MIN_KEEP articles (or there is no good existing data). A failed fetch, or a
 *    filter that suddenly keeps almost nothing, leaves the last good file alone.
 */

// GDELT DOC 2.0 query. Notes on the params, learned from testing the endpoint:
//  - mode must be `ArtList` and format must be `json` for the article-list JSON.
//  - timespan units are `<n>m` (months), `<n>d`, `<n>w`, `<n>h`, `<n>min`. `3m`.
//  - the source-country operator wants the country NAME: `sourcecountry:India`
//    returns results, `sourcecountry:IN` matches nothing and GDELT answers `{}`.
//  - kept deliberately broad: relevance is decided later, in code.
const QUERY =
  '("road accident" OR "road accidents" OR "road safety" OR "road crash" OR ' +
  '"hit and run" OR "rash driving" OR "drunk driving" OR "traffic police" OR ' +
  '"traffic violation" OR "traffic challan" OR "motor vehicle" OR ' +
  '"Motor Vehicles Act" OR "MACT" OR "motor accident claims" OR ' +
  '"accident compensation" OR "compensation claim" OR "cashless treatment" OR ' +
  '"golden hour" OR "run over" OR "overspeeding" OR "highway accident" OR ' +
  '"pedestrian killed" OR "helmet" OR "seat belt" OR "e-challan" OR ' +
  '"driving licence" OR "black spot" OR "zero fatality" OR "PUCC") ' +
  'sourcecountry:India'

// Build the query string with %20-encoding (not URLSearchParams, which encodes
// spaces as `+`) to match the form the endpoint was verified against.
const GDELT_URL =
  'https://api.gdeltproject.org/api/v2/doc/doc?query=' +
  encodeURIComponent(QUERY) +
  '&mode=ArtList&format=json&maxrecords=250&timespan=3m&sort=DateDesc'

// GDELT rejects some default/blank agents; identify ourselves.
const USER_AGENT = 'MargSurakshaBot/1.0 (+https://www.margsuraksha.com; nightly updates fetch)'

const OUTPUT = path.join(process.cwd(), 'content/data/updates.json')
const REJECTED_OUTPUT = path.join(process.cwd(), 'content/data/updates-rejected.json')

const RETRIES = 4
const RETRY_DELAY_MS = [15_000, 45_000, 90_000]

// If the filtered feed has fewer than this, something is probably wrong (GDELT
// half-down, or the filter got too strict) - keep the last good file instead.
const MIN_KEEP = 5

type StoredArticle = FeedArticle

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

/** Map GDELT records to our shape and drop anything without a safe http(s) URL. */
function toStored(raw: Array<Record<string, string>>): StoredArticle[] {
  return raw
    .filter((a) => isSafeHttpUrl(a.url)) // blocks javascript:/data: injection via the feed
    .map((a) => ({
      title: a.title ?? '',
      url: a.url,
      domain: a.domain ?? '',
      language: a.language ?? '',
      seendate: a.seendate ?? '',
      sourcecountry: a.sourcecountry ?? '',
    }))
}

function writeRejectedLog(
  rejected: Array<{ title: string; domain: string; reason: string }>,
  rawCount: number,
  keptCount: number,
): void {
  const sorted = [...rejected].sort(
    (a, b) => a.reason.localeCompare(b.reason) || a.domain.localeCompare(b.domain),
  )
  fs.writeFileSync(
    REJECTED_OUTPUT,
    JSON.stringify(
      { generatedAt: new Date().toISOString(), rawCount, keptCount, rejectedCount: rejected.length, rejected: sorted },
      null,
      2,
    ),
  )
  // Also print a compact summary so it shows up in the nightly Actions log.
  const byReason = new Map<string, number>()
  for (const r of sorted) {
    const key = r.reason.replace(/"[^"]*"/g, '"…"')
    byReason.set(key, (byReason.get(key) ?? 0) + 1)
  }
  console.log(`\nRejected ${rejected.length} of ${rawCount}:`)
  for (const [reason, n] of [...byReason.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(n).padStart(3)}  ${reason}`)
  }
}

async function main() {
  const existing = readExisting()
  const goodExistingCount = existing && existing.articles.length > 0 ? existing.articles.length : 0

  let raw: Array<Record<string, string>>
  try {
    raw = await fetchArticlesWithRetry()
  } catch (err) {
    console.warn(`GDELT fetch failed after ${RETRIES} attempts: ${(err as Error).message}`)
    if (goodExistingCount > 0) {
      console.warn(`Keeping existing ${goodExistingCount} article(s) from ${existing!.fetchedAt}.`)
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

  const stored = toStored(raw)
  const { kept, rejected } = filterFeed(stored)
  writeRejectedLog(rejected, stored.length, kept.length)
  console.log(`\nGDELT ${raw.length} raw -> ${stored.length} with safe URLs -> ${kept.length} relevant.`)

  if (kept.length < MIN_KEEP && goodExistingCount >= kept.length) {
    // Too few survived and we have at least as many good ones already. Almost
    // certainly a bad night (GDELT flaky) or a filter regression - do not ship it.
    console.warn(
      `\n!! Only ${kept.length} article(s) passed the filter (min ${MIN_KEEP}). ` +
        `Keeping the existing ${goodExistingCount} from ${existing!.fetchedAt}. ` +
        `Check ${path.basename(REJECTED_OUTPUT)}.`,
    )
    return
  }

  const output: UpdatesFile = { fetchedAt: new Date().toISOString(), articles: kept }
  fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2))
  console.log(
    `\nWrote ${kept.length} article(s) to ${path.basename(OUTPUT)}` +
      (goodExistingCount ? ` (was ${goodExistingCount}).` : '.'),
  )
}

main().catch((err) => {
  console.error('Unexpected error in fetch-gdelt:', err)
  process.exit(1)
})
