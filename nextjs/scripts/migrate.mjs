/**
 * Wadi Al Awir — Sanity migration script
 * Reads products.js and uploads all data + images to Sanity.
 *
 * Usage:
 *   SANITY_API_TOKEN=<your-write-token> node scripts/migrate.mjs
 *
 * Get a token: sanity.io/manage → project → API → Tokens → Add API token (Editor)
 */

import { createClient } from '@sanity/client'
import { createReadStream, existsSync } from 'fs'
import { readFile } from 'fs/promises'
import { resolve, basename, extname } from 'path'
import { fileURLToPath } from 'url'
import { createContext, runInContext } from 'vm'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const ROOT = resolve(__dirname, '../..') // D:/Apps/WadiAlAwir/

// ─── Sanity client ────────────────────────────────────────────────────────────

const token = process.env.SANITY_API_TOKEN
if (!token) {
  console.error('Missing SANITY_API_TOKEN. Get one from sanity.io/manage → API → Tokens')
  process.exit(1)
}

const client = createClient({
  projectId: 'jdyidpk6',
  dataset: 'production',
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// ─── Load products.js ─────────────────────────────────────────────────────────

const source = await readFile(resolve(ROOT, 'js/products.js'), 'utf8')

// Extract only the data declarations (before rendering functions)
const dataEnd = source.indexOf('\n/* --')
const dataPortion = dataEnd > 0 ? source.slice(0, dataEnd) : source

const sandboxCode = `(function() {\n${dataPortion}\nreturn { PRODUCTS, CAR_MODELS, SERVICES };\n})()`
const ctx = createContext({})
const { PRODUCTS, CAR_MODELS, SERVICES } = runInContext(sandboxCode, ctx)

console.log(`Loaded ${PRODUCTS.length} products, ${CAR_MODELS.length} car models, ${SERVICES.length} services`)

// ─── Image upload cache ───────────────────────────────────────────────────────

const uploadCache = new Map() // imagePath → Sanity asset _id

async function uploadImage(relativePath) {
  if (uploadCache.has(relativePath)) return uploadCache.get(relativePath)

  const fullPath = resolve(ROOT, relativePath)
  if (!existsSync(fullPath)) {
    console.warn(`  ⚠ Image not found: ${relativePath}`)
    return null
  }

  try {
    const ext = extname(relativePath).replace('.', '')
    const contentType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg'
      : ext === 'png' ? 'image/png'
      : ext === 'webp' ? 'image/webp'
      : 'image/jpeg'

    const asset = await client.assets.upload('image', createReadStream(fullPath), {
      filename: basename(relativePath),
      contentType,
    })
    uploadCache.set(relativePath, asset._id)
    return asset._id
  } catch (err) {
    console.warn(`  ⚠ Upload failed for ${relativePath}: ${err.message}`)
    return null
  }
}

function imageRef(assetId, key) {
  return {
    _type: 'image',
    _key: key,
    asset: { _type: 'reference', _ref: assetId },
  }
}

// ─── Migrate car models ───────────────────────────────────────────────────────

console.log('\n── Car Models ──')
const carModelIds = {} // slug → Sanity document _id

for (const car of CAR_MODELS) {
  process.stdout.write(`  ${car.id} ... `)

  const heroAssetId = await uploadImage(car.heroImage)

  const doc = {
    _type: 'carModel',
    _id: `carModel-${car.id}`,
    slug: { _type: 'slug', current: car.id },
    name: car.name,
    years: car.years,
    heroImage: heroAssetId ? imageRef(heroAssetId, 'hero') : undefined,
    productCount: car.productCount,
  }

  await client.createOrReplace(doc)
  carModelIds[car.id] = doc._id
  console.log('✓')
}

// ─── Migrate products ─────────────────────────────────────────────────────────

console.log('\n── Products ──')

for (const p of PRODUCTS) {
  process.stdout.write(`  ${p.id} ... `)

  // Upload all images
  const uploadedImages = []
  for (let i = 0; i < p.images.length; i++) {
    const assetId = await uploadImage(p.images[i])
    if (assetId) {
      uploadedImages.push(imageRef(assetId, `img-${i}`))
    }
  }

  // Upload thumbnail (may already be cached)
  const thumbAssetId = await uploadImage(p.thumbnail)

  const carModelRef = carModelIds[p.carModel]
  if (!carModelRef) {
    console.warn(`  ⚠ Unknown carModel: ${p.carModel}`)
    continue
  }

  const variants = p.variants?.map((v, i) => ({
    _type: 'variant',
    _key: `variant-${v.id || i}`,
    variantId: v.id,
    name: v.name,
    color: v.color || null,
    imageIndex: typeof v.imageIndex === 'number' ? v.imageIndex : null,
  })) ?? []

  const doc = {
    _type: 'product',
    _id: `product-${p.id}`,
    slug: { _type: 'slug', current: p.id },
    name: p.name,
    carModel: { _type: 'reference', _ref: carModelRef },
    carYear: p.carYear,
    price: p.price,
    currency: p.currency,
    category: p.category,
    description: p.description,
    features: p.features,
    images: uploadedImages,
    thumbnail: thumbAssetId ? {
      _type: 'image',
      asset: { _type: 'reference', _ref: thumbAssetId },
    } : undefined,
    badge: p.badge || null,
    warranty: p.warranty || null,
    variants: variants.length > 0 ? variants : undefined,
  }

  await client.createOrReplace(doc)
  console.log(`✓  (${uploadedImages.length} images)`)
}

// ─── Migrate services ─────────────────────────────────────────────────────────

console.log('\n── Services ──')

for (const s of SERVICES) {
  process.stdout.write(`  ${s.id} ... `)

  const packages = s.packages?.map((pkg, i) => ({
    _type: 'servicePackage',
    _key: `pkg-${i}`,
    name: pkg.name,
    price: pkg.price,
    currency: pkg.currency,
    features: pkg.features,
  })) ?? []

  const doc = {
    _type: 'service',
    _id: `service-${s.id}`,
    slug: { _type: 'slug', current: s.id },
    name: s.name,
    description: s.description,
    icon: s.icon,
    packages: packages.length > 0 ? packages : undefined,
  }

  await client.createOrReplace(doc)
  console.log('✓')
}

console.log('\n✅ Migration complete!')
