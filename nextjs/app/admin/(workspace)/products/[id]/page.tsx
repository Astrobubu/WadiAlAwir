import { notFound } from 'next/navigation'
import Image from 'next/image'
import AdminProductForm from '@/components/admin/AdminProductForm'
import AdminMediaUploader from '@/components/admin/AdminMediaUploader'
import { requireStaff } from '@/lib/supabase/admin'
import { isR2Configured } from '@/lib/r2'

interface EditProductPageProps { params: Promise<{ id: string }> }

export default async function EditAdminProductPage({ params }: EditProductPageProps) {
  const { id } = await params
  const { supabase } = await requireStaff(['owner', 'editor'])
  const [productResult, vehiclesResult] = await Promise.all([
    supabase.from('catalog_products').select(`
      id, item_id, vehicle_id, slug, name_en, name_ar, description_en, description_ar,
      features_en, features_ar, car_year, category, warranty, badge,
      seo_title_en, seo_title_ar, seo_description_en, seo_description_ar,
      is_published, sort_order,
      item:items!inner(sku, unit, quantity, low_stock_threshold, cost_price, selling_price, supplier_notes),
      images:catalog_product_images(id, public_url, alt_en, is_thumbnail, sort_order)
    `).eq('id', id).maybeSingle(),
    supabase.from('catalog_vehicles').select('id, name_en, name_ar, years').order('sort_order'),
  ])

  if (productResult.error || !productResult.data) notFound()

  const product = productResult.data as unknown as Parameters<typeof AdminProductForm>[0]['product'] & {
    images: Array<{ id: string; public_url: string; alt_en: string | null; is_thumbnail: boolean; sort_order: number }>
  }

  return (
    <>
      <div className="admin-page-heading"><div><p className="admin-eyebrow">Catalogue</p><h1>Edit product</h1><p>Changes update the public pages and linked invoice stock record.</p></div></div>
      <AdminProductForm
        vehicles={vehiclesResult.data ?? []}
        product={product}
      />
      <section className="admin-panel">
        <div className="admin-panel__header"><p className="admin-eyebrow">Cloudflare R2</p><h2>Product images</h2></div>
        {product.images?.length > 0 && <div className="admin-media-grid admin-media-grid--compact">{[...product.images].sort((a, b) => a.sort_order - b.sort_order).map((image) => <article key={image.id} className="admin-media-card"><Image src={image.public_url} alt={image.alt_en ?? ''} width={400} height={300} /><div><strong>{image.is_thumbnail ? 'Thumbnail' : 'Gallery image'}</strong><small>{image.alt_en || 'No alt text'}</small></div></article>)}</div>}
        {isR2Configured ? <AdminMediaUploader productId={id} /> : <div className="admin-banner admin-banner--warning">Configure R2 to upload new images. Existing imported image URLs remain available.</div>}
      </section>
    </>
  )
}
