'use client'

import { useActionState, useState } from 'react'
import { saveProductAction, type ProductActionState } from '@/app/admin/(workspace)/products/actions'
import AdminIcon from './AdminIcon'

export interface AdminVehicleOption {
  id: string
  name_en: string
  name_ar: string
  years: string
}

export interface AdminProductValue {
  id?: string
  item_id?: string
  vehicle_id?: string
  slug?: string
  name_en?: string
  name_ar?: string
  description_en?: string
  description_ar?: string
  features_en?: string[]
  features_ar?: string[]
  car_year?: string
  category?: string
  warranty?: string | null
  badge?: string | null
  seo_title_en?: string | null
  seo_title_ar?: string | null
  seo_description_en?: string | null
  seo_description_ar?: string | null
  is_published?: boolean
  sort_order?: number
  item?: {
    sku?: string | null
    unit?: string
    quantity?: number
    low_stock_threshold?: number
    cost_price?: number
    selling_price?: number
    supplier_notes?: string | null
  } | null
}

const initialState: ProductActionState = { error: '' }

export default function AdminProductForm({
  vehicles,
  product = {},
}: {
  vehicles: AdminVehicleOption[]
  product?: AdminProductValue
}) {
  const [state, action, pending] = useActionState(saveProductAction, initialState)
  const item = product.item ?? {}
  const [nameEn, setNameEn] = useState(product.name_en ?? '')
  const [slug, setSlug] = useState(product.slug ?? '')
  const [sku, setSku] = useState(item.sku ?? '')

  return (
    <form action={action} className="admin-editor">
      <input type="hidden" name="product_id" value={product.id ?? ''} />
      <input type="hidden" name="item_id" value={product.item_id ?? ''} />

      {state.error && <p className="admin-form-error" role="alert">{state.error}</p>}

      <section className="admin-editor__section">
        <div className="admin-editor__section-heading">
          <span>01</span>
          <div><h2>Identity</h2><p>Shared public and stock identifiers.</p></div>
        </div>
        <div className="admin-form-grid admin-form-grid--3">
          <GeneratedField label="Slug" htmlFor="admin-product-slug" onGenerate={() => setSlug(generateSlug(nameEn))} required>
            <input id="admin-product-slug" name="slug" value={slug} onChange={(event) => setSlug(event.target.value)} placeholder="jetour-t2-mud-guard" required />
          </GeneratedField>
          <GeneratedField label="SKU" htmlFor="admin-product-sku" onGenerate={() => setSku(generateSku(nameEn))}>
            <input id="admin-product-sku" name="sku" value={sku} onChange={(event) => setSku(event.target.value)} placeholder="WADI-JETOUR-T2-MUD-GUARD" />
          </GeneratedField>
          <Field label="Vehicle" required>
            <select name="vehicle_id" defaultValue={product.vehicle_id} required>
              <option value="">Choose vehicle</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>{vehicle.name_en} · {vehicle.years}</option>
              ))}
            </select>
          </Field>
          <Field label="Category" required>
            <select name="category" defaultValue={product.category ?? 'exterior'}>
              <option value="exterior">Exterior</option>
              <option value="interior">Interior</option>
              <option value="lighting">Lighting</option>
              <option value="utility">Utility</option>
            </select>
          </Field>
          <Field label="Vehicle year">
            <input name="car_year" defaultValue={product.car_year} placeholder="2023–2026" />
          </Field>
          <Field label="Sort order">
            <input name="sort_order" type="number" defaultValue={product.sort_order ?? 0} />
          </Field>
        </div>
      </section>

      <section className="admin-editor__section">
        <div className="admin-editor__section-heading">
          <span>02</span>
          <div><h2>Bilingual content</h2><p>Both languages are required before publishing.</p></div>
        </div>
        <div className="admin-language-grid">
          <div className="admin-language-card" dir="ltr">
            <strong>English</strong>
            <Field label="Product name" required><input name="name_en" value={nameEn} onChange={(event) => setNameEn(event.target.value)} required /></Field>
            <Field label="Description" required><textarea name="description_en" rows={5} defaultValue={product.description_en} required /></Field>
            <Field label="Features — one per line"><textarea name="features_en" rows={6} defaultValue={product.features_en?.join('\n')} /></Field>
          </div>
          <div className="admin-language-card" dir="rtl">
            <strong>العربية</strong>
            <Field label="اسم المنتج" required><input name="name_ar" defaultValue={product.name_ar} required /></Field>
            <Field label="الوصف" required><textarea name="description_ar" rows={5} defaultValue={product.description_ar} required /></Field>
            <Field label="المزايا — ميزة في كل سطر"><textarea name="features_ar" rows={6} defaultValue={product.features_ar?.join('\n')} /></Field>
          </div>
        </div>
      </section>

      <section className="admin-editor__section">
        <div className="admin-editor__section-heading">
          <span>03</span>
          <div><h2>Stock and pricing</h2><p>The public price stays synchronized with the invoice item.</p></div>
        </div>
        <div className="admin-form-grid admin-form-grid--3">
          <Field label="Selling price (AED)" required><input name="price" type="number" step="0.01" min="0" defaultValue={item.selling_price ?? 0} required /></Field>
          <Field label="Cost price (AED)"><input name="cost_price" type="number" step="0.01" min="0" defaultValue={item.cost_price ?? 0} /></Field>
          <Field label="Quantity"><input name="quantity" type="number" step="0.001" defaultValue={item.quantity ?? 0} /></Field>
          <Field label="Low-stock threshold"><input name="low_stock_threshold" type="number" step="0.001" defaultValue={item.low_stock_threshold ?? 0} /></Field>
          <Field label="Unit">
            <select name="unit" defaultValue={item.unit ?? 'pcs'}>
              <option value="pcs">Pieces</option><option value="set">Set</option><option value="m">Meters</option><option value="l">Liters</option><option value="kg">Kilograms</option>
            </select>
          </Field>
          <Field label="Supplier notes"><input name="supplier_notes" defaultValue={item.supplier_notes ?? ''} /></Field>
        </div>
        <div className="admin-inline-options">
          <label><input type="checkbox" name="has_warranty" defaultChecked={product.badge === 'warranty'} /> Warranty badge</label>
          <Field label="Warranty text"><input name="warranty" defaultValue={product.warranty ?? ''} placeholder="1 year" /></Field>
        </div>
      </section>

      <section className="admin-editor__section">
        <div className="admin-editor__section-heading">
          <span>04</span>
          <div><h2>Search appearance</h2><p>Optional overrides; product content remains the fallback.</p></div>
        </div>
        <div className="admin-language-grid">
          <div className="admin-language-card" dir="ltr">
            <Field label="SEO title"><input name="seo_title_en" defaultValue={product.seo_title_en ?? ''} /></Field>
            <Field label="SEO description"><textarea name="seo_description_en" rows={3} defaultValue={product.seo_description_en ?? ''} /></Field>
          </div>
          <div className="admin-language-card" dir="rtl">
            <Field label="عنوان محركات البحث"><input name="seo_title_ar" defaultValue={product.seo_title_ar ?? ''} /></Field>
            <Field label="وصف محركات البحث"><textarea name="seo_description_ar" rows={3} defaultValue={product.seo_description_ar ?? ''} /></Field>
          </div>
        </div>
      </section>

      <footer className="admin-editor__footer">
        <label className="admin-publish-toggle">
          <input type="checkbox" name="is_published" defaultChecked={product.is_published} />
          <span><strong>Published</strong><small>Visible on English and Arabic storefronts</small></span>
        </label>
        <button className="admin-button admin-button--primary" disabled={pending}>
          {pending ? 'Saving…' : product.id ? 'Save changes' : 'Create product'}
        </button>
      </footer>
    </form>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return <label className="admin-field"><span>{label}{required ? ' *' : ''}</span>{children}</label>
}

function GeneratedField({ label, htmlFor, onGenerate, required, children }: { label: string; htmlFor: string; onGenerate: () => void; required?: boolean; children: React.ReactNode }) {
  return <div className="admin-field admin-generated-field"><span><label htmlFor={htmlFor}>{label}{required ? ' *' : ''}</label><button type="button" onClick={onGenerate}><AdminIcon name="plus" /> Generate</button></span><div>{children}</div></div>
}

function generateSlug(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)
}

function generateSku(value: string) {
  const slug = generateSlug(value)
  return slug ? `WADI-${slug.toUpperCase()}`.slice(0, 120) : ''
}
