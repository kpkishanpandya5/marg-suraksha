import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  classifyArticle,
  filterFeed,
  normalizeTitle,
  dedupe,
  type FeedArticle,
} from './updates-filter'

function article(title: string, domain = 'timesofindia.indiatimes.com'): FeedArticle {
  return {
    title,
    domain,
    url: `https://${domain}/x`,
    language: 'English',
    seendate: '20260908T000000Z',
    sourcecountry: 'India',
  }
}

// --- Kishan's fixtures: the four that must survive -------------------------

const MUST_KEEP: Array<[string, string]> = [
  [
    'Thane driver confuses accelerator for brake , kills 45 - year - old woman',
    'hindustantimes.com',
  ],
  [
    'Odisha launches e - detection system to crack down on vehicles without PUCC , insurance',
    'orissapost.com',
  ],
  ['Hyderabad Traffic Police book seven cases over fake number plates', 'thehindu.com'],
  [
    'Smt . Devikala And Another vs Reliance General Insurance Company Ltd ... on 3 September , 2026',
    'indiankanoon.org',
  ],
]

for (const [title, domain] of MUST_KEEP) {
  test(`keeps: ${title.slice(0, 55)}`, () => {
    assert.equal(classifyArticle(article(title, domain)).relevant, true)
  })
}

// --- Kishan's fixtures: the noise that must be rejected -------------------

const MUST_REJECT: Array<[string, string]> = [
  ['PM Modi to launch Rs 35,000 crore projects in Vadodara tomorrow', 'prokerala.com'],
  ['Odisha approves Rs 15,948 cr for power infrastructure', 'orissapost.com'],
  [
    'Police role vital to protecting coastline which is crucial to economy : Amit Shah',
    'timesofindia.indiatimes.com',
  ],
  ['Gurpreet Sekhon Joins AAP as CM Mann Addresses Massive Zira Rally', 'rozanaspokesman.com'],
  ['Shobha vs State Of Rajasthan on 21 August , 2026', 'indiankanoon.org'],
  ['Rudra Singh vs The State Of Rajasthan on 21 August , 2026', 'indiankanoon.org'],
]

for (const [title, domain] of MUST_REJECT) {
  test(`rejects: ${title.slice(0, 55)}`, () => {
    assert.equal(classifyArticle(article(title, domain)).relevant, false)
  })
}

// --- Wider fixtures drawn from the live feed -----------------------------

const KEEP_WIDER = [
  'SC raises compensation for blind accident victim from Rs 2 . 94 cr to Rs 3 . 77 cr',
  'Mumbai MACT Awards Rs 8 . 23 Lakh To Police Constable Injured By Drunk Rider',
  'Three Women Returning From Janmashtami Celebrations Run Over By Truck On NH - 44 In Morena',
  'Special drive detects 1 , 038 violations at zebra crossings in Keralam',
  'Pune : CCTV Captures 25 - Year - Old Fatal Crash On Mud - Covered Balewadi - Mahalunge Road',
  'Truck Drags Car 100 Metres in Bhubaneswar , Four Passengers Survive',
  'Can siblings - in - law seek accident compensation ? Sikkim HC upholds Rs 85 lakh award',
  'Polls : Accidents rise 6 % till June 2026 | Madurai News',
  'नूरपुरबेदी में डिवाइडर बने मौत का फंदा : रात में टकरा रहे वाहन',
  'मुजफ्फरपुर में भीषण सड़क हादसा , महिला और बेटे की मौत',
  'Karnataka Road Accidents : कर्नाटक में सड़क दुर्घटनाओं में 8 लोगों की मौत',
]
for (const title of KEEP_WIDER) {
  test(`keeps (wider): ${title.slice(0, 50)}`, () => {
    assert.equal(classifyArticle(article(title)).relevant, true, classifyArticle(article(title)).reason)
  })
}

