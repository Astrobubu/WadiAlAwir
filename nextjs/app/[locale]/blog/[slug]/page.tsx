import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllArticles, getArticleBySlug } from '@/lib/articles'
import {
  absoluteUrl,
  isLocale,
  localizedAlternates,
  safeJsonLd,
  SITE_NAME,
} from '@/lib/seo'

interface ArticlePageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const articles = await getAllArticles()
  return ['en', 'ar'].flatMap((locale) =>
    articles.map((article) => ({ locale, slug: article.slug }))
  )
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const article = await getArticleBySlug(slug)
  if (!isLocale(locale) || !article) return {}

  const path = `/blog/${slug}`
  return {
    title: article.title[locale],
    description: article.excerpt[locale],
    alternates: localizedAlternates(locale, path),
    authors: [{ name: SITE_NAME, url: absoluteUrl(locale) }],
    openGraph: {
      type: 'article',
      locale: locale === 'ar' ? 'ar_AE' : 'en_AE',
      title: article.title[locale],
      description: article.excerpt[locale],
      url: absoluteUrl(locale, path),
      siteName: SITE_NAME,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale, slug } = await params
  const article = await getArticleBySlug(slug)
  if (!isLocale(locale) || !article) notFound()

  const lang = locale
  const path = `/blog/${slug}`
  const dateLocale = lang === 'ar' ? 'ar-AE' : 'en-AE'
  const formattedDate = new Intl.DateTimeFormat(dateLocale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Dubai',
  }).format(new Date(`${article.updatedAt}T12:00:00+04:00`))

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: article.title[lang],
        description: article.excerpt[lang],
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        inLanguage: lang,
        articleSection: article.category[lang],
        author: { '@type': 'Organization', name: SITE_NAME, url: absoluteUrl(lang) },
        publisher: { '@type': 'Organization', name: SITE_NAME, url: absoluteUrl(lang) },
        mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(lang, path) },
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
            name: lang === 'ar' ? 'الدليل' : 'Guides',
            item: absoluteUrl(lang, '/blog'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: article.title[lang],
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

      <article className="editorial-article">
        <header className="editorial-article__header">
          <div className="container editorial-article__header-inner">
            <nav className="breadcrumb" aria-label={lang === 'ar' ? 'مسار التنقل' : 'Breadcrumb'}>
              <Link href={`/${lang}`}>{lang === 'ar' ? 'الرئيسية' : 'Home'}</Link>
              <span className="breadcrumb__sep">/</span>
              <Link href={`/${lang}/blog`}>{lang === 'ar' ? 'الدليل' : 'Guides'}</Link>
              <span className="breadcrumb__sep">/</span>
              <span className="breadcrumb__current">{article.category[lang]}</span>
            </nav>
            <div className="editorial-article__meta">
              <span>{article.category[lang]}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={article.updatedAt}>{formattedDate}</time>
              <span aria-hidden="true">·</span>
              <span>{article.readingTime[lang]}</span>
            </div>
            <h1>{article.title[lang]}</h1>
            <p className="editorial-article__excerpt">{article.excerpt[lang]}</p>
          </div>
        </header>

        <div className="container editorial-article__layout">
          <aside className="editorial-article__aside" aria-label={lang === 'ar' ? 'روابط مفيدة' : 'Useful links'}>
            <strong>{lang === 'ar' ? 'ابدأ التصفح' : 'Start browsing'}</strong>
            <Link href={`/${lang}/products/vehicle/jetour-t2`}>
              {lang === 'ar' ? 'إكسسوارات جيتور T2' : 'Jetour T2 accessories'}
            </Link>
            <Link href={`/${lang}/products/category/exterior`}>
              {lang === 'ar' ? 'الإكسسوارات الخارجية' : 'Exterior accessories'}
            </Link>
            <Link href={`/${lang}/products/category/interior`}>
              {lang === 'ar' ? 'الإكسسوارات الداخلية' : 'Interior accessories'}
            </Link>
            <Link href={`/${lang}/products/category/lighting`}>
              {lang === 'ar' ? 'الإضاءة' : 'Lighting upgrades'}
            </Link>
          </aside>

          <div className="editorial-article__body">
            {article.intro[lang].map((paragraph) => (
              <p className="editorial-article__lead" key={paragraph}>{paragraph}</p>
            ))}

            {article.sections.map((section) => (
              <section key={section.heading.en}>
                <h2>{section.heading[lang]}</h2>
                {section.paragraphs[lang].map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul>
                    {section.bullets[lang].map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <aside className="editorial-cta">
              <span className="section-header__label">
                {lang === 'ar' ? 'اعثر على القطعة المناسبة' : 'FIND THE RIGHT FIT'}
              </span>
              <h2>
                {lang === 'ar'
                  ? 'تصفح المنتجات حسب سيارتك أو حسب الفئة'
                  : 'Browse products by vehicle or category'}
              </h2>
              <p>
                {lang === 'ar'
                  ? 'راجع الصور والأسعار والتوافق المدرج، ثم تواصل مع الفريق لتأكيد التفاصيل قبل التركيب.'
                  : 'Review images, prices and listed compatibility, then confirm the details with the team before installation.'}
              </p>
              <Link className="btn btn--primary" href={`/${lang}/products`}>
                {lang === 'ar' ? 'تصفح جميع المنتجات' : 'Browse all products'}
              </Link>
            </aside>
          </div>
        </div>
      </article>
    </>
  )
}
