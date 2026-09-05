import { t } from '@/lib/i18n'
import { ERROR_REPORT_EMAIL } from '@/lib/site'

export default function Footer() {
  return (
    <footer className="border-t border-[#E5E7EB] bg-[#FAFAFA] mt-16 no-print">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <p className="text-sm text-[#6B7280] max-prose leading-relaxed mb-3">
          {t('disclaimer.text')}
        </p>
        <p className="text-sm text-[#6B7280]">
          <a href={`mailto:${ERROR_REPORT_EMAIL}`} className="text-[#1D4ED8]">
            {t('disclaimer.errorLink')}
          </a>
        </p>
      </div>
    </footer>
  )
}
