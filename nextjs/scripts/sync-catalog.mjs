/**
 * Targeted Wadi Al Awir catalogue sync.
 *
 * The static catalogue remains the current product source of truth while the
 * Next.js revamp is prepared. This script creates products/models that are
 * missing from Sanity and refreshes the two known image/content updates made
 * after the original migration. It intentionally does not touch services or
 * delete any CMS documents.
 *
 * Dry run: node scripts/sync-catalog.mjs
 * Apply:   node scripts/sync-catalog.mjs --apply
 */

import envPkg from '@next/env'
import { createClient } from '@sanity/client'
import { createReadStream, existsSync } from 'fs'
import { readFile } from 'fs/promises'
import { basename, extname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { createContext, runInContext } from 'vm'

const { loadEnvConfig } = envPkg
const __dirname = fileURLToPath(new URL('.', import.meta.url))
const APP_ROOT = resolve(__dirname, '..')
const REPO_ROOT = resolve(APP_ROOT, '..')
const apply = process.argv.includes('--apply')

loadEnvConfig(APP_ROOT)

const token = process.env.SANITY_API_TOKEN
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

if (!projectId) throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID is not configured')
if (apply && !token) throw new Error('SANITY_API_TOKEN is required with --apply')

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const source = await readFile(resolve(REPO_ROOT, 'js/products.js'), 'utf8')
const dataEnd = source.indexOf('\n/* --')
const dataPortion = dataEnd > 0 ? source.slice(0, dataEnd) : source
const sandboxCode = `(function() {\n${dataPortion}\nreturn { PRODUCTS, CAR_MODELS };\n})()`
const { PRODUCTS, CAR_MODELS } = runInContext(sandboxCode, createContext({}))

const current = await client.fetch(`{
  "productIds": *[_type == "product"].slug.current,
  "carIds": *[_type == "carModel"].slug.current
}`)

const currentProductIds = new Set(current.productIds)
const currentCarIds = new Set(current.carIds)
const missingProducts = PRODUCTS.filter((product) => !currentProductIds.has(product.id))
const missingCars = CAR_MODELS.filter((car) => !currentCarIds.has(car.id))
const refreshIds = new Set(['rox-01-spoiler', 'rox-01-number-plate-cover'])
const refreshProducts = PRODUCTS.filter(
  (product) => currentProductIds.has(product.id) && refreshIds.has(product.id)
)

const actualCounts = PRODUCTS.reduce((counts, product) => {
  counts[product.carModel] = (counts[product.carModel] ?? 0) + 1
  return counts
}, {})

console.log(JSON.stringify({
  mode: apply ? 'apply' : 'dry-run',
  sourceProducts: PRODUCTS.length,
  currentProducts: current.productIds.length,
  missingCars: missingCars.map((car) => car.id),
  missingProducts: missingProducts.map((product) => product.id),
  refreshProducts: refreshProducts.map((product) => product.id),
  productCounts: actualCounts,
}, null, 2))

if (!apply) process.exit(0)

const uploadCache = new Map()

async function uploadImage(relativePath) {
  if (!relativePath) return null
  if (uploadCache.has(relativePath)) return uploadCache.get(relativePath)

  const fullPath = resolve(REPO_ROOT, relativePath)
  if (!existsSync(fullPath)) {
    console.warn(`Image not found: ${relativePath}`)
    return null
  }

  const extension = extname(relativePath).toLowerCase()
  const contentType = extension === '.png'
    ? 'image/png'
    : extension === '.webp'
      ? 'image/webp'
      : 'image/jpeg'

  const asset = await client.assets.upload('image', createReadStream(fullPath), {
    filename: basename(relativePath),
    contentType,
  })
  uploadCache.set(relativePath, asset._id)
  return asset._id
}

function imageRef(assetId, key) {
  return {
    _type: 'image',
    _key: key,
    asset: { _type: 'reference', _ref: assetId },
  }
}

async function buildProductFields(product) {
  const images = []
  for (let index = 0; index < product.images.length; index += 1) {
    const assetId = await uploadImage(product.images[index])
    if (assetId) images.push(imageRef(assetId, `img-${index}`))
  }

  const thumbnailId = await uploadImage(product.thumbnail)
  const variants = product.variants?.map((variant, index) => ({
    _type: 'variant',
    _key: `variant-${variant.id || index}`,
    variantId: variant.id,
    name: variant.name,
    color: variant.color || null,
    imageIndex: typeof variant.imageIndex === 'number' ? variant.imageIndex : null,
  }))

  return {
    slug: { _type: 'slug', current: product.id },
    name: product.name,
    carModel: { _type: 'reference', _ref: `carModel-${product.carModel}` },
    carYear: product.carYear,
    price: product.price,
    currency: product.currency,
    category: product.category,
    description: product.description,
    features: product.features,
    images,
    thumbnail: thumbnailId
      ? { _type: 'image', asset: { _type: 'reference', _ref: thumbnailId } }
      : undefined,
    badge: product.badge || null,
    warranty: product.warranty || null,
    variants: variants?.length ? variants : undefined,
  }
}

for (const car of missingCars) {
  console.log(`Creating car model: ${car.id}`)
  const heroImageId = await uploadImage(car.heroImage)
  await client.create({
    _id: `carModel-${car.id}`,
    _type: 'carModel',
    slug: { _type: 'slug', current: car.id },
    name: car.name,
    years: car.years,
    heroImage: heroImageId ? imageRef(heroImageId, 'hero') : undefined,
    productCount: actualCounts[car.id] ?? 0,
  })
}

for (const product of missingProducts) {
  console.log(`Creating product: ${product.id}`)
  const fields = await buildProductFields(product)
  await client.create({
    _id: `product-${product.id}`,
    _type: 'product',
    ...fields,
  })
}

for (const product of refreshProducts) {
  console.log(`Refreshing product: ${product.id}`)
  const fields = await buildProductFields(product)
  await client.patch(`product-${product.id}`).set(fields).commit()
}

for (const car of CAR_MODELS) {
  console.log(`Updating product count: ${car.id} -> ${actualCounts[car.id] ?? 0}`)
  await client
    .patch(`carModel-${car.id}`)
    .set({ productCount: actualCounts[car.id] ?? 0 })
    .commit()
}

const verified = await client.fetch(`{
  "products": count(*[_type == "product"]),
  "cars": *[_type == "carModel"] | order(slug.current asc) {
    "id": slug.current,
    productCount
  }
}`)

console.log(JSON.stringify({ complete: true, verified }, null, 2))
