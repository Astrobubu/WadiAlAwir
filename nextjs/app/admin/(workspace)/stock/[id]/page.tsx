import { redirect } from 'next/navigation'

export default async function EditStockItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  redirect(`/admin/products/inventory/${id}`)
}
