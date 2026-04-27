'use client'

import { useState } from 'react'
import { useCart } from './CartContext'
import type { Product } from '../lib/sanity'

interface AddToCartButtonProps {
  product: Product
  locale: 'en' | 'ar'
}

export default function AddToCartButton({ product, locale }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const label = locale === 'ar' ? 'أضف للسلة' : 'Add to Cart'
  const addedLabel = locale === 'ar' ? 'تمت الإضافة ✓' : 'Added ✓'

  function handleClick() {
    addItem({
      id: product._id,
      slug: product.slug.current,
      name: product.name,
      price: product.price,
      thumbnail: product.thumbnail ?? null,
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
