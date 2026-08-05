/**
 * Wadi Al Awir -> shared Supabase importer.
 *
 * Dry run: node scripts/migrate-to-supabase.mjs
 * Apply:   node scripts/migrate-to-supabase.mjs --apply
 * R2:      node scripts/migrate-to-supabase.mjs --apply --upload-r2
 *
 * The importer is additive: it upserts Wadi-owned catalogue records and never
 * deletes invoices, customers, stock history, services or administrator media.
 */

import envPkg from '@next/env'
import { createClient } from '@supabase/supabase-js'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { createHash } from 'crypto'
import { existsSync } from 'fs'
import { readFile } from 'fs/promises'
import { basename, extname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { createContext, runInContext } from 'vm'

const { loadEnvConfig } = envPkg
const scriptDir = fileURLToPath(new URL('.', import.meta.url))
const appRoot = resolve(scriptDir, '..')
const repoRoot = resolve(appRoot, '..')
const appsRoot = resolve(repoRoot, '..')
const apply = process.argv.includes('--apply')
const uploadR2 = process.argv.includes('--upload-r2')

loadEnvConfig(appRoot)

function loadSiblingEnv(source) {
  if (!existsSync(source)) return
  return readFile(source, 'utf8').then((contents) => {
    for (const line of contents.split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/)
      if (!match || process.env[match[1]]) continue
      let value = match[2].trim()
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      process.env[match[1]] = value
    }
  })
}

await loadSiblingEnv(resolve(appsRoot, 'stock-sparkle-invoice', '.env'))

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
if (apply && (!supabaseUrl || !serviceRoleKey)) {
  throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required with --apply')
}

const staticSource = await readFile(resolve(repoRoot, 'js', 'products.js'), 'utf8')
const dataEnd = staticSource.indexOf('\n/* --')
const dataPortion = dataEnd > 0 ? staticSource.slice(0, dataEnd) : staticSource
const catalogue = runInContext(
  `(function(){${dataPortion}\nreturn { PRODUCTS, CAR_MODELS, SERVICES };})()`,
  createContext({})
)

const articleSource = await readFile(resolve(appRoot, 'lib', 'articles.ts'), 'utf8')
const articleMarker = 'export const articles: Article[] = '
const articleStart = articleSource.indexOf(articleMarker) + articleMarker.length
const articleEnd = articleSource.indexOf('\n\nexport function getArticle', articleStart)
if (articleStart < articleMarker.length || articleEnd < 0) {
  throw new Error('Could not locate the static article seed')
}
const staticArticles = runInContext(`(${articleSource.slice(articleStart, articleEnd)})`, createContext({}))

const counts = catalogue.PRODUCTS.reduce((result, product) => {
  result[product.carModel] = (result[product.carModel] ?? 0) + 1
  return result
}, {})

console.log(JSON.stringify({
  mode: apply ? 'apply' : 'dry-run',
  mediaMode: uploadR2 ? 'cloudflare-r2' : 'legacy-public-urls',
  vehicles: catalogue.CAR_MODELS.length,
  products: catalogue.PRODUCTS.length,
  services: catalogue.SERVICES.length,
  articles: staticArticles.length,
  productCounts: counts,
}, null, 2))

if (!apply) process.exit(0)

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
})

const readiness = await supabase.from('catalog_products').select('id', { head: true, count: 'exact' })
if (readiness.error) {
  throw new Error(`Shared migration is not applied: ${readiness.error.message}`)
}

let r2
if (uploadR2) {
  const required = [
    'CLOUDFLARE_ACCOUNT_ID',
    'CLOUDFLARE_R2_ACCESS_KEY_ID',
    'CLOUDFLARE_R2_SECRET_ACCESS_KEY',
    'CLOUDFLARE_R2_BUCKET_NAME',
    'CLOUDFLARE_R2_PUBLIC_URL',
  ]
  const missing = required.filter((key) => !process.env[key])
  if (missing.length) throw new Error(`Missing R2 variables: ${missing.join(', ')}`)
  r2 = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
    },
  })
}

const mediaCache = new Map()

function contentType(path) {
  const extension = extname(path).toLowerCase()
  if (extension === '.png') return 'image/png'
  if (extension === '.webp') return 'image/webp'
  if (extension === '.avif') return 'image/avif'
  return 'image/jpeg'
}

function publicLegacyUrl(relativePath) {
  return `https://wadialawir.com/${relativePath.split(/[\\/]/).map(encodeURIComponent).join('/')}`
}

