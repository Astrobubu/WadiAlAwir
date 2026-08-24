import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import { CATEGORIES, categoryContent, getCategoryContent } from '@/lib/catalog'
import { getProductsByCategory, toProductCardProduct } from '@/lib/catalogue'
import {
  absoluteUrl,
  isLocale,
  localizedAlternates,
  safeJsonLd,
  SITE_NAME,
} from '@/lib/seo'

interface CategoryPageProps {
  params: Promise<{ locale: string; category: string }>
}

export function generateStaticParams() {
  return ['en', 'ar'].flatMap((locale) =>
    CATEGORIES.map((category) => ({ locale, category }))
  )
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { locale, category } = await params
  const content = getCategoryContent(category)

  if (!isLocale(locale) || !content) return {}

  const path = `/products/category/${category}`
  const lang = locale

  return {
    title: content.title[lang],
    description: content.description[lang],
    alternates: localizedAlternates(lang, path),
    openGraph: {
      type: 'website',
      locale: lang === 'ar' ? 'ar_AE' : 'en_AE',
      title: content.title[lang],
      description: content.description[lang],
      url: absoluteUrl(lang, path),
      siteName: SITE_NAME,
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { locale, category } = await params
  const content = getCategoryContent(category)

  if (!isLocale(locale) || !content) notFound()

  const lang = locale
  const products = await getProductsByCategory(content.slug)
  const path = `/products/category/${content.slug}`
  const homeLabel = lang === 'ar' ? 'الرئيسية' : 'Home'
  const productsLabel = lang === 'ar' ? 'المنتجات' : 'Products'

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: content.title[lang],
        description: content.description[lang],
        url: absoluteUrl(lang, path),
        inLanguage: lang,
        isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: absoluteUrl(lang) },
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
          { '@type': 'ListItem', position: 1, name: homeLabel, item: absoluteUrl(lang) },
          {
            '@type': 'ListItem',
            position: 2,
            name: productsLabel,
            item: absoluteUrl(lang, '/products'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: content.name[lang],
            item: absoluteUrl(lang, path),
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

      <header className="catalog-hero">
        <div className="container catalog-hero__inner">
          <nav className="breadcrumb" aria-label={lang === 'ar' ? 'مسار التنقل' : 'Breadcrumb'}>
            <Link href={`/${lang}`}>{homeLabel}</Link>
            <span className="breadcrumb__sep">/</span>
            <Link href={`/${lang}/products`}>{productsLabel}</Link>
            <span className="breadcrumb__sep">/</span>
            <span className="breadcrumb__current">{content.name[lang]}</span>
          </nav>
          <span className="section-header__label">{content.eyebrow[lang]}</span>
          <h1 className="catalog-hero__title">{content.title[lang]}</h1>
          <p className="catalog-hero__lede">{content.description[lang]}</p>
        </div>
      </header>

      <main className="section catalog-page">
        <div className="container">
          <nav className="catalog-hubs" aria-label={lang === 'ar' ? 'فئات المنتجات' : 'Product categories'}>
            {CATEGORIES.map((slug) => {
              const item = categoryContent[slug]
              return (
                <Link
                  key={slug}
                  href={`/${lang}/products/category/${slug}`}
                  className={`catalog-hub-link${slug === content.slug ? ' catalog-hub-link--active' : ''}`}
                  aria-current={slug === content.slug ? 'page' : undefined}
                >
                  {item.name[lang]}
                </Link>
              )
            })}
          </nav>

          <article className="catalog-copy">
            {content.intro[lang].map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <h2>{content.tipsTitle[lang]}</h2>
            <ul>
              {content.tips[lang].map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </article>

          <div className="catalog-results-heading">
            <div>
              <span className="section-header__label">
                {lang === 'ar' ? 'المنتجات المتوفرة' : 'AVAILABLE PRODUCTS'}
              </span>
              <h2>{content.name[lang]}</h2>
            </div>
            <p>
              {lang === 'ar'
                ? `${products.length} منتج في هذه الفئة`
                : `${products.length} product${products.length === 1 ? '' : 's'} in this category`}
            </p>
          </div>

          {products.length > 0 ? (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={toProductCardProduct(product)} lang={lang} />
              ))}
            </div>
          ) : (
            <div className="catalog-empty">
              <h2>{lang === 'ar' ? 'ستتوفر منتجات هذه الفئة قريباً' : 'Products coming soon'}</h2>
              <p>
                {lang === 'ar'
                  ? 'تواصل معنا عبر واتساب للتحقق من التوفر الحالي.'
                  : 'Message us on WhatsApp to check current availability.'}
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
