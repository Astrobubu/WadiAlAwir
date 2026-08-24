import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import {
  getAllCarModels,
  getCarModelBySlug,
  getProductsByCarModel,
  toProductCardProduct,
} from '@/lib/catalogue'
import {
  absoluteUrl,
  isLocale,
  localizedAlternates,
  safeJsonLd,
  SITE_NAME,
} from '@/lib/seo'

interface VehiclePageProps {
  params: Promise<{ locale: string; vehicle: string }>
}

export async function generateStaticParams() {
  const vehicles = await getAllCarModels()
  return ['en', 'ar'].flatMap((locale) =>
    vehicles.map((vehicle) => ({ locale, vehicle: vehicle.slug }))
  )
}

export async function generateMetadata({ params }: VehiclePageProps): Promise<Metadata> {
  const { locale, vehicle } = await params
  if (!isLocale(locale)) return {}

  const model = await getCarModelBySlug(vehicle)
  if (!model) return {}

  const name = model.name[locale]
  const title =
    locale === 'ar'
      ? `إكسسوارات ${name} في دبي`
      : `${name} Accessories in Dubai`
  const description =
    locale === 'ar'
      ? `تصفح الإكسسوارات والقطع المتوفرة لسيارة ${name} ${model.years ?? ''} مع تفاصيل الأسعار وخدمة التركيب في وادي العوير، دبي.`
      : `Browse available accessories and parts for the ${name} ${model.years ?? ''}, with prices and installation support from Wadi Al Awir in Dubai.`
  const path = `/products/vehicle/${vehicle}`

  return {
    title,
    description,
    alternates: localizedAlternates(locale, path),
    openGraph: {
      type: 'website',
      locale: locale === 'ar' ? 'ar_AE' : 'en_AE',
      title,
      description,
      url: absoluteUrl(locale, path),
      siteName: SITE_NAME,
    },
  }
}

export default async function VehiclePage({ params }: VehiclePageProps) {
  const { locale, vehicle } = await params
  if (!isLocale(locale)) notFound()

  const [model, allModels, products] = await Promise.all([
    getCarModelBySlug(vehicle),
    getAllCarModels(),
    getProductsByCarModel(vehicle),
  ])

  if (!model) notFound()

  const lang = locale
  const name = model.name[lang]
  const path = `/products/vehicle/${vehicle}`
  const title = lang === 'ar' ? `إكسسوارات ${name}` : `${name} Accessories`
  const intro =
    lang === 'ar'
      ? `تجمع هذه الصفحة منتجات ${name} ${model.years ?? ''} في مكان واحد. يمكنك مقارنة الإكسسوارات الخارجية والداخلية والإضاءة والقطع العملية، ثم فتح صفحة كل منتج للاطلاع على الصور والسعر والتفاصيل قبل التواصل مع فريق وادي العوير للتأكد من المقاس والتركيب.`
      : `This page brings together products listed for the ${name} ${model.years ?? ''}. Compare exterior, interior, lighting and practical upgrades, then open any product page for images, pricing and details before confirming fit and installation with the Wadi Al Awir team.`

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: title,
        description: intro,
        url: absoluteUrl(lang, path),
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
          { '@type': 'ListItem', position: 3, name, item: absoluteUrl(lang, path) },
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

      <header className="catalog-hero">
        <div className="container catalog-hero__inner">
          <nav className="breadcrumb" aria-label={lang === 'ar' ? 'مسار التنقل' : 'Breadcrumb'}>
            <Link href={`/${lang}`}>{lang === 'ar' ? 'الرئيسية' : 'Home'}</Link>
            <span className="breadcrumb__sep">/</span>
            <Link href={`/${lang}/products`}>{lang === 'ar' ? 'المنتجات' : 'Products'}</Link>
            <span className="breadcrumb__sep">/</span>
            <span className="breadcrumb__current">{name}</span>
          </nav>
          <span className="section-header__label">
            {lang === 'ar' ? 'تسوق حسب السيارة' : 'SHOP BY VEHICLE'}
          </span>
          <h1 className="catalog-hero__title">{title}</h1>
          <p className="catalog-hero__lede">{intro}</p>
        </div>
      </header>

      <main className="section catalog-page">
        <div className="container">
          <nav className="catalog-hubs" aria-label={lang === 'ar' ? 'موديلات السيارات' : 'Vehicle models'}>
            {allModels.map((item) => (
              <Link
                key={item.id}
                href={`/${lang}/products/vehicle/${item.slug}`}
                className={`catalog-hub-link${item.slug === vehicle ? ' catalog-hub-link--active' : ''}`}
                aria-current={item.slug === vehicle ? 'page' : undefined}
              >
                {item.name[lang]}
              </Link>
            ))}
          </nav>

          <div className="catalog-results-heading">
            <div>
              <span className="section-header__label">
                {lang === 'ar' ? 'متوافق مع سيارتك' : 'MADE FOR YOUR VEHICLE'}
              </span>
              <h2>{name}</h2>
            </div>
            <p>
              {lang === 'ar'
                ? `${products.length} منتج مدرج`
                : `${products.length} listed product${products.length === 1 ? '' : 's'}`}
            </p>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={toProductCardProduct(product)} lang={lang} />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
