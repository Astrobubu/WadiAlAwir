import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isLocale, localizedAlternates } from '@/lib/seo'

interface ReturnsPageProps {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }]
}

export async function generateMetadata({ params }: ReturnsPageProps): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  return {
    title: locale === 'ar' ? 'الإرجاع والضمان والاسترداد' : 'Returns, Warranty & Refunds',
    description:
      locale === 'ar'
        ? 'معلومات التواصل بشأن الإرجاع والضمان والاسترداد لدى وادي العوير.'
        : 'How to contact Wadi Al Awir about a return, warranty claim or refund request.',
    alternates: localizedAlternates(locale, '/returns'),
  }
}

export default async function ReturnsPage({ params }: ReturnsPageProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const isArabic = locale === 'ar'
  const message = encodeURIComponent(
    isArabic
      ? 'السلام عليكم، لدي استفسار بخصوص الإرجاع أو الضمان'
      : 'Hello, I have a question about a return or warranty claim'
  )

  return (
    <main className="policy-page section">
      <article className="container policy-page__content">
        <nav className="breadcrumb" aria-label={isArabic ? 'مسار التنقل' : 'Breadcrumb'}>
          <Link href={`/${locale}`}>{isArabic ? 'الرئيسية' : 'Home'}</Link>
          <span className="breadcrumb__sep">/</span>
          <span className="breadcrumb__current">
            {isArabic ? 'الإرجاع والضمان والاسترداد' : 'Returns, Warranty & Refunds'}
          </span>
        </nav>
        <h1>{isArabic ? 'الإرجاع والضمان والاسترداد' : 'Returns, Warranty & Refunds'}</h1>
        <p className="policy-page__updated">
          {isArabic ? 'آخر تحديث: 5 أبريل 2026' : 'Last updated: April 5, 2026'}
        </p>
        <p>
          {isArabic
            ? 'لأي طلب إرجاع أو مطالبة ضمان أو استرداد، يرجى التواصل معنا مباشرة عبر واتساب. تأكد من وجود الفاتورة معك عند التواصل.'
            : 'For any return, warranty claim or refund request, please contact us directly through WhatsApp. Have your receipt ready when you reach out.'}
        </p>
        <p>
          {isArabic
            ? 'سيقوم فريقنا بمراجعة طلبك وإرشادك خلال العملية.'
            : 'Our team will review your request and guide you through the process.'}
        </p>
        <h2>{isArabic ? 'تواصل معنا' : 'Contact Us'}</h2>
        <p>
          {isArabic
            ? 'أرسل رقم الفاتورة وتفاصيل المنتج وصوراً توضح الحالة عند الحاجة.'
            : 'Send the receipt number, product details and photos showing the condition when relevant.'}
        </p>
        <a
          className="btn btn--whatsapp"
          href={`https://wa.me/971553573156?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {isArabic ? 'تواصل عبر واتساب' : 'Contact us on WhatsApp'}
        </a>
      </article>
    </main>
  )
}
