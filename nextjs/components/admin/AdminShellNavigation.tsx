'use client'

import Link from './AdminLink'
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

  return (
    <nav aria-label="Admin navigation">
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`admin-shell__nav-link${activePath(pathname, item.href) ? ' admin-shell__nav-link--active' : ''}`}
          aria-current={activePath(pathname, item.href) ? 'page' : undefined}
        >
          <AdminIcon name={item.icon} />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
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
