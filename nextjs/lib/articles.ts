import { cache } from 'react'
import type { LocaleString } from './catalogue'
import { getSupabaseArticles } from './supabase/articles'

export interface ArticleSection {
  heading: LocaleString
  paragraphs: { en: string[]; ar: string[] }
  bullets?: { en: string[]; ar: string[] }
}

export interface Article {
  slug: string
  title: LocaleString
  excerpt: LocaleString
  category: LocaleString
  publishedAt: string
  updatedAt: string
  readingTime: LocaleString
  intro: { en: string[]; ar: string[] }
  sections: ArticleSection[]
}

export const getAllArticles = cache(async (): Promise<Article[]> => getSupabaseArticles())

export const getArticleBySlug = cache(async (slug: string): Promise<Article | null> => {
  const currentArticles = await getAllArticles()
  return currentArticles.find((article) => article.slug === slug) ?? null
})
