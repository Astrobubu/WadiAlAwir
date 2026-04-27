'use client'

import { useCallback, useEffect, useState } from 'react'

export interface GalleryImage {
  url: string
  alt: string
}

interface ProductGalleryProps {
  images: GalleryImage[]
  productName: string
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const validImages = images.filter(Boolean)
  if (validImages.length === 0) return null

  const closeLightbox = useCallback(() => setLightboxOpen(false), [])

  useEffect(() => {
    if (!lightboxOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      else if (e.key === 'ArrowRight') setActiveIndex((i) => (i + 1) % validImages.length)
      else if (e.key === 'ArrowLeft') setActiveIndex((i) => (i - 1 + validImages.length) % validImages.length)
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [lightboxOpen, closeLightbox, validImages.length])

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) closeLightbox()
  }

  const activeImage = validImages[activeIndex]

  return (
    <>
      <div
        className="product-page__main-img-wrap"
        onClick={() => setLightboxOpen(true)}
        role="button"
        tabIndex={0}
        aria-label="Open fullscreen image"
        onKeyDown={(e) => e.key === 'Enter' && setLightboxOpen(true)}
        style={{ cursor: 'zoom-in' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={activeImage.url}
          alt={activeImage.alt || productName}
          className="product-page__main-img"
          loading="eager"
          decoding="async"
          width={900}
          height={900}
        />
      </div>

      {validImages.length > 1 && (
        <div className="product-page__thumbs">
          {validImages.map((img, idx) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={idx}
              src={img.url}
              alt=""
              className={`product-page__thumb${activeIndex === idx ? ' product-page__thumb--active' : ''}`}
              onClick={() => setActiveIndex(idx)}
              width={72}
              height={72}
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      )}

      {lightboxOpen && (
        <div
          className="product-page__zoom-overlay product-page__zoom-overlay--open"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={handleBackdropClick}
        >
          <button
            type="button"
            className="product-page__zoom-close"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activeImage.url}
            alt={`${productName} — image ${activeIndex + 1}`}
            width={1200}
            height={1200}
            loading="eager"
            decoding="async"
          />
        </div>
      )}
    </>
  )
}
