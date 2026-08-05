import Link from '@/components/admin/AdminLink'
import Image from 'next/image'
import AdminIcon from '@/components/admin/AdminIcon'
import { requireStaff } from '@/lib/supabase/admin'
import { unpublishProductAction } from './actions'

interface ProductsPageProps {
  searchParams: Promise<{ saved?: string; q?: string; status?: string }>
}

export default async function AdminProductsPage({ searchParams }: ProductsPageProps) {
  const query = await searchParams
  const { supabase, profile } = await requireStaff()
  const { data, error } = await supabase
    .from('catalog_products')
    .select(`
      id, slug, name_en, name_ar, category, price, currency, is_published, updated_at,
      vehicle:catalog_vehicles(name_en),
      images:catalog_product_images(id, public_url, is_thumbnail, sort_order)
    `)
    .order('sort_order')
    .order('updated_at', { ascending: false })

  const products = (data ?? []) as unknown as Array<{
    id: string
    slug: string
    name_en: string
    name_ar: string
    category: string
    price: number
    currency: string
    is_published: boolean
    updated_at: string
    vehicle: { name_en: string } | null
    images: Array<{ id: string; public_url: string; is_thumbnail: boolean; sort_order: number }>
  }>
  const canEdit = profile.role === 'owner' || profile.role === 'editor'
  const term = query.q?.trim().toLowerCase() ?? ''
  const status = query.status === 'published' || query.status === 'draft' ? query.status : 'all'
  const visibleProducts = products.filter((product) => {
    const matchesTerm = !term || `${product.name_en} ${product.name_ar} ${product.slug}`.toLowerCase().includes(term)
    const matchesStatus = status === 'all' || (status === 'published' ? product.is_published : !product.is_published)
    return matchesTerm && matchesStatus
  })

  return (
    <>
      <div className="admin-page-heading">
        <div><p className="admin-eyebrow">Catalogue</p><h1>Products</h1><p>Public content and invoice stock remain linked through one item record.</p></div>
        {canEdit && <Link href="/admin/products/new" className="admin-button admin-button--primary">Add product</Link>}
      </div>
      {query.saved && <div className="admin-banner admin-banner--success">Product saved and storefront caches refreshed.</div>}
      <form className="admin-search-bar admin-search-bar--filters" method="get"><AdminIcon name="search" /><input name="q" defaultValue={query.q} placeholder="Search product name or slug" /><select name="status" defaultValue={status} aria-label="Publication status"><option value="all">All statuses</option><option value="published">Published</option><option value="draft">Draft</option></select><button className="admin-button admin-button--quiet">Filter</button>{(term || status !== 'all') && <Link href="/admin/products">Clear</Link>}</form>
      {error ? (
        <div className="admin-banner admin-banner--warning"><strong>Catalogue tables are not ready.</strong><span>{error.message}</span></div>
      ) : visibleProducts.length === 0 ? (
        <div className="admin-empty"><h2>No products in Supabase yet</h2><p>Run the prepared catalogue importer after applying the migration.</p></div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Product</th><th>Vehicle</th><th>Category</th><th>Price</th><th>Status</th><th /></tr></thead>
            <tbody>
              {visibleProducts.map((product) => {
                const image = [...(product.images ?? [])].sort((a, b) => Number(b.is_thumbnail) - Number(a.is_thumbnail) || a.sort_order - b.sort_order)[0]
                return (
                  <tr key={product.id}>
                    <td><div className="admin-product-cell">{image ? <Image src={image.public_url} alt="" width={54} height={54} /> : <span className="admin-product-cell__empty">No image</span>}<div><strong>{product.name_en}</strong><small dir="rtl">{product.name_ar}</small><code>{product.slug}</code></div></div></td>
                    <td>{product.vehicle?.name_en ?? '—'}</td>
                    <td><span className="admin-chip">{product.category}</span></td>
                    <td>{Number(product.price).toLocaleString('en-AE')} {product.currency}</td>
                    <td><span className={`admin-status admin-status--${product.is_published ? 'live' : 'draft'}`}>{product.is_published ? 'Published' : 'Draft'}</span></td>
                    <td><div className="admin-row-actions">{canEdit && <Link className="admin-row-action admin-row-action--edit" href={`/admin/products/${product.id}`}>Edit</Link>}{canEdit && product.is_published && <form action={unpublishProductAction}><input type="hidden" name="id" value={product.id} /><button className="admin-row-action admin-row-action--danger">Unpublish</button></form>}</div></td>
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
