/**
 * Relevance filter for the GDELT feed that powers /updates/.
 *
 * The GDELT query is kept broad for recall (see scripts/fetch-gdelt.ts), so the
 * raw feed is roughly half noise: PM visits, "X crore projects", power-sector
 * news, generic High Court cause-lists, political rallies. This module is the
 * precision stage. It runs over the fetched JSON, needs no network, and every
 * decision comes with a human-readable reason so the rejections file can be used
 * to tune the term lists.
 *
 * Bias: precision over recall. Credibility is the product. When a headline is
 * ambiguous, drop it. A short clean feed beats a long noisy one.
 *
 * Core rule: a strong road / traffic / motor-law term must appear in the TITLE,
 * not merely somewhere in the record. That one rule removes most of the noise.
 */

export interface FeedArticle {
  title: string
  url: string
  domain: string
  language: string
  seendate: string
  sourcecountry: string
}

export interface RejectionRecord {
  title: string
  domain: string
  reason: string
}

export interface FilterOutcome {
  kept: FeedArticle[]
  rejected: RejectionRecord[]
}

// ---------------------------------------------------------------------------
// Term lists. Edit these to tune the filter; updates-rejected.json shows what
// each change would let through or drop.
// ---------------------------------------------------------------------------

/** Tier A. Presence anywhere in the title rejects the article outright, even if
 *  a strong road term is also present (e.g. "Horoscope: avoid driving today"). */
const ALWAYS_REJECT = [
  'gang rape', 'gangrape', 'rape', 'raped', 'rapist', 'molest', 'molestation',
  'sexual assault', 'sexually assaulted', 'murder', 'murdered', 'homicide',
  'dowry', 'honour killing', 'lynching', 'lynched',
  'terror attack', 'terrorist', 'militant', 'naxal', 'maoist', 'insurgent',
  'chitta', 'heroin', 'ganja', 'narcotic', 'drug haul', 'drug racket', 'drug peddler',
  'horoscope', 'zodiac', 'astrology', 'rashifal', 'numerology', 'tarot',
  'box office', 'recipe', 'gold price', 'silver price', 'share price', 'sensex',
  'nifty', 'stock market', 'cryptocurrency', 'ipo listing',
  'lipstick', 'kiss marks', 'kiss mark', 'lipstick marks', 'लिपस्टिक', 'किसिंग कार',
]

/** Strong, unambiguous terms. Any one keeps the article. Written in the
 *  normalized form (lower-case, hyphens already turned into spaces). */
