'use client'

import Link from 'next/link'
import { useState } from 'react'
import AdminIcon from './AdminIcon'

export default function AdminInvoiceToolbar({ id, invoiceNumber, canEdit }: { id: string; invoiceNumber: string; canEdit: boolean }) {
  const [message, setMessage] = useState('')

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

  return <div className="admin-invoice-toolbar admin-no-print"><span className="admin-invoice-toolbar__status" role="status">{message}</span><div>{canEdit && <Link href={`/admin/invoices/${id}/edit`} className="admin-button admin-button--quiet"><AdminIcon name="pencil" /> Edit</Link>}<button type="button" className="admin-button admin-button--quiet" onClick={() => window.print()}><AdminIcon name="printer" /> Print</button><button type="button" className="admin-button admin-button--primary" onClick={shareInvoice}><AdminIcon name="share" /> Share</button></div></div>
}
