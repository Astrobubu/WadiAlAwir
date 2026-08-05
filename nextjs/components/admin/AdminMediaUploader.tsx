'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminMediaUploader({ productId }: { productId?: string }) {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const [altEn, setAltEn] = useState('')
  const [altAr, setAltAr] = useState('')
  const [thumbnail, setThumbnail] = useState(false)
  const [status, setStatus] = useState('')
  const [uploading, setUploading] = useState(false)

  async function upload() {
    const file = fileRef.current?.files?.[0]
    if (!file) return setStatus('Choose an image first.')
    setUploading(true)
    setStatus('Preparing secure upload…')

    try {
      const signedResponse = await fetch('/api/admin/media/upload-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: file.name, contentType: file.type, size: file.size }),
      })
      const signed = await signedResponse.json()
      if (!signedResponse.ok) throw new Error(signed.error || 'Could not prepare upload.')

      setStatus('Uploading to Cloudflare R2…')
      const uploadResponse = await fetch(signed.uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type, 'Cache-Control': 'public, max-age=31536000, immutable' },
        body: file,
      })
      if (!uploadResponse.ok) throw new Error('R2 rejected the upload. Check the bucket CORS policy.')

      setStatus('Registering media…')
      const completeResponse = await fetch('/api/admin/media/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: signed.key,
          filename: file.name,
          altEn,
          altAr,
          productId,
          isThumbnail: thumbnail,
        }),
      })
      const complete = await completeResponse.json()
      if (!completeResponse.ok) throw new Error(complete.error || 'Could not register media.')

      setStatus('Upload complete.')
      if (fileRef.current) fileRef.current.value = ''
      setAltEn('')
      setAltAr('')
      setThumbnail(false)
      router.refresh()
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Upload failed.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="admin-uploader">
      <div className="admin-form-grid admin-form-grid--3">
        <label className="admin-field"><span>Image</span><input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif" /></label>
        <label className="admin-field"><span>English alt text</span><input value={altEn} onChange={(event) => setAltEn(event.target.value)} /></label>
        <label className="admin-field" dir="rtl"><span>النص البديل</span><input value={altAr} onChange={(event) => setAltAr(event.target.value)} /></label>
      </div>
      <div className="admin-uploader__actions">
        {productId && <label><input type="checkbox" checked={thumbnail} onChange={(event) => setThumbnail(event.target.checked)} /> Use as product thumbnail</label>}
        <button type="button" className="admin-button admin-button--primary" onClick={upload} disabled={uploading}>{uploading ? 'Uploading…' : 'Upload image'}</button>
        {status && <span role="status">{status}</span>}
      </div>
    </div>
  )
}
