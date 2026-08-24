import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { CartProvider } from '@/components/CartContext'
import Navbar from '@/components/Navbar'
import FabWhatsApp from '@/components/FabWhatsApp'
import Footer from '@/components/Footer'
import ScrollAnimations from '@/components/ScrollAnimations'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import { SITE_NAME, SITE_URL } from '@/lib/seo'
import '../globals.css'

const LOCALES = ['en', 'ar'] as const
type Locale = (typeof LOCALES)[number]

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: 'Jetour and ROX car accessories, window tinting and installation support in Al Awir, Dubai.',
  applicationName: SITE_NAME,
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }]
}

export const revalidate = 300

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  if (!LOCALES.includes(locale as Locale)) {
    notFound()
  }

  const lang = locale as 'en' | 'ar'
  setRequestLocale(lang)
  const messages = await getMessages()

  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} data-scroll-behavior="smooth">
      <body>
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            <Navbar />
            <main>{children}</main>
            <Footer lang={lang} />
            <FabWhatsApp lang={lang} />
            <ScrollAnimations />
            <GoogleAnalytics />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
