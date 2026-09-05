import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { SITE_NAME } from '@/lib/site'

const notoSans = Noto_Sans({
  subsets: ['latin', 'devanagari'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-noto-sans',
})

export const metadata: Metadata = {
  title: `${SITE_NAME}: help after a road accident in India`,
  description:
    'What to do in the first 72 hours after a road accident in India: documents to collect, cashless treatment, insurance schemes, and how to claim compensation.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={notoSans.variable}>
      <body className="min-h-full">
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
