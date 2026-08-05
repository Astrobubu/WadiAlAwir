'use client'

import Image from 'next/image'
import { useActionState, useRef, useState } from 'react'
import { saveSettingsAction, type SettingsActionState } from '@/app/admin/(workspace)/settings/actions'
import AdminIcon from './AdminIcon'

export interface ShopSettingsValue { id?: string; business_name?: string; address?: string | null; phone?: string | null; email?: string | null; trn?: string | null; logo_url?: string | null; tax_enabled?: boolean; tax_rate?: number; currency?: string; language?: string; digest_enabled?: boolean }
const initialState: SettingsActionState = { error: '' }

export default function AdminSettingsForm({ settings = {} }: { settings?: ShopSettingsValue }) {
  const [state, action, pending] = useActionState(saveSettingsAction, initialState)
  const [logoUrl, setLogoUrl] = useState(settings.logo_url ?? '')
  const [logoError, setLogoError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  function readLogo(file: File) {
    setLogoError('')
    if (file.size > 600_000) return setLogoError('Logo must be smaller than 600 KB.')
    const reader = new FileReader()
    reader.onload = () => setLogoUrl(String(reader.result))
    reader.readAsDataURL(file)
  }

  return <form action={action} className="admin-editor"><input type="hidden" name="id" value={settings.id ?? ''} /><input type="hidden" name="logo_url" value={logoUrl} />{(state.error || logoError) && <p className="admin-form-error" role="alert">{state.error || logoError}</p>}
    <section className="admin-editor__section"><div className="admin-editor__section-heading"><span>01</span><div><h2>Business details</h2><p>Printed at the top of every invoice.</p></div></div><div className="admin-settings-business"><div className="admin-settings-logo">{logoUrl ? <Image src={logoUrl} alt="Business logo preview" width={120} height={120} unoptimized /> : <span>Logo</span>}<input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => { const file = event.target.files?.[0]; if (file) readLogo(file) }} /><div><button type="button" className="admin-button admin-button--quiet" onClick={() => fileRef.current?.click()}>Upload logo</button>{logoUrl && <button type="button" className="admin-button admin-button--quiet" onClick={() => setLogoUrl('')}>Remove</button>}<small>PNG, JPG or WebP · 600 KB max</small></div></div><div className="admin-form-grid admin-form-grid--2"><Field label="Business name" required><input name="business_name" defaultValue={settings.business_name ?? 'Wadi Al Awir Car Accessories'} required /></Field><Field label="TRN"><input name="trn" defaultValue={settings.trn ?? ''} /></Field><Field label="Phone"><input name="phone" defaultValue={settings.phone ?? ''} /></Field><Field label="Email"><input name="email" type="email" defaultValue={settings.email ?? ''} /></Field><Field label="Address"><textarea name="address" rows={4} defaultValue={settings.address ?? ''} /></Field></div></div></section>
    <section className="admin-editor__section"><div className="admin-editor__section-heading"><span>02</span><div><h2>Invoicing</h2><p>Tax, currency, and printed invoice behavior.</p></div></div><div className="admin-form-grid admin-form-grid--3"><Field label="VAT rate (%)"><input name="tax_rate" type="number" min="0" step="0.01" defaultValue={settings.tax_rate ?? 5} /></Field><Field label="Currency"><input name="currency" defaultValue={settings.currency ?? 'AED'} /></Field><Field label="Interface language"><select name="language" defaultValue={settings.language ?? 'en'}><option value="en">English</option><option value="ar">Arabic</option></select></Field></div><div className="admin-settings-toggles"><label className="admin-publish-toggle"><input name="tax_enabled" type="checkbox" defaultChecked={settings.tax_enabled ?? true} /><span><strong>Apply VAT</strong><small>Use the VAT rate on new and edited invoices</small></span></label><label className="admin-publish-toggle"><input name="digest_enabled" type="checkbox" defaultChecked={settings.digest_enabled ?? true} /><span><strong>Daily digest</strong><small>Keep daily summary reporting enabled</small></span></label></div></section>
    <footer className="admin-editor__footer"><span>These details affect future invoice screens and printed documents.</span><button className="admin-button admin-button--primary" disabled={pending}>{pending ? 'Saving…' : 'Save settings'}</button></footer>
  </form>
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) { return <label className="admin-field"><span>{label}{required ? ' *' : ''}</span>{children}</label> }
