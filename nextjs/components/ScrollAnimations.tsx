'use client'

import { useEffect } from 'react'

const SELECTORS = [
  '.section-header',
  '.product-card',
  '.service-card',
  '.car-card',
  '.review-card',
  '.location__item',
  '.faq-item',
  '.product-page__gallery',
  '.product-page__info',
  '.related-section__title',
  '.related-grid .product-card',
].join(', ')

export default function ScrollAnimations() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(SELECTORS)
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in--visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    elements.forEach((el) => {
      el.classList.add('animate-in--pending')
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return null
}
