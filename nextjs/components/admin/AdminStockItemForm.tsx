'use client'

import { useActionState } from 'react'
import { saveStockItemAction, type StockActionState } from '@/app/admin/(workspace)/stock/actions'

export interface StockItemValue { id?: string; name?: string; sku?: string | null; category?: string | null; unit?: string; quantity?: number; low_stock_threshold?: number; cost_price?: number; selling_price?: number; supplier_notes?: string | null; isCatalogue?: boolean }

const initialState: StockActionState = { error: '' }

export default function AdminStockItemForm({ item = {} }: { item?: StockItemValue }) {
  const [state, action, pending] = useActionState(saveStockItemAction, initialState)
  return <form action={action} className="admin-editor admin-stock-form"><input type="hidden" name="id" value={item.id ?? ''} />{state.error && <p className="admin-form-error" role="alert">{state.error}</p>}
    {item.isCatalogue && <div className="admin-info-strip"><div><strong>Linked storefront item</strong><span>Price and stock changes sync to the product. Edit public names, descriptions, and images from Products.</span></div></div>}
    <section className="admin-editor__section"><div className="admin-editor__section-heading"><span>01</span><div><h2>Item details</h2><p>Used in stock reports and the invoice picker.</p></div></div><div className="admin-form-grid admin-form-grid--3"><Field label="Name" required><input name="name" defaultValue={item.name} required /></Field><Field label="SKU"><input name="sku" defaultValue={item.sku ?? ''} /></Field><Field label="Category"><input name="category" defaultValue={item.category ?? ''} placeholder="Body, Lighting, Service…" /></Field><Field label="Unit"><select name="unit" defaultValue={item.unit ?? 'pcs'}><option value="pcs">Pieces</option><option value="set">Set</option><option value="m">Meters</option><option value="l">Liters</option><option value="kg">Kilograms</option></select></Field></div></section>
    <section className="admin-editor__section"><div className="admin-editor__section-heading"><span>02</span><div><h2>Quantity and pricing</h2><p>Margin and stock value update immediately after saving.</p></div></div><div className="admin-form-grid admin-form-grid--2"><Field label="Quantity"><input name="quantity" type="number" min="0" step="0.001" defaultValue={item.quantity ?? 0} /></Field><Field label="Low-stock alert"><input name="low_stock_threshold" type="number" min="0" step="0.001" defaultValue={item.low_stock_threshold ?? 0} /></Field><Field label="Cost price (AED)"><input name="cost_price" type="number" min="0" step="0.01" defaultValue={item.cost_price ?? 0} /></Field><Field label="Selling price (AED)"><input name="selling_price" type="number" min="0" step="0.01" defaultValue={item.selling_price ?? 0} /></Field></div><Field label="Supplier notes"><textarea name="supplier_notes" rows={4} defaultValue={item.supplier_notes ?? ''} /></Field></section>
    <footer className="admin-editor__footer"><span>{item.id ? 'A history snapshot is saved before this update.' : 'Internal-only items stay off the public storefront.'}</span><button className="admin-button admin-button--primary" disabled={pending}>{pending ? 'Saving…' : item.id ? 'Save item' : 'Add item'}</button></footer>
  </form>
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) { return <label className="admin-field"><span>{label}{required ? ' *' : ''}</span>{children}</label> }
