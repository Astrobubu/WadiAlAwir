import Image from 'next/image'
import { WA_NUMBERS } from '@/lib/whatsapp'

type ServiceLang = 'en' | 'ar'

type Localized = Record<ServiceLang, string>

interface PriceOption {
  label: Localized
  amount: number
  detail?: Localized
}

interface ServiceItem {
  id: string
  image: string
  imageAlt: Localized
  icon: 'tint' | 'shield' | 'drop' | 'detail' | 'wrench'
  title: Localized
  purpose: Localized
  description: Localized
  points: Record<ServiceLang, string[]>
  prices: PriceOption[]
  priceNote?: Localized
  cta: Localized
}

const tintPrices: PriceOption[] = [
  {
    label: { en: 'Windshield only', ar: 'الزجاج الأمامي فقط' },
    amount: 200,
    detail: { en: 'Front glass', ar: 'الزجاج الأمامي' },
  },
  {
    label: { en: 'Saloon', ar: 'سيارة صالون' },
    amount: 600,
    detail: { en: 'Side + rear glass', ar: 'الجوانب + الزجاج الخلفي' },
  },
  {
    label: { en: 'SUV / 4x4', ar: 'دفع رباعي' },
    amount: 700,
    detail: { en: 'Side + rear glass', ar: 'الجوانب + الزجاج الخلفي' },
  },
]

