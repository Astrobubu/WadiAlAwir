import Link from '@/components/admin/AdminLink'
import { requireStaff } from '@/lib/supabase/admin'

interface ArticlesPageProps { searchParams: Promise<{ saved?: string }> }

export default async function AdminArticlesPage({ searchParams }: ArticlesPageProps) {
  const query = await searchParams
  const { supabase, profile } = await requireStaff()
  const { data, error } = await supabase
    .from('articles')
    .select('id, slug, title_en, title_ar, category_en, is_published, updated_at')
    .order('updated_at', { ascending: false })
  const canEdit = profile.role === 'owner' || profile.role === 'editor'

  return (
    <>
      <div className="admin-page-heading"><div><p className="admin-eyebrow">Editorial</p><h1>Articles</h1><p>Create separate English and Arabic search visibility from one editorial record.</p></div>{canEdit && <Link href="/admin/articles/new" className="admin-button admin-button--primary">New article</Link>}</div>
      {query.saved && <div className="admin-banner admin-banner--success">Article saved and guide pages refreshed.</div>}
      {error ? <div className="admin-banner admin-banner--warning">{error.message}</div> : !data?.length ? <div className="admin-empty"><h2>No Supabase articles yet</h2><p>The importer will preserve the existing bilingual buyer’s guide.</p></div> : (
        <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Article</th><th>Category</th><th>Updated</th><th>Status</th><th /></tr></thead><tbody>{data.map((article) => <tr key={article.id}><td><div className="admin-product-cell"><div><strong>{article.title_en}</strong><small dir="rtl">{article.title_ar}</small><code>{article.slug}</code></div></div></td><td>{article.category_en ?? 'Guide'}</td><td>{new Date(article.updated_at).toLocaleDateString('en-AE')}</td><td><span className={`admin-status admin-status--${article.is_published ? 'live' : 'draft'}`}>{article.is_published ? 'Published' : 'Draft'}</span></td><td>{canEdit && <div className="admin-row-actions"><Link className="admin-row-action admin-row-action--edit" href={`/admin/articles/${article.id}`}>Edit</Link></div>}</td></tr>)}</tbody></table></div>
      )}
    </>
  )
}