const STRONG = [
  'road accident', 'road accidents', 'road crash', 'road crashes', 'road safety',
  'road mishap', 'road fatality', 'road fatalities', 'road death', 'road deaths',
  'fatal crash', 'fatal accident', 'fatal collision', 'fatal mishap', 'fatal road',
  'deadly crash', 'horrific crash', 'horrific accident', 'gruesome accident',
  'accidents rise', 'accidents rose', 'accidents increased', 'rise in accidents',
  'rise in road accidents', 'spike in accidents', 'accident rate', 'accident toll',
  'accident deaths', 'accident death', 'accident-prone stretch',
  'overloaded', 'overloading', 'overloaded truck', 'overloaded bus', 'brake failure',
  'tyre burst', 'tire burst',
  'hit and run', 'rash driving', 'rash and negligent driving', 'negligent driving',
  'dangerous driving', 'reckless driving', 'careless driving',
  'drunk driving', 'drunken driving', 'drink driving', 'drunk drive',
  'drink and drive', 'drunk and drive', 'driving under the influence',
  'over speeding', 'overspeeding', 'overspeed', 'over speed',
  'motor vehicles act', 'motor vehicle act', 'motor accident', 'motor accidents',
  'mact', 'claims tribunal', 'motor accident claims', 'lok adalat award',
  'section 166', 'section 163', 'section 279', 'section 304a', 'section 337',
  'accident compensation', 'accident claim', 'accident victim', 'accident victims',
  'solatium',
  'golden hour', 'cashless treatment scheme', 'pm rahat', 'rahat scheme',
  'edar', 'e dar', 'good samaritan',
  'traffic police', 'traffic cop', 'traffic constable', 'traffic violation',
  'traffic violations', 'traffic rule', 'traffic rules', 'traffic offence',
  'traffic signal', 'traffic light', 'traffic challan', 'traffic fine',
  'traffic fines', 'traffic management', 'traffic enforcement', 'traffic drive',
  'traffic regulation', 'e challan', 'echallan', 'challan', 'challans',
  'number plate', 'numberplate', 'fancy number plate', 'high security registration',
  'driving licence', 'driving license', 'learner licence', 'driving test',
  'licence suspension', 'license suspension',
  'zebra crossing', 'pedestrian crossing', 'jaywalking', 'jaywalk', 'pedestrian',
  'pedestrians', 'foot overbridge',
  'helmet', 'helmets', 'seat belt', 'seatbelt', 'pillion rider',
  'pothole', 'potholes', 'black spot', 'accident prone', 'accident prone stretch',
  'zero fatality', 'fatality week', 'road safety week', 'road safety month',
  'nhai', 'morth', 'ministry of road transport', 'national highway',
  'national highways', 'state highway', 'expressway', 'flyover', 'flyovers',
  'elevated corridor', 'motor vehicle rule', 'motor vehicle rules',
  'pollution under control', 'pucc', 'puc certificate',
  'third party insurance', 'motor insurance', 'vehicle insurance',
  'rc cancellation', 'registration certificate cancel', 'tinted glass', 'black film',
  'e detection', 'road tax', 'fastag', 'toll plaza',
  'road rage', 'road race', 'street racing', 'stunt riding', 'wheelie',
  'headlamp', 'low beam', 'high beam', 'dipper',
  'bharat ncap', 'global ncap', 'crash test', 'crashworthiness',
  'overloaded vehicle', 'overloading of vehicles', 'vehicle fitness', 'unfit bus',
  'unfit vehicle', 'sadak surakhya', 'sadak suraksha', 'road safety force',
  'road safety initiative', 'road safety campaign',
]

/** Strong terms in Indic scripts (Hindi, close Marathi, Punjabi). Matched as
 *  substrings so inflected forms are covered (दुर्घटना also matches दुर्घटनाओं). */
const STRONG_INDIC = [
  // Hindi / Marathi (Devanagari)
  'सड़क दुर्घटना', 'सड़क हादसा', 'सड़क हादस', 'सड़क सुरक्षा', 'सड़क हादसों', 'रोड सेफ्टी',
  'दुर्घटना', 'दुर्घटनाग्रस्त', 'हादसा', 'हादसे', 'हादसों', 'अपघात', 'भीषण हादसा',
  'यातायात', 'ट्रैफिक', 'चालान', 'हेलमेट', 'सीट बेल्ट', 'नो एंट्री',
  'महामार्ग', 'एक्सप्रेसवे', 'राजमार्ग', 'हाईवे', 'हाइवे', 'फ्लाईओवर',
  'ड्राइविंग लाइसेंस', 'ड्राइविंग लाइसेन्स', 'तेज रफ्तार', 'तेज़ रफ्तार',
  'नशे में गाड़ी', 'शराब पीकर गाड़ी', 'शराब पीकर वाहन',
  'रौंदा', 'रौंद', 'कुचल', 'टक्कर', 'बाइक सवार', 'ओवरलोड', 'रैश ड्राइविंग',
  'मुआवजा', 'मुआवज़ा', 'दुपहिया', 'ट्रक ने', 'बस ने', 'कार ने',
  'टकरा रहे वाहन', 'में टकरा', 'से टकरा', 'वाहन टकरा', 'डिवाइडर बने मौत',
  'ब्लैक स्पॉट', 'दुर्घटना संभावित', 'नो हेलमेट', 'बिना हेलमेट',
  // Punjabi (Gurmukhi)
  'ਸੜਕ ਹਾਦਸ', 'ਹਾਦਸਿਆਂ', 'ਹਾਦਸ', 'ਸੜਕ ਸੁਰੱਖਿਆ', 'ਟ੍ਰੈਫਿਕ', 'ਟ੍ਰੈਫ਼ਿਕ', 'ਦੁਰਘਟਨਾ',
]