const services: ServiceItem[] = [
  {
    id: 'window-tinting',
    image: '/assets/offers/complete-tint-upgrade.png',
    imageAlt: {
      en: 'Professional nano-ceramic window tint installation',
      ar: 'تركيب احترافي لتظليل زجاج نانو سيراميك',
    },
    icon: 'tint',
    title: { en: 'Window Tinting', ar: 'تظليل الزجاج' },
    purpose: { en: 'For cabin heat, glare and privacy', ar: 'لحرارة المقصورة والوهج والخصوصية' },
    description: {
      en: 'Nano-ceramic film works through the glass to reduce infrared heat while preserving clear visibility from inside.',
      ar: 'فيلم نانو سيراميك يعمل عبر الزجاج لتقليل حرارة الأشعة تحت الحمراء مع الحفاظ على وضوح الرؤية من الداخل.',
    },
    points: {
      en: ['Up to 99% UV rejection', 'Metal-free and signal friendly', '10-year product warranty'],
      ar: ['حجب للأشعة فوق البنفسجية حتى 99%', 'من دون معدن ولا يؤثر في الإشارة', 'ضمان للمنتج لمدة 10 سنوات'],
    },
    prices: tintPrices,
    priceNote: {
      en: 'Sunroof and oversized glass are quoted after inspection.',
      ar: 'يُحدد سعر فتحة السقف والزجاج الكبير بعد الفحص.',
    },
    cta: { en: 'Book Tinting', ar: 'احجز التظليل' },
  },
  {
    id: 'paint-protection-film',
    image: '/assets/services/paint-protection-film.png',
    imageAlt: {
      en: 'Clear paint protection film applied to a vehicle bonnet',
      ar: 'تركيب فيلم حماية شفاف على غطاء محرك السيارة',
    },
    icon: 'shield',
    title: { en: 'Paint Protection Film', ar: 'فيلم حماية الطلاء' },
    purpose: { en: 'For stone chips and road damage', ar: 'للحماية من الحصى وأضرار الطريق' },
    description: {
      en: 'A nearly invisible physical film takes the impact before your factory paint does.',
      ar: 'طبقة حماية شبه غير مرئية تمتص الصدمات قبل وصولها إلى طلاء المصنع.',
    },
    points: {
      en: ['Self-heals light surface marks', 'Protects high-impact panels', 'Gloss or matte finish options'],
      ar: ['تعالج العلامات السطحية الخفيفة ذاتياً', 'تحمي الأجزاء الأكثر عرضة للصدمات', 'خيارات تشطيب لامع أو مطفي'],
    },
    prices: [
      { label: { en: 'High-impact front', ar: 'حماية الواجهة الأمامية' }, amount: 3500 },
      { label: { en: 'Full body', ar: 'حماية الهيكل بالكامل' }, amount: 6500 },
    ],
    priceNote: {
      en: 'Starting prices. Final quote depends on vehicle size and panel complexity.',
      ar: 'أسعار تبدأ من المبلغ الموضح، ويعتمد السعر النهائي على حجم السيارة وتعقيد الأجزاء.',
    },
    cta: { en: 'Get a PPF Quote', ar: 'اطلب سعر الحماية' },
  },
  {
    id: 'ceramic-coating',
    image: '/assets/services/ceramic-coating.png',
    imageAlt: {
      en: 'Hydrophobic water beads on ceramic-coated vehicle paint',
      ar: 'قطرات ماء طاردة على طلاء سيارة محمي بطبقة سيراميك',
    },
    icon: 'drop',
    title: { en: 'Ceramic Coating', ar: 'طلاء السيراميك' },
    purpose: { en: 'For gloss and easier washing', ar: 'للّمعان وسهولة التنظيف' },
    description: {
      en: 'A liquid coating bonds to the paint, creating a slick hydrophobic surface that resists grime and chemical staining.',
      ar: 'طبقة سائلة ترتبط بالطلاء لتكوين سطح طارد للماء يقاوم الأوساخ والبقع الكيميائية.',
    },
    points: {
      en: ['Strong water beading', 'Easier routine cleaning', 'Adds depth and gloss to paint'],
      ar: ['طرد قوي للماء', 'تنظيف دوري أسهل', 'لمعان وعمق أوضح للطلاء'],
    },
    prices: [
      { label: { en: '1-year protection', ar: 'حماية لمدة سنة' }, amount: 750 },
      { label: { en: '3-year protection', ar: 'حماية لمدة 3 سنوات' }, amount: 1200 },
    ],
    priceNote: {
      en: 'Starting prices. Paint correction, when required, is quoted separately.',
      ar: 'أسعار تبدأ من المبلغ الموضح، ويُسعّر تصحيح الطلاء بشكل منفصل عند الحاجة.',
    },
    cta: { en: 'Protect My Paint', ar: 'احمِ طلاء سيارتي' },
  },
  {
    id: 'car-detailing',
    image: '/assets/services/car-detailing.png',
    imageAlt: {
      en: 'Professional steam detailing of a premium vehicle interior',
      ar: 'تنظيف داخلي احترافي بالبخار لسيارة فاخرة',
    },
    icon: 'detail',
    title: { en: 'Car Detailing', ar: 'العناية التفصيلية بالسيارة' },
    purpose: { en: 'For a deep interior and exterior reset', ar: 'لتجديد شامل للداخل والخارج' },
    description: {
      en: 'Deep cabin cleaning and exterior finishing restore the surfaces you see and touch every day.',
      ar: 'تنظيف عميق للمقصورة وتشطيب خارجي يعيدان الحيوية للأسطح التي تراها وتستخدمها يومياً.',
    },
    points: {
      en: ['Seats, carpets and trim deep-cleaned', 'Exterior decontamination and polish', 'Final cabin and paint inspection'],
      ar: ['تنظيف عميق للمقاعد والسجاد والتشطيبات', 'إزالة ملوثات السطح وتلميع خارجي', 'فحص نهائي للمقصورة والطلاء'],
    },
    prices: [
      { label: { en: 'Saloon full detail', ar: 'عناية كاملة للصالون' }, amount: 550 },
      { label: { en: 'SUV full detail', ar: 'عناية كاملة للدفع الرباعي' }, amount: 650 },
    ],
    priceNote: {
      en: 'Heavy stain removal and paint correction are assessed before work.',
      ar: 'تُقيّم البقع الصعبة وتصحيح الطلاء قبل بدء العمل.',
    },
    cta: { en: 'Refresh My Car', ar: 'جدّد سيارتي' },
  },
  {
    id: 'custom-accessories',
    image: '/assets/services/custom-accessories.png',
    imageAlt: {
      en: 'Professional installation of a premium SUV side step',
      ar: 'تركيب احترافي لدرجة جانبية لسيارة دفع رباعي',
    },
    icon: 'wrench',
    title: { en: 'Custom Accessories', ar: 'إكسسوارات مخصصة' },
    purpose: { en: 'For function, protection and style', ar: 'للوظيفة والحماية والمظهر' },
    description: {
      en: 'Model-specific accessories selected for correct fit, then installed and checked by our workshop team.',
      ar: 'إكسسوارات مخصصة لطراز سيارتك لضمان الملاءمة، ثم يركبها فريق الورشة ويفحصها.',
    },
    points: {
      en: ['Vehicle-specific fitment', 'Professional installation', 'Price confirmed before fitting'],
      ar: ['ملاءمة مخصصة لطراز السيارة', 'تركيب احترافي', 'تأكيد السعر قبل التركيب'],
    },
    prices: [
      { label: { en: 'Individual accessories from', ar: 'إكسسوارات فردية تبدأ من' }, amount: 150 },
    ],
    priceNote: {
      en: 'The final price depends on the selected product and vehicle model.',
      ar: 'يعتمد السعر النهائي على المنتج المختار وطراز السيارة.',
    },
    cta: { en: 'Find My Accessories', ar: 'اعثر على إكسسوارات سيارتي' },
  },
]

