import { getCurrentStaff } from '@/lib/supabase/admin'
import { createServerSupabaseClient, createServiceSupabaseClient } from '@/lib/supabase/server'

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const staff = await getCurrentStaff()
  if (!staff || !['owner', 'editor', 'accountant'].includes(staff.role)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const payload = await request.json().catch(() => null)
  if (!payload || !Array.isArray(payload.lines) || payload.lines.length === 0) return Response.json({ error: 'Add at least one invoice line.' }, { status: 400 })
  if (payload.lines.length > 100) return Response.json({ error: 'An invoice can contain at most 100 lines.' }, { status: 400 })

  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase.rpc('update_invoice', { payload: { ...payload, invoice_id: id } })
  if (error) return Response.json({ error: error.message }, { status: 400 })
  return Response.json({ id: data })
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const staff = await getCurrentStaff()
  if (!staff || staff.role !== 'owner') return Response.json({ error: 'Only the owner can delete invoices.' }, { status: 401 })

  const { id } = await params
  const supabase = createServiceSupabaseClient() ?? await createServerSupabaseClient()
  const { data: invoice, error: invoiceError } = await supabase.from('invoices').select('id').eq('id', id).maybeSingle()
  if (invoiceError) return Response.json({ error: invoiceError.message }, { status: 400 })
  if (!invoice) return Response.json({ error: 'Invoice not found.' }, { status: 404 })

  const { data: lines, error: linesError } = await supabase.from('invoice_items').select('item_id, quantity').eq('invoice_id', id)
  if (linesError) return Response.json({ error: linesError.message }, { status: 400 })

  const returnedQuantities = new Map<string, number>()
  for (const line of lines ?? []) {
    if (!line.item_id) continue
    returnedQuantities.set(line.item_id, (returnedQuantities.get(line.item_id) ?? 0) + Number(line.quantity))
  }

  const itemIds = [...returnedQuantities.keys()]
  const originalQuantities = new Map<string, number>()
  if (itemIds.length) {
    const { data: items, error: itemsError } = await supabase.from('items').select('id, quantity').in('id', itemIds)
    if (itemsError) return Response.json({ error: itemsError.message }, { status: 400 })
    for (const item of items ?? []) originalQuantities.set(item.id, Number(item.quantity))
  }

  const restoredItems: string[] = []
  for (const itemId of itemIds) {
    const original = originalQuantities.get(itemId)
    if (original === undefined) continue
    const { error } = await supabase.from('items').update({ quantity: original + (returnedQuantities.get(itemId) ?? 0) }).eq('id', itemId)
    if (error) {
      for (const restoredId of restoredItems) {
        await supabase.from('items').update({ quantity: originalQuantities.get(restoredId) }).eq('id', restoredId)
      }
      return Response.json({ error: `Could not return invoice stock: ${error.message}` }, { status: 400 })
    }
    restoredItems.push(itemId)
  }

  const { data: deleted, error: deleteError } = await supabase.from('invoices').delete().eq('id', id).select('id').maybeSingle()
  if (deleteError || !deleted) {
    for (const restoredId of restoredItems) {
      await supabase.from('items').update({ quantity: originalQuantities.get(restoredId) }).eq('id', restoredId)
    }
    return Response.json({ error: deleteError?.message || 'Invoice could not be deleted.' }, { status: 400 })
  }

  return Response.json({ deleted: true })
}