/** Weak vehicle / road-actor words. Only relevant with an INCIDENT word too. */
const VEHICLE = [
  'car', 'cars', 'bus', 'buses', 'minibus', 'truck', 'trucks', 'lorry', 'lorries',
  'tanker', 'tempo', 'van', 'suv', 'sedan', 'scooter', 'scooty', 'motorcycle',
  'motorbike', 'motorcyclist', 'bike', 'bikes', 'moped', 'autorickshaw',
  'auto rickshaw', 'e rickshaw', 'rickshaw', 'cab', 'taxi', 'vehicle', 'vehicles',
  'canter', 'trailer', 'container', 'dumper', 'jcb', 'tractor', 'trolley',
  'ambulance', 'school bus', 'roadways bus', 'ksrtc', 'apsrtc', 'tsrtc', 'msrtc',
  'driver', 'motorist', 'motorists', 'rider', 'cyclist', 'commuter', 'commuters',
  'two wheeler', 'three wheeler', 'four wheeler',
]

/** Incident / harm words. Only relevant with a VEHICLE word too. */
const INCIDENT = [
  'crash', 'crashed', 'crashes', 'collision', 'collide', 'collided', 'collides',
  'accident', 'accidents', 'mishap', 'pileup', 'pile up',
  'overturn', 'overturned', 'overturns', 'capsize', 'capsized', 'toppled',
  'skid', 'skidded', 'rammed', 'ramming', 'rams', 'ploughed', 'plowed',
  'mowed down', 'mows down', 'run over', 'ran over', 'runs over', 'run down',
  'knocked down', 'knocked off', 'hit by', 'crushed', 'dragged', 'drags', 'dashed',
  'flung', 'flings', 'hurled', 'trampled',
  'rear ended', 'head on', 'veered', 'plunged', 'fell into', 'swept off',
  'injured', 'injuries', 'grievously', 'hospitalised', 'hospitalized',
  'killed', 'kills', 'dead', 'dies', 'died', 'death', 'deaths', 'fatal',
  'fatalities', 'casualties',
]

/** Conditionally strong: relevant only next to a CONTEXT word. Kills false hits
 *  like a state health scheme headline that happens to say "cashless treatment". */
const CONDITIONAL = [
  'cashless treatment', 'कैशलेस', 'compensation', 'मुआवजा', 'मुआवज़ा',
  'insurance claim', 'claim rejected', 'claim settlement', 'tribunal',
  'golden hour', 'trauma care', 'ambulance', 'first responder', 'इंश्योरेंस',
]
const CONTEXT = [
  'accident', 'crash', 'collision', 'road', 'highway', 'expressway', 'vehicle',
  'motor', 'car', 'bus', 'truck', 'bike', 'biker', 'rider', 'driver', 'pedestrian',
  'two wheeler', 'motorcycle', 'scooter', 'lorry',
  'दुर्घटना', 'हादसा', 'सड़क', 'वाहन', 'अपघात', 'महामार्ग', 'गाड़ी', 'पेट्रोल',
  'परिवहन', 'ड्राइविंग', 'यातायात', 'बाइक',
]

/** A road-place word. An INCIDENT word next to one of these is treated as a
 *  road accident even with no vehicle named ("Fatal crash on Balewadi road"). */
const ROAD_PLACE = [
  'road', 'roads', 'highway', 'highways', 'expressway', 'freeway', 'bypass',
  'flyover', 'carriageway', 'national highway', 'state highway', 'nh', 'sh',
  'ring road', 'service road', 'link road', 'ghat road', 'marg', 'mahamarg',
  'stretch', 'junction', 'chowk', 'crossing', 'underpass', 'overbridge', 'tunnel',
  'सड़क', 'महामार्ग', 'हाईवे', 'चौराह',
]

/** Tier B. Rejects the article UNLESS a STRONG term is present. A VEHICLE+INCIDENT
 *  match is not enough to survive these. */
