import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { CartProvider } from '@/components/CartContext'
import Navbar from '@/components/Navbar'
import FabWhatsApp from '@/components/FabWhatsApp'
import Footer from '@/components/Footer'
import ScrollAnimations from '@/components/ScrollAnimations'

const LOCALES = ['en', 'ar'] as const
type Locale = (typeof LOCALES)[number]

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }]
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  if (!LOCALES.includes(locale as Locale)) {
    notFound()
  }

  const lang = locale as 'en' | 'ar'
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <CartProvider>
        <Navbar />
        <main>{children}</main>
        <Footer lang={lang} />
        <FabWhatsApp lang={lang} />
        <ScrollAnimations />
      </CartProvider>
    </NextIntlClientProvider>
  )
}
