import AdminInvoiceForm from '@/components/admin/AdminInvoiceForm'
import { requireStaff } from '@/lib/supabase/admin'

interface NewInvoicePageProps { searchParams: Promise<{ customer?: string }> }

export default async function NewAdminInvoicePage({ searchParams }: NewInvoicePageProps) {
  const query = await searchParams
  const { supabase } = await requireStaff(['owner', 'editor', 'accountant'])
  const [itemsResult, settingsResult, customersResult] = await Promise.all([
    supabase.from('items').select('id, name, sku, unit, quantity, cost_price, selling_price').order('name'),
    supabase.from('shop_settings').select('tax_rate, tax_enabled').limit(1).maybeSingle(),
    supabase.from('customers').select('id, name, phone, email, trn, vehicle, plate').order('name'),
  ])
  const taxRate = settingsResult.data?.tax_enabled === false ? 0 : Number(settingsResult.data?.tax_rate ?? 5)

  return <><div className="admin-page-heading"><div><p className="admin-eyebrow">Sales</p><h1>New invoice</h1><p>Pick parts from stock, add services, and see the margin before saving.</p></div></div>{itemsResult.error ? <div className="admin-banner admin-banner--warning">{itemsResult.error.message}</div> : <AdminInvoiceForm items={(itemsResult.data ?? []) as Parameters<typeof AdminInvoiceForm>[0]['items']} taxRate={taxRate} customers={(customersResult.data ?? []) as Parameters<typeof AdminInvoiceForm>[0]['customers']} defaultCustomerId={query.customer} />}</>
}
