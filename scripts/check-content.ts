import helplines from '../content/data/helplines.json' assert { type: 'json' }
import documents from '../content/data/documents.json' assert { type: 'json' }
import stats from '../content/data/stats.json' assert { type: 'json' }

// Any item that will render in the UI must have verified: true
// Any legal or scheme claim must have a sourceUrl

const errors: string[] = []

for (const h of helplines) {
  if (!h.verified) errors.push(`Helpline ${h.id} is not verified`)
  if (!h.sourceUrl) errors.push(`Helpline ${h.id} has no sourceUrl`)
}

for (const d of documents) {
  if (!d.verified) errors.push(`Document ${d.id} is not verified`)
  if (!d.sourceUrl) errors.push(`Document ${d.id} has no sourceUrl`)
}

for (const s of stats) {
  if (!s.verified) errors.push(`Stat ${s.id} is not verified`)
  if (!s.sourceUrl) errors.push(`Stat ${s.id} has no sourceUrl`)
}

if (errors.length > 0) {
  console.error('Content check failed:')
  errors.forEach(e => console.error('  ' + e))
  process.exit(1)
}

console.log('Content check passed.')
