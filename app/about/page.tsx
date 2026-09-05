import { t } from '@/lib/i18n'

export default function AboutPage() {
  return (
    <div className="max-prose">
      <h1 className="text-2xl font-semibold mb-4">{t('about.title')}</h1>

      <section className="mb-8" aria-labelledby="purpose-heading">
        <h2 id="purpose-heading" className="text-xl font-semibold mb-3">Purpose</h2>
        <p className="mb-3">
          This site helps families in India understand what to do after a road
          accident. It covers the immediate steps, documents to collect, how to
          access cashless treatment, and how to claim compensation.
        </p>
        <p>
          The information is presented in plain language. It is non-commercial and
          does not collect personal data.
        </p>
      </section>

      <section className="mb-8" aria-labelledby="disclaimer-heading">
        <h2 id="disclaimer-heading" className="text-xl font-semibold mb-3">Disclaimer</h2>
        <p className="mb-3">{t('disclaimer.text')}</p>
      </section>

      <section className="mb-8" aria-labelledby="accuracy-heading">
        <h2 id="accuracy-heading" className="text-xl font-semibold mb-3">Accuracy and corrections</h2>
        <p className="mb-3">
          This site tries to be accurate. All legal and procedural claims are
          sourced. If you find an error or outdated information, please report it.
        </p>
        <p>
          {/* TODO: replace errors@example.com with real address before launch */}
          <a href="mailto:errors@example.com">errors@example.com</a>
        </p>
      </section>

      <section className="mb-8" aria-labelledby="privacy-heading">
        <h2 id="privacy-heading" className="text-xl font-semibold mb-3">Privacy</h2>
        <p>
          This site does not use cookies, analytics, or any form of tracking. It
          does not collect personal information. It has no forms.
        </p>
      </section>

      <section className="mb-8" aria-labelledby="tech-heading">
        <h2 id="tech-heading" className="text-xl font-semibold mb-3">Technical notes</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            Built with Next.js, TypeScript, and Tailwind CSS. Statically exported.
          </li>
          <li>
            Policy news on the Updates page is fetched from the GDELT Project at
            build time. No runtime network requests.
          </li>
          <li>No cookies, no analytics, no third-party requests at runtime.</li>
        </ul>
      </section>

      <section className="mb-4" aria-labelledby="sources-heading">
        <h2 id="sources-heading" className="text-xl font-semibold mb-3">Key sources</h2>
        <ul className="list-disc pl-6 space-y-2 text-sm">
          <li>
            <a
              href="https://morth.gov.in/road-accidents-india-2022"
              target="_blank"
              rel="noopener noreferrer"
            >
              MoRTH — Road Accidents in India
            </a>
          </li>
          <li>
            <a
              href="https://mact.hcnlservices.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Motor Vehicles Accident Claims Portal — mact.hcnlservices.in
            </a>
          </li>
          <li>
            <a
              href="https://cdnbbsr.s3waas.gov.in/s3250413d2982f1f83aa62a3a323cd2a87/uploads/2025/05/202505151230594664.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              NHA / MoRTH cashless treatment scheme guidelines (May 2025)
            </a>
          </li>
          <li>
            <a href="https://nalsa.gov.in/" target="_blank" rel="noopener noreferrer">
              National Legal Services Authority (NALSA)
            </a>
          </li>
        </ul>
      </section>
    </div>
  )
}
