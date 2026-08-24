import { getTranslations } from 'next-intl/server'
import { getAllCarModels, getAllProducts, toProductCardProduct } from '@/lib/catalogue'
import ProductGrid from '@/components/ProductGrid'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { CATEGORIES, categoryContent } from '@/lib/catalog'
import {
  absoluteUrl,
  isLocale,
  localizedAlternates,
  safeJsonLd,
  SITE_NAME,
} from '@/lib/seo'

interface ProductsPageProps {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }]
}

export async function generateMetadata({ params }: ProductsPageProps): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const title =
    locale === 'ar'
      ? 'إكسسوارات جيتور وروكس في دبي'
      : 'Jetour & ROX Accessories in Dubai'
  const description =
    locale === 'ar'
      ? 'تصفح إكسسوارات جيتور T2 وروكس 01 وروكس أداماس حسب السيارة والفئة، مع صور وأسعار وتفاصيل التركيب في وادي العوير، دبي.'
      : 'Browse Jetour T2, ROX 01 and ROX Adamas accessories by vehicle and category, with product images, prices and installation details in Dubai.'

  return {
    title,
    description,
    alternates: localizedAlternates(locale, '/products'),
    robots: { index: true, follow: true },
    openGraph: {
      type: 'website',
      locale: locale === 'ar' ? 'ar_AE' : 'en_AE',
      title,
      description,
      url: absoluteUrl(locale, '/products'),
      siteName: SITE_NAME,
    },
  }
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const lang = locale

  const t = await getTranslations()
  const [products, carModels] = await Promise.all([getAllProducts(), getAllCarModels()])
  const gridProducts = products.map(toProductCardProduct)

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: lang === 'ar' ? 'منتجات وادي العوير' : 'Wadi Al Awir Products',
        description:
          lang === 'ar'
            ? 'إكسسوارات سيارات مرتبة حسب السيارة والفئة.'
            : 'Car accessories organised by vehicle and category.',
        url: absoluteUrl(lang, '/products'),
        inLanguage: lang,
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: products.length,
          itemListElement: products.map((product, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: product.name[lang],
            url: absoluteUrl(lang, `/products/${product.slug}`),
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: lang === 'ar' ? 'الرئيسية' : 'Home',
            item: absoluteUrl(lang),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: lang === 'ar' ? 'المنتجات' : 'Products',
            item: absoluteUrl(lang, '/products'),
          },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
      />
      {/* Page header */}
      <section className="products-page-header">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href={`/${locale}`}>{lang === 'ar' ? 'الرئيسية' : 'Home'}</Link>
            <span className="breadcrumb__sep">/</span>
            <span className="breadcrumb__current">{t('nav.products')}</span>
          </nav>

          <div className="section-header">
            <span className="section-header__label">{t('products.label')}</span>
            <h1 className="section-title">{t('products.title')}</h1>
            <p className="section-subtitle">{t('products.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Products grid with filtering */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="catalog-directory">
            <section>
              <div className="catalog-directory__heading">
                <h2>{lang === 'ar' ? 'تسوق حسب السيارة' : 'Shop by vehicle'}</h2>
                <p>{lang === 'ar' ? 'افتح صفحة مخصصة لسيارتك.' : 'Open a dedicated catalogue for your vehicle.'}</p>
              </div>
              <nav className="catalog-hubs" aria-label={lang === 'ar' ? 'موديلات السيارات' : 'Vehicle models'}>
                {carModels.map((model) => (
                  <Link
                    key={model.id}
                    href={`/${lang}/products/vehicle/${model.slug}`}
                    className="catalog-hub-link"
                  >
                    <span>{model.name[lang]}</span>
                    {model.productCount > 0 && <small>{model.productCount}</small>}
                  </Link>
                ))}
              </nav>
            </section>

            <section>
              <div className="catalog-directory__heading">
                <h2>{lang === 'ar' ? 'تسوق حسب الفئة' : 'Shop by category'}</h2>
                <p>{lang === 'ar' ? 'قارن المنتجات المتشابهة في صفحة واحدة.' : 'Compare related products on a crawlable category page.'}</p>
              </div>
              <nav className="catalog-hubs" aria-label={lang === 'ar' ? 'فئات المنتجات' : 'Product categories'}>
                {CATEGORIES.map((category) => (
                  <Link
                    key={category}
                    href={`/${lang}/products/category/${category}`}
                    className="catalog-hub-link"
                  >
                    {categoryContent[category].name[lang]}
                  </Link>
                ))}
              </nav>
            </section>
          </div>

          <Suspense fallback={<div className="product-grid-wrapper" aria-hidden="true" />}>
            <ProductGrid products={gridProducts} lang={lang} />
          </Suspense>
        </div>
      </section>
    </>
  )
}
