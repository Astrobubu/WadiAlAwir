'use client'

import { useCallback, useEffect, useState } from 'react'
import { urlFor } from '../lib/sanity'

interface GalleryProps {
  images: any[]
  productName: string
  lang: 'en' | 'ar'
}

export default function Gallery({ images, productName, lang }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const isRTL = lang === 'ar'

  // Filter out null/undefined images
  const validImages = images.filter(Boolean)

  if (validImages.length === 0) return null

  const activeImage = validImages[activeIndex]

  // ---------- Lightbox navigation ----------

  const lightboxNext = useCallback(() => {
    setLightboxIndex((i) => (i + 1) % validImages.length)
  }, [validImages.length])

  const lightboxPrev = useCallback(() => {
    setLightboxIndex((i) => (i - 1 + validImages.length) % validImages.length)
  }, [validImages.length])

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = useCallback(() => setLightboxOpen(false), [])

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      else if (e.key === 'ArrowRight') isRTL ? lightboxPrev() : lightboxNext()
      else if (e.key === 'ArrowLeft') isRTL ? lightboxNext() : lightboxPrev()
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [lightboxOpen, lightboxNext, lightboxPrev, closeLightbox, isRTL])

  // Close on backdrop click
  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) closeLightbox()
  }

  const mainSrc = urlFor(activeImage).width(900).height(675).format('webp').quality(85).url()
  const lightboxSrc = urlFor(validImages[lightboxIndex])
    .width(1400)
    .height(1050)
    .format('webp')
    .quality(90)
    .url()

  return (
    <div className="gallery" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Main image */}
      <div
        className="gallery__main"
        onClick={() => openLightbox(activeIndex)}
        role="button"
        tabIndex={0}
        aria-label={lang === 'ar' ? 'فتح الصورة بشاشة كاملة' : 'Open fullscreen image'}
        onKeyDown={(e) => e.key === 'Enter' && openLightbox(activeIndex)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mainSrc}
          alt={`${productName} — image ${activeIndex + 1}`}
          className="gallery__main-image img-lazy"
          loading="eager"
          decoding="async"
          width={900}
          height={675}
        />
        {validImages.length > 1 && (
          <span className="gallery__zoom-hint" aria-hidden="true">
            {lang === 'ar' ? '🔍 انقر للتكبير' : '🔍 Click to zoom'}
          </span>
        )}
      </div>

      {/* Thumbnail strip — only shown when there are multiple images */}
      {validImages.length > 1 && (
        <div className="gallery__thumbs" role="list" aria-label={lang === 'ar' ? 'معرض الصور' : 'Image gallery'}>
          {validImages.map((img, idx) => {
            const thumbSrc = urlFor(img).width(120).height(90).format('webp').quality(75).url()
            return (
              <button
                key={idx}
                type="button"
                role="listitem"
                className={`gallery__thumb${activeIndex === idx ? ' gallery__thumb--active' : ''}`}
                onClick={() => setActiveIndex(idx)}
                aria-label={`${lang === 'ar' ? 'صورة' : 'Image'} ${idx + 1}`}
                aria-current={activeIndex === idx ? 'true' : undefined}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumbSrc}
                  alt=""
                  width={120}
                  height={90}
                  loading="lazy"
                  decoding="async"
                  className="img-lazy"
                />
              </button>
            )
          })}
        </div>
      )}

      {/* Lightbox overlay */}
      {lightboxOpen && (
        <div
          className="gallery__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lang === 'ar' ? 'عرض الصورة' : 'Image viewer'}
          onClick={handleBackdropClick}
        >
          {/* Close */}
          <button
            type="button"
            className="gallery__lightbox-close"
            onClick={closeLightbox}
            aria-label={lang === 'ar' ? 'إغلاق' : 'Close'}
          >
            ×
          </button>

          {/* Prev */}
          {validImages.length > 1 && (
            <button
              type="button"
              className="gallery__lightbox-nav gallery__lightbox-nav--prev"
              onClick={(e) => { e.stopPropagation(); isRTL ? lightboxNext() : lightboxPrev() }}
              aria-label={lang === 'ar' ? 'التالي' : 'Previous'}
            >
              {isRTL ? '›' : '‹'}
            </button>
          )}

          {/* Image */}
          <div className="gallery__lightbox-img-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightboxSrc}
              alt={`${productName} — image ${lightboxIndex + 1}`}
              className="gallery__lightbox-image"
              width={1400}
              height={1050}
              loading="eager"
              decoding="async"
            />
          </div>

          {/* Next */}
          {validImages.length > 1 && (
            <button
              type="button"
              className="gallery__lightbox-nav gallery__lightbox-nav--next"
              onClick={(e) => { e.stopPropagation(); isRTL ? lightboxPrev() : lightboxNext() }}
              aria-label={lang === 'ar' ? 'السابق' : 'Next'}
            >
              {isRTL ? '‹' : '›'}
            </button>
          )}

          {/* Counter */}
          <div className="gallery__lightbox-counter" aria-live="polite">
            {lightboxIndex + 1} / {validImages.length}
          </div>
        </div>
      )}
    </div>
  )
}
