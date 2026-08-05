import { notFound } from 'next/navigation'
import AdminInvoiceForm, { type InvoiceValue } from '@/components/admin/AdminInvoiceForm'
import { requireStaff } from '@/lib/supabase/admin'

export default async function EditAdminInvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { supabase } = await requireStaff(['owner', 'editor', 'accountant'])
  const [invoiceResult, linesResult, itemsResult, settingsResult, customersResult] = await Promise.all([
    supabase.from('invoices').select('*').eq('id', id).maybeSingle(),
    supabase.from('invoice_items').select('id, item_id, description, unit, quantity, unit_cost, unit_price').eq('invoice_id', id).order('id'),
    supabase.from('items').select('id, name, sku, unit, quantity, cost_price, selling_price').order('name'),
    supabase.from('shop_settings').select('tax_rate, tax_enabled').limit(1).maybeSingle(),
    supabase.from('customers').select('id, name, phone, email, trn, vehicle, plate').order('name'),
  ])
  if (invoiceResult.error || !invoiceResult.data) notFound()
  const taxRate = settingsResult.data?.tax_enabled === false ? 0 : Number(settingsResult.data?.tax_rate ?? 5)
  const invoice: InvoiceValue = {
    ...invoiceResult.data,
    discount: Number(invoiceResult.data.discount),
    lines: (linesResult.data ?? []).map((line) => ({ ...line, quantity: Number(line.quantity), unit_cost: Number(line.unit_cost), unit_price: Number(line.unit_price) })),
  }

  return <><div className="admin-page-heading"><div><p className="admin-eyebrow">Sales</p><h1>Edit {invoiceResult.data.invoice_number}</h1><p>The current version is saved to invoice history before stock and totals are updated.</p></div></div><AdminInvoiceForm items={(itemsResult.data ?? []) as Parameters<typeof AdminInvoiceForm>[0]['items']} taxRate={taxRate} customers={(customersResult.data ?? []) as Parameters<typeof AdminInvoiceForm>[0]['customers']} invoice={invoice} /></>
}
