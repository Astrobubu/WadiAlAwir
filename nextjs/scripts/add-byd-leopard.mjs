/**
 * One-off importer: adds BYD Leopard 5 & BYD Leopard 7 vehicles and their
 * products/images to the shared Supabase catalogue.
 *
 * Dry run: node scripts/add-byd-leopard.mjs
 * Apply:   node scripts/add-byd-leopard.mjs --apply
 *
 * Additive only — never deletes or touches unrelated invoices/stock/services.
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
const downloadsDir = 'C:/Users/Ahmad/Downloads'

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

const VEHICLES = [
  { slug: 'byd-leopard-5', name_en: 'BYD Leopard 5', name_ar: 'بي واي دي ليوبارد 5', years: '2024-2026' },
  { slug: 'byd-leopard-7', name_en: 'BYD Leopard 7', name_ar: 'بي واي دي ليوبارد 7', years: '2024-2026' },
]

const PRODUCTS = [
  {
    slug: 'byd-leopard-5-phone-holder',
    vehicle: 'byd-leopard-5',
    name_en: 'Car Phone Holder Mount',
    name_ar: 'حامل هاتف للسيارة',
    category: 'interior',
    price: 100,
    warranty: null,
    badge: null,
    description_en: 'Custom-fit dashboard phone holder mount for BYD Leopard 5. Clips securely above the center screen for a stable, no-drill install.',
    description_ar: 'حامل هاتف مخصص للوحة القيادة لبي واي دي ليوبارد 5. يثبت بأمان فوق الشاشة المركزية بتركيب ثابت بدون حفر.',
    features_en: ['Custom fit for Leopard 5 center screen', 'Secure no-shake clip-on mount', 'Tool-free installation', '360\u00B0 adjustable angle'],
    features_ar: ['مقاس مخصص للشاشة المركزية لليوبارد 5', 'تثبيت ثابت بدون اهتزاز', 'تركيب سهل بدون عدة', 'زاوية قابلة للتعديل 360\u00B0'],
    images: ['Byd leopard 5 Phone holder 100.jpeg'],
  },
  {
    slug: 'byd-leopard-5-mud-flaps',
    vehicle: 'byd-leopard-5',
    name_en: '4Pcs Mud Flaps Set',
    name_ar: 'طقم واقي طين 4 قطع',
    category: 'exterior',
    price: 250,
    warranty: null,
    badge: null,
    description_en: '4-piece mud flaps set for BYD Leopard 5. Protects fenders from mud, stones, and water splash. Direct-fit, no drilling required.',
    description_ar: 'طقم واقي طين 4 قطع لبي واي دي ليوبارد 5. يحمي الرفارف من الطين والحصى ورذاذ الماء. تركيب مباشر بدون حفر.',
    features_en: ['4-piece set (front & rear)', 'Custom fit for Leopard 5', 'Durable flexible material', 'No drilling installation'],
    features_ar: ['طقم 4 قطع (أمامي وخلفي)', 'مقاس مخصص لليوبارد 5', 'مادة مرنة متينة', 'تركيب بدون حفر'],
    images: ['Byd leopard 5 Mud flap 250.jpeg'],
  },
  {
    slug: 'byd-leopard-5-spoiler',
    vehicle: 'byd-leopard-5',
    name_en: 'Rear Spoiler Wing (Glossy Black)',
    name_ar: 'جناح سبويلر خلفي (أسود لامع)',
    category: 'exterior',
    price: 500,
    warranty: null,
    badge: null,
    description_en: 'Glossy black rear spoiler wing for BYD Leopard 5. Sport-style tailgate-mounted design that enhances the rugged look.',
    description_ar: 'جناح سبويلر خلفي أسود لامع لبي واي دي ليوبارد 5. تصميم رياضي يعزز المظهر القوي للسيارة.',
    features_en: ['Glossy black finish', 'Custom fit for Leopard 5', 'Sport styling upgrade', 'Easy bolt-on installation'],
    features_ar: ['لون أسود لامع', 'مقاس مخصص لليوبارد 5', 'ترقية بمظهر رياضي', 'تركيب سهل بمسامير'],
    images: ['Byd leopard 5 Spoiler 500.jpeg'],
  },
  {
    slug: 'byd-leopard-5-hr-wheel-spacer',
    vehicle: 'byd-leopard-5',
    name_en: 'H&R TRAK+ Wheel Spacer Set',
    name_ar: 'طقم فواصل عجلات H&R TRAK+',
    category: 'exterior',
    price: 1800,
    warranty: '5 years',
    badge: 'warranty',
    description_en: 'German-made H&R TRAK+ wheel spacers for BYD Leopard 5. Improves handling, stability, and gives a wider aggressive stance. Includes lug nuts and hardware. 5-year warranty.',
    description_ar: 'فواصل عجلات H&R TRAK+ صناعة ألمانية لبي واي دي ليوبارد 5. تحسّن الثبات والتحكم وتعطي مظهراً عريضاً وعدوانياً. تشمل الصواميل والقطع. ضمان 5 سنوات.',
    features_en: ['Made in Germany by H&R', 'TRAK+ hub-centric design', 'Improved handling & stability', 'Wider aggressive stance', 'Includes lug nuts & hardware', '5 Year Warranty'],
    features_ar: ['صناعة ألمانية من H&R', 'تصميم TRAK+ متمركز على المحور', 'تحسين الثبات والتحكم', 'مظهر عريض وعدواني', 'يشمل الصواميل والقطع', 'ضمان 5 سنوات'],
    images: ['Byd leopard 5 H&R 1800 5 years warranty.png'],
  },
  {
    slug: 'byd-leopard-7-mud-flaps',
    vehicle: 'byd-leopard-7',
    name_en: '4Pcs Mud Flaps Set',
    name_ar: 'طقم واقي طين 4 قطع',
    category: 'exterior',
    price: 250,
    warranty: null,
    badge: null,
    description_en: '4-piece mud flaps set for BYD Leopard 7. Protects fenders from mud, stones, and water splash. Direct-fit, no drilling required.',
    description_ar: 'طقم واقي طين 4 قطع لبي واي دي ليوبارد 7. يحمي الرفارف من الطين والحصى ورذاذ الماء. تركيب مباشر بدون حفر.',
    features_en: ['4-piece set (front & rear)', 'Custom fit for Leopard 7', 'Durable flexible material', 'No drilling installation'],
    features_ar: ['طقم 4 قطع (أمامي وخلفي)', 'مقاس مخصص لليوبارد 7', 'مادة مرنة متينة', 'تركيب بدون حفر'],
    images: ['Byd leopard 7 TI 7 Mud flap 250.jpeg', 'Byd leopard 7 TI 7 Mud flap 250   (2).jpeg'],
  },
  {
    slug: 'byd-leopard-7-spoiler',
    vehicle: 'byd-leopard-7',
    name_en: 'Rear Roof Spoiler Wing (Glossy Black)',
    name_ar: 'جناح سبويلر سقف خلفي (أسود لامع)',
    category: 'exterior',
    price: 500,
    warranty: null,
    badge: null,
    description_en: 'Glossy black roof-mounted rear spoiler for BYD Leopard 7. Bold sporty roofline upgrade with an integrated design.',
    description_ar: 'سبويلر سقف خلفي أسود لامع لبي واي دي ليوبارد 7. يعزز مظهر السيارة الرياضي بتصميم متكامل مع السقف.',
    features_en: ['Glossy black finish', 'Custom fit for Leopard 7', 'Roof-integrated sporty design', 'Easy bolt-on installation'],
    features_ar: ['لون أسود لامع', 'مقاس مخصص لليوبارد 7', 'تصميم رياضي متكامل مع السقف', 'تركيب سهل بمسامير'],
    images: ['Byd leopard 7 Spoiler 500 .jpeg', 'Byd leopard 7 Spoiler 500.jpeg'],
  },
  {
    slug: 'byd-leopard-7-hr-wheel-spacer',
    vehicle: 'byd-leopard-7',
    name_en: 'H&R TRAK+ Wheel Spacer Set',
    name_ar: 'طقم فواصل عجلات H&R TRAK+',
    category: 'exterior',
    price: 1800,
    warranty: '5 years',
    badge: 'warranty',
    description_en: 'German-made H&R TRAK+ wheel spacers for BYD Leopard 7. Improves handling, stability, and gives a wider aggressive stance. Includes lug nuts and hardware. 5-year warranty.',
    description_ar: 'فواصل عجلات H&R TRAK+ صناعة ألمانية لبي واي دي ليوبارد 7. تحسّن الثبات والتحكم وتعطي مظهراً عريضاً وعدوانياً. تشمل الصواميل والقطع. ضمان 5 سنوات.',
    features_en: ['Made in Germany by H&R', 'TRAK+ hub-centric design', 'Improved handling & stability', 'Wider aggressive stance', 'Includes lug nuts & hardware', '5 Year Warranty'],
    features_ar: ['صناعة ألمانية من H&R', 'تصميم TRAK+ متمركز على المحور', 'تحسين الثبات والتحكم', 'مظهر عريض وعدواني', 'يشمل الصواميل والقطع', 'ضمان 5 سنوات'],
    images: ['Byd leopard 7 H&R 1800.png'],
  },
]

console.log(JSON.stringify({
  mode: apply ? 'apply' : 'dry-run',
  vehicles: VEHICLES.map((v) => v.slug),
  products: PRODUCTS.map((p) => p.slug),
}, null, 2))

if (!apply) process.exit(0)

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required with --apply')
}
const r2Required = { r2AccountId, r2AccessKeyId, r2SecretAccessKey, r2Bucket, r2PublicUrl }
const missingR2 = Object.entries(r2Required).filter(([, value]) => !value).map(([key]) => key)
if (missingR2.length) throw new Error(`Missing R2 variables: ${missingR2.join(', ')}`)

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
})
const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${r2AccountId}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: r2AccessKeyId, secretAccessKey: r2SecretAccessKey },
})

function contentType(path) {
  const extension = extname(path).toLowerCase()
  if (extension === '.png') return 'image/png'
  if (extension === '.webp') return 'image/webp'
  if (extension === '.avif') return 'image/avif'
  return 'image/jpeg'
}

function extFor(path) {
  const extension = extname(path).toLowerCase().replace('.', '')
  return extension === 'jpeg' ? 'jpg' : extension
}

const mediaCache = new Map()

async function uploadImage(filename) {
  if (mediaCache.has(filename)) return mediaCache.get(filename)
  const fullPath = resolve(downloadsDir, filename)
  if (!existsSync(fullPath)) throw new Error(`Missing image: ${fullPath}`)
  const body = await readFile(fullPath)
  const date = new Date()
  const key = `catalog/${date.getUTCFullYear()}/${String(date.getUTCMonth() + 1).padStart(2, '0')}/${randomUUID()}.${extFor(filename)}`
  await r2.send(new PutObjectCommand({
    Bucket: r2Bucket,
    Key: key,
    Body: body,
    ContentType: contentType(filename),
    CacheControl: 'public, max-age=31536000, immutable',
  }))
  const url = `${r2PublicUrl}/${key}`
  const { error } = await supabase.from('media_assets').upsert({
    provider: 'r2',
    storage_key: key,
    public_url: url,
    filename: basename(filename),
    mime_type: contentType(filename),
    byte_size: body.byteLength,
    is_public: true,
  }, { onConflict: 'public_url' })
  if (error) throw new Error(`Media library ${filename}: ${error.message}`)
  mediaCache.set(filename, url)
  return url
}

const { data: existingVehicles, error: vehicleCountError } = await supabase
  .from('catalog_vehicles')
  .select('sort_order')
  .order('sort_order', { ascending: false })
  .limit(1)
if (vehicleCountError) throw vehicleCountError
let nextVehicleSort = (existingVehicles?.[0]?.sort_order ?? -1) + 1

const { data: existingProducts, error: productCountError } = await supabase
  .from('catalog_products')
  .select('sort_order')
  .order('sort_order', { ascending: false })
  .limit(1)
if (productCountError) throw productCountError
let nextProductSort = (existingProducts?.[0]?.sort_order ?? -1) + 1

const vehicleIds = new Map()
for (const vehicle of VEHICLES) {
  const { data, error } = await supabase.from('catalog_vehicles').upsert({
    slug: vehicle.slug,
    name_en: vehicle.name_en,
    name_ar: vehicle.name_ar,
    years: vehicle.years,
    is_published: true,
    sort_order: nextVehicleSort,
  }, { onConflict: 'slug' }).select('id').single()
  if (error || !data) throw new Error(`Vehicle ${vehicle.slug}: ${error?.message ?? 'missing id'}`)
  vehicleIds.set(vehicle.slug, data.id)
  nextVehicleSort += 1
  console.log(`Vehicle ready: ${vehicle.slug} -> ${data.id}`)
}

for (const product of PRODUCTS) {
  const sku = `WADI-${product.slug.toUpperCase()}`
  const thumbnailUrl = await uploadImage(product.images[0])

  const { data: item, error: itemError } = await supabase.from('items').insert({
    name: product.name_en,
    sku,
    category: product.category,
    unit: 'pcs',
    quantity: 0,
    low_stock_threshold: 0,
    cost_price: 0,
    msrp: product.price,
    selling_price: product.price,
    image_url: thumbnailUrl,
  }).select('id').single()
  if (itemError || !item) throw new Error(`Stock item ${product.slug}: ${itemError?.message ?? 'missing id'}`)

  const payload = {
    item_id: item.id,
    vehicle_id: vehicleIds.get(product.vehicle),
    slug: product.slug,
    name_en: product.name_en,
    name_ar: product.name_ar,
    description_en: product.description_en,
    description_ar: product.description_ar,
    features_en: product.features_en,
    features_ar: product.features_ar,
    car_year: VEHICLES.find((v) => v.slug === product.vehicle).years,
    category: product.category,
    currency: 'AED',
    warranty: product.warranty,
    badge: product.badge,
    variants: [],
    is_published: true,
    published_at: new Date().toISOString(),
    sort_order: nextProductSort,
  }
  const { data: savedProduct, error: productError } = await supabase
    .from('catalog_products')
    .upsert(payload, { onConflict: 'slug' })
    .select('id')
    .single()
  if (productError || !savedProduct) throw new Error(`Product ${product.slug}: ${productError?.message ?? 'missing id'}`)
  nextProductSort += 1

  const images = []
  for (let index = 0; index < product.images.length; index += 1) {
    const url = await uploadImage(product.images[index])
    images.push({
      product_id: savedProduct.id,
      storage_key: new URL(url).pathname.slice(1),
      public_url: url,
      alt_en: product.name_en,
      alt_ar: product.name_ar,
      is_thumbnail: index === 0,
      sort_order: index,
    })
  }
  const { error: imageError } = await supabase
    .from('catalog_product_images')
    .upsert(images, { onConflict: 'product_id,public_url' })
  if (imageError) throw new Error(`Images ${product.slug}: ${imageError.message}`)

  console.log(`Product ready: ${product.slug} -> ${savedProduct.id} (${images.length} image(s))`)
}

const verification = {}
for (const table of ['catalog_vehicles', 'catalog_products', 'catalog_product_images']) {
  const { count, error } = await supabase.from(table).select('id', { head: true, count: 'exact' })
  verification[table] = error ? `error: ${error.message}` : count
}
console.log(JSON.stringify({ complete: true, verification }, null, 2))
