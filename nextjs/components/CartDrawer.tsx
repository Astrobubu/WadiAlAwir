'use client'

import { useEffect, useRef, useState } from 'react'
import { urlFor } from '../lib/sanity'
import { useCart } from './CartContext'
import WAPickerModal from './WAPickerModal'
import { getCartWhatsAppMessage } from '../lib/whatsapp'

interface CartDrawerProps {
  lang: 'en' | 'ar'
  isOpen: boolean
  onClose: () => void
}

const LABELS = {
  en: {
    title: 'YOUR CART',
    empty: 'Your cart is empty',
    checkout: 'Send Order via WhatsApp',
    total: 'Total',
    remove: 'Remove',
    qty: 'Qty',
    close: 'Close cart',
  },
  ar: {
    title: 'سلتك',
    empty: 'السلة فارغة',
    checkout: 'إرسال الطلب عبر واتساب',
    total: 'الإجمالي',
    remove: 'حذف',
    qty: 'الكمية',
    close: 'إغلاق السلة',
  },
} as const

export default function CartDrawer({ lang, isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQty } = useCart()
  const [waOpen, setWaOpen] = useState(false)
  // Delay adding --open class by one frame so CSS transition plays
  const [visible, setVisible] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  const t = LABELS[lang]
  const isRTL = lang === 'ar'
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  // Animate open/close
  useEffect(() => {
    if (isOpen) {
      const id = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(id)
    } else {
      setVisible(false)
    }
  }, [isOpen])

  // ESC key
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Focus first element when opened
  useEffect(() => {
    if (!visible) return
    const el = drawerRef.current?.querySelector<HTMLElement>('button, [href], input')
    el?.focus()
  }, [visible])

  const cartWhatsAppMessage = items.length > 0
    ? getCartWhatsAppMessage(
        items.map((i) => ({ id: i.id, name: i.name, price: i.price, qty: i.qty, variant: i.variant })),
        lang
      )
    : ''

  return (
    <>
      {/* Backdrop */}
      <div
        className={`cart-drawer-backdrop${visible ? ' cart-drawer-backdrop--open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        className={`cart-drawer${visible ? ' cart-drawer--open' : ''}${isRTL ? ' cart-drawer--rtl' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={t.title}
        aria-hidden={!isOpen}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">{t.title}</h2>
          <button type="button" className="cart-drawer__close" onClick={onClose} aria-label={t.close}>
            ×
          </button>
        </div>

        {/* Items */}
        <div className="cart-drawer__body">
          {items.length === 0 ? (
            <p className="cart-drawer__empty">{t.empty}</p>
          ) : (
            <ul className="cart-drawer__list" role="list" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {items.map((item) => {
                const thumbSrc = item.thumbnail
                  ? urlFor(item.thumbnail).width(96).height(72).format('webp').quality(75).url()
                  : null
                const itemName = item.name[lang] ?? item.name.en

                return (
                  <li key={item.id} className="cart-item">
                    {thumbSrc && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={thumbSrc}
                        alt={itemName}
                        width={60}
                        height={60}
                        loading="lazy"
                        decoding="async"
                        className="cart-item__img"
                      />
                    )}

                    <div className="cart-item__info">
                      <p className="cart-item__name">{itemName}</p>
                      <p className="cart-item__price">
                        {item.price.toLocaleString('en-AE')} AED × {item.qty}
                      </p>
                      <div className="cart-item__actions">
                        <button
                          type="button"
                          className="cart-item__qty-btn"
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          aria-label={isRTL ? 'تقليل' : 'Decrease'}
                        >
                          −
                        </button>
                        <span className="cart-item__qty">{item.qty}</span>
                        <button
                          type="button"
                          className="cart-item__qty-btn"
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          aria-label={isRTL ? 'زيادة' : 'Increase'}
                        >
                          +
                        </button>
                        <button
                          type="button"
                          className="cart-item__remove"
                          onClick={() => removeItem(item.id)}
                          aria-label={`${t.remove} ${itemName}`}
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Total + WA CTA */}
        {items.length > 0 && (
          <>
            <div className="cart-drawer__total">
              <span>{t.total}</span>
              <span>{total.toLocaleString('en-AE')} AED</span>
            </div>

            <button
              type="button"
              className="btn btn--whatsapp cart-drawer__send"
              onClick={() => setWaOpen(true)}
            >
              <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" style={{ display: 'inline', marginInlineEnd: '6px', verticalAlign: 'middle' }}>
                <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.471 2.027 7.773L0 32l8.456-2.018A15.926 15.926 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.264 13.264 0 0 1-6.758-1.84l-.484-.287-5.02 1.198 1.22-4.892-.317-.503A13.268 13.268 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.873c-.397-.199-2.35-1.16-2.715-1.292-.364-.132-.63-.199-.895.199-.265.398-1.027 1.293-1.259 1.558-.232.265-.464.298-.861.1-.397-.2-1.676-.617-3.193-1.97-1.18-1.052-1.977-2.351-2.209-2.748-.232-.398-.025-.613.174-.811.179-.178.397-.464.596-.696.199-.232.265-.398.397-.663.133-.265.067-.497-.033-.696-.1-.2-.895-2.158-1.226-2.954-.323-.775-.65-.67-.895-.682l-.762-.013c-.265 0-.696.1-1.06.497-.364.398-1.392 1.36-1.392 3.317 0 1.957 1.425 3.848 1.624 4.114.2.265 2.803 4.28 6.79 6.003.95.41 1.69.655 2.268.838.953.303 1.82.26 2.507.158.764-.114 2.35-.961 2.682-1.889.332-.928.332-1.724.232-1.889-.099-.165-.364-.265-.762-.464z" />
              </svg>
              {t.checkout}
            </button>
          </>
        )}
      </div>

      <WAPickerModal
        isOpen={waOpen}
        onClose={() => setWaOpen(false)}
        encodedMessage={cartWhatsAppMessage}
        lang={lang}
      />
    </>
  )
}
