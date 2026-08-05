import { getCurrentStaff } from '@/lib/supabase/admin'
import { createServerSupabaseClient } from '@/lib/supabase/server'

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
