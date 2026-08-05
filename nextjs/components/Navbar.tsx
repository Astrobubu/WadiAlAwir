'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useCart } from './CartContext'
import CartDrawer from './CartDrawer'

export default function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const { items } = useCart()

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0)
  const isRTL = locale === 'ar'
  const isHome = pathname === '/'

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
        router.replace(pathname, { locale: nextLocale })
      })
    } else {
      router.replace(pathname, { locale: nextLocale })
    }
  }

  const navLinks = [
    { label: t('products'), href: `/${locale}/products` },
    { label: t('services'), href: `/${locale}/#services` },
    { label: t('blog'), href: `/${locale}/blog` },
    { label: t('reviews'), href: `/${locale}/#reviews` },
    { label: t('contact'), href: `/${locale}/#location` },
  ]

  return (
    <>
      <nav
        ref={navRef}
        className={`navbar${isHome ? ' navbar--home' : ''}${scrolled ? ' navbar--scrolled' : ''}`}
        id="navbar"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="navbar__inner container">
          {/* Brand */}
          <Link href={`/${locale}`} className="navbar__brand" aria-label="Wadi Al Awir Home">
            <span className="navbar__brand-ar">وادي العوير</span>
            <span className="navbar__brand-en">WADI AL AWIR</span>
          </Link>

          {/* Desktop links */}
          <ul className="navbar__links" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  className="navbar__link"
                  href={link.href}
                >
                  {link.label}
                </Link>
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
            <li key={link.href}>
              <Link
                className="mobile-menu__link"
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
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
