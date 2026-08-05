'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminIcon from './AdminIcon'

export interface InvoiceStockItem {
  id: string
  name: string
  sku: string | null
  unit: string
  quantity: number
  cost_price: number
  selling_price: number
}

export interface InvoiceCustomer {
  id: string
  name: string
  phone: string | null
  email: string | null
  trn: string | null
  vehicle: string | null
  plate: string | null
}

export interface InvoiceLineValue {
  id?: string
  item_id: string | null
  description: string
  unit: string
  quantity: number
  unit_cost: number
  unit_price: number
}

export interface InvoiceValue {
  id: string
  customer_id: string | null
  customer_name: string | null
  customer_phone: string | null
  customer_email?: string | null
  customer_trn: string | null
  customer_vehicle: string | null
  customer_plate: string | null
  discount: number
  notes: string | null
  show_costs: boolean
  lines: InvoiceLineValue[]
}

interface Line extends InvoiceLineValue { key: string }

const money = (value: number) => `AED ${value.toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
const nonNegative = (value: string) => Math.max(0, Number.parseFloat(value) || 0)

export default function AdminInvoiceForm({
  items,
  taxRate,
  customers,
  defaultCustomerId = '',
  invoice,
}: {
  items: InvoiceStockItem[]
  taxRate: number
  customers: InvoiceCustomer[]
  defaultCustomerId?: string
  invoice?: InvoiceValue
}) {
  const router = useRouter()
  const startingCustomer = customers.find((entry) => entry.id === (invoice?.customer_id || defaultCustomerId))
  const [lines, setLines] = useState<Line[]>(() => (invoice?.lines ?? []).map((line, index) => ({ ...line, key: line.id ?? `invoice-line-${index}` })))
  const [picker, setPicker] = useState('')
  const [selectedCustomerId, setSelectedCustomerId] = useState(invoice?.customer_id || startingCustomer?.id || '')
  const [customer, setCustomer] = useState({
    name: invoice?.customer_name ?? startingCustomer?.name ?? '',
    phone: invoice?.customer_phone ?? startingCustomer?.phone ?? '',
    email: invoice?.customer_email ?? startingCustomer?.email ?? '',
    trn: invoice?.customer_trn ?? startingCustomer?.trn ?? '',
    vehicle: invoice?.customer_vehicle ?? startingCustomer?.vehicle ?? '',
    plate: invoice?.customer_plate ?? startingCustomer?.plate ?? '',
  })
  const [discount, setDiscount] = useState(Number(invoice?.discount ?? 0))
  const [notes, setNotes] = useState(invoice?.notes ?? '')
  const [showCosts, setShowCosts] = useState(Boolean(invoice?.show_costs))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const filteredItems = useMemo(() => {
    const term = picker.trim().toLowerCase()
    if (!term) return []
    return items.filter((item) => `${item.name} ${item.sku ?? ''}`.toLowerCase().includes(term)).slice(0, 10)
  }, [items, picker])

  const totals = useMemo(() => {
    const subtotal = lines.reduce((sum, line) => sum + line.quantity * line.unit_price, 0)
    const totalCost = lines.reduce((sum, line) => sum + line.quantity * line.unit_cost, 0)
    const afterDiscount = Math.max(0, subtotal - discount)
    const tax = afterDiscount * taxRate / 100
    return { subtotal, totalCost, tax, total: afterDiscount + tax, profit: afterDiscount - totalCost }
  }, [lines, discount, taxRate])

  function chooseCustomer(id: string) {
    setSelectedCustomerId(id)
    if (!id) return
    const selected = customers.find((entry) => entry.id === id)
    if (!selected) return
    setCustomer({ name: selected.name, phone: selected.phone ?? '', email: selected.email ?? '', trn: selected.trn ?? '', vehicle: selected.vehicle ?? '', plate: selected.plate ?? '' })
  }

  function addItem(item: InvoiceStockItem) {
    setLines((current) => [...current, { key: crypto.randomUUID(), item_id: item.id, description: item.name, unit: item.unit, quantity: 1, unit_cost: Number(item.cost_price), unit_price: Number(item.selling_price) }])
    setPicker('')
  }

  function addService() {
    setLines((current) => [...current, { key: crypto.randomUUID(), item_id: null, description: 'Installation / service', unit: 'service', quantity: 1, unit_cost: 0, unit_price: 0 }])
  }

  function updateLine(key: string, patch: Partial<Line>) {
    setLines((current) => current.map((line) => line.key === key ? { ...line, ...patch } : line))
  }

  async function save() {
    setError('')
    if (!lines.length) return setError('Add at least one product or service line.')
    if (lines.some((line) => !line.description.trim() || line.quantity <= 0 || line.unit_price < 0 || line.unit_cost < 0)) return setError('Every line needs a description, positive quantity, and valid prices.')
    setSaving(true)
    try {
      const response = await fetch(invoice ? `/api/admin/invoices/${invoice.id}` : '/api/admin/invoices', {
        method: invoice ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer_id: selectedCustomerId || null, customer_name: customer.name, customer_phone: customer.phone, customer_email: customer.email, customer_trn: customer.trn, customer_vehicle: customer.vehicle, customer_plate: customer.plate, discount, notes, show_costs: showCosts, lines: lines.map(({ key: _key, id: _id, ...line }) => line) }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || `Could not ${invoice ? 'update' : 'create'} invoice.`)
      router.push(`/admin/invoices/${result.id}`)
      router.refresh()
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not save invoice.')
      setSaving(false)
    }
  }

  return (
    <div className="admin-invoice-builder">
      <div className="admin-invoice-builder__main">
        {error && <p className="admin-form-error" role="alert">{error}</p>}
        <section className="admin-editor__section">
          <div className="admin-editor__section-heading"><span>01</span><div><h2>Customer</h2><p>Choose a saved customer or enter a walk-in customer below.</p></div></div>
          {customers.length > 0 && <label className="admin-field admin-customer-picker"><span>Saved customer</span><select value={selectedCustomerId} onChange={(event) => chooseCustomer(event.target.value)}><option value="">Walk-in / new customer</option>{customers.map((entry) => <option key={entry.id} value={entry.id}>{entry.name}{entry.phone ? ` · ${entry.phone}` : ''}</option>)}</select></label>}
          <div className="admin-form-grid admin-form-grid--3">
            {Object.entries({ name: 'Name', phone: 'Phone', email: 'Email', trn: 'TRN', vehicle: 'Vehicle', plate: 'Plate number' }).map(([key, label]) => <label className="admin-field" key={key}><span>{label}</span><input value={customer[key as keyof typeof customer]} onChange={(event) => { setSelectedCustomerId(''); setCustomer((current) => ({ ...current, [key]: event.target.value })) }} /></label>)}
          </div>
        </section>

        <section className="admin-editor__section">
          <div className="admin-editor__section-heading"><span>02</span><div><h2>Parts and services</h2><p>Search by product name or SKU. Inventory updates only after the invoice succeeds.</p></div></div>
          <div className="admin-stock-picker">
            <AdminIcon name="search" />
            <input value={picker} onChange={(event) => setPicker(event.target.value)} placeholder="Search products to add…" role="combobox" aria-expanded={filteredItems.length > 0} aria-controls="admin-stock-results" />
            {filteredItems.length > 0 && <div id="admin-stock-results" className="admin-stock-picker__results" role="listbox">{filteredItems.map((item) => <button type="button" role="option" aria-selected="false" key={item.id} onClick={() => addItem(item)}><span><strong>{item.name}</strong><small>{item.sku || 'No SKU'} · {item.quantity} {item.unit} available</small></span><span>{money(Number(item.selling_price))}</span></button>)}</div>}
          </div>
          <button type="button" className="admin-button admin-button--quiet" onClick={addService}><AdminIcon name="plus" /> Add service line</button>
          <div className="admin-invoice-lines">
            {lines.map((line) => {
              const lineTotal = line.quantity * line.unit_price
              const lineProfit = line.quantity * (line.unit_price - line.unit_cost)
              return <article className="admin-invoice-line-card" key={line.key}>
                <div className="admin-invoice-line-card__identity"><input aria-label="Description" value={line.description} onChange={(event) => updateLine(line.key, { description: event.target.value })} /><small>{line.item_id ? `${line.unit} · stock item` : 'service'}</small></div>
                <label><span>Quantity</span><input aria-label="Quantity" type="number" step="0.001" min="0.001" value={line.quantity} onChange={(event) => updateLine(line.key, { quantity: nonNegative(event.target.value) })} /></label>
                <label><span>Unit price</span><input aria-label="Unit price" type="number" step="0.01" min="0" value={line.unit_price} onChange={(event) => updateLine(line.key, { unit_price: nonNegative(event.target.value) })} /></label>
                {!line.item_id && <label><span>Internal cost</span><input aria-label="Internal cost" type="number" step="0.01" min="0" value={line.unit_cost} onChange={(event) => updateLine(line.key, { unit_cost: nonNegative(event.target.value) })} /></label>}
                <div className="admin-invoice-line-card__total"><strong>{money(lineTotal)}</strong><small>{money(lineProfit)} profit</small></div>
                <button type="button" onClick={() => setLines((current) => current.filter((entry) => entry.key !== line.key))} aria-label={`Remove ${line.description}`}>×</button>
              </article>
            })}
            {!lines.length && <div className="admin-empty admin-empty--compact"><p>No lines yet. Search products above or add a service.</p></div>}
          </div>
        </section>
        <section className="admin-editor__section"><label className="admin-field"><span>Notes printed on invoice</span><textarea rows={4} value={notes} onChange={(event) => setNotes(event.target.value)} /></label></section>
      </div>

      <aside className="admin-invoice-summary-card">
        <p className="admin-eyebrow">Live summary</p><h2>{invoice ? 'Update invoice' : 'New invoice'}</h2>
        <dl><div><dt>Subtotal</dt><dd>{money(totals.subtotal)}</dd></div><div className="admin-invoice-summary-card__discount"><dt>Discount</dt><dd><input aria-label="Discount" type="number" min="0" step="0.01" value={discount} onChange={(event) => setDiscount(nonNegative(event.target.value))} /></dd></div><div><dt>VAT ({taxRate}%)</dt><dd>{money(totals.tax)}</dd></div><div className="admin-invoice-summary-card__total"><dt>Total</dt><dd>{money(totals.total)}</dd></div></dl>
        <div className="admin-invoice-cost-summary"><span>Internal cost <strong>{money(totals.totalCost)}</strong></span><span>Estimated profit <strong>{money(totals.profit)}</strong></span></div>
        <label className="admin-publish-toggle"><input type="checkbox" checked={showCosts} onChange={(event) => setShowCosts(event.target.checked)} /><span><strong>Show internal costs</strong><small>Include costs on the printed copy</small></span></label>
        <button type="button" className="admin-button admin-button--primary" onClick={save} disabled={saving}>{saving ? 'Saving…' : invoice ? 'Update invoice' : 'Create invoice'}</button>
      </aside>
    </div>
  )
}
