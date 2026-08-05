import Image from 'next/image'
import { WA_NUMBERS } from '@/lib/whatsapp'

type OfferLang = 'en' | 'ar'

interface OfferBundle {
  id: string
  image: string
  tag: Record<OfferLang, string>
  kicker: Record<OfferLang, string>
  title: Record<OfferLang, string>
  description: Record<OfferLang, string>
  features: Record<OfferLang, string[]>
  prices: Array<{ label: Record<OfferLang, string>; amount: number }>
  cta: Record<OfferLang, string>
}

const offers: OfferBundle[] = [
  {
    id: 'dubai-heat-protection',
    image: '/assets/offers/dubai-heat-protection.png',
    tag: { en: 'Most popular', ar: 'الأكثر طلباً' },
    kicker: { en: 'Built for Dubai heat', ar: 'مصممة لحرارة دبي' },
    title: { en: 'The Dubai Heat Protection Package', ar: 'باقة الحماية من حر دبي' },
    description: {
      en: 'Make your car noticeably cooler, more private, and protected from Dubai’s heat.',
      ar: 'اجعل سيارتك أكثر برودة وخصوصية، مع حماية مصممة لمواجهة حرارة دبي.',
    },
    features: {
      en: [
        '99% heat rejection',
        '100% UV protection',
        'Clear visibility from inside',
        'Enhanced privacy from outside',
        '10-year warranty',
        'Professional installation',
        'Free pre-installation glass inspection',
        'Free 30-day installation checkup',
      ],
      ar: [
        'عزل حراري بنسبة 99%',
        'حماية 100% من الأشعة فوق البنفسجية',
        'رؤية واضحة من الداخل',
        'خصوصية معززة من الخارج',
        'ضمان لمدة 10 سنوات',
        'تركيب احترافي',
        'فحص مجاني للزجاج قبل التركيب',
        'فحص مجاني للتركيب بعد 30 يوماً',
      ],
    },
    prices: [
      { label: { en: 'Saloon', ar: 'صالون' }, amount: 600 },
      { label: { en: 'SUV', ar: 'دفع رباعي' }, amount: 700 },
    ],
    cta: { en: 'Protect My Car', ar: 'احمِ سيارتي' },
  },
  {
    id: 'complete-tint-upgrade',
    image: '/assets/offers/complete-tint-upgrade.png',
    tag: { en: 'Complete care', ar: 'عناية متكاملة' },
    kicker: { en: 'Every step included', ar: 'كل خطوة مشمولة' },
    title: { en: 'The Complete Tint Upgrade', ar: 'باقة التظليل المتكاملة' },
    description: {
      en: 'Everything your car needs for cooler, safer, more comfortable driving.',
      ar: 'كل ما تحتاجه سيارتك لقيادة أكثر برودة وأماناً وراحة.',
    },
    features: {
      en: [
        'Full nano tint installation',
        '99% heat rejection',
        '100% UV rejection',
        'Privacy without sacrificing interior visibility',
        'Professional glass preparation',
        'Finishing inspection',
        'Aftercare guide',
        '30-day installation check',
        '10-year product warranty',
      ],
      ar: [
        'تركيب تظليل نانو كامل',
        'عزل حراري بنسبة 99%',
        'حجب الأشعة فوق البنفسجية بنسبة 100%',
        'خصوصية من دون التأثير في وضوح الرؤية من الداخل',
        'تجهيز احترافي للزجاج',
        'فحص نهائي لجودة التشطيب',
        'دليل للعناية بعد التركيب',
        'فحص للتركيب بعد 30 يوماً',
        'ضمان للمنتج لمدة 10 سنوات',
      ],
    },
    prices: [
      { label: { en: 'Saloon', ar: 'صالون' }, amount: 600 },
      { label: { en: 'SUV', ar: 'دفع رباعي' }, amount: 700 },
    ],
    cta: { en: 'Upgrade My Car', ar: 'طوّر سيارتي' },
  },
  {
    id: 'protection-promise',
    image: '/assets/offers/protection-promise.png',
    tag: { en: 'Long-term support', ar: 'دعم طويل الأمد' },
    kicker: { en: 'Protection beyond installation', ar: 'حماية تتجاوز التركيب' },
    title: { en: 'The Wadi Al Awir Protection Promise', ar: 'وعد وادي العوير للحماية' },
    description: {
      en: 'Premium tinting, professionally installed, with long-term support.',
      ar: 'تظليل فاخر بتركيب احترافي، مع دعم مستمر بعد الخدمة.',
    },
    features: {
      en: [
        'Nano tint installation',
        '99% heat rejection',
        '100% UV protection',
        'Clear interior visibility',
        'Enhanced exterior privacy',
        'Installation inspection',
        'Digital warranty record',
        'Aftercare guidance',
        '30-day checkup',
        '10-year warranty',
      ],
      ar: [
        'تركيب تظليل نانو',
        'عزل حراري بنسبة 99%',
        'حماية 100% من الأشعة فوق البنفسجية',
        'رؤية واضحة من الداخل',
        'خصوصية معززة من الخارج',
        'فحص جودة التركيب',
        'سجل ضمان رقمي',
        'إرشادات للعناية بعد التركيب',
        'فحص بعد 30 يوماً',
        'ضمان لمدة 10 سنوات',
      ],
    },
    prices: [
      { label: { en: 'Saloon', ar: 'صالون' }, amount: 600 },
      { label: { en: 'SUV', ar: 'دفع رباعي' }, amount: 700 },
      { label: { en: 'Windshield', ar: 'الزجاج الأمامي' }, amount: 200 },
    ],
    cta: { en: 'Claim My Appointment', ar: 'احجز موعدي' },
  },
]

