import { cache } from 'react'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from './server'
import { isSupabaseConfigured } from './config'

export type StaffRole = 'owner' | 'editor' | 'accountant' | 'viewer'

export interface StaffProfile {
  id: string
  full_name: string | null
  email: string | null
  role: StaffRole
  is_active: boolean
}

export async function getCurrentStaff(): Promise<StaffProfile | null> {
  if (!isSupabaseConfigured) return null

  const supabase = await createServerSupabaseClient()
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims()
  const userId = claimsData?.claims?.sub
  if (claimsError || typeof userId !== 'string') return null

  const { data, error } = await supabase
    .from('staff_profiles')
    .select('id, full_name, role, is_active')
    .eq('id', userId)
    .maybeSingle()

  if (error || !data || !data.is_active) return null
  return {
    ...(data as Omit<StaffProfile, 'email'>),
    email: typeof claimsData?.claims?.email === 'string' ? claimsData.claims.email : null,
  }
}

const loadRequiredStaff = cache(async (): Promise<{
  profile: StaffProfile
  supabase: Awaited<ReturnType<typeof createServerSupabaseClient>>
}> => {
  if (!isSupabaseConfigured) redirect('/admin/login?setup=required')

  const supabase = await createServerSupabaseClient()
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims()
  const userId = claimsData?.claims?.sub
  if (claimsError || typeof userId !== 'string') redirect('/admin/login')

  const { data, error } = await supabase
    .from('staff_profiles')
    .select('id, full_name, role, is_active')
    .eq('id', userId)
    .maybeSingle()

  if (error || !data || !data.is_active) redirect('/admin/login?access=denied')
  const profile: StaffProfile = {
    ...(data as Omit<StaffProfile, 'email'>),
    email: typeof claimsData?.claims?.email === 'string' ? claimsData.claims.email : null,
  }

  return { profile, supabase }
})

export async function requireStaff(
  allowedRoles?: readonly StaffRole[]
): Promise<{ profile: StaffProfile; supabase: Awaited<ReturnType<typeof createServerSupabaseClient>> }> {
  const staff = await loadRequiredStaff()

  if (allowedRoles && !allowedRoles.includes(staff.profile.role)) {
    redirect('/admin?access=denied')
  }

  return staff
}
