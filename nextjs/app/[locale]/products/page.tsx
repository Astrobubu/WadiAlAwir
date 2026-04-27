import { getTranslations } from 'next-intl/server'
import { getAllProducts } from '@/lib/sanity'
import ProductGrid from '@/components/ProductGrid'
import Link from 'next/link'

interface ProductsPageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ carModel?: string; category?: string }>
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }]
}

export async function generateMetadata({ params }: ProductsPageProps) {
  const { locale } = await params
  return {
    title:
      locale === 'ar'
        ? 'المنتجات | وادي العوير لزينة السيارات'
        : 'Products | Wadi Al Awir Car Accessories',
    description:
      locale === 'ar'
        ? 'تصفح جميع إكسسوارات السيارات المتوفرة في وادي العوير، دبي'
        : 'Browse all car accessories available at Wadi Al Awir, Dubai',
  }
}

export default async function ProductsPage({ params, searchParams }: ProductsPageProps) {
  const { locale } = await params
  const { carModel: initialCarModel, category: initialCategory } = await searchParams
  const lang = locale as 'en' | 'ar'

  const t = await getTranslations()
  const products = await getAllProducts()

  return (
    <>
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
          <ProductGrid
            products={products}
            lang={lang}
            initialCarModel={initialCarModel}
            initialCategory={initialCategory}
          />
        </div>
      </section>
    </>
  )
}
