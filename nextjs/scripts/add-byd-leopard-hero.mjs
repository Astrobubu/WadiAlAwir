/**
 * Follow-up to add-byd-leopard.mjs: uploads hero/card images for the
 * byd-leopard-5 and byd-leopard-7 vehicles and sets hero_url on each.
 *
 * Dry run: node scripts/add-byd-leopard-hero.mjs
 * Apply:   node scripts/add-byd-leopard-hero.mjs --apply
 */

import envPkg from '@next/env'
import { createClient } from '@supabase/supabase-js'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { randomUUID } from 'crypto'
import { existsSync } from 'fs'
import { readFile } from 'fs/promises'
import { basename, extname, resolve } from 'path'
import { fileURLToPath } from 'url'

const { loadEnvConfig } = envPkg
const scriptDir = fileURLToPath(new URL('.', import.meta.url))
const appRoot = resolve(scriptDir, '..')
const repoRoot = resolve(appRoot, '..')
const appsRoot = resolve(repoRoot, '..')
const apply = process.argv.includes('--apply')

loadEnvConfig(appRoot)

async function loadSiblingEnv(source) {
  if (!existsSync(source)) return
  const contents = await readFile(source, 'utf8')
  for (const line of contents.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/)
    if (!match || process.env[match[1]]) continue
    let value = match[2].trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    process.env[match[1]] = value
  }
}

await loadSiblingEnv(resolve(appsRoot, 'stock-sparkle-invoice', '.env'))

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const r2AccountId = process.env.CLOUDFLARE_ACCOUNT_ID
const r2AccessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID
const r2SecretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY
const r2Bucket = process.env.CLOUDFLARE_R2_BUCKET_NAME
const r2PublicUrl = (process.env.CLOUDFLARE_R2_PUBLIC_URL ?? '').replace(/\/$/, '')

const HEROES = [
  { slug: 'byd-leopard-5', file: 'C:/Users/Ahmad/Pictures/Screenshots/Screenshot 2026-08-23 152703.png', ext: 'png', contentType: 'image/png' },
  { slug: 'byd-leopard-7', file: 'C:/Users/Ahmad/Downloads/images.jpg', ext: 'jpg', contentType: 'image/jpeg' },
]

console.log(JSON.stringify({ mode: apply ? 'apply' : 'dry-run', heroes: HEROES }, null, 2))
if (!apply) process.exit(0)

if (!supabaseUrl || !serviceRoleKey) throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required with --apply')
const r2Required = { r2AccountId, r2AccessKeyId, r2SecretAccessKey, r2Bucket, r2PublicUrl }
const missingR2 = Object.entries(r2Required).filter(([, value]) => !value).map(([key]) => key)
if (missingR2.length) throw new Error(`Missing R2 variables: ${missingR2.join(', ')}`)

const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } })
const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${r2AccountId}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: r2AccessKeyId, secretAccessKey: r2SecretAccessKey },
})

for (const hero of HEROES) {
  const fullPath = resolve(hero.file)
  if (!existsSync(fullPath)) throw new Error(`Missing hero image: ${fullPath}`)
  const body = await readFile(fullPath)
  const date = new Date()
  const key = `catalog/${date.getUTCFullYear()}/${String(date.getUTCMonth() + 1).padStart(2, '0')}/${randomUUID()}.${hero.ext}`

  await r2.send(new PutObjectCommand({
    Bucket: r2Bucket,
    Key: key,
    Body: body,
    ContentType: hero.contentType,
    CacheControl: 'public, max-age=31536000, immutable',
  }))
  const url = `${r2PublicUrl}/${key}`

  const { error: mediaError } = await supabase.from('media_assets').upsert({
    provider: 'r2',
    storage_key: key,
    public_url: url,
    filename: basename(hero.file),
    mime_type: hero.contentType,
    byte_size: body.byteLength,
    is_public: true,
  }, { onConflict: 'public_url' })
  if (mediaError) throw new Error(`Media library ${hero.file}: ${mediaError.message}`)

  const { error: vehicleError } = await supabase
    .from('catalog_vehicles')
    .update({ hero_url: url, hero_storage_key: key })
    .eq('slug', hero.slug)
  if (vehicleError) throw new Error(`Vehicle ${hero.slug}: ${vehicleError.message}`)

  console.log(`Hero set: ${hero.slug} -> ${url}`)
}

const { data, error } = await supabase
  .from('catalog_vehicles')
  .select('slug, hero_url')
  .in('slug', HEROES.map((h) => h.slug))
console.log(JSON.stringify({ complete: true, vehicles: error ? error.message : data }, null, 2))