const REJECT_WIDER: Array<[string, string]> = [
  ['HDFC Bank CEO Succession Crisis : Why Sashidhar Jagdishan Walked Away', 'openthemagazine.com'],
  ['UP Board Hindi Syllabus 2026 - 27 : यूपी बोर्ड कक्षा 9 हिंदी सिलेबस जारी', 'jagranjosh.com'],
  ['Delhi Bus Gang Rape : Fingerprints Found , CCTV Failed ; Rs 63 , 000 In Unpaid Challans', 'oneindia.com'],
  ['Virgo , Weekly Horoscope , August 30 to September 05 , 2026', 'timesofindia.indiatimes.com'],
  ['Cancer Horoscope Today : Avoid distractions while driving', 'timesofindia.indiatimes.com'],
  ['3 , 400 Lipstick Kisses On Car Land Gwalior Man In Trouble , Police Fine Him Rs 5 , 500', 'freepressjournal.in'],
  ['ग्वालियर : लिपस्टिक से सजी किसिंग कार पर पुलिस का एक्शन , 5500 रुपये का चालान', 'pradeshtoday.com'],
  ['Himcare scheme to be insurance based with up to Rs 10 lakh cashless treatment : Dharmani', 'tribuneindia.com'],
  ['Punjab makes Mukh Mantri Sehat Yojana health cards available online', 'hindustantimes.com'],
  ['First - Party Bike Insurance : Benefits , Coverage & How to Buy', 'dailypioneer.com'],
  ['Nepal Floods : Lessons for a Safer and More Resilient Himalaya', 'dailypioneer.com'],
  ['BJP will strike deal with Akali Dal on condition of passing 3 Black farm laws : Punjab CM Mann', 'aninews.in'],
  ['Chunilal Govanbhai Patel vs Narsibhai N Patel on 7 September , 2026', 'indiankanoon.org'],
  ['The General Manager , vs Arun , on 7 August , 2026', 'indiankanoon.org'],
]
for (const [title, domain] of REJECT_WIDER) {
  test(`rejects (wider): ${title.slice(0, 50)}`, () => {
    const c = classifyArticle(article(title, domain))
    assert.equal(c.relevant, false, `unexpectedly kept via: ${c.reason}`)
  })
}

// --- indiankanoon nexus rule --------------------------------------------

test('indiankanoon: keeps judgment naming an insurance company', () => {
  assert.equal(
    classifyArticle(
      article(
        'The Oriental Insurance Company Limited vs Mithilesh Kumar Rakesh on 27 August , 2026',
        'indiankanoon.org',
      ),
    ).relevant,
    true,
  )
})

test('indiankanoon: rejects a plain criminal-appeal cause title', () => {
  assert.equal(
    classifyArticle(article('Babu Lal vs State Of Rajasthan on 21 August , 2026', 'indiankanoon.org'))
      .relevant,
    false,
  )
})

// --- Tier A beats everything -------------------------------------------

test('an excluded topic is rejected even with a road term present', () => {
  const c = classifyArticle(
    article('Horoscope today: a car crash on the highway is likely for Aries'),
  )
  assert.equal(c.relevant, false)
  assert.match(c.reason, /excluded topic/)
})

// --- normalization -----------------------------------------------------

test('normalizeTitle keeps Devanagari words intact', () => {
  assert.equal(normalizeTitle('सड़क - दुर्घटना, मुआवज़ा | News'), 'सड़क दुर्घटना मुआवज़ा news')
})

test('normalizeTitle turns GDELT hyphen spacing into words', () => {
  assert.equal(normalizeTitle('hit - and - run on NH - 44'), 'hit and run on nh 44')
})

// --- word-boundary matching (no substring false hits) ------------------

test('"bus" in "business" does not count as a vehicle', () => {
  const c = classifyArticle(article('HDFC Bank business update: shares crash after results'))
  // "crash" is an incident word but there is no real vehicle, so this must not
  // be kept as a road accident.
  assert.equal(c.relevant, false)
})

// --- de-duplication ---------------------------------------------------

test('dedupe drops a re-published identical headline', () => {
  const a = article('MACT awards Rs 61 lakh compensation to injured biker six years after accident', 'a.com')
  const b = article('MACT awards Rs 61 lakh compensation to injured biker six years after accident', 'b.com')
  const c = article('Odisha to enforce e-detection for vehicle compliance from Sept 1', 'c.com')
  const out = dedupe([a, b, c])
  assert.equal(out.kept.length, 2)
  assert.equal(out.dropped.length, 1)
  assert.match(out.dropped[0].reason, /near-duplicate/)
})

// --- end to end -----------------------------------------------------

test('filterFeed keeps the good and drops the noise from a mixed batch', () => {
  const batch = [
    article('Thane driver confuses accelerator for brake, kills 45-year-old woman', 'hindustantimes.com'),
    article('PM Modi to launch Rs 35,000 crore projects in Vadodara tomorrow', 'prokerala.com'),
    article('Hyderabad Traffic Police book seven cases over fake number plates', 'thehindu.com'),
    article('Odisha approves Rs 15,948 cr for power infrastructure', 'orissapost.com'),
  ]
  const out = filterFeed(batch)
  assert.equal(out.kept.length, 2)
  assert.equal(out.rejected.length, 2)
})