async function mediaUrl(relativePath) {
  if (!relativePath) return null
  if (mediaCache.has(relativePath)) return mediaCache.get(relativePath)
  if (!uploadR2) {
    const url = publicLegacyUrl(relativePath)
    mediaCache.set(relativePath, url)
    return url
  }

  const fullPath = resolve(repoRoot, relativePath)
  if (!existsSync(fullPath)) {
    console.warn(`Missing image: ${relativePath}`)
    return null
  }
  const body = await readFile(fullPath)
  const hash = createHash('sha1').update(body).digest('hex').slice(0, 16)
  const safeName = basename(relativePath).toLowerCase().replace(/[^a-z0-9.]+/g, '-')
  const key = `catalog/imported/${hash}-${safeName}`
  await r2.send(new PutObjectCommand({
    Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
    Key: key,
    Body: body,
    ContentType: contentType(relativePath),
    CacheControl: 'public, max-age=31536000, immutable',
  }))
  const url = `${process.env.CLOUDFLARE_R2_PUBLIC_URL.replace(/\/$/, '')}/${key}`
  const { error: mediaError } = await supabase.from('media_assets').upsert({
    provider: 'r2',
    storage_key: key,
    public_url: url,
    filename: basename(relativePath),
    mime_type: contentType(relativePath),
    byte_size: body.byteLength,
    is_public: true,
  }, { onConflict: 'public_url' })
  if (mediaError) throw new Error(`Media library ${relativePath}: ${mediaError.message}`)
  mediaCache.set(relativePath, url)
  return url
}

const existingItemsResult = await supabase.from('items').select('id, name, sku')
if (existingItemsResult.error) throw existingItemsResult.error
const existingItems = existingItemsResult.data ?? []
const itemsByName = new Map(existingItems.map((item) => [item.name.trim().toLowerCase(), item]))
const itemsBySku = new Map(existingItems.filter((item) => item.sku).map((item) => [item.sku, item]))

const vehicleIds = new Map()
for (let index = 0; index < catalogue.CAR_MODELS.length; index += 1) {
  const vehicle = catalogue.CAR_MODELS[index]
  const heroUrl = await mediaUrl(vehicle.heroImage)
  const { data, error } = await supabase.from('catalog_vehicles').upsert({
    slug: vehicle.id,
    name_en: vehicle.name.en,
    name_ar: vehicle.name.ar,
    years: vehicle.years,
    hero_url: heroUrl,
    hero_storage_key: uploadR2 && heroUrl ? new URL(heroUrl).pathname.slice(1) : null,
    is_published: true,
    sort_order: index,
  }, { onConflict: 'slug' }).select('id').single()
  if (error || !data) throw new Error(`Vehicle ${vehicle.id}: ${error?.message ?? 'missing id'}`)
  vehicleIds.set(vehicle.id, data.id)
}

