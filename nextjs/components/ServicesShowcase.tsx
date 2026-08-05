import Image from 'next/image'
import type { ReactNode } from 'react'
import { WA_NUMBERS } from '@/lib/whatsapp'
import { absoluteUrl, safeJsonLd } from '@/lib/seo'

type ServiceLang = 'en' | 'ar'
type Localized = Record<ServiceLang, string>

interface PriceOption {
  label: Localized
  amount: number
}

interface ServiceItem {
  id: string
  image: string
  imageAlt: Localized
  title: Localized
  summary: Localized
  price: number
  cta: Localized
}

type PackageIconName = 'caliper' | 'spacer' | 'guard' | 'flap' | 'spoiler' | 'net' | 'plate'

interface RoxPackageItem {
  label: Localized
  icon: PackageIconName
}

const tintPrices: PriceOption[] = [
  { label: { en: 'Windshield', ar: 'الزجاج الأمامي' }, amount: 200 },
  { label: { en: 'Saloon', ar: 'صالون' }, amount: 600 },
  { label: { en: 'SUV / 4x4', ar: 'دفع رباعي' }, amount: 700 },
]

const roxPackageItems: RoxPackageItem[] = [
  { label: { en: 'Caliper covers', ar: 'أغطية كليبر' }, icon: 'caliper' },
  { label: { en: 'German wheel spacers', ar: 'سبيسر ألماني' }, icon: 'spacer' },
  { label: { en: 'Mud guards', ar: 'رفارف' }, icon: 'guard' },
  { label: { en: 'Mud flaps', ar: 'نسافات' }, icon: 'flap' },
  { label: { en: 'Rear spoiler', ar: 'جناح خلفي' }, icon: 'spoiler' },
  { label: { en: 'Insect net', ar: 'شبك حشرات' }, icon: 'net' },
  { label: { en: 'Number plate base', ar: 'قاعدة لوحة الأرقام' }, icon: 'plate' },
]

const services: ServiceItem[] = [
  {
    id: 'paint-protection-film',
    image: '/assets/services/paint-protection-film.png',
    imageAlt: {
      en: 'Clear paint protection film applied to a vehicle bonnet',
      ar: 'تركيب فيلم حماية شفاف على غطاء محرك السيارة',
    },
    title: { en: 'Paint Protection Film', ar: 'فيلم حماية الطلاء' },
    summary: { en: 'Stops chips before they reach the paint.', ar: 'يصد الحصى قبل وصوله إلى الطلاء.' },
    price: 3500,
    cta: { en: 'Get PPF Quote', ar: 'اطلب السعر' },
  },
  {
    id: 'ceramic-coating',
    image: '/assets/services/ceramic-coating.png',
    imageAlt: {
      en: 'Water beads on ceramic-coated vehicle paint',
      ar: 'قطرات ماء على طلاء سيارة محمي بالسيراميك',
    },
    title: { en: 'Ceramic Coating', ar: 'طلاء السيراميك' },
    summary: { en: 'More gloss. Easier washing.', ar: 'لمعان أكثر وتنظيف أسهل.' },
    price: 750,
    cta: { en: 'Protect My Paint', ar: 'احمِ الطلاء' },
  },
  {
    id: 'car-detailing',
    image: '/assets/services/car-detailing.png',
    imageAlt: {
      en: 'Professional steam detailing of a vehicle interior',
      ar: 'تنظيف داخلي احترافي للسيارة بالبخار',
    },
    title: { en: 'Car Detailing', ar: 'العناية بالسيارة' },
    summary: { en: 'A full interior and exterior reset.', ar: 'تجديد كامل للداخل والخارج.' },
    price: 550,
    cta: { en: 'Book Detailing', ar: 'احجز العناية' },
  },
  {
    id: 'custom-accessories',
    image: '/assets/services/custom-accessories.png',
    imageAlt: {
      en: 'Professional installation of an SUV side step',
      ar: 'تركيب احترافي لدرجة جانبية لسيارة دفع رباعي',
    },
    title: { en: 'Custom Accessories', ar: 'إكسسوارات مخصصة' },
    summary: { en: 'Model-specific parts, fitted properly.', ar: 'قطع مناسبة لطراز سيارتك وتركيب احترافي.' },
    price: 150,
    cta: { en: 'Find Accessories', ar: 'اختر الإكسسوارات' },
  },
]

