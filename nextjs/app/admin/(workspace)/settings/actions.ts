'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireStaff } from '@/lib/supabase/admin'

export interface SettingsActionState { error: string }
const text = (data: FormData, key: string) => String(data.get(key) ?? '').trim()

export async function saveSettingsAction(_state: SettingsActionState, formData: FormData): Promise<SettingsActionState> {
  const { supabase } = await requireStaff(['owner', 'editor'])
  const id = text(formData, 'id')
  const businessName = text(formData, 'business_name')
  if (!businessName) return { error: 'Business name is required.' }
  const taxRate = Math.max(0, Number(formData.get('tax_rate') ?? 0) || 0)
  const payload = { business_name: businessName, address: text(formData, 'address') || null, phone: text(formData, 'phone') || null, email: text(formData, 'email') || null, trn: text(formData, 'trn') || null, logo_url: text(formData, 'logo_url') || null, tax_enabled: formData.get('tax_enabled') === 'on', tax_rate: taxRate, currency: text(formData, 'currency') || 'AED', language: text(formData, 'language') === 'ar' ? 'ar' : 'en', digest_enabled: formData.get('digest_enabled') === 'on' }
  const result = id ? await supabase.from('shop_settings').update(payload).eq('id', id) : await supabase.from('shop_settings').insert(payload)
  if (result.error) return { error: result.error.message }
  revalidatePath('/admin/settings')
  revalidatePath('/admin/invoices')
  redirect('/admin/settings?saved=1')
}
