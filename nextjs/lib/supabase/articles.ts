import { createClient } from '@supabase/supabase-js'
import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import type { Article, ArticleSection } from '@/lib/articles'
import { getSupabaseConfig } from './config'

interface ArticleRow {
  slug: string
  title_en: string
  title_ar: string
  excerpt_en: string
  excerpt_ar: string
  body_en: string
  body_ar: string
  category_en: string | null
  category_ar: string | null
  published_at: string | null
  created_at: string
  updated_at: string
}

interface ParsedBody {
  intro: string[]
  sections: Array<{ heading: string; paragraphs: string[]; bullets: string[] }>
}

function parseBody(markdown: string): ParsedBody {
  const intro: string[] = []
  const sections: ParsedBody['sections'] = []
  let current: ParsedBody['sections'][number] | null = null
  let paragraph: string[] = []

  const flushParagraph = () => {
    if (paragraph.length === 0) return
    const value = paragraph.join(' ').trim()
    if (value) (current ? current.paragraphs : intro).push(value)
    paragraph = []
  }

  for (const rawLine of markdown.replace(/\r\n/g, '\n').split('\n')) {
    const line = rawLine.trim()
    if (line.startsWith('## ')) {
      flushParagraph()
      current = { heading: line.slice(3).trim(), paragraphs: [], bullets: [] }
      sections.push(current)
    } else if (/^[-*]\s+/.test(line)) {
      flushParagraph()
      if (!current) {
        current = { heading: '', paragraphs: [], bullets: [] }
        sections.push(current)
      }
      current.bullets.push(line.replace(/^[-*]\s+/, '').trim())
    } else if (!line) {
      flushParagraph()
    } else if (!line.startsWith('# ')) {
      paragraph.push(line)
    }
  }
  flushParagraph()

  return { intro, sections }
}

function mapArticle(row: ArticleRow): Article {
  const english = parseBody(row.body_en)
  const arabic = parseBody(row.body_ar)
  const sectionCount = Math.max(english.sections.length, arabic.sections.length)
  const sections: ArticleSection[] = Array.from({ length: sectionCount }, (_, index) => {
    const en = english.sections[index]
    const ar = arabic.sections[index]
    const bullets = en?.bullets.length || ar?.bullets.length
      ? { en: en?.bullets ?? [], ar: ar?.bullets ?? [] }
      : undefined

    return {
      heading: { en: en?.heading ?? '', ar: ar?.heading ?? '' },
      paragraphs: { en: en?.paragraphs ?? [], ar: ar?.paragraphs ?? [] },
      bullets,
    }
  })
  const wordCount = row.body_en.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(wordCount / 200))

  return {
    slug: row.slug,
    title: { en: row.title_en, ar: row.title_ar },
    excerpt: { en: row.excerpt_en, ar: row.excerpt_ar },
    category: {
      en: row.category_en ?? 'Guide',
      ar: row.category_ar ?? 'دليل',
    },
    publishedAt: (row.published_at ?? row.created_at).slice(0, 10),
    updatedAt: row.updated_at.slice(0, 10),
    readingTime: {
      en: `${minutes} min read`,
      ar: `قراءة ${minutes} دقائق`,
    },
    intro: { en: english.intro, ar: arabic.intro },
    sections,
  }
}

async function loadSupabaseArticles(): Promise<Article[]> {
  const { url, publishableKey } = getSupabaseConfig()
  const supabase = createClient(url, publishableKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  })
  const { data, error } = await supabase
    .from('articles')
    .select('slug, title_en, title_ar, excerpt_en, excerpt_ar, body_en, body_ar, category_en, category_ar, published_at, created_at, updated_at')
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  if (error) {
    throw new Error(`Supabase articles query failed: ${error.message}`)
  }

  return ((data ?? []) as ArticleRow[]).map(mapArticle)
}

const getCachedSupabaseArticles = unstable_cache(
  loadSupabaseArticles,
  ['wadi-public-articles'],
  { revalidate: 300, tags: ['wadi-articles'] }
)

export const getSupabaseArticles = cache(getCachedSupabaseArticles)
