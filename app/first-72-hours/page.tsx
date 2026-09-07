import Link from 'next/link'
import PrintButton from '@/components/PrintButton'
import T from '@/components/T'
import { SITE_URL } from '@/lib/site'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'What to do in the first 72 hours',
  description:
    'A step-by-step checklist for the first 72 hours after a road accident in India: ambulance, cashless treatment, informing police, the FIR, the eDAR Victim ID, and free legal aid.',
  path: '/first-72-hours/',
})

const steps = [
  {
    id: 1,
    action: 'Call 112.',
    detail:
      'If the victim is still at the scene, 112 dispatches an ambulance and can identify the nearest designated hospital. If you are already at a hospital, call 112 to confirm whether that hospital is designated under the cashless scheme.',
  },
  {
    id: 2,
    action: 'Get to a designated hospital.',
    detail:
      'Cashless treatment up to ₹1.5 lakh is available for up to 7 days, but only at hospitals designated under the scheme. Call 112 — they can tell you the nearest one. If you are already at a non-designated hospital, ask for stabilisation and then transfer. Do not accept a refusal without asking to speak to the medical superintendent. The NHA portal at nha.gov.in has the full list.',
  },
  {
    id: 3,
    action: 'Tell the hospital this is a road accident case.',
    detail:
      'Use those exact words. This triggers the cashless treatment protocol. The hospital must register the case and request the eDAR Victim ID from police.',
  },
  {
    id: 4,
    action: 'Make sure police are informed within 24 hours.',
    detail:
      'The police must be informed of the accident within 24 hours. If no one has done this yet, call 112 — the call is logged and triggers the process. In life-threatening cases, treatment begins before police confirmation.',
  },
  {
    id: 5,
    action: 'Ask the investigating officer for the eDAR Victim ID.',
    detail:
      'This ID links the hospital treatment record to your case and to the later compensation claim. Ask for it in writing and give a copy to the hospital.',
  },
  {
    id: 6,
    action: 'Ask the police for a copy of the FIR.',
    detail:
      'You are entitled to a free copy immediately. If the officer says they cannot give it yet, ask to speak to the Station House Officer (SHO).',
  },
  {
    id: 7,
    action: 'Ask the hospital for the Medico-Legal Certificate (MLC).',
    detail:
      'In death cases, also ask for the post-mortem report. You are entitled to these.',
  },
  {
    id: 8,
    action: 'Contact the District Legal Services Authority (DLSA) for free legal aid.',
    detail:
      'You do not need to pay a lawyer to start a compensation claim. The DLSA provides free lawyers for road accident cases.',
  },
]

function buildWhatsAppText(): string {
  const title = 'What to do after a road accident in India'
  const lines = [title, '']
  steps.forEach((step) => {
    lines.push(`${step.id}. ${step.action}`)
    lines.push(step.detail)
    lines.push('')
  })
  lines.push(`Full guide: ${SITE_URL}/first-72-hours`)
  return encodeURIComponent(lines.join('\n'))
}

export default function First72HoursPage() {
  const shareHref = `https://wa.me/?text=${buildWhatsAppText()}`

  return (
    <div className="max-prose">
      <h1 className="text-2xl font-semibold mb-2"><T k="72h.title" /></h1>
      <p className="text-sm text-[#6B7280] mb-6">
        <T k="72h.intro" />
      </p>

      <div className="no-print mb-6 flex gap-4 flex-wrap text-sm">
        <a
          href={shareHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1D4ED8]"
        >
          Share on WhatsApp
        </a>
        <PrintButton label="Print this page" />
      </div>

      <ol className="list-decimal pl-6 space-y-6 mb-10">
        {steps.map((step) => (
          <li key={step.id} className="pl-1">
            <p className="mb-1">
              <strong>{step.action}</strong>
            </p>
            <p className="text-[#1A1A1A]">{step.detail}</p>
          </li>
        ))}
      </ol>

      <div className="border-t border-[#E5E7EB] pt-6 mt-8">
        <p className="text-sm text-[#6B7280]">
          None of these steps apply right now?{' '}
          <Link href="/numbers">See all helpline numbers</Link>
        </p>
      </div>
    </div>
  )
}
