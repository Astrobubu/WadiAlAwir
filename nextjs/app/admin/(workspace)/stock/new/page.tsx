import { redirect } from 'next/navigation'

export default function NewStockItemPage() {
  redirect('/admin/products/inventory/new')
}
