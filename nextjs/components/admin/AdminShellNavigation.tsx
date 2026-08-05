'use client'

import Link from './AdminLink'
import { useEffect, useState, useTransition } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import AdminIcon, { type AdminIconName } from './AdminIcon'

const navigation: Array<{ href: string; label: string; icon: AdminIconName }> = [
  { href: '/admin', label: 'Overview', icon: 'dashboard' },
  { href: '/admin/products', label: 'Products', icon: 'package' },
  { href: '/admin/articles', label: 'Articles', icon: 'article' },
  { href: '/admin/customers', label: 'Customers', icon: 'users' },
  { href: '/admin/invoices', label: 'Invoices', icon: 'invoice' },
  { href: '/admin/settings', label: 'Settings', icon: 'settings' },
]

function activePath(pathname: string, href: string) {
  return href === '/admin' ? pathname === href : pathname === href || pathname.startsWith(`${href}/`)
}

export function AdminSidebarNavigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [pendingHref, setPendingHref] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const destinations = navigation.filter((item) => item.href !== pathname)
    const timers = destinations.map((item, index) => window.setTimeout(() => router.prefetch(item.href), 300 + index * 140))
    return () => timers.forEach(window.clearTimeout)
  }, [pathname, router])

  function navigate(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || pathname === href) return
    event.preventDefault()
    setPendingHref(href)
    startTransition(() => router.push(href))
  }

  const pendingLabel = navigation.find((item) => item.href === pendingHref)?.label

  return (
    <>
    <nav aria-label="Admin navigation">
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`admin-shell__nav-link${activePath(pathname, item.href) ? ' admin-shell__nav-link--active' : ''}${isPending && pendingHref === item.href ? ' admin-shell__nav-link--pending' : ''}`}
          aria-current={activePath(pathname, item.href) ? 'page' : undefined}
          aria-busy={isPending && pendingHref === item.href}
          onClick={(event) => navigate(event, item.href)}
          onMouseEnter={() => router.prefetch(item.href)}
          onFocus={() => router.prefetch(item.href)}
          onTouchStart={() => router.prefetch(item.href)}
        >
          <AdminIcon name={item.icon} />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
    {isPending && pendingLabel && <div className="admin-navigation-loading" role="status"><span /><strong>Loading {pendingLabel}…</strong></div>}
    </>
  )
}

export function AdminBackButton() {
  const pathname = usePathname()
  const router = useRouter()
  if (pathname === '/admin') return null

  function goBack() {
    if (window.history.length > 1) router.back()
    else router.push('/admin')
  }

  return (
    <button type="button" className="admin-shell__back" onClick={goBack} aria-label="Go back">
      <AdminIcon name="arrow-left" />
      <span>Back</span>
    </button>
  )
}
