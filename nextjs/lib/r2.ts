import 'server-only'

import { S3Client } from '@aws-sdk/client-s3'

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID ?? ''
const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID ?? ''
const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY ?? ''
export const R2_BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME ?? ''
export const R2_PUBLIC_URL = (process.env.CLOUDFLARE_R2_PUBLIC_URL ?? '').replace(/\/$/, '')

export const isR2Configured = Boolean(
  accountId && accessKeyId && secretAccessKey && R2_BUCKET_NAME && R2_PUBLIC_URL
)

let client: S3Client | undefined

export function getR2Client() {
  if (!isR2Configured) {
    throw new Error(
      'R2 is not configured. Set the Cloudflare account, access key, secret, bucket and public URL variables.'
    )
  }
  if (!client) {
    client = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: { accessKeyId, secretAccessKey },
    })
  }
  return client
}

export function publicR2Url(key: string) {
  return `${R2_PUBLIC_URL}/${key.split('/').map(encodeURIComponent).join('/')}`
}
