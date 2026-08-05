'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireStaff } from '@/lib/supabase/admin'

export interface ArticleActionState { error: string }

const value = (data: FormData, key: string) => String(data.get(key) ?? '').trim()

export async function saveArticleAction(
  _state: ArticleActionState,
  formData: FormData
): Promise<ArticleActionState> {
  const { supabase } = await requireStaff(['owner', 'editor'])
  const id = value(formData, 'id')
  const slug = value(formData, 'slug').toLowerCase()
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return { error: 'Slug must contain lowercase letters, numbers and hyphens only.' }
  }

  const required = ['title_en', 'title_ar', 'excerpt_en', 'excerpt_ar', 'body_en', 'body_ar']
  if (required.some((field) => !value(formData, field))) {
    return { error: 'Both languages require a title, excerpt and article body.' }
  }

  const isPublished = formData.get('is_published') === 'on'
  const payload = {
    slug,
    title_en: value(formData, 'title_en'),
    title_ar: value(formData, 'title_ar'),
    excerpt_en: value(formData, 'excerpt_en'),
    excerpt_ar: value(formData, 'excerpt_ar'),
    body_en: value(formData, 'body_en'),
    body_ar: value(formData, 'body_ar'),
    category_en: value(formData, 'category_en') || 'Guide',
    category_ar: value(formData, 'category_ar') || 'دليل',
    seo_title_en: value(formData, 'seo_title_en') || null,
    seo_title_ar: value(formData, 'seo_title_ar') || null,
    seo_description_en: value(formData, 'seo_description_en') || null,
    seo_description_ar: value(formData, 'seo_description_ar') || null,
    is_published: isPublished,
    published_at: isPublished ? new Date().toISOString() : null,
  }

  const result = id
    ? await supabase.from('articles').update(payload).eq('id', id)
    : await supabase.from('articles').insert(payload)
  if (result.error) return { error: result.error.message }

  revalidatePath('/admin')
  revalidateTag('wadi-articles')
  revalidatePath('/admin/articles')
  revalidatePath('/en')
  revalidatePath('/ar')
  revalidatePath('/en/blog')
  revalidatePath('/ar/blog')
  revalidatePath(`/en/blog/${slug}`)
  revalidatePath(`/ar/blog/${slug}`)
  revalidatePath('/sitemap.xml')
  redirect('/admin/articles?saved=1')
}
