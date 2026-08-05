import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { getCurrentStaff } from '@/lib/supabase/admin'
import {
  getR2Client,
  isR2Configured,
  publicR2Url,
  R2_BUCKET_NAME,
} from '@/lib/r2'

export const runtime = 'nodejs'

const allowedTypes = new Map([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
  ['image/avif', 'avif'],
])

export async function POST(request: Request) {
  const staff = await getCurrentStaff()
  if (!staff || !['owner', 'editor'].includes(staff.role)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!isR2Configured) {
    return Response.json({ error: 'Cloudflare R2 is not configured.' }, { status: 503 })
  }

  const body = await request.json().catch(() => null) as {
    filename?: string
    contentType?: string
    size?: number
  } | null
  const contentType = body?.contentType ?? ''
  const extension = allowedTypes.get(contentType)
  if (!extension) return Response.json({ error: 'Use JPG, PNG, WebP or AVIF.' }, { status: 400 })
  if (!body?.size || body.size > 8 * 1024 * 1024) {
    return Response.json({ error: 'Image must be smaller than 8 MB.' }, { status: 400 })
  }

  const date = new Date()
  const key = `catalog/${date.getUTCFullYear()}/${String(date.getUTCMonth() + 1).padStart(2, '0')}/${crypto.randomUUID()}.${extension}`
  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
    ContentLength: body.size,
    CacheControl: 'public, max-age=31536000, immutable',
  })
  const uploadUrl = await getSignedUrl(getR2Client(), command, { expiresIn: 300 })

  return Response.json({ uploadUrl, key, publicUrl: publicR2Url(key) })
}