const copy = {
  en: {
    offerLabel: 'Complete Tint Upgrade',
    offerTitle: 'One tint package. Clear coverage. Clear pricing.',
    offerBody: 'Choose the glass coverage your car needs. Every option uses nano-ceramic film, professional glass preparation and a finishing inspection.',
    offerPoints: ['Reduces infrared heat', 'Rejects up to 99% of UV', 'Clear visibility from inside', '10-year product warranty'],
    offerCta: 'Book My Tint Upgrade',
    offerNote: 'Exact coverage is confirmed before installation. Sunroof and oversized glass are quoted separately.',
    servicesLabel: 'Our Services',
    servicesTitle: 'Different protection for different problems.',
    servicesBody: 'Tint controls heat through the glass. PPF absorbs road impact. Ceramic makes paint easier to maintain. Detailing restores the car. Accessories add function and style.',
    purposeLabel: 'Best for',
    from: 'From',
    currency: 'AED',
    locationTitle: 'Wadi Al Awir, Dubai',
    locationBody: 'Visit our Al Awir workshop for inspection, fitting and aftercare.',
    quoteTitle: 'Inspection before the final quote',
    quoteBody: 'Vehicle size, paint condition and panel complexity can change the work required.',
    installTitle: 'Professional installation',
    installBody: 'Every job is prepared, fitted and checked before handover.',
  },
  ar: {
    offerLabel: 'باقة التظليل المتكاملة',
    offerTitle: 'باقة تظليل واحدة، وتغطية وسعر واضحان.',
    offerBody: 'اختر تغطية الزجاج التي تحتاجها سيارتك. تشمل كل الخيارات فيلم نانو سيراميك وتجهيزاً احترافياً للزجاج وفحصاً نهائياً.',
    offerPoints: ['تقليل حرارة الأشعة تحت الحمراء', 'حجب حتى 99% من الأشعة فوق البنفسجية', 'رؤية واضحة من الداخل', 'ضمان للمنتج لمدة 10 سنوات'],
    offerCta: 'احجز باقة التظليل',
    offerNote: 'تُؤكد التغطية قبل التركيب، ويُحدد سعر فتحة السقف والزجاج الكبير بشكل منفصل.',
    servicesLabel: 'خدماتنا',
    servicesTitle: 'حماية مختلفة لكل احتياج.',
    servicesBody: 'التظليل يعالج الحرارة عبر الزجاج، وفيلم الحماية يمتص صدمات الطريق، والسيراميك يسهل العناية بالطلاء، والتفصيل يجدد السيارة، والإكسسوارات تضيف الوظيفة والمظهر.',
    purposeLabel: 'الأنسب لـ',
    from: 'ابتداءً من',
    currency: 'درهم',
    locationTitle: 'وادي العوير، دبي',
    locationBody: 'زر ورشتنا في العوير للفحص والتركيب وخدمة ما بعد التركيب.',
    quoteTitle: 'فحص قبل اعتماد السعر النهائي',
    quoteBody: 'قد يؤثر حجم السيارة وحالة الطلاء وتعقيد الأجزاء في حجم العمل المطلوب.',
    installTitle: 'تركيب احترافي',
    installBody: 'نجهز كل عمل ونركبه ونفحصه قبل تسليم السيارة.',
  },
} satisfies Record<ServiceLang, Record<string, string | string[]>>

