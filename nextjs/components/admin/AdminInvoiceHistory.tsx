'use client'

import { useState } from 'react'
import AdminIcon from './AdminIcon'

export interface InvoiceHistoryEntry { id: string; createdAt: string; customerName: string; total: string; lineCount: number }

export default function AdminInvoiceHistory({ invoiceId }: { invoiceId: string }) {
  const [open, setOpen] = useState(false)
  const [entries, setEntries] = useState<InvoiceHistoryEntry[] | null>(null)
  const [error, setError] = useState('')

  async function toggleHistory() {
    if (open) {
      setOpen(false)
      return
    }

    setOpen(true)
    if (entries) return

    try {
      const response = await fetch(`/api/admin/invoices/${invoiceId}/history`)
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Could not load invoice history.')
      setEntries(result.entries)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not load invoice history.')
    }
  }

  return <section className="admin-invoice-history admin-no-print"><button type="button" onClick={toggleHistory} aria-expanded={open}><span><AdminIcon name="history" /> Edit history{entries ? ` · ${entries.length} ${entries.length === 1 ? 'version' : 'versions'}` : ''}</span><AdminIcon name="chevron-down" className={open ? 'admin-rotate-180' : ''} /></button>{open && <div>{error ? <p className="admin-form-error" role="alert">{error}</p> : entries === null ? <p>Loading history…</p> : entries.length === 0 ? <p>No previous versions.</p> : entries.map((entry) => <article key={entry.id}><span><small>{new Date(entry.createdAt).toLocaleString('en-AE')}</small><strong>{entry.customerName}</strong></span><span><strong>{entry.total}</strong><small>{entry.lineCount} lines</small></span></article>)}</div>}</section>
}