for (let index = 0; index < catalogue.PRODUCTS.length; index += 1) {
  const product = catalogue.PRODUCTS[index]
  const sku = `WADI-${product.id.toUpperCase()}`
  let item = itemsBySku.get(sku) ?? itemsByName.get(product.name.en.trim().toLowerCase())
  const thumbnailUrl = await mediaUrl(product.thumbnail)

  if (item) {
    const { error } = await supabase.from('items').update({
      name: product.name.en,
      sku: item.sku || sku,
      category: product.category,
      selling_price: product.price,
      msrp: product.price,
      image_url: thumbnailUrl,
    }).eq('id', item.id)
    if (error) throw new Error(`Stock item ${product.id}: ${error.message}`)
  } else {
    const { data, error } = await supabase.from('items').insert({
      name: product.name.en,
      sku,
      category: product.category,
      unit: 'pcs',
      quantity: 0,
      low_stock_threshold: 0,
      cost_price: 0,
      msrp: product.price,
      selling_price: product.price,
      image_url: thumbnailUrl,
    }).select('id, name, sku').single()
    if (error || !data) throw new Error(`Stock item ${product.id}: ${error?.message ?? 'missing id'}`)
    item = data
  }

  const payload = {
    item_id: item.id,
    vehicle_id: vehicleIds.get(product.carModel),
    slug: product.id,
    name_en: product.name.en,
    name_ar: product.name.ar,
    description_en: product.description.en,
    description_ar: product.description.ar,
    features_en: product.features.en,
    features_ar: product.features.ar,
    car_year: product.carYear,
    category: product.category,
    currency: product.currency || 'AED',
    warranty: product.warranty || null,
    badge: product.badge || null,
    variants: (product.variants ?? []).map((variant) => ({
      variantId: variant.id,
      name: variant.name,
      color: variant.color,
      imageIndex: variant.imageIndex,
    })),
    is_published: true,
    published_at: new Date().toISOString(),
    sort_order: index,
  }
  const { data: savedProduct, error: productError } = await supabase
    .from('catalog_products')
    .upsert(payload, { onConflict: 'slug' })
    .select('id')
    .single()
  if (productError || !savedProduct) throw new Error(`Product ${product.id}: ${productError?.message ?? 'missing id'}`)

  let { count: imageCount } = await supabase
    .from('catalog_product_images')
    .select('id', { head: true, count: 'exact' })
    .eq('product_id', savedProduct.id)
  if (uploadR2) {
    const { error } = await supabase
      .from('catalog_product_images')
      .delete()
      .eq('product_id', savedProduct.id)
      .is('storage_key', null)
    if (error) throw new Error(`Legacy image cleanup ${product.id}: ${error.message}`)
    const remaining = await supabase
      .from('catalog_product_images')
      .select('id', { head: true, count: 'exact' })
      .eq('product_id', savedProduct.id)
    imageCount = remaining.count
  }
  if (!imageCount || uploadR2) {
    const { data: existingThumbnails } = await supabase
      .from('catalog_product_images')
      .select('storage_key')
      .eq('product_id', savedProduct.id)
      .eq('is_thumbnail', true)
    const hasAdminThumbnail = (existingThumbnails ?? []).some((image) =>
      image.storage_key && !image.storage_key.startsWith('catalog/imported/')
    )
    const assignImportedThumbnail = uploadR2 ? !hasAdminThumbnail : !(existingThumbnails ?? []).length
    const imagePaths = [...new Set([product.thumbnail, ...(product.images ?? [])].filter(Boolean))]
    const images = []
    for (let imageIndex = 0; imageIndex < imagePaths.length; imageIndex += 1) {
      const url = await mediaUrl(imagePaths[imageIndex])
      if (url) images.push({
        product_id: savedProduct.id,
        storage_key: uploadR2 ? new URL(url).pathname.slice(1) : null,
        public_url: url,
        alt_en: product.name.en,
        alt_ar: product.name.ar,
        is_thumbnail: assignImportedThumbnail && imagePaths[imageIndex] === product.thumbnail,
        sort_order: imageIndex,
      })
    }
    if (images.length) {
      const { error } = await supabase
        .from('catalog_product_images')
        .upsert(images, { onConflict: 'product_id,public_url' })
      if (error) throw new Error(`Images ${product.id}: ${error.message}`)
    }
  }

  if ((index + 1) % 10 === 0 || index === catalogue.PRODUCTS.length - 1) {
    console.log(`Imported ${index + 1}/${catalogue.PRODUCTS.length} products`)
  }
}

for (let index = 0; index < catalogue.SERVICES.length; index += 1) {
  const service = catalogue.SERVICES[index]
  const { error } = await supabase.from('catalog_services').upsert({
    slug: service.id,
    name_en: service.name.en,
    name_ar: service.name.ar,
    description_en: service.description.en,
    description_ar: service.description.ar,
    icon: service.icon,
    packages: service.packages ?? [],
    is_published: true,
    sort_order: index,
  }, { onConflict: 'slug' })
  if (error) throw new Error(`Service ${service.id}: ${error.message}`)
}

function articleBody(article, locale) {
  const blocks = [...article.intro[locale]]
  for (const section of article.sections) {
    blocks.push(`## ${section.heading[locale]}`)
    blocks.push(...section.paragraphs[locale])
    if (section.bullets) blocks.push(...section.bullets[locale].map((bullet) => `- ${bullet}`))
  }
  return blocks.join('\n\n')
}

for (const article of staticArticles) {
  const { error } = await supabase.from('articles').upsert({
    slug: article.slug,
    title_en: article.title.en,
    title_ar: article.title.ar,
    excerpt_en: article.excerpt.en,
    excerpt_ar: article.excerpt.ar,
    body_en: articleBody(article, 'en'),
    body_ar: articleBody(article, 'ar'),
    category_en: article.category.en,
    category_ar: article.category.ar,
    is_published: true,
    published_at: `${article.publishedAt}T00:00:00+04:00`,
  }, { onConflict: 'slug' })
  if (error) throw new Error(`Article ${article.slug}: ${error.message}`)
}

const verification = {}
for (const table of ['catalog_vehicles', 'catalog_products', 'catalog_product_images', 'catalog_services', 'articles']) {
  const { count, error } = await supabase.from(table).select('id', { head: true, count: 'exact' })
  verification[table] = error ? `error: ${error.message}` : count
}
console.log(JSON.stringify({ complete: true, verification }, null, 2))
