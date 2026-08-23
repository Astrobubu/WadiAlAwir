'use client'

import { useState } from 'react'
import { useCart } from './CartContext'
import type { LocaleString } from '../lib/sanity'

interface CartProduct {
  id: string
  slug: string
  name: LocaleString
  vehicle?: LocaleString
  carYear?: string
  price: number
  thumbnailUrl: string | null
}

interface AddToCartButtonProps {
  product: CartProduct
  locale: 'en' | 'ar'
}

export default function AddToCartButton({ product, locale }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const label = locale === 'ar' ? 'أضف للسلة' : 'Add to Cart'
  const addedLabel = locale === 'ar' ? 'تمت الإضافة ✓' : 'Added ✓'

  function handleClick() {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      vehicle: product.vehicle,
      carYear: product.carYear,
      price: product.price,
      thumbnailUrl: product.thumbnailUrl,
      qty: 1,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button
      type="button"
      className={`btn btn--outline${added ? ' btn--added' : ''}`}
      onClick={handleClick}
      aria-label={added ? addedLabel : label}
    >
      {added ? addedLabel : label}
    </button>
  )
}
