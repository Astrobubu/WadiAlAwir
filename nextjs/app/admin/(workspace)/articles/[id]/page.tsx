import { notFound } from 'next/navigation'
import AdminArticleForm from '@/components/admin/AdminArticleForm'
import { requireStaff } from '@/lib/supabase/admin'

export default async function EditAdminArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { supabase } = await requireStaff(['owner', 'editor'])
  const { data, error } = await supabase.from('articles').select('*').eq('id', id).maybeSingle()
  if (error || !data) notFound()
  return <><div className="admin-page-heading"><div><p className="admin-eyebrow">Editorial</p><h1>Edit article</h1><p>Publishing refreshes the index, article route and sitemap.</p></div></div><AdminArticleForm article={data} /></>
}
