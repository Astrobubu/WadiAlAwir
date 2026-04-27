'use client'

import WAOrderButton from './WAOrderButton'
import type { Product } from '../lib/sanity'

interface ProductWhatsAppButtonProps {
  product: Product
  locale: 'en' | 'ar'
}

export default function ProductWhatsAppButton({ product, locale }: ProductWhatsAppButtonProps) {
  return (
    <WAOrderButton
      product={product}
      lang={locale}
      className="btn btn--whatsapp"
    />
  )
}
