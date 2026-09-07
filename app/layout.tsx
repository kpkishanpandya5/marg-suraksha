import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { SITE_NAME, SITE_NAME_DEVANAGARI, SITE_URL } from '@/lib/site'
import { DEFAULT_DESCRIPTION, KEYWORDS, OG_IMAGE } from '@/lib/metadata'

const notoSans = Noto_Sans({
  subsets: ['latin', 'devanagari'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-noto-sans',
})

const HOME_TITLE = `${SITE_NAME} (${SITE_NAME_DEVANAGARI}): help after a road accident in India`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: HOME_TITLE,
  description: DEFAULT_DESCRIPTION,
  keywords: KEYWORDS,
  alternates: {
    canonical: '/',
    languages: { 'en-IN': '/', 'hi-IN': '/', 'x-default': '/' },
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_IN',
    alternateLocale: ['hi_IN'],
    url: SITE_URL,
    title: HOME_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },
}

// Applies the saved language before first paint so there is no English flash.
const LANG_INIT = `try{if(localStorage.getItem('lang')==='hi'){document.documentElement.setAttribute('data-lang','hi');document.documentElement.setAttribute('lang','hi')}}catch(e){}`

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      alternateName: [SITE_NAME_DEVANAGARI, 'सड़क सुरक्षा', 'Sadak Suraksha', 'road accident help India'],
      description:
        'Help after a road accident in India. भारत में सड़क दुर्घटना के बाद क्या करें: दस्तावेज़, कैशलेस इलाज, बीमा और मुआवज़ा।',
      inLanguage: ['en-IN', 'hi-IN'],
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#org`,
      name: SITE_NAME,
      alternateName: SITE_NAME_DEVANAGARI,
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/og-image.png`,
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      data-lang="en"
      className={notoSans.variable}
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <script dangerouslySetInnerHTML={{ __html: LANG_INIT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <div className="flex flex-col min-h-screen">
          <Nav />
          <main className="flex-1 mx-auto w-full max-w-4xl px-4 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
