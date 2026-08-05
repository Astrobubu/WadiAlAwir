import Image from 'next/image'
import Link from '@/components/admin/AdminLink'
import AdminDeleteStockButton from '@/components/admin/AdminDeleteStockButton'
import AdminIcon from '@/components/admin/AdminIcon'
import { requireStaff } from '@/lib/supabase/admin'
import { unpublishProductAction } from './actions'

interface ProductsPageProps {
  searchParams: Promise<{ saved?: string; q?: string; status?: string; error?: string }>
}

interface CatalogueProduct {
  id: string
  item_id: string
  slug: string
  name_en: string
  name_ar: string
  category: string
  is_published: boolean
  sort_order: number
  vehicle: { name_en: string } | null
  images: Array<{ id: string; public_url: string; is_thumbnail: boolean; sort_order: number }>
}

interface InventoryProduct {
  id: string
  name: string
  sku: string | null
  category: string | null
  unit: string
  quantity: number
  low_stock_threshold: number
  cost_price: number
  selling_price: number
  invoice_items: Array<{ id: string }>
}

const money = (value: number) => `AED ${Number(value).toLocaleString('en-AE', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}`

export default async function AdminProductsPage({ searchParams }: ProductsPageProps) {
  const query = await searchParams
  const { supabase, profile } = await requireStaff()
  const [itemsResult, productsResult] = await Promise.all([
    supabase
      .from('items')
      .select('id, name, sku, category, unit, quantity, low_stock_threshold, cost_price, selling_price, invoice_items(id)')
      .order('name'),
    supabase
      .from('catalog_products')
      .select(`
        id, item_id, slug, name_en, name_ar, category, is_published, sort_order,
        vehicle:catalog_vehicles(name_en),
        images:catalog_product_images(id, public_url, is_thumbnail, sort_order)
      `)
      .order('sort_order'),
  ])

  const items = (itemsResult.data ?? []) as unknown as InventoryProduct[]
  const products = (productsResult.data ?? []) as unknown as CatalogueProduct[]
  const productByItemId = new Map(products.map((product) => [product.item_id, product]))
  const error = itemsResult.error ?? productsResult.error
  const canEditProduct = profile.role === 'owner' || profile.role === 'editor'
  const canEditInventory = canEditProduct || profile.role === 'accountant'
  const canDelete = canEditProduct
  const term = query.q?.trim().toLowerCase() ?? ''
  const allowedStatuses = ['published', 'draft', 'internal', 'low']
  const status = allowedStatuses.includes(query.status ?? '') ? query.status! : 'all'

  const productFor = (item: InventoryProduct) => productByItemId.get(item.id) ?? null
  const isLow = (item: InventoryProduct) => Number(item.quantity) <= Number(item.low_stock_threshold)
  const liveCount = items.filter((item) => productFor(item)?.is_published).length
  const draftCount = items.filter((item) => {
    const product = productFor(item)
    return product && !product.is_published
  }).length
  const internalCount = items.filter((item) => !productFor(item)).length
  const lowCount = items.filter(isLow).length
  const inventoryCost = items.reduce((sum, item) => sum + Number(item.quantity) * Number(item.cost_price), 0)

  const visibleItems = items.filter((item) => {
    const product = productFor(item)
    const matchesTerm = !term || [item.name, item.sku, item.category, product?.name_en, product?.name_ar, product?.slug]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .includes(term)
    const matchesStatus = status === 'all'
      || (status === 'published' && product?.is_published)
      || (status === 'draft' && product && !product.is_published)
      || (status === 'internal' && !product)
      || (status === 'low' && isLow(item))
    return matchesTerm && matchesStatus
  })

  return (
    <>
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">Products &amp; inventory</p>
          <h1>Products</h1>
          <p>Manage storefront content, invoice availability, quantities, costs and selling prices from one place.</p>
        </div>
        <div className="admin-page-heading__actions">
          {canEditInventory && <Link href="/admin/products/inventory/new" className="admin-button admin-button--quiet"><AdminIcon name="plus" /> Add invoice-only item</Link>}
          {canEditProduct && <Link href="/admin/products/new" className="admin-button admin-button--primary"><AdminIcon name="plus" /> Add product</Link>}
        </div>
      </div>

      {query.saved && <div className="admin-banner admin-banner--success">{query.saved === 'deleted' ? 'Invoice-only item deleted.' : query.saved === 'inventory' ? 'Inventory item saved.' : 'Product saved and storefront caches refreshed.'}</div>}
      {query.error === 'protected' && <div className="admin-banner admin-banner--warning">This item is linked to a storefront product or invoice history and cannot be deleted.</div>}

      <section className="admin-products-summary" aria-label="Product inventory summary">
        <div><span>Total products</span><strong>{items.length}</strong><small>{internalCount} invoice only</small></div>
        <div><span>Storefront live</span><strong>{liveCount}</strong><small>{draftCount} drafts</small></div>
        <div><span>Low stock</span><strong>{lowCount}</strong><small>At or below alert level</small></div>
        <div><span>Inventory cost</span><strong>{money(inventoryCost)}</strong><small>Quantity at cost</small></div>
      </section>

      <form className="admin-search-bar admin-search-bar--filters" method="get">
        <AdminIcon name="search" />
        <input name="q" defaultValue={query.q} placeholder="Search name, SKU, slug or category" />
        <select name="status" defaultValue={status} aria-label="Product status">
          <option value="all">All products</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="internal">Invoice only</option>
          <option value="low">Low stock</option>
        </select>
        <button className="admin-button admin-button--quiet">Filter</button>
        {(term || status !== 'all') && <Link href="/admin/products">Clear</Link>}
      </form>

      {error ? (
        <div className="admin-banner admin-banner--warning"><strong>Product inventory could not be loaded.</strong><span>{error.message}</span></div>
      ) : visibleItems.length === 0 ? (
        <div className="admin-empty"><h2>No matching products</h2><p>Try another name, SKU, category or status.</p></div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table admin-products-table">
            <thead><tr><th>Product</th><th>Vehicle</th><th>Inventory</th><th>Cost</th><th>Sell</th><th>Margin</th><th>Visibility</th><th /></tr></thead>
            <tbody>
              {visibleItems.map((item) => {
                const product = productFor(item)
                const image = product ? [...(product.images ?? [])].sort((a, b) => Number(b.is_thumbnail) - Number(a.is_thumbnail) || a.sort_order - b.sort_order)[0] : null
                const quantity = Number(item.quantity)
                const threshold = Number(item.low_stock_threshold)
                const cost = Number(item.cost_price)
                const selling = Number(item.selling_price)
                const margin = selling > 0 ? (selling - cost) / selling * 100 : 0
                const low = isLow(item)
                const protectedItem = Boolean(product) || (item.invoice_items?.length ?? 0) > 0

                return (
                  <tr key={item.id}>
                    <td>
                      <div className="admin-product-cell">
                        {image ? <Image src={image.public_url} alt="" width={54} height={54} /> : <span className="admin-product-cell__empty">No image</span>}
                        <div>
                          <strong>{product?.name_en ?? item.name}</strong>
                          {product ? <small dir="rtl">{product.name_ar}</small> : <small>Invoice-only item</small>}
                          <code>{item.sku || 'No SKU'} · {product?.category ?? item.category ?? 'Uncategorized'}</code>
                        </div>
                      </div>
                    </td>
                    <td>{product?.vehicle?.name_en ?? '—'}</td>
                    <td><div className="admin-inventory-cell"><strong>{quantity.toLocaleString('en-AE')} {item.unit}</strong><span className={`admin-status admin-status--${low ? 'warning' : 'live'}`}>{low ? 'Low stock' : 'In stock'}</span><small>Alert at {threshold.toLocaleString('en-AE')}</small></div></td>
                    <td>{money(cost)}</td>
                    <td>{money(selling)}</td>
                    <td>{margin.toFixed(1)}%</td>
                    <td><span className={`admin-status admin-status--${product?.is_published ? 'live' : 'draft'}`}>{product ? (product.is_published ? 'Published' : 'Draft') : 'Invoice only'}</span></td>
                    <td>
                      <div className="admin-row-actions">
                        {product && canEditProduct && <Link className="admin-row-action admin-row-action--edit" href={`/admin/products/${product.id}`}>Edit</Link>}
                        {product && !canEditProduct && canEditInventory && <Link className="admin-row-action admin-row-action--edit" href={`/admin/products/inventory/${item.id}`}>Edit inventory</Link>}
                        {!product && canEditInventory && <Link className="admin-row-action admin-row-action--edit" href={`/admin/products/inventory/${item.id}`}>Edit</Link>}
                        {product?.is_published && canEditProduct && <form action={unpublishProductAction}><input type="hidden" name="id" value={product.id} /><button className="admin-row-action admin-row-action--danger">Unpublish</button></form>}
                        {!product && canDelete && !protectedItem && <AdminDeleteStockButton id={item.id} name={item.name} />}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