const copy = {
  en: {
    offerLabel: 'Complete Tint Upgrade',
    offerTitle: 'Nano tint. Three clear prices.',
    offerBody: 'Less heat. More privacy. Clear visibility.',
    offerProof: '99% UV rejection · 10-year warranty',
    offerCta: 'Book Tinting',
    offerNote: 'Sunroofs and oversized glass quoted separately.',
    roxLabel: 'ROX Package',
    roxTitle: 'Seven upgrades. One price.',
    roxBody: 'ROX 01 accessories, installed at your location.',
    roxIncluded: 'Package includes',
    roxWarranty: '5-year warranty on German spacers',
    roxService: 'Home installation',
    roxCta: 'Order ROX Package',
    servicesLabel: 'Our Services',
    servicesTitle: 'Choose what your car needs.',
    from: 'From',
    currency: 'AED',
  },
  ar: {
    offerLabel: 'باقة التظليل المتكاملة',
    offerTitle: 'تظليل نانو. ثلاثة أسعار واضحة.',
    offerBody: 'حرارة أقل. خصوصية أكثر. رؤية واضحة.',
    offerProof: 'حجب 99% من الأشعة فوق البنفسجية · ضمان 10 سنوات',
    offerCta: 'احجز التظليل',
    offerNote: 'تُسعّر فتحات السقف والزجاج الكبير بشكل منفصل.',
    roxLabel: 'باقة روكس',
    roxTitle: 'سبع إضافات. سعر واحد.',
    roxBody: 'إكسسوارات ROX 01 مع التركيب في موقعك.',
    roxIncluded: 'تشمل الباقة',
    roxWarranty: 'ضمان 5 سنوات على السبيسر الألماني',
    roxService: 'تركيب في موقعك',
    roxCta: 'اطلب باقة روكس',
    servicesLabel: 'خدماتنا',
    servicesTitle: 'اختر ما تحتاجه سيارتك.',
    from: 'ابتداءً من',
    currency: 'درهم',
  },
} satisfies Record<ServiceLang, Record<string, string>>

function whatsappMessage(title: string, lang: ServiceLang) {
  const message = lang === 'ar'
    ? `السلام عليكم، أود الاستفسار عن ${title}. أرجو تأكيد السعر والموعد المناسب.`
    : `Hello, I'd like to ask about ${title}. Please confirm the price and next available appointment.`
  return encodeURIComponent(message)
}

function whatsappHref(title: string, lang: ServiceLang) {
  return `https://wa.me/${WA_NUMBERS[0].id}?text=${whatsappMessage(title, lang)}`
}

function PriceTiles({ lang }: { lang: ServiceLang }) {
  const t = copy[lang]

  return (
    <div className="service-prices">
      {tintPrices.map((price) => (
        <div className="service-price" key={price.label.en}>
          <span>{price.label[lang]}</span>
          <div><strong>{price.amount.toLocaleString(lang === 'ar' ? 'ar-AE' : 'en-AE')}</strong> <b>{t.currency}</b></div>
        </div>
      ))}
    </div>
  )
}

