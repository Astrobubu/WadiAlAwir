import { HeadObjectCommand } from '@aws-sdk/client-s3'
import { revalidateTag } from 'next/cache'
import { getCurrentStaff } from '@/lib/supabase/admin'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { getR2Client, isR2Configured, publicR2Url, R2_BUCKET_NAME } from '@/lib/r2'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const staff = await getCurrentStaff()
  if (!staff || !['owner', 'editor'].includes(staff.role)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!isR2Configured) {
    return Response.json({ error: 'Cloudflare R2 is not configured.' }, { status: 503 })
  }

  const body = await request.json().catch(() => null) as {
    key?: string
    filename?: string
    altEn?: string
    altAr?: string
    productId?: string
    isThumbnail?: boolean
  } | null
  if (!body?.key || !body.key.startsWith('catalog/')) {
    return Response.json({ error: 'Invalid media key.' }, { status: 400 })
  }

  let object
  try {
    object = await getR2Client().send(new HeadObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: body.key,
    }))
  } catch {
    return Response.json({ error: 'The uploaded object could not be verified.' }, { status: 400 })
  }

  const publicUrl = publicR2Url(body.key)
  const supabase = await createServerSupabaseClient()
  const { data: media, error: mediaError } = await supabase
    .from('media_assets')
    .insert({
      provider: 'r2',
      storage_key: body.key,
      public_url: publicUrl,
      filename: (body.filename ?? body.key.split('/').at(-1) ?? 'image').slice(0, 180),
      mime_type: object.ContentType ?? null,
      byte_size: object.ContentLength ?? null,
      alt_en: body.altEn?.trim() || null,
      alt_ar: body.altAr?.trim() || null,
      is_public: true,
      uploaded_by: staff.id,
    })
    .select('id, public_url')
    .single()

  if (mediaError || !media) {
    return Response.json({ error: mediaError?.message ?? 'Could not register media.' }, { status: 400 })
  }

  if (body.productId) {
    if (body.isThumbnail) {
      await supabase
        .from('catalog_product_images')
        .update({ is_thumbnail: false })
        .eq('product_id', body.productId)
    }
    const { error: imageError } = await supabase.from('catalog_product_images').insert({
      product_id: body.productId,
      storage_key: body.key,
      public_url: publicUrl,
      alt_en: body.altEn?.trim() || null,
      alt_ar: body.altAr?.trim() || null,
      is_thumbnail: Boolean(body.isThumbnail),
      sort_order: 999,
    })
    if (imageError) return Response.json({ error: imageError.message }, { status: 400 })
    revalidateTag('wadi-catalogue')
  }

  return Response.json({ media })
}
