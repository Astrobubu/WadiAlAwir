'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireStaff } from '@/lib/supabase/admin'

export interface ProductActionState {
  error: string
}

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? '').trim()
}

function number(formData: FormData, key: string) {
  const value = Number(formData.get(key) ?? 0)
  return Number.isFinite(value) ? value : 0
}

function lines(formData: FormData, key: string) {
  return text(formData, key)
    .split(/\r?\n/)
    .map((entry) => entry.trim())
    .filter(Boolean)
}

export async function saveProductAction(
  _state: ProductActionState,
  formData: FormData
): Promise<ProductActionState> {
  const { supabase } = await requireStaff(['owner', 'editor'])
  const productId = text(formData, 'product_id')
  let itemId = text(formData, 'item_id')
  const slug = text(formData, 'slug').toLowerCase()
  const nameEn = text(formData, 'name_en')
  const nameAr = text(formData, 'name_ar')
  const vehicleId = text(formData, 'vehicle_id')
  const category = text(formData, 'category')

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return { error: 'Slug must contain lowercase letters, numbers and hyphens only.' }
  }
  if (!nameEn || !nameAr || !vehicleId) {
    return { error: 'English name, Arabic name and vehicle are required.' }
  }
  if (!['exterior', 'interior', 'lighting', 'utility'].includes(category)) {
    return { error: 'Choose a valid product category.' }
  }

  const itemPayload = {
    name: nameEn,
    sku: text(formData, 'sku') || null,
    category,
    unit: text(formData, 'unit') || 'pcs',
    quantity: number(formData, 'quantity'),
    low_stock_threshold: number(formData, 'low_stock_threshold'),
    cost_price: number(formData, 'cost_price'),
    selling_price: number(formData, 'price'),
    msrp: number(formData, 'price'),
    supplier_notes: text(formData, 'supplier_notes') || null,
  }

  let createdItem = false
  if (itemId) {
    const { error } = await supabase.from('items').update(itemPayload).eq('id', itemId)
    if (error) return { error: error.message }
  } else {
    const { data, error } = await supabase
      .from('items')
      .insert(itemPayload)
      .select('id')
      .single()
    if (error || !data) return { error: error?.message ?? 'Could not create stock item.' }
    itemId = data.id as string
    createdItem = true
  }

  const published = formData.get('is_published') === 'on'
  const productPayload = {
    item_id: itemId,
    vehicle_id: vehicleId,
    slug,
    name_en: nameEn,
    name_ar: nameAr,
    description_en: text(formData, 'description_en'),
    description_ar: text(formData, 'description_ar'),
    features_en: lines(formData, 'features_en'),
    features_ar: lines(formData, 'features_ar'),
    car_year: text(formData, 'car_year'),
    category,
    currency: 'AED',
    badge: formData.get('has_warranty') === 'on' ? 'warranty' : null,
    warranty: text(formData, 'warranty') || null,
    seo_title_en: text(formData, 'seo_title_en') || null,
    seo_title_ar: text(formData, 'seo_title_ar') || null,
    seo_description_en: text(formData, 'seo_description_en') || null,
    seo_description_ar: text(formData, 'seo_description_ar') || null,
    is_published: published,
    published_at: published ? new Date().toISOString() : null,
    sort_order: number(formData, 'sort_order'),
  }

  const result = productId
    ? await supabase.from('catalog_products').update(productPayload).eq('id', productId)
    : await supabase.from('catalog_products').insert(productPayload)

  if (result.error) {
    if (createdItem) await supabase.from('items').delete().eq('id', itemId)
    return { error: result.error.message }
  }

  revalidatePath('/admin')
  revalidateTag('wadi-catalogue')
  revalidatePath('/admin/products')
  revalidatePath('/en')
  revalidatePath('/ar')
  revalidatePath('/en/products')
  revalidatePath('/ar/products')
  revalidatePath(`/en/products/${slug}`)
  revalidatePath(`/ar/products/${slug}`)
  revalidatePath('/sitemap.xml')
  redirect('/admin/products?saved=1')
}

export async function unpublishProductAction(formData: FormData) {
  const { supabase } = await requireStaff(['owner', 'editor'])
  const id = text(formData, 'id')
  if (id) {
    await supabase
      .from('catalog_products')
      .update({ is_published: false, published_at: null })
      .eq('id', id)
  }
  revalidateTag('wadi-catalogue')
  revalidatePath('/admin/products')
  revalidatePath('/en/products')
  revalidatePath('/ar/products')
  revalidatePath('/sitemap.xml')
}
