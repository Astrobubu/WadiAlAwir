'use client'

import { useState } from 'react'
import { getBrowserSupabaseClient } from '@/lib/supabase/browser'
import AdminIcon from './AdminIcon'

export default function AdminLogoutButton() {
  const [loading, setLoading] = useState(false)

  async function signOut() {
    setLoading(true)
    await getBrowserSupabaseClient().auth.signOut()
    window.location.assign('/admin/login')
  }

  return (
    <button type="button" className="admin-shell__signout" onClick={signOut} disabled={loading} aria-label="Sign out" title="Sign out">
      <AdminIcon name="logout" />
      <span className="admin-visually-hidden">{loading ? 'Signing out' : 'Sign out'}</span>
    </button>
  )
}
