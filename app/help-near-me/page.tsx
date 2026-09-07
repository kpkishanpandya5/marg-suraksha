import statesData from '@/content/data/states.json'
import helplinesData from '@/content/data/helplines.json'
import { t } from '@/lib/i18n'
import { pageMetadata } from '@/lib/metadata'
import { ERROR_REPORT_EMAIL } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Help near you',
  description:
    'Find your local Motor Accidents Claims Tribunal and District Legal Services Authority in India, plus the national emergency numbers that work everywhere.',
  path: '/help-near-me/',
})

export default function HelpNearMePage() {
  return (
    <div className="max-prose">
      <h1 className="text-2xl font-semibold mb-2">{t('helpNearMe.title')}</h1>
      <p className="text-[#6B7280] mb-6">
        Select your state and district to find your local MACT tribunal and
        District Legal Services Authority (DLSA).
      </p>

      <div className="border border-[#E5E7EB] p-4 mb-8 bg-white">
        <p className="font-semibold mb-2">National numbers that always work</p>
        <ul className="list-none p-0 space-y-2">
          {helplinesData.map((h) => (
            <li key={h.id}>
              <strong className="text-lg">{h.number}</strong>{' '}
              <span className="text-[#6B7280]">— {h.whatItIsFor}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-8">
        {statesData.map((state) => (
          <section key={state.slug} aria-labelledby={`state-${state.slug}`}>
            <h2
              id={`state-${state.slug}`}
              className="text-xl font-semibold mb-1"
            >
              {state.state}
            </h2>

            {!state.verified && (
              <p className="text-sm text-[#6B7280] mb-3 border-l-4 border-[#E5E7EB] pl-3">
                We have not verified office details for {state.state} yet. The
                national numbers above work everywhere in India.
              </p>
            )}

            {state.verified && state.ambulanceNumber && (
              <p className="mb-2 text-sm">
                Ambulance:{' '}
                <strong>{state.ambulanceNumber}</strong>
              </p>
            )}

            {state.verified && state.policeFirPortalUrl && (
              <p className="mb-2 text-sm">
                FIR portal:{' '}
                <a
                  href={state.policeFirPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {state.policeFirPortalUrl}
                </a>
              </p>
            )}

            {state.verified && state.stateLegalServicesAuthorityUrl && (
              <p className="mb-2 text-sm">
                State Legal Services Authority:{' '}
                <a
                  href={state.stateLegalServicesAuthorityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {state.stateLegalServicesAuthorityUrl}
                </a>
              </p>
            )}

            {state.districts.length > 0 && (
              <div className="mt-3 space-y-4">
                {state.districts.map((district) => (
                  <div
                    key={district.slug}
                    className="pl-4 border-l-2 border-[#E5E7EB]"
                  >
                    <h3 className="font-semibold mb-1">{district.district}</h3>

                    {district.verified && district.dlsaOffice && (
                      <div className="mb-2 text-sm">
                        <p className="font-medium">{district.dlsaOffice.name}</p>
                        {district.dlsaOffice.address && (
                          <p className="text-[#6B7280]">{district.dlsaOffice.address}</p>
                        )}
                        {district.dlsaOffice.phone && (
                          <p>
                            Tel:{' '}
                            <a href={`tel:${district.dlsaOffice.phone}`}>
                              {district.dlsaOffice.phone}
                            </a>
                          </p>
                        )}
                      </div>
                    )}

                    {district.verified && district.mactTribunal && (
                      <div className="text-sm">
                        <p className="font-medium">{district.mactTribunal.name}</p>
                        {district.mactTribunal.address && (
                          <p className="text-[#6B7280]">{district.mactTribunal.address}</p>
                        )}
                      </div>
                    )}

                    {!district.verified && (
                      <p className="text-sm text-[#6B7280]">
                        Not verified yet. Search for{' '}
                        <strong>
                          District Legal Services Authority {district.district}
                        </strong>
                        , or call 112.
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            <hr className="mt-6 border-[#E5E7EB]" />
          </section>
        ))}
      </div>

      <p className="mt-6 text-sm text-[#6B7280]">
        Data is incomplete for most states and districts.{' '}
        <a href={`mailto:${ERROR_REPORT_EMAIL}`}>Help us improve this page.</a>
      </p>
    </div>
  )
}
