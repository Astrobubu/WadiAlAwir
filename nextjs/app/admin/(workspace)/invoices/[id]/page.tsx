import { notFound } from 'next/navigation'
import AdminInvoiceHistory from '@/components/admin/AdminInvoiceHistory'
import AdminInvoiceToolbar from '@/components/admin/AdminInvoiceToolbar'
import { BUSINESS_DETAILS } from '@/lib/business'
import { requireStaff } from '@/lib/supabase/admin'

const money = (value: number) => `AED ${Number(value).toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

export default async function AdminInvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { supabase, profile } = await requireStaff()
  const [invoiceResult, linesResult] = await Promise.all([
    supabase.from('invoices').select('*').eq('id', id).maybeSingle(),
    supabase.from('invoice_items').select('*').eq('invoice_id', id).order('id'),
  ])
  if (invoiceResult.error || !invoiceResult.data) notFound()
  const invoice = invoiceResult.data
  const lines = linesResult.data ?? []
  const canEdit = ['owner', 'editor', 'accountant'].includes(profile.role)
  const canDelete = profile.role === 'owner'

  return <>
    <AdminInvoiceToolbar id={id} invoiceNumber={invoice.invoice_number} canEdit={canEdit} canDelete={canDelete} />
    <article className="admin-invoice-sheet">
      <header>
        <div className="admin-invoice-brand">
          <span>W</span>
          <div><h1>{BUSINESS_DETAILS.nameEn}</h1><p className="admin-invoice-business-ar" lang="ar" dir="rtl">{BUSINESS_DETAILS.nameAr}</p><p>{BUSINESS_DETAILS.address} · {BUSINESS_DETAILS.poBox}</p><p>Ahmad: {BUSINESS_DETAILS.phoneAhmad} · Ali: {BUSINESS_DETAILS.phoneAli}</p><p>{BUSINESS_DETAILS.email}</p><p>TRN: {BUSINESS_DETAILS.trn}</p></div>
        </div>
        <div className="admin-invoice-number"><span>{Number(invoice.tax_rate) > 0 ? 'Tax invoice' : 'Invoice'}</span><strong>{invoice.invoice_number}</strong><time>Issued {new Date(invoice.created_at).toLocaleString('en-AE')}</time></div>
      </header>
      <section className="admin-invoice-customer"><div><span>Bill to</span><strong className="admin-invoice-localized" dir="auto">{invoice.customer_name || 'Customer not provided'}</strong>{invoice.customer_phone && <p>{invoice.customer_phone}</p>}{invoice.customer_trn && <p>TRN: {invoice.customer_trn}</p>}</div>{(invoice.customer_vehicle || invoice.customer_plate) && <div><span>Vehicle</span><strong className="admin-invoice-localized" dir="auto">{invoice.customer_vehicle || '—'}</strong>{invoice.customer_plate && <p>{invoice.customer_plate}</p>}</div>}</section>
      <div className="admin-invoice-table-wrap"><table><thead><tr><th>Description</th><th>Qty</th>{invoice.show_costs && <th>Cost</th>}<th>Price</th><th>Total</th></tr></thead><tbody>{lines.map((line) => <tr key={line.id}><td><strong className="admin-invoice-localized" dir="auto">{line.description}</strong><small>{line.kind}</small></td><td>{Number(line.quantity).toLocaleString('en-AE')} {line.unit}</td>{invoice.show_costs && <td>{money(line.unit_cost)}</td>}<td>{money(line.unit_price)}</td><td><strong>{money(line.line_total)}</strong></td></tr>)}</tbody></table></div>
      <section className="admin-invoice-totals"><dl><div><dt>Subtotal</dt><dd>{money(invoice.subtotal)}</dd></div>{Number(invoice.discount) > 0 && <div><dt>Discount</dt><dd>− {money(invoice.discount)}</dd></div>}{Number(invoice.tax_rate) > 0 && <div><dt>VAT ({invoice.tax_rate}%)</dt><dd>{money(invoice.tax_amount)}</dd></div>}<div><dt>Total</dt><dd>{money(invoice.total)}</dd></div>{invoice.show_costs && <><div className="admin-invoice-internal"><dt>Internal cost</dt><dd>{money(invoice.total_cost)}</dd></div><div className="admin-invoice-internal"><dt>Profit</dt><dd>{money(invoice.total_profit)}</dd></div></>}</dl></section>
      {invoice.notes && <section className="admin-invoice-notes"><span>Notes</span><p className="admin-invoice-localized" dir="auto">{invoice.notes}</p></section>}
      <footer>{Number(invoice.tax_rate) > 0 && <div>This is a Tax Invoice · TRN {BUSINESS_DETAILS.trn}</div>}<p>Thank you for your business.</p></footer>
    </article>
    <AdminInvoiceHistory invoiceId={id} />
  </>
}
