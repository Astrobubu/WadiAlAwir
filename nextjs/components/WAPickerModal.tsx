'use client'

import { useEffect, useCallback } from 'react'
import { WA_NUMBERS, buildWhatsAppURL } from '../lib/whatsapp'

interface WAPickerModalProps {
  isOpen: boolean
  onClose: () => void
  encodedMessage: string
  lang: 'en' | 'ar'
}

const LABELS: Record<'en' | 'ar', { title: string; hint: string; line: string[] }> = {
  en: {
    title: 'Choose a WhatsApp line',
    hint: "If one line doesn't reply, try the other",
    line: ['Line 1', 'Line 2'],
  },
  ar: {
    title: 'اختر رقم الواتساب',
    hint: 'إذا لم يرد أحد الخطوط، جرّب الآخر',
    line: ['الخط 1', 'الخط 2'],
  },
}

export default function WAPickerModal({ isOpen, onClose, encodedMessage, lang }: WAPickerModalProps) {
  const labels = LABELS[lang]

  const handleEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    if (!isOpen) return
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.removeEventListener('keydown', handleEsc)
    }
  }, [isOpen, handleEsc])

  if (!isOpen) return null

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="wa-picker wa-picker--open"
      role="dialog"
      aria-modal="true"
      aria-label={labels.title}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="wa-picker__backdrop" onClick={onClose} aria-hidden="true" />

      {/* Modal card */}
      <div className="wa-picker__card">
        <button
          className="wa-picker__close"
          onClick={onClose}
          type="button"
          aria-label="Close"
        >
          ×
        </button>

        <h2 className="wa-picker__title">{labels.title}</h2>
        <p className="wa-picker__hint">{labels.hint}</p>

        <div className="wa-picker__buttons">
          {WA_NUMBERS.map((num, idx) => {
            const waUrl = buildWhatsAppURL(num.id, encodedMessage)
            return (
              <a
                key={num.id}
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="wa-picker__btn"
                onClick={onClose}
              >
                <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" width="20" height="20">
                  <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.471 2.027 7.773L0 32l8.456-2.018A15.926 15.926 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.264 13.264 0 0 1-6.758-1.84l-.484-.287-5.02 1.198 1.22-4.892-.317-.503A13.268 13.268 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.873c-.397-.199-2.35-1.16-2.715-1.292-.364-.132-.63-.199-.895.199-.265.398-1.027 1.293-1.259 1.558-.232.265-.464.298-.861.1-.397-.2-1.676-.617-3.193-1.97-1.18-1.052-1.977-2.351-2.209-2.748-.232-.398-.025-.613.174-.811.179-.178.397-.464.596-.696.199-.232.265-.398.397-.663.133-.265.067-.497-.033-.696-.1-.2-.895-2.158-1.226-2.954-.323-.775-.65-.67-.895-.682l-.762-.013c-.265 0-.696.1-1.06.497-.364.398-1.392 1.36-1.392 3.317 0 1.957 1.425 3.848 1.624 4.114.2.265 2.803 4.28 6.79 6.003.95.41 1.69.655 2.268.838.953.303 1.82.26 2.507.158.764-.114 2.35-.961 2.682-1.889.332-.928.332-1.724.232-1.889-.099-.165-.364-.265-.762-.464z" />
                </svg>
                {labels.line[idx]}
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
