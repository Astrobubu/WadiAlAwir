'use client'

import { useActionState, useState } from 'react'
import { saveArticleAction, type ArticleActionState } from '@/app/admin/(workspace)/articles/actions'
import AdminIcon from './AdminIcon'

interface ArticleValue {
  id?: string
  slug?: string
  title_en?: string
  title_ar?: string
  excerpt_en?: string
  excerpt_ar?: string
  body_en?: string
  body_ar?: string
  category_en?: string | null
  category_ar?: string | null
  seo_title_en?: string | null
  seo_title_ar?: string | null
  seo_description_en?: string | null
  seo_description_ar?: string | null
  is_published?: boolean
}

export default function AdminArticleForm({ article = {} }: { article?: ArticleValue }) {
  const [state, action, pending] = useActionState(saveArticleAction, { error: '' } as ArticleActionState)
  const [titleEn, setTitleEn] = useState(article.title_en ?? '')
  const [slug, setSlug] = useState(article.slug ?? '')

  return (
    <form action={action} className="admin-editor">
      <input type="hidden" name="id" value={article.id ?? ''} />
      {state.error && <p className="admin-form-error" role="alert">{state.error}</p>}
      <section className="admin-editor__section">
        <div className="admin-editor__section-heading"><span>01</span><div><h2>Article identity</h2><p>Stable URL and guide classification.</p></div></div>
        <div className="admin-form-grid admin-form-grid--3">
          <div className="admin-field admin-generated-field"><span><label htmlFor="admin-article-slug">Slug</label><button type="button" onClick={() => setSlug(generateSlug(titleEn))}><AdminIcon name="plus" /> Generate</button></span><div><input id="admin-article-slug" name="slug" value={slug} onChange={(event) => setSlug(event.target.value)} required /></div></div>
          <Field label="English category"><input name="category_en" defaultValue={article.category_en ?? 'Guide'} /></Field>
          <Field label="Arabic category"><input name="category_ar" dir="rtl" defaultValue={article.category_ar ?? 'دليل'} /></Field>
        </div>
      </section>
      <section className="admin-editor__section">
        <div className="admin-editor__section-heading"><span>02</span><div><h2>English edition</h2><p>Use “##” for section headings and “-” for bullet points.</p></div></div>
        <div className="admin-form-grid">
          <Field label="Title"><input name="title_en" value={titleEn} onChange={(event) => setTitleEn(event.target.value)} required /></Field>
          <Field label="Excerpt"><textarea name="excerpt_en" rows={3} defaultValue={article.excerpt_en} required /></Field>
          <Field label="Article body"><textarea name="body_en" rows={22} defaultValue={article.body_en} className="admin-markdown" required /></Field>
          <Field label="SEO title"><input name="seo_title_en" defaultValue={article.seo_title_en ?? ''} /></Field>
          <Field label="SEO description"><textarea name="seo_description_en" rows={3} defaultValue={article.seo_description_en ?? ''} /></Field>
        </div>
      </section>
      <section className="admin-editor__section" dir="rtl">
        <div className="admin-editor__section-heading"><span>03</span><div><h2>النسخة العربية</h2><p>استخدم “##” لعناوين الأقسام و“-” للنقاط.</p></div></div>
        <div className="admin-form-grid">
          <Field label="العنوان"><input name="title_ar" defaultValue={article.title_ar} required /></Field>
          <Field label="المقدمة المختصرة"><textarea name="excerpt_ar" rows={3} defaultValue={article.excerpt_ar} required /></Field>
          <Field label="نص المقال"><textarea name="body_ar" rows={22} defaultValue={article.body_ar} className="admin-markdown" required /></Field>
          <Field label="عنوان محركات البحث"><input name="seo_title_ar" defaultValue={article.seo_title_ar ?? ''} /></Field>
          <Field label="وصف محركات البحث"><textarea name="seo_description_ar" rows={3} defaultValue={article.seo_description_ar ?? ''} /></Field>
        </div>
      </section>
      <footer className="admin-editor__footer">
        <label className="admin-publish-toggle"><input type="checkbox" name="is_published" defaultChecked={article.is_published} /><span><strong>Published</strong><small>Visible in both language guide indexes</small></span></label>
        <button className="admin-button admin-button--primary" disabled={pending}>{pending ? 'Saving…' : article.id ? 'Save article' : 'Create article'}</button>
      </footer>
    </form>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="admin-field"><span>{label}</span>{children}</label>
}

function generateSlug(value: string) {
  return value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 96)
}
