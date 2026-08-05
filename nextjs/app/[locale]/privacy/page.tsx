import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isLocale, localizedAlternates } from '@/lib/seo'

interface PolicyPageProps {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }]
}

export async function generateMetadata({ params }: PolicyPageProps): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  return {
    title: locale === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy',
    description:
      locale === 'ar'
        ? 'سياسة خصوصية موقع وادي العوير لزينة السيارات.'
        : 'Privacy policy for the Wadi Al Awir Car Accessories website.',
    alternates: localizedAlternates(locale, '/privacy'),
  }
}

export default async function PrivacyPage({ params }: PolicyPageProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const isArabic = locale === 'ar'

  return (
    <main className="policy-page section">
      <article className="container policy-page__content">
        <nav className="breadcrumb" aria-label={isArabic ? 'مسار التنقل' : 'Breadcrumb'}>
          <Link href={`/${locale}`}>{isArabic ? 'الرئيسية' : 'Home'}</Link>
          <span className="breadcrumb__sep">/</span>
          <span className="breadcrumb__current">{isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}</span>
        </nav>
        <h1>{isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}</h1>
        <p className="policy-page__updated">
          {isArabic ? 'آخر تحديث: 5 أبريل 2026' : 'Last updated: April 5, 2026'}
        </p>

        <p>
          {isArabic
            ? 'وادي العوير لزينة السيارات (نحن) نحترم خصوصيتك. توضح هذه السياسة المعلومات التي نجمعها عند زيارتك لموقع wadialawir.com وكيفية استخدامها.'
            : 'Wadi Al Awir Car Accessories (we, us) respects your privacy. This policy explains what information we collect when you visit wadialawir.com and how we use it.'}
        </p>

        <h2>{isArabic ? 'المعلومات التي نجمعها' : 'Information We Collect'}</h2>
        <ul>
          <li>
            {isArabic
              ? 'Google Analytics: نستخدم Google Analytics لفهم حركة الموقع. يجمع بيانات مجهولة مثل الصفحات التي تمت زيارتها ووقت التصفح ونوع الجهاز والموقع التقريبي. لا يتم جمع أي معلومات شخصية من خلال Analytics.'
              : 'Google Analytics: We use Google Analytics to understand site traffic. It collects anonymous data such as pages visited, time on site, device type and approximate location. No personally identifiable information is collected through Analytics.'}
          </li>
          <li>
            {isArabic
              ? 'التخزين المحلي: نحفظ تفضيل اللغة ومحتويات سلة التسوق في متصفحك. تبقى هذه البيانات على جهازك ولا تُرسل إلى خوادمنا.'
              : 'Local storage: We store your language preference and shopping cart contents in your browser. This data stays on your device and is not sent to our servers.'}
          </li>
        </ul>

        <h2>{isArabic ? 'الحسابات وملفات تعريف الارتباط' : 'Accounts and Cookies'}</h2>
        <p>
          {isArabic
            ? 'لا نطلب إنشاء حساب أو تسجيل دخول. لا نستخدم ملفات تعريف ارتباط إعلانية أو أدوات تتبع تسويقية من أطراف ثالثة.'
            : 'We do not require account creation or login. We do not use advertising cookies or third-party marketing trackers.'}
        </p>

        <h2>{isArabic ? 'التواصل عبر واتساب' : 'WhatsApp Communication'}</h2>
        <p>
          {isArabic
            ? 'عند تواصلك معنا عبر واتساب، تصل رسائلك إلى رقم واتساب الأعمال الخاص بنا. تخضع الرسائل لسياسة خصوصية واتساب، ونستخدمها لمعالجة الطلبات والرد على الاستفسارات.'
            : 'When you contact us through WhatsApp, your messages go to our business WhatsApp number. Messages are governed by WhatsApp’s privacy policy and are used to process orders and answer inquiries.'}
        </p>

        <h2>{isArabic ? 'خدمات الطرف الثالث' : 'Third-Party Services'}</h2>
        <ul>
          <li>{isArabic ? 'Google Analytics لتحليل حركة الموقع.' : 'Google Analytics for site traffic analysis.'}</li>
          <li>{isArabic ? 'Google Fonts لتحميل الخطوط.' : 'Google Fonts for loading web fonts.'}</li>
          <li>{isArabic ? 'تابي؛ تُعرض شعارات الدفع وتتم المعالجة في المتجر.' : 'Tabby; payment logos are displayed and processing takes place in store.'}</li>
        </ul>

        <h2>{isArabic ? 'تواصل معنا' : 'Contact Us'}</h2>
        <p>
          {isArabic
            ? 'لأسئلة الخصوصية، تواصل معنا عبر واتساب على 3156 357 55 971+ أو زر متجرنا في العوير الأولى، دبي، الإمارات.'
            : 'For privacy questions, contact us on WhatsApp at +971 55 357 3156 or visit our shop in Al Awir 1, Dubai, UAE.'}
        </p>
      </article>
    </main>
  )
}
