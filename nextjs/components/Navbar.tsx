'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter } from '@/i18n/navigation'
import { useCart } from './CartContext'
import CartDrawer from './CartDrawer'

export default function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const { items } = useCart()

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0)
  const isRTL = locale === 'ar'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMenuOpen(false); setCartOpen(false) }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  function switchLanguage() {
    const nextLocale = locale === 'en' ? 'ar' : 'en'
    document.documentElement.setAttribute('lang', nextLocale)
    document.documentElement.setAttribute('dir', nextLocale === 'ar' ? 'rtl' : 'ltr')

    if (typeof document.startViewTransition === 'function') {
      document.startViewTransition(() => {
        router.replace('/', { locale: nextLocale })
      })
    } else {
      router.replace('/', { locale: nextLocale })
    }
  }

  function scrollToSection(id: string) {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const navLinks = [
    { label: t('products'), id: 'products' },
    { label: t('services'), id: 'services' },
    { label: t('reviews'), id: 'reviews' },
    { label: t('contact'), id: 'location' },
  ]

  return (
    <>
      <nav
        ref={navRef}
        className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}
        id="navbar"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="navbar__inner container">
          {/* Brand */}
          <a href={`/${locale}`} className="navbar__brand" aria-label="Wadi Al Awir Home">
            <span className="navbar__brand-ar">وادي العوير</span>
            <span className="navbar__brand-en">WADI AL AWIR</span>
          </a>

          {/* Desktop links */}
          <ul className="navbar__links" role="list">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  className="navbar__link"
                  onClick={() => scrollToSection(link.id)}
                  type="button"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="navbar__actions">
            <button
              className="lang-toggle"
              onClick={switchLanguage}
              type="button"
              aria-label={`Switch to ${locale === 'en' ? 'Arabic' : 'English'}`}
            >
              <span className="lang-toggle__label">{t('lang')}</span>
            </button>

            <button
              className={`cart-btn${totalItems > 0 ? ' cart-btn--bounce' : ''}`}
              onClick={() => setCartOpen(true)}
              type="button"
              aria-label={`Cart (${totalItems} items)`}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {totalItems > 0 && (
                <span className="cart-badge" aria-live="polite">{totalItems}</span>
              )}
            </button>

            <button
              className="navbar__hamburger"
              onClick={() => setMenuOpen((v) => !v)}
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              id="hamburger"
            >
              <span className="navbar__hamburger-bar" />
              <span className="navbar__hamburger-bar" />
              <span className="navbar__hamburger-bar" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`mobile-menu${menuOpen ? ' mobile-menu--open' : ''}`}
        id="mobile-menu"
        aria-hidden={!menuOpen}
      >
        <ul className="mobile-menu__links" role="list">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                className="mobile-menu__link"
                onClick={() => scrollToSection(link.id)}
                type="button"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Cart drawer — always in DOM so CSS transition plays */}
      <CartDrawer
        lang={locale as 'en' | 'ar'}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </>
  )
}
