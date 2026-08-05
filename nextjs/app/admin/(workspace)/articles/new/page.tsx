import AdminArticleForm from '@/components/admin/AdminArticleForm'
import { requireStaff } from '@/lib/supabase/admin'

export default async function NewAdminArticlePage() {
  await requireStaff(['owner', 'editor'])
  return <><div className="admin-page-heading"><div><p className="admin-eyebrow">Editorial</p><h1>New article</h1><p>Write both editions before publishing.</p></div></div><AdminArticleForm /></>
}
