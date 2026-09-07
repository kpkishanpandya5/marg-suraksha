import T from '@/components/T'
import { ERROR_REPORT_EMAIL } from '@/lib/site'

export default function Footer() {
  return (
    <footer className="border-t border-[#E5E7EB] bg-[#FAFAFA] mt-16 no-print">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <p className="text-sm text-[#6B7280] max-prose leading-relaxed mb-3">
          <T k="disclaimer.text" />
        </p>
        <p className="text-sm text-[#6B7280]">
          <a href={`mailto:${ERROR_REPORT_EMAIL}`} className="text-[#1D4ED8]">
            <T k="disclaimer.errorLink" />
          </a>
        </p>
      </div>
    </footer>
  )
}
