'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireStaff } from '@/lib/supabase/admin'

const text = (data: FormData, key: string) => String(data.get(key) ?? '').trim()
const number = (data: FormData, key: string) => Math.max(0, Number(data.get(key) ?? 0) || 0)

export interface StockActionState { error: string }

export async function saveStockItemAction(_state: StockActionState, formData: FormData): Promise<StockActionState> {
  const { supabase } = await requireStaff(['owner', 'editor', 'accountant'])
  const id = text(formData, 'id')
  const name = text(formData, 'name')
  if (!name) return { error: 'Item name is required.' }
  const payload = { name, sku: text(formData, 'sku') || null, category: text(formData, 'category') || null, unit: text(formData, 'unit') || 'pcs', quantity: number(formData, 'quantity'), low_stock_threshold: number(formData, 'low_stock_threshold'), cost_price: number(formData, 'cost_price'), selling_price: number(formData, 'selling_price'), msrp: number(formData, 'selling_price'), supplier_notes: text(formData, 'supplier_notes') || null }

  if (id) {
    const { data: current, error: readError } = await supabase.from('items').select('*').eq('id', id).maybeSingle()
    if (readError || !current) return { error: readError?.message ?? 'Stock item was not found.' }
    const { error: snapshotError } = await supabase.from('item_snapshots').insert({ item_id: id, snapshot: current })
    if (snapshotError) return { error: snapshotError.message }
    const { error } = await supabase.from('items').update(payload).eq('id', id)
    if (error) return { error: error.message }
  } else {
    const { error } = await supabase.from('items').insert(payload)
    if (error) return { error: error.message }
  }

  revalidateTag('wadi-catalogue')
  revalidatePath('/admin')
  revalidatePath('/admin/products')
  redirect('/admin/products?saved=inventory')
}

export async function deleteStockItemAction(formData: FormData) {
  const { supabase } = await requireStaff(['owner', 'editor'])
  const id = text(formData, 'id')
  if (!id) return
  const [catalogue, invoiceLines] = await Promise.all([
    supabase.from('catalog_products').select('*', { count: 'exact', head: true }).eq('item_id', id),
    supabase.from('invoice_items').select('*', { count: 'exact', head: true }).eq('item_id', id),
  ])
  if ((catalogue.count ?? 0) > 0 || (invoiceLines.count ?? 0) > 0) redirect('/admin/products?error=protected')
  await supabase.from('items').delete().eq('id', id)
  revalidatePath('/admin/products')
  redirect('/admin/products?saved=deleted')
}
