import Link from '@/components/admin/AdminLink'
import AdminIcon from '@/components/admin/AdminIcon'
import AdminInvoiceDeleteButton from '@/components/admin/AdminInvoiceDeleteButton'
import { requireStaff } from '@/lib/supabase/admin'

const money = (value: number) => `AED ${Number(value).toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
const PAGE_SIZE = 20

export default async function AdminInvoicesPage({ searchParams }: { searchParams: Promise<{ q?: string; page?: string }> }) {
  const query = await searchParams
  const { supabase, profile } = await requireStaff()
  const term = query.q?.trim() ?? ''
  const requestedPage = Math.max(1, Number.parseInt(query.page ?? '1', 10) || 1)
  const from = (requestedPage - 1) * PAGE_SIZE
  const safeTerm = term.replace(/[,%()]/g, ' ').trim()
  let invoiceQuery = supabase
    .from('invoices')
    .select('id, invoice_number, customer_name, customer_phone, customer_vehicle, customer_plate, total, total_profit, status, created_at', { count: 'exact' })
  if (safeTerm) invoiceQuery = invoiceQuery.or(`invoice_number.ilike.%${safeTerm}%,customer_name.ilike.%${safeTerm}%,customer_phone.ilike.%${safeTerm}%,customer_vehicle.ilike.%${safeTerm}%,customer_plate.ilike.%${safeTerm}%`)
  const { data, error, count } = await invoiceQuery.order('created_at', { ascending: false }).range(from, from + PAGE_SIZE - 1)
  const invoices = data ?? []
  const totalInvoices = count ?? invoices.length
  const pageCount = Math.max(1, Math.ceil(totalInvoices / PAGE_SIZE))
  const currentPage = Math.min(requestedPage, pageCount)
  const canCreate = ['owner', 'editor', 'accountant'].includes(profile.role)
  const canDelete = profile.role === 'owner'
  const revenue = invoices.reduce((sum, invoice) => sum + Number(invoice.total), 0)
  const profit = invoices.reduce((sum, invoice) => sum + Number(invoice.total_profit), 0)
  const pageHref = (page: number) => {
    const params = new URLSearchParams()
    if (term) params.set('q', term)
    if (page > 1) params.set('page', String(page))
    const suffix = params.toString()
    return `/admin/invoices${suffix ? `?${suffix}` : ''}`
  }

  return <>
    <div className="admin-page-heading"><div><p className="admin-eyebrow">Sales</p><h1>Invoices</h1><p>{totalInvoices} invoices connected to the same products and inventory.</p></div>{canCreate && <Link href="/admin/invoices/new" className="admin-button admin-button--primary"><AdminIcon name="plus" /> New invoice</Link>}</div>
    <section className="admin-mini-stat-grid"><div><span>Page revenue</span><strong>{money(revenue)}</strong></div><div><span>Page profit</span><strong>{money(profit)}</strong></div><div><span>Page average</span><strong>{money(invoices.length ? revenue / invoices.length : 0)}</strong></div></section>
    <form className="admin-search-bar" method="get"><AdminIcon name="search" /><input name="q" defaultValue={query.q} placeholder="Search invoice, customer, phone, vehicle or plate" /><button className="admin-button admin-button--quiet">Search</button>{term && <Link href="/admin/invoices">Clear</Link>}</form>
    {error ? <div className="admin-banner admin-banner--warning">{error.message}</div> : !invoices.length ? <div className="admin-empty"><h2>No matching invoices</h2><p>Try a different customer, invoice number, phone, vehicle, or plate.</p></div> : <><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Invoice</th><th>Customer</th><th>Vehicle</th><th>Total</th><th>Profit</th><th>Date</th><th /></tr></thead><tbody>{invoices.map((invoice) => <tr key={invoice.id}><td><strong>{invoice.invoice_number}</strong><br /><small>{invoice.status}</small></td><td>{invoice.customer_name || 'Walk-in'}<br /><small>{invoice.customer_phone || ''}</small></td><td>{[invoice.customer_vehicle, invoice.customer_plate].filter(Boolean).join(' · ') || '—'}</td><td><strong>{money(invoice.total)}</strong></td><td>{money(invoice.total_profit)}</td><td>{new Date(invoice.created_at).toLocaleString('en-AE')}</td><td><div className="admin-row-actions"><Link className="admin-row-action admin-row-action--edit" href={`/admin/invoices/${invoice.id}`}>Open</Link>{canDelete && <AdminInvoiceDeleteButton id={invoice.id} invoiceNumber={invoice.invoice_number} />}</div></td></tr>)}</tbody></table></div>{pageCount > 1 && <nav className="admin-pagination" aria-label="Invoice pages"><Link href={pageHref(Math.max(1, currentPage - 1))} aria-disabled={currentPage === 1}>Previous</Link><span>Page {currentPage} of {pageCount}</span><Link href={pageHref(Math.min(pageCount, currentPage + 1))} aria-disabled={currentPage === pageCount}>Next</Link></nav>}</>}
  </>
}
