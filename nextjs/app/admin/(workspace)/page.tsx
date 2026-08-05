import Link from 'next/link'
import AdminIcon from '@/components/admin/AdminIcon'
import { requireStaff } from '@/lib/supabase/admin'

const money = (value: number) => `AED ${Number(value).toLocaleString('en-AE', { maximumFractionDigits: 0 })}`

export default async function AdminDashboardPage() {
  const { supabase, profile } = await requireStaff()
  const [itemsResult, invoicesResult, productsResult, articlesResult, customersResult] = await Promise.all([
    supabase.from('items').select('id, quantity, low_stock_threshold, cost_price, selling_price'),
    supabase.from('invoices').select('id, invoice_number, customer_name, total, total_profit, created_at').order('created_at', { ascending: false }).limit(5),
    supabase.from('catalog_products').select('id, is_published'),
    supabase.from('articles').select('id, is_published'),
    supabase.from('customers').select('*', { count: 'exact', head: true }),
  ])

  const items = itemsResult.data ?? []
  const invoices = invoicesResult.data ?? []
  const products = productsResult.data ?? []
  const articles = articlesResult.data ?? []
  const lowStock = items.filter((item) => Number(item.quantity) <= Number(item.low_stock_threshold)).length
  const stockValue = items.reduce((sum, item) => sum + Number(item.quantity) * Number(item.cost_price), 0)
  const retailValue = items.reduce((sum, item) => sum + Number(item.quantity) * Number(item.selling_price), 0)
  const recentRevenue = invoices.reduce((sum, invoice) => sum + Number(invoice.total), 0)
  const recentProfit = invoices.reduce((sum, invoice) => sum + Number(invoice.total_profit), 0)
  const margin = recentRevenue > 0 ? recentProfit / recentRevenue * 100 : 0
  const errors = [itemsResult.error, invoicesResult.error, productsResult.error, articlesResult.error, customersResult.error].filter(Boolean)

  return (
    <>
      <section className="admin-dashboard-hero">
        <div>
          <p className="admin-eyebrow">Dashboard</p>
          <h1>Good day, {profile.full_name || 'Ahmad'}.</h1>
          <p>Storefront publishing and shop operations, together.</p>
        </div>
        <div className="admin-dashboard-hero__actions">
          <Link href="/admin/invoices/new" className="admin-button admin-button--primary"><AdminIcon name="plus" /> New invoice</Link>
          <Link href="/admin/products/new" className="admin-button admin-button--secondary"><AdminIcon name="plus" /> Add product</Link>
        </div>
      </section>

      {errors.length > 0 && <div className="admin-banner admin-banner--warning">Some dashboard figures could not be loaded. Refresh or check the Supabase connection.</div>}

      <section className="admin-kpi-grid" aria-label="Shop overview">
        <DashboardKpi label="Stock items" value={String(items.length)} detail={`${lowStock} need attention`} href="/admin/stock" />
        <DashboardKpi label="Stock cost" value={money(stockValue)} detail="Current quantity at cost" href="/admin/stock" />
        <DashboardKpi label="Retail value" value={money(retailValue)} detail={`${money(retailValue - stockValue)} potential profit`} href="/admin/stock" />
        <DashboardKpi label="Recent revenue" value={money(recentRevenue)} detail="Latest five invoices" href="/admin/invoices" />
      </section>

      <div className="admin-dashboard-grid">
        <section className="admin-panel admin-profit-panel">
          <div className="admin-panel__header"><div><p className="admin-eyebrow">Performance</p><h2>Recent invoice profit</h2></div><AdminIcon name="dashboard" /></div>
          <strong>{money(recentProfit)}</strong>
          <div><span>{margin.toFixed(1)}% margin</span><small>on {money(recentRevenue)} revenue</small></div>
        </section>

        <section className="admin-panel admin-attention-panel">
          <div className="admin-panel__header"><div><p className="admin-eyebrow">Attention</p><h2>Low stock</h2></div></div>
          <strong>{lowStock}</strong>
          <p>items are at or below their alert level.</p>
          <Link href="/admin/stock">Review stock <span>→</span></Link>
        </section>
      </div>

      <div className="admin-dashboard-grid admin-dashboard-grid--lower">
        <section className="admin-panel admin-recent-panel">
          <div className="admin-panel__header"><div><p className="admin-eyebrow">Sales</p><h2>Recent invoices</h2></div><Link href="/admin/invoices">See all →</Link></div>
          {invoices.length ? <div className="admin-recent-list">{invoices.map((invoice) => (
            <Link href={`/admin/invoices/${invoice.id}`} key={invoice.id}>
              <span className="admin-recent-list__icon"><AdminIcon name="invoice" /></span>
              <span><strong>{invoice.customer_name || 'Walk-in customer'}</strong><small>{invoice.invoice_number} · {new Date(invoice.created_at).toLocaleDateString('en-AE')}</small></span>
              <span><strong>{money(invoice.total)}</strong><small>{money(invoice.total_profit)} profit</small></span>
            </Link>
          ))}</div> : <div className="admin-empty"><p>No invoices yet.</p></div>}
        </section>

        <section className="admin-panel admin-publishing-panel">
          <div className="admin-panel__header"><div><p className="admin-eyebrow">Publishing</p><h2>Content status</h2></div></div>
          <dl>
            <div><dt>Products live</dt><dd>{products.filter((entry) => entry.is_published).length} / {products.length}</dd></div>
            <div><dt>Product drafts</dt><dd>{products.filter((entry) => !entry.is_published).length}</dd></div>
            <div><dt>Articles live</dt><dd>{articles.filter((entry) => entry.is_published).length} / {articles.length}</dd></div>
            <div><dt>Saved customers</dt><dd>{customersResult.count ?? 0}</dd></div>
          </dl>
        </section>
      </div>
    </>
  )
}

function DashboardKpi({ label, value, detail, href }: { label: string; value: string; detail: string; href: string }) {
  return <Link href={href} className="admin-kpi-card"><span>{label}</span><strong>{value}</strong><small>{detail}</small></Link>
}