function ServiceIcon({ icon }: { icon: ServiceItem['icon'] }) {
  if (icon === 'shield') {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M12 3 4.5 6v5.5c0 4.7 3 7.9 7.5 9.5 4.5-1.6 7.5-4.8 7.5-9.5V6L12 3Z"/><path d="m8.8 12 2.1 2.1 4.5-4.6"/></svg>
  }
  if (icon === 'drop') {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M12 2.8s-6 7.1-6 12a6 6 0 0 0 12 0c0-4.9-6-12-6-12Z"/><path d="M9 15.2a3.2 3.2 0 0 0 3.2 2.7"/></svg>
  }
  if (icon === 'detail') {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m12 2 1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2Z"/><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"/></svg>
  }
  if (icon === 'wrench') {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M14.8 6.5a4.7 4.7 0 0 0-6.2 5.9l-5.2 5.2a2.1 2.1 0 0 0 3 3l5.2-5.2a4.7 4.7 0 0 0 5.9-6.2l-2.8 2.8-2.7-.7-.7-2.7 3.5-2.1Z"/></svg>
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 6.5h14l-1 11H6l-1-11Z"/><path d="m8 9 8 6M16 9l-8 6"/></svg>
}

function whatsappMessage(title: string, lang: ServiceLang) {
  const message = lang === 'ar'
    ? `السلام عليكم، أود الاستفسار عن ${title}. أرجو تأكيد السعر والموعد المناسب.`
    : `Hello, I'd like to ask about ${title}. Please confirm the price and next available appointment.`
  return encodeURIComponent(message)
}

function PriceTiles({ prices, lang, compact = false }: { prices: PriceOption[]; lang: ServiceLang; compact?: boolean }) {
  return (
    <div className={`service-prices${compact ? ' service-prices--compact' : ''}`}>
      {prices.map((price) => (
        <div className="service-price" key={price.label.en}>
          <span>{price.label[lang]}</span>
          {price.detail && <small>{price.detail[lang]}</small>}
          <div><strong>{price.amount.toLocaleString(lang === 'ar' ? 'ar-AE' : 'en-AE')}</strong> <b>{copy[lang].currency}</b></div>
        </div>
      ))}
    </div>
  )
}

export default function ServicesShowcase({ lang }: { lang: ServiceLang }) {
  const t = copy[lang]
  const arrow = lang === 'ar' ? '←' : '→'
  const tint = services[0]

  return (
    <>
      <section className="section tint-offer" id="tint-offer" aria-labelledby="tint-offer-title">
        <div className="container">
          <article className="tint-offer__card">
            <div className="tint-offer__media" aria-hidden="true">
              <Image src={tint.image} alt="" fill quality={95} sizes="(max-width: 800px) 100vw, 50vw" className="tint-offer__image" />
            </div>
            <div className="tint-offer__content">
              <span className="section-header__label">{t.offerLabel}</span>
              <h2 id="tint-offer-title">{t.offerTitle}</h2>
              <p>{t.offerBody}</p>
              <ul className="tint-offer__points">
                {(t.offerPoints as string[]).map((point) => <li key={point}>{point}</li>)}
              </ul>
              <PriceTiles prices={tintPrices} lang={lang} />
              <p className="tint-offer__note">{t.offerNote}</p>
              <a className="service-cta service-cta--gold" href={`https://wa.me/${WA_NUMBERS[0].id}?text=${whatsappMessage(t.offerLabel as string, lang)}`} target="_blank" rel="noopener noreferrer">
                <span>{t.offerCta}</span><span aria-hidden="true">{arrow}</span>
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="section services-showcase" id="services" aria-labelledby="services-showcase-title">
        <div className="container services-showcase__inner">
          <div className="section-header services-showcase__header">
            <span className="section-header__label">{t.servicesLabel}</span>
            <h2 className="section-title" id="services-showcase-title">{t.servicesTitle}</h2>
            <p className="section-subtitle">{t.servicesBody}</p>
          </div>

          <div className="services-showcase__grid">
            {services.map((service, index) => (
              <article className={`service-showcase-card service-showcase-card--${service.id}${index === 0 ? ' service-showcase-card--wide' : ''}`} key={service.id}>
                <div className="service-showcase-card__media">
                  <Image src={service.image} alt={service.imageAlt[lang]} fill quality={95} sizes={index === 0 ? '(max-width: 900px) 100vw, 50vw' : '(max-width: 900px) 100vw, 33vw'} className="service-showcase-card__image" />
                  <div className="service-showcase-card__shade" />
                </div>
                <div className="service-showcase-card__content">
                  <div className="service-showcase-card__icon"><ServiceIcon icon={service.icon} /></div>
                  <h3>{service.title[lang]}</h3>
                  <div className="service-showcase-card__purpose"><span>{t.purposeLabel}</span>{service.purpose[lang]}</div>
                  <p>{service.description[lang]}</p>
                  <ul>
                    {service.points[lang].map((point) => <li key={point}>{point}</li>)}
                  </ul>
                  <PriceTiles prices={service.prices} lang={lang} compact />
                  {service.priceNote && <p className="service-showcase-card__note">{service.priceNote[lang]}</p>}
                  <a className="service-cta" href={`https://wa.me/${WA_NUMBERS[0].id}?text=${whatsappMessage(service.title[lang], lang)}`} target="_blank" rel="noopener noreferrer">
                    <span>{service.cta[lang]}</span><span aria-hidden="true">{arrow}</span>
                  </a>
                </div>
              </article>
            ))}

            <aside className="services-trust" aria-label={lang === 'ar' ? 'معلومات الخدمة' : 'Service information'}>
              <div><span aria-hidden="true">⌖</span><h3>{t.locationTitle}</h3><p>{t.locationBody}</p></div>
              <div><span aria-hidden="true">◇</span><h3>{t.quoteTitle}</h3><p>{t.quoteBody}</p></div>
              <div><span aria-hidden="true">✓</span><h3>{t.installTitle}</h3><p>{t.installBody}</p></div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
