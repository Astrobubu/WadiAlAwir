import Link from '@/components/admin/AdminLink'
import { redirect } from 'next/navigation'
import AdminLoginForm from '@/components/admin/AdminLoginForm'
import { getCurrentStaff } from '@/lib/supabase/admin'
import { isSupabaseConfigured } from '@/lib/supabase/config'

interface LoginPageProps {
  searchParams: Promise<{ setup?: string; access?: string }>
}

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const query = await searchParams
  const staff = await getCurrentStaff()
  if (staff) redirect('/admin')

  return (
    <main className="admin-login">
      <section className="admin-login__card">
        <div className="admin-login__brand">WADI AL AWIR</div>
        <p className="admin-eyebrow">Commerce workspace</p>
        <h1>Manage the catalogue and invoices</h1>
        <p className="admin-login__intro">
          Products, Arabic and English content, stock, customers and invoices share one secured workspace.
        </p>

        {!isSupabaseConfigured ? (
          <div className="admin-setup-note">
            <strong>Supabase setup is required.</strong>
            <span>
              Add the public Supabase URL and publishable key to the Next.js environment after applying the shared migration.
            </span>
          </div>
        ) : (
          <>
            {query.access === 'denied' && (
              <p className="admin-form-error" role="alert">
                This account has not been granted an active staff role.
              </p>
            )}
            <AdminLoginForm />
          </>
        )}

        <Link href="/en" className="admin-login__back">← Return to the website</Link>
      </section>
    </main>
  )
}
