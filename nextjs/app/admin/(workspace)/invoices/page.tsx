import Link from '@/components/admin/AdminLink'
import AdminIcon from '@/components/admin/AdminIcon'
import { requireStaff } from '@/lib/supabase/admin'

const money = (value: number) => `AED ${Number(value).toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

export default async function AdminInvoicesPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const query = await searchParams
  const { supabase, profile } = await requireStaff()
  const { data, error } = await supabase.from('invoices').select('id, invoice_number, customer_name, customer_phone, customer_vehicle, customer_plate, total, total_profit, status, created_at').order('created_at', { ascending: false })
  const invoices = data ?? []
  const term = query.q?.trim().toLowerCase() ?? ''
  const visible = term ? invoices.filter((invoice) => `${invoice.invoice_number} ${invoice.customer_name ?? ''} ${invoice.customer_phone ?? ''} ${invoice.customer_vehicle ?? ''} ${invoice.customer_plate ?? ''}`.toLowerCase().includes(term)) : invoices
  const canCreate = ['owner', 'editor', 'accountant'].includes(profile.role)
  const revenue = invoices.reduce((sum, invoice) => sum + Number(invoice.total), 0)
  const profit = invoices.reduce((sum, invoice) => sum + Number(invoice.total_profit), 0)

  return <>
    <div className="admin-page-heading"><div><p className="admin-eyebrow">Sales</p><h1>Invoices</h1><p>{invoices.length} invoices sharing the original Stockflow ledger.</p></div>{canCreate && <Link href="/admin/invoices/new" className="admin-button admin-button--primary"><AdminIcon name="plus" /> New invoice</Link>}</div>
    <section className="admin-mini-stat-grid"><div><span>Total revenue</span><strong>{money(revenue)}</strong></div><div><span>Total profit</span><strong>{money(profit)}</strong></div><div><span>Average invoice</span><strong>{money(invoices.length ? revenue / invoices.length : 0)}</strong></div></section>
    <form className="admin-search-bar" method="get"><AdminIcon name="search" /><input name="q" defaultValue={query.q} placeholder="Search invoice, customer, phone, vehicle or plate" /><button className="admin-button admin-button--quiet">Search</button>{term && <Link href="/admin/invoices">Clear</Link>}</form>
    {error ? <div className="admin-banner admin-banner--warning">{error.message}</div> : !visible.length ? <div className="admin-empty"><h2>No matching invoices</h2><p>Try a different customer, invoice number, phone, vehicle, or plate.</p></div> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Invoice</th><th>Customer</th><th>Vehicle</th><th>Total</th><th>Profit</th><th>Date</th><th /></tr></thead><tbody>{visible.map((invoice) => <tr key={invoice.id}><td><strong>{invoice.invoice_number}</strong><br /><small>{invoice.status}</small></td><td>{invoice.customer_name || 'Walk-in'}<br /><small>{invoice.customer_phone || ''}</small></td><td>{[invoice.customer_vehicle, invoice.customer_plate].filter(Boolean).join(' · ') || '—'}</td><td><strong>{money(invoice.total)}</strong></td><td>{money(invoice.total_profit)}</td><td>{new Date(invoice.created_at).toLocaleString('en-AE')}</td><td><Link className="admin-row-action admin-row-action--edit" href={`/admin/invoices/${invoice.id}`}>Open</Link></td></tr>)}</tbody></table></div>}
  </>
}
