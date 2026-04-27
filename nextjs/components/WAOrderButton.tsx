'use client'

import { useState } from 'react'
import WAPickerModal from './WAPickerModal'
import { getProductWhatsAppMessage } from '../lib/whatsapp'
import type { Product } from '../lib/sanity'

interface WAOrderButtonProps {
  product: Product
  lang: 'en' | 'ar'
  className?: string
  label?: string
}

export default function WAOrderButton({
  product,
  lang,
  className = 'btn btn--whatsapp',
  label,
}: WAOrderButtonProps) {
  const [open, setOpen] = useState(false)

  const carModelName =
    product.carModel?.name?.[lang] ?? product.carModel?.name?.en ?? ''

  const encodedMessage = getProductWhatsAppMessage(
    {
      id: product._id,
      name: product.name,
      price: product.price,
      carModel: carModelName,
      carYear: product.carYear,
    },
    carModelName,
    lang
  )

  const buttonLabel = label ?? (lang === 'ar' ? 'اطلب عبر واتساب' : 'Order via WhatsApp')

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => setOpen(true)}
        aria-label={buttonLabel}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 32 32"
          fill="currentColor"
          aria-hidden="true"
          style={{ display: 'inline', marginInlineEnd: '6px', verticalAlign: 'middle' }}
        >
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.471 2.027 7.773L0 32l8.456-2.018A15.926 15.926 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.264 13.264 0 0 1-6.758-1.84l-.484-.287-5.02 1.198 1.22-4.892-.317-.503A13.268 13.268 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.873c-.397-.199-2.35-1.16-2.715-1.292-.364-.132-.63-.199-.895.199-.265.398-1.027 1.293-1.259 1.558-.232.265-.464.298-.861.1-.397-.2-1.676-.617-3.193-1.97-1.18-1.052-1.977-2.351-2.209-2.748-.232-.398-.025-.613.174-.811.179-.178.397-.464.596-.696.199-.232.265-.398.397-.663.133-.265.067-.497-.033-.696-.1-.2-.895-2.158-1.226-2.954-.323-.775-.65-.67-.895-.682l-.762-.013c-.265 0-.696.1-1.06.497-.364.398-1.392 1.36-1.392 3.317 0 1.957 1.425 3.848 1.624 4.114.2.265 2.803 4.28 6.79 6.003.95.41 1.69.655 2.268.838.953.303 1.82.26 2.507.158.764-.114 2.35-.961 2.682-1.889.332-.928.332-1.724.232-1.889-.099-.165-.364-.265-.762-.464z" />
        </svg>
        {buttonLabel}
      </button>

      <WAPickerModal
        isOpen={open}
        onClose={() => setOpen(false)}
        encodedMessage={encodedMessage}
        lang={lang}
      />
    </>
  )
}
