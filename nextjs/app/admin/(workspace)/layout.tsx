import Link from 'next/link'
import AdminLogoutButton from '@/components/admin/AdminLogoutButton'
import AdminIcon from '@/components/admin/AdminIcon'
import { AdminBackButton, AdminSidebarNavigation } from '@/components/admin/AdminShellNavigation'
import { requireStaff } from '@/lib/supabase/admin'

export default async function AdminWorkspaceLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await requireStaff()

  return (
    <div className="admin-shell">
      <aside className="admin-shell__sidebar">
        <Link href="/admin" className="admin-shell__logo">
          <span>WADI</span>
          <small>AL AWIR</small>
        </Link>
        <AdminSidebarNavigation />
        <div className="admin-shell__profile">
          <span className="admin-shell__avatar">{(profile.full_name || profile.email || 'A').charAt(0).toUpperCase()}</span>
          <span className="admin-shell__profile-copy"><strong>{profile.full_name || 'Staff member'}</strong><small>{profile.email}</small></span>
          <AdminLogoutButton />
        </div>
      </aside>
      <div className="admin-shell__main">
        <header className="admin-shell__topbar">
          <AdminBackButton />
          <div className="admin-shell__topbar-actions">
            <Link href="/en" target="_blank">View website <AdminIcon name="external-link" /></Link>
            <span className="admin-shell__mobile-profile"><span className="admin-shell__avatar">{(profile.full_name || 'A').charAt(0).toUpperCase()}</span><AdminLogoutButton /></span>
          </div>
        </header>
        <main className="admin-workspace">{children}</main>
      </div>
    </div>
  )
}