const SOFT_REJECT = [
  'rally', 'roadshow', 'crore project', 'crore projects', 'crore worth',
  'foundation stone', 'inaugurat', 'urban makeover', 'makeover', 'facelift',
  'gsdp', 'frbm', 'fiscal deficit', 'gst collection', 'revenue',
  'power infrastructure', 'power project', 'electricity', 'transformer',
  'coastline', 'coastal security', 'coast guard',
  'syllabus', 'exam pattern', 'recruitment', 'vacancies', 'logo launch',
  'air pollution', 'pollution control', 'curbing air pollution', 'aqi',
  'flood', 'floods', 'landslide', 'cloudburst', 'waterlogging', 'monsoon fury',
  'by election', 'bypoll', 'assembly election', 'lok sabha', 'vidhan sabha',
  'poll campaign', 'vote share', 'delimitation',
  ' bjp ', ' congress ', ' aap ', 'akali dal', 'ysrcp', ' tvk ', ' dmk ',
  ' aiadmk ', ' tmc ', ' rjd ', ' jdu ', 'shiv sena', ' ncp ', ' cpm ', 'aimim',
  'prime minister', 'pm modi', 'modi to', 'amit shah', 'rahul gandhi',
  'home minister', 'cm mann', 'cm yogi', 'cm addresses', 'cm to inaugurate',
  'पीएम मोदी', 'प्रधानमंत्री', 'मुख्यमंत्री', 'रैली', 'चुनाव', 'शिलान्यास',
  'उद्घाटन', 'करोड़ की सौगात', 'करोड़ के प्रोजेक्ट', 'करोड़ के प्रोजेक्ट्स',
  'कांग्रेस', 'भाजपा', 'बीजेपी', 'युवा कांग्रेस', 'आप सरकार', 'विधायक', 'सांसद',
]

/** For indiankanoon.org only. Judgment titles are just party names, so the
 *  title rule would wrongly drop good motor-accident appeals. Instead require a
 *  motor-accident nexus in the title. */
const KANOON_NEXUS = [
  'insurance', 'assurance', 'motor accident', 'motor vehicles act', 'mact',
  'claims tribunal', 'section 166', 'section 163', 'oriental insurance',
  'new india assurance', 'united india insurance', 'national insurance',
  'reliance general', 'bajaj allianz', 'iffco tokio', 'cholamandalam',
  'icici lombard', 'tata aig', 'sbi general', 'shriram general',
  'lorry', 'truck', 'road accident', 'rash and negligent',
]

// ---------------------------------------------------------------------------
// Matching
// ---------------------------------------------------------------------------

/** Lower-case, turn hyphen/dash groups into spaces, strip punctuation (keep the
 *  dot for "304a"/"3.5 lakh"), collapse whitespace. */
