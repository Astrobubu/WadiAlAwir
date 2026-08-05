import Link from '@/components/admin/AdminLink'
import AdminIcon from '@/components/admin/AdminIcon'
import { requireStaff } from '@/lib/supabase/admin'

const money = (value: number) => `AED ${Number(value).toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

export default async function AdminCustomersPage() {
  const { supabase, profile } = await requireStaff()
  const { data, error } = await supabase.from('customers').select('id, name, phone, email, trn, vehicle, plate, created_at, invoices(id, total, created_at)').order('created_at', { ascending: false })
  const canCreate = ['owner', 'editor', 'accountant'].includes(profile.role)
  const customers = (data ?? []) as Array<{
    id: string; name: string; phone: string | null; email: string | null; trn: string | null; vehicle: string | null; plate: string | null; created_at: string
    invoices: Array<{ id: string; total: number; created_at: string }>
  }>

  return <>
    <div className="admin-page-heading"><div><p className="admin-eyebrow">Customer book</p><h1>Customers</h1><p>Named customers are saved from invoices, then become reusable here with their vehicle and purchase history. Walk-in invoices can remain anonymous.</p></div>{canCreate && <Link href="/admin/invoices/new" className="admin-button admin-button--primary"><AdminIcon name="plus" /> New invoice</Link>}</div>
    <div className="admin-info-strip"><AdminIcon name="users" /><div><strong>What this page does</strong><span>Select a saved customer on a future invoice to fill their contact, TRN, vehicle, and plate automatically.</span></div></div>
    {error ? <div className="admin-banner admin-banner--warning">{error.message}</div> : !customers.length ? <div className="admin-empty"><h2>No saved customers yet</h2><p>Create an invoice with a customer name. That customer will appear here and can be reused on the next visit.</p>{canCreate && <Link href="/admin/invoices/new" className="admin-button admin-button--quiet">Create first customer invoice</Link>}</div> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Customer</th><th>Contact</th><th>Vehicle</th><th>Invoices</th><th>Lifetime spend</th><th>Last visit</th><th /></tr></thead><tbody>{customers.map((customer) => {
      const invoiceCount = customer.invoices?.length ?? 0
      const lifetime = (customer.invoices ?? []).reduce((sum, invoice) => sum + Number(invoice.total), 0)
      const latest = [...(customer.invoices ?? [])].sort((a, b) => b.created_at.localeCompare(a.created_at))[0]
      return <tr key={customer.id}><td><strong>{customer.name}</strong>{customer.trn && <><br /><small>TRN {customer.trn}</small></>}</td><td>{customer.phone || customer.email || '—'}{customer.phone && customer.email && <><br /><small>{customer.email}</small></>}</td><td>{[customer.vehicle, customer.plate].filter(Boolean).join(' · ') || '—'}</td><td>{invoiceCount}</td><td>{money(lifetime)}</td><td>{latest ? new Date(latest.created_at).toLocaleDateString('en-AE') : '—'}</td><td>{canCreate && <Link className="admin-row-action admin-row-action--edit" href={`/admin/invoices/new?customer=${customer.id}`}>New invoice</Link>}</td></tr>
    })}</tbody></table></div>}
  </>
}
