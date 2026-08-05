import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllArticles } from '@/lib/articles'
import {
  absoluteUrl,
  isLocale,
  localizedAlternates,
  safeJsonLd,
  SITE_NAME,
} from '@/lib/seo'

interface BlogPageProps {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }]
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const title = locale === 'ar' ? 'دليل السيارات والإكسسوارات' : 'Car Accessory Guides'
  const description =
    locale === 'ar'
      ? 'أدلة عملية من وادي العوير لاختيار إكسسوارات السيارات وفهم التوافق والتركيب والعناية، باللغتين العربية والإنجليزية.'
      : 'Practical Wadi Al Awir guides to choosing car accessories, checking compatibility, planning installation and caring for upgrades.'

  return {
    title,
    description,
    alternates: localizedAlternates(locale, '/blog'),
    openGraph: {
      type: 'website',
      locale: locale === 'ar' ? 'ar_AE' : 'en_AE',
      title,
      description,
      url: absoluteUrl(locale, '/blog'),
      siteName: SITE_NAME,
    },
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const lang = locale
  const articles = await getAllArticles()
  const title = lang === 'ar' ? 'دليل السيارات والإكسسوارات' : 'Car Accessory Guides'
  const description =
    lang === 'ar'
      ? 'مقالات عملية تساعدك على اختيار القطع المناسبة، والتحقق من التوافق، وترتيب التعديلات قبل تركيبها.'
      : 'Practical articles to help you choose the right parts, verify compatibility and plan upgrades before installation.'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url: absoluteUrl(lang, '/blog'),
    inLanguage: lang,
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: absoluteUrl(lang) },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: articles.length,
      itemListElement: articles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: article.title[lang],
        url: absoluteUrl(lang, `/blog/${article.slug}`),
      })),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
      />

      <header className="editorial-hero">
        <div className="container editorial-hero__inner">
          <nav className="breadcrumb" aria-label={lang === 'ar' ? 'مسار التنقل' : 'Breadcrumb'}>
            <Link href={`/${lang}`}>{lang === 'ar' ? 'الرئيسية' : 'Home'}</Link>
            <span className="breadcrumb__sep">/</span>
            <span className="breadcrumb__current">{lang === 'ar' ? 'الدليل' : 'Guides'}</span>
          </nav>
          <span className="section-header__label">
            {lang === 'ar' ? 'من وادي العوير' : 'FROM WADI AL AWIR'}
          </span>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </header>

      <main className="section editorial-index">
        <div className="container">
          <div className="article-grid">
            {articles.map((article) => (
              <article className="article-card" key={article.slug}>
                <div className="article-card__meta">
                  <span>{article.category[lang]}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readingTime[lang]}</span>
                </div>
                <h2>
                  <Link href={`/${lang}/blog/${article.slug}`}>{article.title[lang]}</Link>
                </h2>
                <p>{article.excerpt[lang]}</p>
                <Link className="article-card__link" href={`/${lang}/blog/${article.slug}`}>
                  {lang === 'ar' ? 'اقرأ الدليل' : 'Read the guide'}
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
