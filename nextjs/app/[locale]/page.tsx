import { getTranslations } from 'next-intl/server'
import { getAllCarModels, getAllProducts, getAllServices, urlFor } from '@/lib/sanity'
import type { CarModel, Service } from '@/lib/sanity'
import Link from 'next/link'
import Image from 'next/image'
import ProductGrid from '@/components/ProductGrid'
import FaqAccordion from '@/components/FaqAccordion'
import { WA_NUMBERS, getServiceWhatsAppMessage } from '@/lib/whatsapp'
import ProductCard from '@/components/ProductCard'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }]
}

function ServiceIcon({ icon }: { icon: Service['icon'] }) {
  switch (icon) {
    case 'tint':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2C12 2 5 10 5 14.5C5 18.09 8.13 21 12 21C15.87 21 19 18.09 19 14.5C19 10 12 2 12 2Z"/><line x1="8" y1="14" x2="16" y2="14" opacity="0.5"/><line x1="9" y1="17" x2="15" y2="17" opacity="0.5"/></svg>
    case 'shield':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2L3 7V12C3 17.25 6.75 21.5 12 22.5C17.25 21.5 21 17.25 21 12V7L12 2Z"/><polyline points="9 12 11 14 15 10"/></svg>
    case 'droplets':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2C12 2 7 8.5 7 12.5C7 15.26 9.24 17.5 12 17.5C14.76 17.5 17 15.26 17 12.5C17 8.5 12 2 12 2Z"/></svg>
    case 'sparkles':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2L14 8L20 10L14 12L12 18L10 12L4 10L10 8L12 2Z"/></svg>
    case 'wrench':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
    default:
      return null
  }
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  const lang = locale as 'en' | 'ar'
  const t = await getTranslations()

  const [carModels, products, services] = await Promise.all([
    getAllCarModels(),
    getAllProducts(),
    getAllServices(),
  ])

  const featuredProducts = products.slice(0, 8)
  const primaryWaNumber = WA_NUMBERS[0].id

  const faqItems = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') },
    { q: t('faq.q6'), a: t('faq.a6') },
  ]

  const heroWaMsg = encodeURIComponent(
    lang === 'ar'
      ? 'السلام عليكم، أود الاستفسار عن منتجاتكم'
      : "Hello, I'd like to inquire about your products"
  )

  const reviewAuthors = ['Nazim Malik', 'Saeed Al Emad', 'Ahmed K.', 'Mohammad R.']
  const reviewStars = [5, 5, 5, 4]

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero" id="hero">
        <div className="hero__particles" aria-hidden="true" />
        <div className="hero__overlay" />
        <div className="hero__content container">
          <div className="hero__badge-row">
            <span className="hero__badge">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              4.4 Rating
            </span>
            <span className="hero__badge">{t('hero.badge.hours')}</span>
          </div>

          <h1 className="hero__title">
            <span className="hero__title-ar">وادي العوير</span>
            <span className="hero__title-en">WADI AL AWIR</span>
            <span className="hero__title-sub">{t('hero.subtitle')}</span>
          </h1>

          <p className="hero__tagline">{t('hero.tagline')}</p>

          <div className="hero__actions">
            <Link href={`/${locale}/products`} className="btn btn--primary btn--lg">
              {t('hero.browse')}
            </Link>
            <a
              href={`https://wa.me/${primaryWaNumber}?text=${heroWaMsg}`}
              className="btn btn--whatsapp btn--lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.853L.057 23.571a.5.5 0 0 0 .614.614l5.718-1.475A11.935 11.935 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.798 9.798 0 0 1-5.015-1.377l-.36-.213-3.716.959.979-3.605-.234-.37A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
              </svg>
              {t('hero.whatsapp')}
            </a>
          </div>
        </div>
        <div className="hero__scroll-hint" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section section--alt" id="services">
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">{t('services.label')}</span>
            <h2 className="section-title">{t('services.title')}</h2>
            <p className="section-subtitle">{t('services.subtitle')}</p>
          </div>
          <div className="services-grid">
            {services.map((service: Service) => {
              const waMsg = getServiceWhatsAppMessage(service.name, lang)
              const hasPackages = service.packages && service.packages.length > 0
              return (
                <div
                  key={service._id}
                  className={`service-card${hasPackages ? ' service-card--has-packages' : ''}`}
                >
                  <div className="service-card__icon">
                    <ServiceIcon icon={service.icon} />
                  </div>
                  <h3 className="service-card__name">{service.name[lang]}</h3>
                  <p className="service-card__desc">{service.description[lang]}</p>
                  {hasPackages && (
                    <div className="service-card__packages">
                      {service.packages!.map((pkg, i) => (
                        <div key={i} className="service-package">
                          <div className="service-package__header">
                            <span className="service-package__name">{pkg.name[lang]}</span>
                            <span className="service-package__price">
                              {pkg.price} <small>{pkg.currency}</small>
                            </span>
                          </div>
                          <ul className="service-package__features">
                            {pkg.features[lang].map((f, j) => (
                              <li key={j}>{f}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                  <a
                    href={`https://wa.me/${primaryWaNumber}?text=${waMsg}`}
                    className="btn btn--outline btn--sm service-card__cta"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('product.inquire')}
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CAR MODELS ── */}
      <section className="section" id="car-models">
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">{t('cars.label')}</span>
            <h2 className="section-title">{t('cars.title')}</h2>
            <p className="section-subtitle">{t('cars.subtitle')}</p>
          </div>
          <div className="car-models-grid">
            {carModels.map((car: CarModel) => (
              <Link
                key={car._id}
                href={`/${locale}/products?carModel=${car.slug.current}`}
                className="car-card"
              >
                <div className="car-card__image-wrap">
                  {car.heroImage ? (
                    <Image
                      src={urlFor(car.heroImage).width(600).height(400).url()}
                      alt={car.name[lang]}
                      width={600}
                      height={400}
                      className="car-card__image"
                      loading="lazy"
                    />
                  ) : (
                    <div className="car-card__image" style={{ background: 'var(--bg-elevated)' }} />
                  )}
                </div>
                <div className="car-card__info">
                  <h3 className="car-card__name">{car.name[lang]}</h3>
                  {car.years && <p className="car-card__year">{car.years}</p>}
                  {car.productCount > 0 && (
                    <span className="car-card__count">
                      {car.productCount} {lang === 'ar' ? 'منتج' : 'Products'}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="section" id="products">
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">{t('products.label')}</span>
            <h2 className="section-title">{t('products.title')}</h2>
            <p className="section-subtitle">{t('products.subtitle')}</p>
          </div>
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} lang={lang} />
            ))}
          </div>
          <div className="section-cta">
            <Link href={`/${locale}/products`} className="btn btn--primary btn--lg">
              {t('products.viewAll')}
            </Link>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="section" id="reviews">
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">{t('reviews.label')}</span>
            <h2 className="section-title">{t('reviews.title')}</h2>
            <p className="section-subtitle">{t('reviews.subtitle')}</p>
          </div>
          <div className="reviews-track">
            {(['1', '2', '3', '4'] as const).map((key, i) => (
              <div key={key} className="review-card">
                <div className="review-card__stars">
                  {'★'.repeat(reviewStars[i])}{'☆'.repeat(5 - reviewStars[i])}
                </div>
                <p className="review-card__text">{t(`review.${key}`)}</p>
                <span className="review-card__author">{reviewAuthors[i]}</span>
                <span className="review-card__source">{t('review.source')}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATION ── */}
      <section className="section section--alt" id="location">
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">{t('location.label')}</span>
            <h2 className="section-title">{t('location.title')}</h2>
          </div>
          <div className="location-grid">
            <div className="location__map">
              <iframe
                src="https://maps.google.com/maps?q=25.1786535,55.5445376&z=17&output=embed"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title={lang === 'ar' ? 'موقع المتجر' : 'Shop Location'}
                style={{ border: 0, width: '100%', height: '100%' }}
              />
            </div>
            <div className="location__details">
              <div className="location__item">
                <div className="location__item-icon">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div className="location__item-text">
                  <strong>{t('location.address.label')}</strong>
                  <p>5GHV+FR2 – Al Awir 1<br />العوير الأولى – دبي</p>
                </div>
              </div>
              <div className="location__item">
                <div className="location__item-icon">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div className="location__item-text">
                  <strong>{t('location.phone.label')}</strong>
                  <p><a href="tel:+971553573156">055 357 3156</a></p>
                  <p><a href="tel:+971581796614">058 179 6614</a></p>
                </div>
              </div>
              <div className="location__item">
                <div className="location__item-icon">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div className="location__item-text">
                  <strong>{t('location.hours.label')}</strong>
                  <p>{t('location.hours.value')}</p>
                </div>
              </div>
              <a
                href="https://maps.app.goo.gl/TWPEv1d8gKwXVWHb8"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary btn--lg location__map-btn"
              >
                {t('location.directions')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section" id="faq">
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">{t('faq.label')}</span>
            <h2 className="section-title">{t('faq.title')}</h2>
            <p className="section-subtitle">{t('faq.subtitle')}</p>
          </div>
          <FaqAccordion items={faqItems} />
        </div>
      </section>

    </>
  )
}
