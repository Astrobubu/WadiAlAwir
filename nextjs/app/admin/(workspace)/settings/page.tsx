import AdminSettingsForm from '@/components/admin/AdminSettingsForm'
import { requireStaff } from '@/lib/supabase/admin'

export default async function AdminSettingsPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const query = await searchParams
  const { supabase } = await requireStaff(['owner', 'editor'])
  const { data, error } = await supabase.from('shop_settings').select('*').limit(1).maybeSingle()
  return <><div className="admin-page-heading"><div><p className="admin-eyebrow">Configuration</p><h1>Settings</h1><p>Business identity, invoice tax, currency, and operational preferences.</p></div></div>{query.saved && <div className="admin-banner admin-banner--success">Settings saved.</div>}{error ? <div className="admin-banner admin-banner--warning">{error.message}</div> : <AdminSettingsForm settings={data ? { ...data, tax_rate: Number(data.tax_rate) } : {}} />}</>
}
