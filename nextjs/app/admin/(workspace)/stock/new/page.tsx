import AdminStockItemForm from '@/components/admin/AdminStockItemForm'
import { requireStaff } from '@/lib/supabase/admin'

export default async function NewStockItemPage() {
  await requireStaff(['owner', 'editor', 'accountant'])
  return <><div className="admin-page-heading"><div><p className="admin-eyebrow">Stock</p><h1>Add item</h1><p>Create an internal stock item for invoicing. Public products are created from the Products page.</p></div></div><AdminStockItemForm /></>
}
