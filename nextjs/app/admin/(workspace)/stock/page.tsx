import Link from '@/components/admin/AdminLink'
import AdminDeleteStockButton from '@/components/admin/AdminDeleteStockButton'
import AdminIcon from '@/components/admin/AdminIcon'
import { requireStaff } from '@/lib/supabase/admin'

const money = (value: number) => `AED ${Number(value).toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

export default async function AdminStockPage({ searchParams }: { searchParams: Promise<{ q?: string; view?: string; saved?: string; error?: string }> }) {
  const query = await searchParams
  const { supabase, profile } = await requireStaff()
  const { data, error } = await supabase.from('items').select('id, name, sku, category, unit, quantity, low_stock_threshold, cost_price, selling_price, catalog_products(id), invoice_items(id)').order('name')
  const items = data ?? []
  const term = query.q?.trim().toLowerCase() ?? ''
  const filtered = term ? items.filter((item) => `${item.name} ${item.sku ?? ''} ${item.category ?? ''}`.toLowerCase().includes(term)) : items
  const view = query.view === 'list' ? 'list' : 'grid'
  const canEdit = ['owner', 'editor', 'accountant'].includes(profile.role)
  const canDelete = ['owner', 'editor'].includes(profile.role)

  return <>
    <div className="admin-page-heading"><div><p className="admin-eyebrow">Operations</p><h1>Stock</h1><p>{items.length} items · cost, selling price, margin, and low-stock state in one place.</p></div>{canEdit && <Link href="/admin/stock/new" className="admin-button admin-button--primary"><AdminIcon name="plus" /> Add item</Link>}</div>
    {query.saved && <div className="admin-banner admin-banner--success">{query.saved === 'deleted' ? 'Stock item deleted.' : 'Stock item saved and linked product pricing refreshed.'}</div>}
    {query.error === 'protected' && <div className="admin-banner admin-banner--warning">This item is linked to a storefront product or invoice history and cannot be deleted.</div>}
    <div className="admin-stock-controls"><form className="admin-search-bar" method="get"><AdminIcon name="search" /><input name="q" defaultValue={query.q} placeholder="Search name, SKU or category" /><input type="hidden" name="view" value={view} /><button className="admin-button admin-button--quiet">Search</button>{term && <Link href={`/admin/stock?view=${view}`}>Clear</Link>}</form><div className="admin-view-toggle"><Link href={`/admin/stock?view=grid${term ? `&q=${encodeURIComponent(term)}` : ''}`} className={view === 'grid' ? 'is-active' : ''} aria-label="Grid view"><AdminIcon name="grid" /></Link><Link href={`/admin/stock?view=list${term ? `&q=${encodeURIComponent(term)}` : ''}`} className={view === 'list' ? 'is-active' : ''} aria-label="List view"><AdminIcon name="list" /></Link></div></div>
    {error ? <div className="admin-banner admin-banner--warning">{error.message}</div> : !filtered.length ? <div className="admin-empty"><h2>No matching stock</h2><p>Try another name, SKU, or category.</p></div> : view === 'grid' ? <div className="admin-stock-grid">{filtered.map((item) => {
      const quantity = Number(item.quantity), cost = Number(item.cost_price), selling = Number(item.selling_price), margin = selling > 0 ? (selling - cost) / selling * 100 : 0
      const low = quantity <= Number(item.low_stock_threshold), isCatalogue = Boolean(item.catalog_products), protectedItem = isCatalogue || Boolean(item.invoice_items?.length)
      return <article className="admin-stock-card" key={item.id}><div className="admin-stock-card__heading"><div><span className={`admin-status admin-status--${low ? 'warning' : 'live'}`}>{low ? 'Low stock' : 'In stock'}</span><span className="admin-chip">{isCatalogue ? 'Storefront' : 'Internal only'}</span></div><div className="admin-stock-card__actions">{canEdit && <Link href={`/admin/stock/${item.id}`} className="admin-icon-button" aria-label={`Edit ${item.name}`} title="Edit item"><AdminIcon name="pencil" /></Link>}{canDelete && !protectedItem && <AdminDeleteStockButton id={item.id} name={item.name} />}</div></div><div><h2>{item.name}</h2><p>{item.sku || 'No SKU'} · {item.category || 'Uncategorized'}</p></div><dl><div><dt>Quantity</dt><dd>{quantity.toLocaleString('en-AE')} {item.unit}</dd></div><div><dt>Cost</dt><dd>{money(cost)}</dd></div><div><dt>Sell</dt><dd>{money(selling)}</dd></div><div><dt>Margin</dt><dd>{margin.toFixed(1)}%</dd></div><div><dt>Profit / unit</dt><dd>{money(selling - cost)}</dd></div></dl></article>
    })}</div> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Item</th><th>Type</th><th>Quantity</th><th>Cost</th><th>Sell</th><th>Margin</th><th /></tr></thead><tbody>{filtered.map((item) => { const cost=Number(item.cost_price), selling=Number(item.selling_price), isCatalogue=Boolean(item.catalog_products); return <tr key={item.id}><td><strong>{item.name}</strong><br /><small>{item.sku || 'No SKU'} · {item.category || 'Uncategorized'}</small></td><td><span className="admin-chip">{isCatalogue ? 'Storefront' : 'Internal only'}</span></td><td>{Number(item.quantity).toLocaleString('en-AE')} {item.unit}</td><td>{money(cost)}</td><td>{money(selling)}</td><td>{selling > 0 ? ((selling-cost)/selling*100).toFixed(1) : '0.0'}%</td><td>{canEdit && <Link className="admin-row-action admin-row-action--edit" href={`/admin/stock/${item.id}`}>Edit</Link>}</td></tr> })}</tbody></table></div>}
  </>
}
