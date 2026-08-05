'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminIcon from './AdminIcon'

export default function AdminInvoiceDeleteButton({ id, invoiceNumber }: { id: string; invoiceNumber: string }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  async function deleteInvoice() {
    if (!window.confirm(`Delete invoice ${invoiceNumber}? Its product quantities will be returned to stock.`)) return
    setDeleting(true)
    const response = await fetch(`/api/admin/invoices/${id}`, { method: 'DELETE' })
    const result = await response.json().catch(() => ({}))
    if (!response.ok) {
      window.alert(result.error || 'Could not delete invoice.')
      setDeleting(false)
      return
    }
    router.refresh()
  }

  return <button type="button" className="admin-row-action admin-row-action--danger" onClick={deleteInvoice} disabled={deleting}><AdminIcon name="trash" /> {deleting ? 'Deleting…' : 'Delete'}</button>
}