export function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[‘’“”]/g, "'")
    .replace(/\s*[-–—/|]\s*/g, ' ')
    // Keep letters, combining marks (Devanagari matras/virama are \p{M}, not \p{L}
    // - dropping them shatters every Hindi word), numbers, the dot, whitespace.
    .replace(/[^\p{L}\p{M}\p{N}\s.]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function isAsciiWord(term: string): boolean {
  return /^[a-z0-9.]+$/.test(term)
}

/** ASCII single tokens match on a word boundary ("bus" not "business"); phrases
 *  and Devanagari match as plain substrings (so Hindi inflections are covered). */
function hit(hay: string, term: string): boolean {
  const t = term.toLowerCase()
  if (isAsciiWord(t)) {
    return new RegExp(`\\b${t.replace(/\./g, '\\.')}\\b`).test(hay)
  }
  return hay.includes(t)
}

function firstHit(hay: string, terms: string[]): string | null {
  for (const term of terms) if (hit(hay, term)) return term
  return null
}

// ---------------------------------------------------------------------------
// Classification
// ---------------------------------------------------------------------------

export interface Classification {
  relevant: boolean
  reason: string
}

export function classifyArticle(article: FeedArticle): Classification {
  const hay = normalizeTitle(article.title)
  const domain = article.domain.toLowerCase()

  if (!hay) return { relevant: false, reason: 'empty title' }

  const banned = firstHit(hay, ALWAYS_REJECT)
  if (banned) return { relevant: false, reason: `excluded topic "${banned}"` }

  // indiankanoon: party-name titles, judged on a motor-accident nexus instead.
  if (domain === 'indiankanoon.org' || domain.endsWith('.indiankanoon.org')) {
    const nexus = firstHit(hay, KANOON_NEXUS)
    return nexus
      ? { relevant: true, reason: `judgment with motor nexus "${nexus}"` }
      : { relevant: false, reason: 'indiankanoon: no insurance / MACT / motor nexus in title' }
  }

  const strong = firstHit(hay, STRONG) ?? firstHit(hay, STRONG_INDIC)
  const soft = firstHit(hay, SOFT_REJECT)

  if (soft && !strong) {
    return { relevant: false, reason: `soft-negative "${soft.trim()}" and no strong road term` }
  }
  if (strong) {
    return { relevant: true, reason: `strong term "${strong.trim()}"` }
  }

  const conditional = firstHit(hay, CONDITIONAL)
  if (conditional) {
    const context = firstHit(hay, CONTEXT)
    if (context) {
      return {
        relevant: true,
        reason: `"${conditional.trim()}" with road context "${context.trim()}"`,
      }
    }
  }

  const incident = firstHit(hay, INCIDENT)

  const vehicle = firstHit(hay, VEHICLE)
  if (vehicle && incident) {
    return { relevant: true, reason: `vehicle "${vehicle}" + incident "${incident}"` }
  }

  const place = firstHit(hay, ROAD_PLACE)
  if (incident && place) {
    return { relevant: true, reason: `incident "${incident}" on/near "${place}"` }
  }

  return { relevant: false, reason: 'no road / accident / traffic term in title' }
}

// ---------------------------------------------------------------------------
// De-duplication of syndicated headlines
// ---------------------------------------------------------------------------

function signature(title: string): Set<string> {
  const norm = normalizeTitle(title)
  const tokens = norm.split(' ').filter((w) => {
    if (!w || w === '.') return false
    // keep short non-Latin (Devanagari/Gurmukhi) tokens, drop short Latin filler
    return /[^\x00-\x7f]/.test(w) ? w.length >= 2 : w.length >= 4
  })
  return new Set(tokens)
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0
  let shared = 0
  for (const t of a) if (b.has(t)) shared++
  return shared / (a.size + b.size - shared)
}

/** Drops headlines that are near-identical to one already kept (same wire story
 *  re-published by several outlets). Conservative: distinct coverage of the same
 *  event from different angles is kept. */
export function dedupe(articles: FeedArticle[]): {
  kept: FeedArticle[]
  dropped: RejectionRecord[]
} {
  const kept: FeedArticle[] = []
  const sigs: Array<{ title: string; sig: Set<string> }> = []
  const dropped: RejectionRecord[] = []

  for (const article of articles) {
    const sig = signature(article.title)
    const dup = sigs.find((s) => jaccard(s.sig, sig) >= 0.7)
    if (dup) {
      dropped.push({
        title: article.title,
        domain: article.domain,
        reason: `near-duplicate of "${dup.title}"`,
      })
      continue
    }
    kept.push(article)
    sigs.push({ title: article.title, sig })
  }

  return { kept, dropped }
}

// ---------------------------------------------------------------------------
// Orchestration
// ---------------------------------------------------------------------------

export function filterFeed(articles: FeedArticle[]): FilterOutcome {
  const kept: FeedArticle[] = []
  const rejected: RejectionRecord[] = []

  for (const article of articles) {
    const { relevant, reason } = classifyArticle(article)
    if (relevant) kept.push(article)
    else rejected.push({ title: article.title, domain: article.domain, reason })
  }

  const deduped = dedupe(kept)

  return {
    kept: deduped.kept,
    rejected: [...rejected, ...deduped.dropped],
  }
}
