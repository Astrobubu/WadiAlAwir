'use client'

import Link from './AdminLink'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminIcon from './AdminIcon'

export default function AdminInvoiceToolbar({ id, invoiceNumber, canEdit, canDelete }: { id: string; invoiceNumber: string; canEdit: boolean; canDelete: boolean }) {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [deleting, setDeleting] = useState(false)

  async function shareInvoice() {
    const data = { title: `Invoice ${invoiceNumber}`, text: `Invoice ${invoiceNumber} from Wadi Al Awir`, url: window.location.href }
    try {
      if (navigator.share) await navigator.share(data)
      else {
        await navigator.clipboard.writeText(window.location.href)
        setMessage('Invoice link copied')
      }
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) setMessage('Could not share invoice')
    }
  }

  async function deleteInvoice() {
    if (!window.confirm(`Delete invoice ${invoiceNumber}? Its product quantities will be returned to stock.`)) return
    setDeleting(true)
    setMessage('')
    try {
      const response = await fetch(`/api/admin/invoices/${id}`, { method: 'DELETE' })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Could not delete invoice.')
      router.push('/admin/invoices')
      router.refresh()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not delete invoice.')
      setDeleting(false)
    }
  }

  return <div className="admin-invoice-toolbar admin-no-print"><span className="admin-invoice-toolbar__status" role="status">{message}</span><div>{canDelete && <button type="button" className="admin-button admin-button--danger" onClick={deleteInvoice} disabled={deleting}><AdminIcon name="trash" /> {deleting ? 'Deleting…' : 'Delete'}</button>}{canEdit && <Link href={`/admin/invoices/${id}/edit`} className="admin-button admin-button--quiet"><AdminIcon name="pencil" /> Edit</Link>}<button type="button" className="admin-button admin-button--quiet" onClick={() => window.print()}><AdminIcon name="printer" /> Print</button><button type="button" className="admin-button admin-button--primary" onClick={shareInvoice}><AdminIcon name="share" /> Share</button></div></div>
}
