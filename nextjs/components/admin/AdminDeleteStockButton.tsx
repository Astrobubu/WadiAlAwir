'use client'

import { deleteStockItemAction } from '@/app/admin/(workspace)/stock/actions'
import AdminIcon from './AdminIcon'

export default function AdminDeleteStockButton({ id, name }: { id: string; name: string }) {
  return <form action={deleteStockItemAction} onSubmit={(event) => { if (!window.confirm(`Delete ${name}? This cannot be undone.`)) event.preventDefault() }}><input type="hidden" name="id" value={id} /><button className="admin-icon-button admin-icon-button--danger" title="Delete item" aria-label={`Delete ${name}`}><AdminIcon name="trash" /></button></form>
}
