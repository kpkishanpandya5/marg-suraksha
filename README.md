# Marg Suraksha

मार्ग सुरक्षा

A plain-language guide for families in India in the days and weeks after a road accident.

Someone arriving here already knows what happened to them. They do not need statistics about
strangers. They need to know what to do next, which document to demand from whom, which office
to go to, and which number to call. The whole site is built around that one visitor: a family
member on a mid-range Android phone, on a slow connection, possibly standing in a hospital
corridor, who has about four minutes and needs one clear next action.

Non-commercial. No ads, no signups, no tracking, no monetisation.

## What is on the site

| Page | What it covers |
|---|---|
| `/` | Two doors: it just happened, or I need to claim |
| `/just-happened` | Short orientation, the three things that matter right now |
| `/first-72-hours` | The core page. Eight ordered steps, printable to one A4 sheet, shareable to WhatsApp |
| `/documents` | Nine documents: who issues each, why you need it, how to ask, what to do when refused |
| `/compensation` | MACT claims, hit-and-run solatium fund, free legal aid |
| `/cashless-treatment` | The 2025 scheme: ₹1.5 lakh, 7 days, how to find a designated hospital |
| `/insurance` | PMSBY, PMJJBY, Jan Dhan RuPay cover, employer policies |
| `/grief` | Emotional support, how grief actually behaves, where to find counselling |
| `/help-near-me` | State and district directory for DLSA and MACT offices |
| `/numbers` | Every helpline on one printable page |
| `/data` | National figures with sources, and an honest note about undercounting |
| `/updates` | Policy and rights news, fetched nightly at build time |
| `/about` | Purpose, disclaimer, how to report an error |

## Running it

Requires Node 20 or later.

```bash
npm install
npm run dev
```

If port 3000 is taken, pass another one: `npm run dev -- -p 4000`.

To build and preview exactly what deploys:

```bash
npm run build
npx serve out
```

## Content model

All content lives in flat JSON under `content/data/`. There is no database, no CMS, and no
API routes.

| File | Records | Shape |
|---|---|---|
| `documents.json` | 9 | `name`, `whoIssuesIt`, `whyYouNeedIt`, `howToAskForIt`, `commonRefusalAndWhatToDo`, `sourceUrl`, `verified` |
| `helplines.json` | 3 | `number`, `whatItIsFor`, `whenToUse`, `sourceUrl`, `verified` |
| `stats.json` | 12 | `label`, `value`, `year`, `source`, `sourceUrl`, `verified` |
| `states.json` | 36 | State and district records for DLSA and MACT offices |
| `updates.json` | varies | Written by the nightly GDELT fetch, committed to the repo |

UI strings are in `content/i18n/en.json`.

## The verification rail

Every record carries a `verified` flag. Nothing renders in the UI until it is `true`, and
`scripts/check-content.ts` runs on `prebuild` and **halts the build** if any rendered record is
unverified or is missing a `sourceUrl`.

```
$ npm run build
Content check failed:
  Helpline 112 is not verified
```

This exists because a wrong helpline number on this site is worse than a missing one. Do not
route around it by adding `|| true` to the prebuild script.

## Adding a state or district

Currently **Maharashtra** is populated. The other 35 states and union territories are seeded as
stubs with `verified: false`, and they degrade to an honest empty state that tells the visitor
what to search for and gives the national numbers that always work. They never show a blank card
or fake-looking placeholder.

To fill one in, edit its record in `content/data/states.json`, replace the `null` values with
details you have personally checked against the relevant office, then set `verified: true` and
put today's date in `lastCheckedAt`.

## The updates feed

`scripts/fetch-gdelt.ts` queries the GDELT DOC 2.0 API at build time for Indian coverage of road
safety policy, MACT rulings, and the cashless treatment scheme. It stores only headline, source
domain, date, and outbound link. Never article text, never a thumbnail.

A keyword denylist drops reports of individual crashes, and anything ambiguous is dropped by
default. This feed is about schemes, laws, and court rulings. It must not become a feed of
individual accidents.

Article URLs are validated to `http:`/`https:` on both fetch and render, so a hostile scheme in
the third-party feed cannot reach an `href`.

A nightly GitHub Action re-fetches and commits the result. On failure the previous JSON is kept
and the build still passes. Run it by hand with `npm run fetch-gdelt`.

## Deployment

Static export via `output: 'export'`. Deploys to Vercel with zero configuration and zero
environment variables. The `out/` directory is plain files.

Before launch, set the real values in `lib/site.ts`:

```ts
export const SITE_URL = '...'            // used by the WhatsApp share link
export const ERROR_REPORT_EMAIL = '...'  // used by the "Is something here wrong?" link
```

## Constraints

These are deliberate and load-bearing. Please do not undo them.

**No per-incident accident database.** India's per-incident data is tied to FIRs, medico-legal
certificates, and named victims, and is not public. The site never displays details of a specific
real crash or a named victim.

**No news scraping.** No crawlers, no RSS ingestion, no runtime fetching. The only external data
is the GDELT call at build time.

**No personal data.** No forms, no accounts, no email capture, no cookies, no analytics. Nothing
on the site submits anywhere.

**Nothing invented.** Phone numbers, addresses, scheme amounts, deadlines, and section numbers
are either sourced and verified, or they are `verified: false` and do not render.

**Information, not advice.** Every legal page carries the disclaimer. Nothing is phrased as
"you should sue" or "you will receive X".

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, static export. Noto Sans self-hosted via
`next/font`. One client component in the entire site, the print button. Zero third-party requests
at runtime.

## Disclaimer

This site provides general information about the process after a road accident in India. It is
not legal advice and it is not a substitute for a lawyer. Rules and contact details change, and
details differ by state. Verify anything important with the relevant office or with a lawyer
before you act on it. Free legal aid is available through your District Legal Services Authority.
