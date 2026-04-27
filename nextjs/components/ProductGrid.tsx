'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import type { Product } from '../lib/sanity'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: Product[]
  lang: 'en' | 'ar'
  initialCarModel?: string
  initialCategory?: string
}

type CategoryFilter = 'all' | 'exterior' | 'interior' | 'lighting' | 'utility'

const CAR_MODEL_OPTIONS = [
  { id: 'all',           label: { en: 'All Vehicles', ar: 'كل السيارات' } },
  { id: 'jetour-t2',    label: { en: 'Jetour T2',    ar: 'جيتور T2'   } },
  { id: 'jetour-rox-01', label: { en: 'ROX 01',      ar: 'روكس 01'    } },
]

const CATEGORY_OPTIONS: Array<{ id: CategoryFilter; label: Record<'en' | 'ar', string> }> = [
  { id: 'all',      label: { en: 'All Categories', ar: 'كل الفئات'  } },
  { id: 'exterior', label: { en: 'Exterior',       ar: 'خارجي'      } },
  { id: 'interior', label: { en: 'Interior',       ar: 'داخلي'      } },
  { id: 'lighting', label: { en: 'Lighting',       ar: 'إضاءة'      } },
  { id: 'utility',  label: { en: 'Utility',        ar: 'أدوات'      } },
]

function useDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])
  return { open, setOpen, ref }
}

export default function ProductGrid({
  products,
  lang,
  initialCarModel = 'all',
  initialCategory = 'all',
}: ProductGridProps) {
  const [carModel, setCarModel] = useState(initialCarModel)
  const [category, setCategory] = useState<CategoryFilter>(initialCategory as CategoryFilter)

  const carDropdown = useDropdown()
  const catDropdown = useDropdown()

  const isRTL = lang === 'ar'

  const selectedCar = CAR_MODEL_OPTIONS.find((o) => o.id === carModel)!
  const selectedCat = CATEGORY_OPTIONS.find((o) => o.id === category)!

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCar = carModel === 'all' || p.carModel?.slug?.current === carModel
      const matchesCat = category === 'all' || p.category === category
      return matchesCar && matchesCat
    })
  }, [products, carModel, category])

  const chevron = (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 9l6 6 6-6"/>
    </svg>
  )

  return (
    <div className="product-grid-wrapper" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Centered dropdown filter bar */}
      <div className="filter-bar filter-bar--centered">
        {/* Car model dropdown */}
        <div className="filter-dropdown-wrap" ref={carDropdown.ref}>
          <button
            type="button"
            className={`filter-bar__btn${carDropdown.open ? ' filter-bar__btn--open' : ''}`}
            onClick={() => { carDropdown.setOpen((v) => !v); catDropdown.setOpen(false) }}
            aria-expanded={carDropdown.open}
            aria-haspopup="listbox"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M5 17h14M7 11l1.5-4h7L17 11M5 11h14v6H5z"/>
              <circle cx="7.5" cy="17" r="1.5"/>
              <circle cx="16.5" cy="17" r="1.5"/>
            </svg>
            <span>{selectedCar.label[lang]}</span>
            {chevron}
          </button>
          {carDropdown.open && (
            <ul className="filter-dropdown__panel" role="listbox" aria-label={isRTL ? 'السيارة' : 'Vehicle'}>
              {CAR_MODEL_OPTIONS.map((opt) => (
                <li key={opt.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={carModel === opt.id}
                    className={`filter-dropdown__option${carModel === opt.id ? ' filter-dropdown__option--active' : ''}`}
                    onClick={() => { setCarModel(opt.id); carDropdown.setOpen(false) }}
                  >
                    {opt.label[lang]}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Category dropdown */}
        <div className="filter-dropdown-wrap" ref={catDropdown.ref}>
          <button
            type="button"
            className={`filter-bar__btn${catDropdown.open ? ' filter-bar__btn--open' : ''}`}
            onClick={() => { catDropdown.setOpen((v) => !v); carDropdown.setOpen(false) }}
            aria-expanded={catDropdown.open}
            aria-haspopup="listbox"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
            <span>{selectedCat.label[lang]}</span>
            {chevron}
          </button>
          {catDropdown.open && (
            <ul className="filter-dropdown__panel" role="listbox" aria-label={isRTL ? 'الفئة' : 'Category'}>
              {CATEGORY_OPTIONS.map((opt) => (
                <li key={opt.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={category === opt.id}
                    className={`filter-dropdown__option${category === opt.id ? ' filter-dropdown__option--active' : ''}`}
                    onClick={() => { setCategory(opt.id); catDropdown.setOpen(false) }}
                  >
                    {opt.label[lang]}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Results count */}
      <p className="product-grid__count" aria-live="polite">
        {isRTL ? `${filtered.length} منتج` : `${filtered.length} product${filtered.length !== 1 ? 's' : ''}`}
      </p>

      {filtered.length === 0 ? (
        <p className="product-grid__empty">
          {isRTL ? 'لا توجد منتجات تطابق الفلتر' : 'No products match the selected filters.'}
        </p>
      ) : (
        <div className="product-grid">
          {filtered.map((product) => (
            <ProductCard key={product._id} product={product} lang={lang} />
          ))}
        </div>
      )}
    </div>
  )
}
