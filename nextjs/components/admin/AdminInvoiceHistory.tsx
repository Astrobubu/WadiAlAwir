'use client'

import { useState } from 'react'
import AdminIcon from './AdminIcon'

export interface InvoiceHistoryEntry { id: string; createdAt: string; customerName: string; total: string; lineCount: number }

export default function AdminInvoiceHistory({ entries }: { entries: InvoiceHistoryEntry[] }) {
  const [open, setOpen] = useState(false)
  if (!entries.length) return null

  return <section className="admin-invoice-history admin-no-print"><button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open}><span><AdminIcon name="history" /> Edit history · {entries.length} {entries.length === 1 ? 'version' : 'versions'}</span><AdminIcon name="chevron-down" className={open ? 'admin-rotate-180' : ''} /></button>{open && <div>{entries.map((entry) => <article key={entry.id}><span><small>{new Date(entry.createdAt).toLocaleString('en-AE')}</small><strong>{entry.customerName}</strong></span><span><strong>{entry.total}</strong><small>{entry.lineCount} lines</small></span></article>)}</div>}</section>
}
