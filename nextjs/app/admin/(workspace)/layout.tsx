import Link from '@/components/admin/AdminLink'
import AdminLogoutButton from '@/components/admin/AdminLogoutButton'
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
        <main className="admin-workspace">
          <AdminBackButton />
          {children}
        </main>
      </div>
    </div>
  )
}
