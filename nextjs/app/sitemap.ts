import type { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/articles'
import { CATEGORIES } from '@/lib/catalog'
import { getAllCarModels, getAllProducts } from '@/lib/catalogue'
import { absoluteUrl } from '@/lib/seo'

const CONTENT_UPDATED = new Date('2026-08-04T00:00:00+04:00')

function localizedEntries(path: string, lastModified: Date): MetadataRoute.Sitemap {
  const languages = {
    en: absoluteUrl('en', path),
    ar: absoluteUrl('ar', path),
    'x-default': absoluteUrl('en', path),
  }

  return (['en', 'ar'] as const).map((locale) => ({
    url: absoluteUrl(locale, path),
    lastModified,
    alternates: { languages },
  }))
}

function validDate(value: string | undefined, fallback: Date) {
  if (!value) return fallback
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? fallback : date
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, carModels, articles] = await Promise.all([
    getAllProducts(),
    getAllCarModels(),
    getAllArticles(),
  ])

  const entries: MetadataRoute.Sitemap = [
    ...localizedEntries('', CONTENT_UPDATED),
    ...localizedEntries('/products', CONTENT_UPDATED),
    ...localizedEntries('/blog', CONTENT_UPDATED),
    ...localizedEntries('/privacy', new Date('2026-04-05T00:00:00+04:00')),
    ...localizedEntries('/returns', new Date('2026-04-05T00:00:00+04:00')),
  ]

  for (const category of CATEGORIES) {
    entries.push(...localizedEntries(`/products/category/${category}`, CONTENT_UPDATED))
  }

  for (const model of carModels) {
    entries.push(
      ...localizedEntries(
        `/products/vehicle/${model.slug}`,
        validDate(model.updatedAt, CONTENT_UPDATED)
      )
    )
  }

  for (const product of products) {
    entries.push(
      ...localizedEntries(
        `/products/${product.slug}`,
        validDate(product.updatedAt, CONTENT_UPDATED)
      )
    )
  }

  for (const article of articles) {
    entries.push(
      ...localizedEntries(
        `/blog/${article.slug}`,
        new Date(`${article.updatedAt}T00:00:00+04:00`)
      )
    )
  }

  return entries
}