function PackageIcon({ name }: { name: PackageIconName }) {
  const paths: Record<PackageIconName, ReactNode> = {
    caliper: <><circle cx="12" cy="12" r="7" /><circle cx="12" cy="12" r="3" /><path d="M17 7.5h3v9h-3" /></>,
    spacer: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 4v2M12 18v2M4 12h2M18 12h2" /></>,
    guard: <path d="M4 19V12a8 8 0 0 1 16 0v7M8 19v-7a4 4 0 0 1 8 0v7" />,
    flap: <path d="M7 4h10l1 16H9L7 4Zm2 4h8" />,
    spoiler: <path d="M3 9h18l-2 4H5L3 9Zm4 4-1 6m11-6 1 6" />,
    net: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m6 8 3 3-3 3 3 3m3-9 3 3-3 3 3 3m3-9 2 2m-2 4 2 2" /></>,
    plate: <><rect x="3" y="7" width="18" height="10" rx="2" /><circle cx="6" cy="10" r=".5" /><circle cx="18" cy="10" r=".5" /></>,
  }

  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

export default function ServicesShowcase({ lang }: { lang: ServiceLang }) {
  const t = copy[lang]
  const arrow = lang === 'ar' ? '←' : '→'
  const roxOfferUrl = `${absoluteUrl(lang)}#rox-offer`
  const roxImageSrc = '/assets/vehicles/rox-adamas-card-v3.png'
  const roxOfferSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: t.roxLabel,
    description: `${t.roxBody} ${t.roxIncluded}: ${roxPackageItems.map((item) => item.label[lang]).join(', ')}.`,
    sku: 'ROX-PACKAGE-3999',
    image: 'https://wadialawir.com/assets/vehicles/rox-adamas-card-v3.png',
    offers: {
      '@type': 'Offer',
      price: 3999,
      priceCurrency: 'AED',
      url: roxOfferUrl,
    },
  }

  return (
    <>
      <section className="section tint-offer" id="tint-offer" aria-labelledby="tint-offer-title">
        <div className="container">
          <article className="tint-offer__card">
            <div className="tint-offer__content">
              <span className="tint-offer__label">{t.offerLabel}</span>
              <h2 id="tint-offer-title">{t.offerTitle}</h2>
              <p>{t.offerBody}</p>
              <strong className="tint-offer__proof">{t.offerProof}</strong>
              <PriceTiles lang={lang} />
              <div className="tint-offer__action">
                <a className="service-cta service-cta--gold" href={whatsappHref(t.offerLabel, lang)} target="_blank" rel="noopener noreferrer">
                  <span>{t.offerCta}</span><span aria-hidden="true">{arrow}</span>
                </a>
                <small>{t.offerNote}</small>
              </div>
            </div>
            <div className="tint-offer__media">
              <Image
                src="/assets/offers/complete-tint-upgrade.png"
                alt=""
                fill
                quality={95}
                sizes="(max-width: 760px) 100vw, 50vw"
                className="tint-offer__image"
              />
            </div>
          </article>
        </div>
      </section>

      <section className="section rox-offer" id="rox-offer" aria-labelledby="rox-offer-title">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(roxOfferSchema) }} />
        <div className="container">
          <article className="rox-offer__card">
            <div className="rox-offer__visual" aria-hidden="true">
              <div className="rox-offer__visual-title"><strong>ROX</strong><span>PACKAGE</span></div>
              <span className="rox-offer__visual-service">{t.roxService}</span>
              <Image
                src={roxImageSrc}
                alt=""
                fill
                quality={95}
                sizes="(max-width: 680px) 100vw, 42vw"
                className="rox-offer__vehicle"
              />
            </div>
            <div className="rox-offer__content">
              <span className="rox-offer__label">{t.roxLabel}</span>
              <h2 id="rox-offer-title">{t.roxTitle}</h2>
              <p>{t.roxBody}</p>
              <div className="rox-offer__price">
                <strong>{(3999).toLocaleString(lang === 'ar' ? 'ar-AE' : 'en-AE')}</strong>
                <span>{t.currency}</span>
              </div>
              <h3 className="rox-offer__included">{t.roxIncluded}</h3>
              <ul className="rox-offer__items">
                {roxPackageItems.map((item) => <li key={item.label.en}><PackageIcon name={item.icon} /><span>{item.label[lang]}</span></li>)}
              </ul>
              <div className="rox-offer__proofs">
                <span>{t.roxService}</span>
                <span>{t.roxWarranty}</span>
              </div>
              <a className="rox-offer__cta" href={whatsappHref(t.roxLabel, lang)} target="_blank" rel="noopener noreferrer">
                <span>{t.roxCta}</span><span aria-hidden="true">{arrow}</span>
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="section services-showcase" id="services" aria-labelledby="services-showcase-title">
        <div className="container">
          <div className="services-showcase__header">
            <span className="section-header__label">{t.servicesLabel}</span>
            <h2 id="services-showcase-title">{t.servicesTitle}</h2>
          </div>

          <div className="services-showcase__grid">
            {services.map((service) => (
              <article className="service-showcase-card" key={service.id}>
                <div className="service-showcase-card__media">
                  <Image
                    src={service.image}
                    alt={service.imageAlt[lang]}
                    fill
                    quality={95}
                    sizes="(max-width: 680px) 50vw, 50vw"
                    className="service-showcase-card__image"
                  />
                </div>
                <div className="service-showcase-card__content">
                  <h3>{service.title[lang]}</h3>
                  <p>{service.summary[lang]}</p>
                  <div className="service-showcase-card__bottom">
                    <div className="service-showcase-card__price">
                      <span>{t.from}</span>
                      <strong>{service.price.toLocaleString(lang === 'ar' ? 'ar-AE' : 'en-AE')}</strong>
                      <small>{t.currency}</small>
                    </div>
                    <a className="service-cta" href={whatsappHref(service.title[lang], lang)} target="_blank" rel="noopener noreferrer">
                      <span>{service.cta[lang]}</span><span aria-hidden="true">{arrow}</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
