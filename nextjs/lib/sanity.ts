import { createClient, type SanityClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// ---------------------------------------------------------------------------
// Client
// ---------------------------------------------------------------------------

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ''

export const client: SanityClient = createClient({
  projectId: projectId || 'placeholder',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const isSanityConfigured = Boolean(projectId && projectId !== 'placeholder')

// ---------------------------------------------------------------------------
// Image URL builder
// ---------------------------------------------------------------------------

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// ---------------------------------------------------------------------------
// TypeScript Types
// ---------------------------------------------------------------------------

export interface LocaleString {
  en: string
  ar: string
}

export interface LocaleStringArray {
  en: string[]
  ar: string[]
}

export interface ProductVariant {
  variantId: string
  name: LocaleString
  color?: string
  imageIndex?: number
}

export interface SanityImageAsset {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  alt?: string
}

export interface CarModel {
  _id: string
  _type: 'carModel'
  slug: { current: string }
  name: LocaleString
  years: string
  heroImage: SanityImageAsset
  productCount: number
}

export interface Product {
  _id: string
  _type: 'product'
  slug: { current: string }
  name: LocaleString
  carModel: CarModel
  carYear: string
  price: number
  currency: string
  category: 'exterior' | 'interior' | 'lighting' | 'utility'
  description: LocaleString
  features: LocaleStringArray
  images: SanityImageAsset[]
  thumbnail: SanityImageAsset
  badge?: 'warranty' | null
  warranty?: string | null
  variants?: ProductVariant[]
}

export interface ServicePackage {
  name: LocaleString
  price: number
  currency: string
  features: LocaleStringArray
}

export interface Service {
  _id: string
  _type: 'service'
  slug: { current: string }
  name: LocaleString
  description: LocaleString
  icon: 'tint' | 'shield' | 'droplets' | 'sparkles' | 'wrench'
  packages?: ServicePackage[]
}

// ---------------------------------------------------------------------------
// GROQ Queries
// ---------------------------------------------------------------------------

const carModelFields = `
  _id,
  _type,
  slug,
  name,
  years,
  heroImage,
  productCount
`

const productFields = `
  _id,
  _type,
  slug,
  name,
  carModel-> { ${carModelFields} },
  carYear,
  price,
  currency,
  category,
  description,
  features,
  images,
  thumbnail,
  badge,
  warranty,
  variants
`

const serviceFields = `
  _id,
  _type,
  slug,
  name,
  description,
  icon,
  packages
`

// ---------------------------------------------------------------------------
// Query functions
// ---------------------------------------------------------------------------

/**
 * Fetch all products with their carModel reference expanded.
 */
export async function getAllProducts(): Promise<Product[]> {
  if (!isSanityConfigured) return []
  return client.fetch<Product[]>(
    `*[_type == "product"] | order(_createdAt asc) { ${productFields} }`
  )
}

/**
 * Fetch a single product by its slug.
 */
export async function getProductById(id: string): Promise<Product | null> {
  if (!isSanityConfigured) return null
  return client.fetch<Product | null>(
    `*[_type == "product" && slug.current == $id][0] { ${productFields} }`,
    { id }
  )
}

/**
 * Fetch all car models.
 */
export async function getAllCarModels(): Promise<CarModel[]> {
  if (!isSanityConfigured) return []
  return client.fetch<CarModel[]>(
    `*[_type == "carModel"] | order(_createdAt asc) { ${carModelFields} }`
  )
}

/**
 * Fetch all services.
 */
export async function getAllServices(): Promise<Service[]> {
  if (!isSanityConfigured) return []
  return client.fetch<Service[]>(
    `*[_type == "service"] | order(_createdAt asc) { ${serviceFields} }`
  )
}

/**
 * Fetch all products belonging to a specific car model (by slug).
 */
export async function getProductsByCarModel(carModelId: string): Promise<Product[]> {
  if (!isSanityConfigured) return []
  return client.fetch<Product[]>(
    `*[_type == "product" && carModel->slug.current == $carModelId] | order(_createdAt asc) { ${productFields} }`,
    { carModelId }
  )
}

/**
 * Related products: same category first (any car model), then fill with same car model.
 * Returns up to 4, excluding the current product.
 */
export async function getRelatedProducts(
  currentSlug: string,
  category: string,
  carModelSlug: string
): Promise<Product[]> {
  if (!isSanityConfigured) return []

  // Same category, any car, excluding current — up to 4
  const byCategory = await client.fetch<Product[]>(
    `*[_type == "product" && slug.current != $currentSlug && category == $category] | order(_id desc) [0...4] { ${productFields} }`,
    { currentSlug, category }
  )
  if (byCategory.length >= 4) return byCategory

  // Fill remaining slots with same car model, different category
  const needed = 4 - byCategory.length
  const existingSlugs = [currentSlug, ...byCategory.map((p) => p.slug.current)]
  const byCar = await client.fetch<Product[]>(
    `*[_type == "product" && !( slug.current in $existingSlugs ) && carModel->slug.current == $carModelSlug] | order(_id asc) [0...$needed] { ${productFields} }`,
    { existingSlugs, carModelSlug, needed }
  )

  return [...byCategory, ...byCar]
}
