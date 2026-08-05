import AdminProductForm from '@/components/admin/AdminProductForm'
import { requireStaff } from '@/lib/supabase/admin'

export default async function NewAdminProductPage() {
  const { supabase } = await requireStaff(['owner', 'editor'])
  const { data: vehicles, error } = await supabase
    .from('catalog_vehicles')
    .select('id, name_en, name_ar, years')
    .order('sort_order')

  return (
    <>
      <div className="admin-page-heading"><div><p className="admin-eyebrow">Catalogue</p><h1>New product</h1><p>Create the stock item and bilingual storefront record together.</p></div></div>
      {error ? <div className="admin-banner admin-banner--warning">{error.message}</div> : <AdminProductForm vehicles={vehicles ?? []} />}
    </>
  )
}
