import { notFound } from 'next/navigation'
import AdminStockItemForm from '@/components/admin/AdminStockItemForm'
import { requireStaff } from '@/lib/supabase/admin'

export default async function EditStockItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { supabase } = await requireStaff(['owner', 'editor', 'accountant'])
  const { data, error } = await supabase.from('items').select('id, name, sku, category, unit, quantity, low_stock_threshold, cost_price, selling_price, supplier_notes, catalog_products(id)').eq('id', id).maybeSingle()
  if (error || !data) notFound()
  return <><div className="admin-page-heading"><div><p className="admin-eyebrow">Stock</p><h1>Edit item</h1><p>Update quantity, alert level, cost, and selling price.</p></div></div><AdminStockItemForm item={{ ...data, quantity: Number(data.quantity), low_stock_threshold: Number(data.low_stock_threshold), cost_price: Number(data.cost_price), selling_price: Number(data.selling_price), isCatalogue: Boolean(data.catalog_products?.length) }} /></>
}
