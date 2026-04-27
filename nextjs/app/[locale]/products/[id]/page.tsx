import { getTranslations } from 'next-intl/server'
import { getAllProducts, getProductById, getRelatedProducts, urlFor } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import ProductGallery from '@/components/ProductGallery'
import ProductWhatsAppButton from '@/components/ProductWhatsAppButton'
import ProductCard from '@/components/ProductCard'

interface ProductDetailProps {
  params: Promise<{ locale: string; id: string }>
}

export async function generateStaticParams() {
  const products = await getAllProducts()
  const params: { locale: string; id: string }[] = []
  for (const product of products) {
    params.push({ locale: 'en', id: product.slug.current })
    params.push({ locale: 'ar', id: product.slug.current })
  }
  return params
}

export async function generateMetadata({ params }: ProductDetailProps): Promise<Metadata> {
  const { locale, id } = await params
  const lang = locale as 'en' | 'ar'
  const product = await getProductById(id)

  if (!product) {
    return { title: locale === 'ar' ? 'منتج غير موجود' : 'Product Not Found' }
  }

  const name = product.name[lang]
  const description = product.description[lang]
  const imageUrl = product.thumbnail
    ? urlFor(product.thumbnail).width(1200).height(630).url()
    : undefined

  return {
    title: `${name} | Wadi Al Awir`,
    description,
    openGraph: {
      title: name,
      description,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: name }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: name,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  const { locale, id } = await params
  const lang = locale as 'en' | 'ar'

  const [product, t] = await Promise.all([
    getProductById(id),
    getTranslations(),
  ])

  const relatedProducts = product
    ? await getRelatedProducts(id, product.category, product.carModel?.slug?.current ?? '')
    : []

  if (!product) notFound()

  const name = product.name[lang]
  const description = product.description[lang]
  const features = product.features?.[lang] ?? []
  const carModelName = product.carModel?.name?.[lang] ?? ''

  const galleryImages = (product.images ?? []).map((img) => ({
    url: urlFor(img).width(900).height(900).fit('max').url(),
    alt: name,
  }))

  if (galleryImages.length === 0 && product.thumbnail) {
    galleryImages.push({
      url: urlFor(product.thumbnail).width(900).height(900).fit('max').url(),
      alt: name,
    })
  }

  const schemaProduct = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: galleryImages.map((img) => img.url),
    offers: {
      '@type': 'Offer',
      priceCurrency: product.currency ?? 'AED',
      price: product.price,
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'AutoPartsStore', name: 'Wadi Al Awir Car Accessories' },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaProduct) }}
      />

      <section className="product-page">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href={`/${locale}`} className="breadcrumb__link">
              {lang === 'ar' ? 'الرئيسية' : 'Home'}
            </Link>
            <span className="breadcrumb__sep">/</span>
            <Link href={`/${locale}/products`} className="breadcrumb__link">
              {t('nav.products')}
            </Link>
            <span className="breadcrumb__sep">/</span>
            <span className="breadcrumb__current">{name}</span>
          </nav>

          {/* Two-column layout */}
          <div className="product-page__layout">
            {/* Gallery */}
            <div className="product-page__gallery">
              <ProductGallery images={galleryImages} productName={name} />
            </div>

            {/* Info */}
            <div className="product-page__info">
              {/* Car model badge */}
              {carModelName && (
                <div className="product-page__car-badge">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M5 17h14M7 11l1.5-4h7L17 11M5 11h14v6H5z"/>
                    <circle cx="7.5" cy="17" r="1.5"/>
                    <circle cx="16.5" cy="17" r="1.5"/>
                  </svg>
                  <span>{carModelName}{product.carYear ? ` ${product.carYear}` : ''}</span>
                </div>
              )}

              <h1 className="product-page__title">{name}</h1>

              <div className="product-page__price">
                {product.price.toLocaleString('en-AE')}
                <span className="product-page__price-currency">
                  {product.currency ?? 'AED'}
                </span>
              </div>

              {product.badge === 'warranty' && product.warranty && (
                <div className="product-page__warranty">
                  <div className="product-page__warranty-icon">
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#4ade80" strokeWidth="1.8" aria-hidden="true">
                      <path d="M12 2L3 7V12C3 17.25 6.75 21.5 12 22.5C17.25 21.5 21 17.25 21 12V7L12 2Z" fill="rgba(74,222,128,0.12)"/>
                      <polyline points="9 12 11 14 15 10" strokeWidth="2.2"/>
                    </svg>
                  </div>
                  <span>{product.warranty}</span>
                </div>
              )}

              <p className="product-page__desc">{description}</p>

              {features.length > 0 && (
                <ul className="product-page__features">
                  {features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              )}

              <div className="product-page__actions">
                <ProductWhatsAppButton product={product} locale={lang} />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="related-section">
          <div className="container">
            <h2 className="related-section__title">
              {lang === 'ar' ? 'قد يعجبك أيضاً' : 'You may also like'}
            </h2>
            <div className="related-grid">
              {relatedProducts.map((rp) => (
                <ProductCard key={rp._id} product={rp} lang={lang} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
