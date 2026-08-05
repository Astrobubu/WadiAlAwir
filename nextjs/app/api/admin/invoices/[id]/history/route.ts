import { getCurrentStaff } from '@/lib/supabase/admin'
import { createServerSupabaseClient } from '@/lib/supabase/server'

const money = (value: number) => `AED ${Number(value).toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const staff = await getCurrentStaff()
  if (!staff) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('invoice_snapshots')
    .select('id, created_at, snapshot')
    .eq('invoice_id', id)
    .order('created_at', { ascending: false })
    .limit(20)

  if (error) return Response.json({ error: error.message }, { status: 400 })

  const entries = (data ?? []).map((entry) => {
    const snapshot = entry.snapshot as { invoice?: Record<string, unknown>; lines?: unknown[] }
    return {
      id: entry.id,
      createdAt: entry.created_at,
      customerName: String(snapshot.invoice?.customer_name || 'Walk-in customer'),
      total: money(Number(snapshot.invoice?.total ?? 0)),
      lineCount: snapshot.lines?.length ?? 0,
    }
  })

  return Response.json({ entries })
}