const sectionCopy = {
  en: {
    label: 'Wadi Al Awir offers',
    title: 'Protection Packages',
    subtitle: 'Premium nano tinting packages built around cooler cabins, lasting privacy, and professional aftercare.',
    included: 'What is included',
    currency: 'AED',
    pricing: 'Package pricing',
  },
  ar: {
    label: 'عروض وادي العوير',
    title: 'باقات الحماية لسيارتك',
    subtitle: 'باقات تظليل نانو لحرارة أقل وخصوصية تدوم، مع تركيب احترافي وعناية بعد الخدمة.',
    included: 'مزايا الباقة',
    currency: 'درهم',
    pricing: 'أسعار الباقة',
  },
} satisfies Record<OfferLang, Record<string, string>>

function offerMessage(offer: OfferBundle, lang: OfferLang) {
  const message = lang === 'ar'
    ? `السلام عليكم، أود حجز ${offer.title.ar}. أرجو تأكيد الموعد المناسب.`
    : `Hello, I'd like to book ${offer.title.en}. Please confirm the next available appointment.`

  return encodeURIComponent(message)
}

export default function OfferBundles({ lang }: { lang: OfferLang }) {
  const copy = sectionCopy[lang]
  const arrow = lang === 'ar' ? '←' : '→'

  return (
    <section className="section offers-section" id="services" aria-labelledby="offers-title">
      <div className="container offers-section__inner">
        <div className="section-header offers-section__header">
          <span className="section-header__label">{copy.label}</span>
          <h2 className="section-title" id="offers-title">{copy.title}</h2>
          <p className="section-subtitle">{copy.subtitle}</p>
        </div>

        <div className="offers-grid">
          {offers.map((offer, index) => (
            <article
              className={`offer-card${index === 0 ? ' offer-card--featured' : ''} offer-card--${offer.id}`}
              key={offer.id}
            >
              <div className="offer-card__media" aria-hidden="true">
                <Image
                  src={offer.image}
                  alt=""
                  fill
                  className="offer-card__image"
                  quality={95}
                  sizes="(max-width: 1099px) 100vw, 33vw"
                />
                <div className="offer-card__image-shade" />
              </div>

              <div className="offer-card__content">
                <div className="offer-card__topline">
                  <span className="offer-card__tag">{offer.tag[lang]}</span>
                  <span className="offer-card__kicker">{offer.kicker[lang]}</span>
                </div>

                <h3>{offer.title[lang]}</h3>
                <p className="offer-card__description">{offer.description[lang]}</p>

                <div className="offer-card__included">
                  <span>{copy.included}</span>
                  <ul>
                    {offer.features[lang].map((feature) => <li key={feature}>{feature}</li>)}
                  </ul>
                </div>

                <div className={`offer-card__pricing offer-card__pricing--${offer.prices.length}`} aria-label={copy.pricing}>
                  {offer.prices.map((price) => (
                    <div className="offer-card__price" key={price.label.en}>
                      <span>{price.label[lang]}</span>
                      <strong>{price.amount.toLocaleString(lang === 'ar' ? 'ar-AE' : 'en-AE')}</strong>
                      <small>{copy.currency}</small>
                    </div>
                  ))}
                </div>

                <a
                  href={`https://wa.me/${WA_NUMBERS[0].id}?text=${offerMessage(offer, lang)}`}
                  className="offer-card__cta"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{offer.cta[lang]}</span>
                  <span aria-hidden="true">{arrow}</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="offers-section__promise">
          <span aria-hidden="true">◇</span>
          {lang === 'ar'
            ? 'مواد عالية الجودة، تركيب احترافي، وحماية تدوم.'
            : 'Quality materials. Professional installation. Protection that lasts.'}
        </p>
      </div>
    </section>
  )
}
