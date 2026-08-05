import AdminStockItemForm from '@/components/admin/AdminStockItemForm'
import { requireStaff } from '@/lib/supabase/admin'

export default async function NewInventoryItemPage() {
  await requireStaff(['owner', 'editor', 'accountant'])

  return (
    <>
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">Products &amp; inventory</p>
          <h1>Add invoice-only item</h1>
          <p>Create an item that can be selected on invoices without publishing it to the storefront.</p>
        </div>
      </div>
      <AdminStockItemForm />
    </>
  )
}
