import AdminMediaUploader from '@/components/admin/AdminMediaUploader'
import Image from 'next/image'
import { requireStaff } from '@/lib/supabase/admin'
import { isR2Configured } from '@/lib/r2'

export default async function AdminMediaPage() {
  const { supabase, profile } = await requireStaff()
  const { data, error } = await supabase
    .from('media_assets')
    .select('id, public_url, filename, alt_en, byte_size, provider, created_at')
    .order('created_at', { ascending: false })
    .limit(100)
  const canUpload = profile.role === 'owner' || profile.role === 'editor'

  return (
    <>
      <div className="admin-page-heading"><div><p className="admin-eyebrow">Asset library</p><h1>Media</h1><p>Original product images stored in Cloudflare R2 with permanent public URLs.</p></div></div>
      {!isR2Configured && <div className="admin-banner admin-banner--warning"><strong>R2 credentials are not configured yet.</strong><span>The editor is ready; add the five Cloudflare environment variables to enable uploads.</span></div>}
      {canUpload && isR2Configured && <section className="admin-panel"><div className="admin-panel__header"><h2>Upload image</h2></div><AdminMediaUploader /></section>}
      {error ? <div className="admin-banner admin-banner--warning">{error.message}</div> : (
        <section className="admin-media-grid">{(data ?? []).map((asset) => <article key={asset.id} className="admin-media-card"><Image src={asset.public_url} alt={asset.alt_en ?? ''} width={400} height={300} /><div><strong>{asset.filename}</strong><small>{asset.provider} · {asset.byte_size ? `${Math.round(asset.byte_size / 1024)} KB` : 'size unknown'}</small></div></article>)}</section>
      )}
    </>
  )
}
