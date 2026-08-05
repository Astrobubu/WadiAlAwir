import Link from '@/components/admin/AdminLink'
import AdminIcon from '@/components/admin/AdminIcon'
import { requireStaff } from '@/lib/supabase/admin'

const money = (value: number) => `AED ${Number(value).toLocaleString('en-AE', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}`

export default async function AdminDashboardPage() {
  const { supabase } = await requireStaff()
  const [itemsResult, invoicesResult, productsResult, articlesResult, customersResult] = await Promise.all([
    supabase.from('items').select('id, name, quantity, low_stock_threshold, cost_price, selling_price'),
    supabase.from('invoices').select('id, invoice_number, customer_name, total, total_profit, created_at').order('created_at', { ascending: false }).limit(5),
    supabase.from('catalog_products').select('id, is_published'),
    supabase.from('articles').select('id, is_published'),
    supabase.from('customers').select('*', { count: 'exact', head: true }),
  ])

  const items = itemsResult.data ?? []
  const invoices = invoicesResult.data ?? []
  const products = productsResult.data ?? []
  const articles = articlesResult.data ?? []
  const lowStockItems = items.filter((item) => Number(item.quantity) <= Number(item.low_stock_threshold))
  const stockValue = items.reduce((sum, item) => sum + Number(item.quantity) * Number(item.cost_price), 0)
  const retailValue = items.reduce((sum, item) => sum + Number(item.quantity) * Number(item.selling_price), 0)
  const recentRevenue = invoices.reduce((sum, invoice) => sum + Number(invoice.total), 0)
  const recentProfit = invoices.reduce((sum, invoice) => sum + Number(invoice.total_profit), 0)
  const margin = recentRevenue > 0 ? recentProfit / recentRevenue * 100 : 0
  const potentialProfit = retailValue - stockValue
  const errors = [itemsResult.error, invoicesResult.error, productsResult.error, articlesResult.error, customersResult.error].filter(Boolean)

  return (
    <>
      <section className="admin-dashboard-hero">
        <div className="admin-dashboard-hero__heading">
          <div>
            <p className="admin-eyebrow">Dashboard</p>
            <h1>Good day.</h1>
            <p>Here is what your shop looks like right now.</p>
          </div>
          <Link href="/admin/invoices/new" className="admin-button admin-button--primary"><AdminIcon name="plus" /> New invoice</Link>
        </div>
        <div className="admin-dashboard-hero__stats" aria-label="Shop overview">
          <HeroStat label="Products tracked" value={String(items.length)} />
          <HeroStat label="Low stock" value={String(lowStockItems.length)} />
          <HeroStat label="Inventory value" value={money(stockValue)} />
          <HeroStat label="Recent revenue" value={money(recentRevenue)} />
        </div>
      </section>

      {errors.length > 0 && <div className="admin-banner admin-banner--warning">Some dashboard figures could not be loaded. Refresh or check the Supabase connection.</div>}

      <section className="admin-profit-grid" aria-label="Profit overview">
        <div className="admin-profit-card admin-profit-card--recent">
          <AdminIcon name="dashboard" />
          <p>Profit · recent 5 invoices</p>
          <strong>{money(recentProfit)}</strong>
          <div><span>{margin.toFixed(1)}% margin</span><small>on {money(recentRevenue)} revenue</small></div>
        </div>
        <div className="admin-profit-card admin-profit-card--potential">
          <span className="admin-profit-card__arrow">↗</span>
          <p>Potential product profit</p>
          <strong>{money(potentialProfit)}</strong>
          <small>if all items sell at current prices</small>
        </div>
      </section>

      <div className={`admin-dashboard-lower${lowStockItems.length === 0 ? ' admin-dashboard-lower--single' : ''}`}>
        {lowStockItems.length > 0 && (
          <section className="admin-dashboard-card admin-attention-card">
            <div className="admin-dashboard-card__header"><h2>Attention</h2><Link href="/admin/products?status=low">View products →</Link></div>
            <div className="admin-attention-card__alert">
              <span className="admin-attention-card__icon"><AdminIcon name="package" /></span>
              <div>
                <strong>{lowStockItems.length}</strong>
                <small>items are at or below low-stock alert</small>
                <p>{lowStockItems.slice(0, 4).map((item) => item.name).join(' · ')}{lowStockItems.length > 4 ? ` +${lowStockItems.length - 4}` : ''}</p>
              </div>
            </div>
          </section>
        )}

        <section className="admin-dashboard-card admin-recent-card">
          <div className="admin-dashboard-card__header"><h2>Recent invoices</h2><Link href="/admin/invoices">See all →</Link></div>
          {invoices.length ? <div className="admin-recent-list">{invoices.map((invoice) => (
            <Link href={`/admin/invoices/${invoice.id}`} key={invoice.id}>
              <span className="admin-recent-list__icon"><AdminIcon name="invoice" /></span>
              <span><strong>{invoice.customer_name || 'Walk-in customer'}</strong><small>{new Date(invoice.created_at).toLocaleDateString('en-AE')} · {invoice.invoice_number}</small></span>
              <span><strong>{money(invoice.total)}</strong><small>+{money(invoice.total_profit)}</small></span>
            </Link>
          ))}</div> : <div className="admin-empty"><p>No invoices yet.</p></div>}
        </section>
      </div>

      <section className="admin-content-strip" aria-label="Publishing status">
        <div><span>Products live</span><strong>{products.filter((entry) => entry.is_published).length} / {products.length}</strong></div>
        <div><span>Product drafts</span><strong>{products.filter((entry) => !entry.is_published).length}</strong></div>
        <div><span>Articles live</span><strong>{articles.filter((entry) => entry.is_published).length} / {articles.length}</strong></div>
        <div><span>Saved customers</span><strong>{customersResult.count ?? 0}</strong></div>
      </section>
    </>
  )
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return <div><span>{label}</span><strong>{value}</strong></div>
}
