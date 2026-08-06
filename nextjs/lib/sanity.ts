import { createClient, type SanityClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { cache } from 'react'
import { getSupabaseCatalogue } from './supabase/catalog'

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

interface ImageUrlBuilderLike {
  width(value: number): ImageUrlBuilderLike
  height(value: number): ImageUrlBuilderLike
  format(value: string): ImageUrlBuilderLike
  quality(value: number): ImageUrlBuilderLike
  fit(value: string): ImageUrlBuilderLike
  url(): string
}

class ExternalImageUrlBuilder implements ImageUrlBuilderLike {
  constructor(private readonly sourceUrl: string) {}

  width() { return this }
  height() { return this }
  format() { return this }
  quality() { return this }
  fit() { return this }
  url() { return this.sourceUrl }
}

export function urlFor(source: ProductImageAsset): ImageUrlBuilderLike {
  if (source._type === 'externalImage') {
    return new ExternalImageUrlBuilder(source.url)
  }

  return builder.image(source as SanityImageSource) as unknown as ImageUrlBuilderLike
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

export interface ExternalImageAsset {
  _type: 'externalImage'
  url: string
  alt?: string
}

export type ProductImageAsset = SanityImageAsset | ExternalImageAsset

export interface CarModel {
  _id: string
  _type: 'carModel'
  _updatedAt?: string
  slug: { current: string }
  name: LocaleString
  years: string
  heroImage: ProductImageAsset
  productCount: number
}

export interface Product {
  _id: string
  _type: 'product'
  _updatedAt?: string
  slug: { current: string }
  name: LocaleString
  carModel: CarModel
  carYear: string
  price: number
  currency: string
  category: 'exterior' | 'interior' | 'lighting' | 'utility'
  description: LocaleString
  features: LocaleStringArray
  images: ProductImageAsset[]
  thumbnail: ProductImageAsset
  badge?: 'warranty' | null
  warranty?: string | null
  variants?: ProductVariant[]
}

export interface ProductCardProduct {
  _id: string
  slug: { current: string }
  name: LocaleString
  carModel?: {
    slug: { current: string }
    name: LocaleString
  }
  carYear?: string
  price: number
  currency: string
  category: Product['category']
  thumbnailUrl: string | null
  badge?: Product['badge']
}

export function toProductCardProduct(product: Product): ProductCardProduct {
  const image = product.thumbnail ?? product.images?.[0]

  return {
    _id: product._id,
    slug: product.slug,
    name: product.name,
    carModel: product.carModel
      ? { slug: product.carModel.slug, name: product.carModel.name }
      : undefined,
    carYear: product.carYear,
    price: product.price,
    currency: product.currency,
    category: product.category,
    thumbnailUrl: image
      ? urlFor(image).width(480).height(360).format('webp').quality(80).url()
      : null,
    badge: product.badge,
  }
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
  _updatedAt,
  slug,
  name,
  years,
  heroImage,
  productCount
`

const productFields = `
  _id,
  _type,
  _updatedAt,
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
const getSanityAllProducts = cache(async (): Promise<Product[]> => {
  if (!isSanityConfigured) return []
  return client.fetch<Product[]>(
    `*[_type == "product"] | order(_createdAt asc) { ${productFields} }`
  )
})

/**
 * Fetch a single product by its slug.
 */
const getSanityProductById = cache(async (id: string): Promise<Product | null> => {
  if (!isSanityConfigured) return null
  return client.fetch<Product | null>(
    `*[_type == "product" && slug.current == $id][0] { ${productFields} }`,
    { id }
  )
})

/**
 * Fetch all car models.
 */
const getSanityAllCarModels = cache(async (): Promise<CarModel[]> => {
  if (!isSanityConfigured) return []
  return client.fetch<CarModel[]>(
    `*[_type == "carModel"] | order(_createdAt asc) { ${carModelFields} }`
  )
})

/**
 * Fetch all services.
 */
const getSanityAllServices = cache(async (): Promise<Service[]> => {
  if (!isSanityConfigured) return []
  return client.fetch<Service[]>(
    `*[_type == "service"] | order(_createdAt asc) { ${serviceFields} }`
  )
})

/**
 * Fetch all products belonging to a specific car model (by slug).
 */
const getSanityProductsByCarModel = cache(async (carModelId: string): Promise<Product[]> => {
  if (!isSanityConfigured) return []
  return client.fetch<Product[]>(
    `*[_type == "product" && carModel->slug.current == $carModelId] | order(_createdAt asc) { ${productFields} }`,
    { carModelId }
  )
})

/**
 * Fetch a single vehicle model by its slug.
 */
const getSanityCarModelBySlug = cache(async (slug: string): Promise<CarModel | null> => {
  if (!isSanityConfigured) return null
  return client.fetch<CarModel | null>(
    `*[_type == "carModel" && slug.current == $slug][0] { ${carModelFields} }`,
    { slug }
  )
})

/**
 * Fetch all products in a crawlable catalogue category.
 */
const getSanityProductsByCategory = cache(async (category: Product['category']): Promise<Product[]> => {
  if (!isSanityConfigured) return []
  return client.fetch<Product[]>(
    `*[_type == "product" && category == $category] | order(_createdAt asc) { ${productFields} }`,
    { category }
  )
})

/**
 * Related products: same category first (any car model), then fill with same car model.
 * Returns up to 4, excluding the current product.
 */
const getSanityRelatedProducts = cache(async (
  currentSlug: string,
  category: string,
  carModelSlug: string
): Promise<Product[]> => {
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
})

// ---------------------------------------------------------------------------
// Unified repository
// ---------------------------------------------------------------------------

// Supabase becomes the source of truth after its migration and catalogue import
// are complete. Until then, every read safely falls back to the existing Sanity
// dataset so a partial rollout cannot blank the public storefront.
export const getAllProducts = cache(async (): Promise<Product[]> => {
  const catalogue = await getSupabaseCatalogue()
  return catalogue?.products ?? getSanityAllProducts()
})

export const getProductById = cache(async (id: string): Promise<Product | null> => {
  const catalogue = await getSupabaseCatalogue()
  if (catalogue) {
    return catalogue.products.find((product) => product.slug.current === id) ?? null
  }
  return getSanityProductById(id)
})

export const getAllCarModels = cache(async (): Promise<CarModel[]> => {
  const catalogue = await getSupabaseCatalogue()
  return catalogue?.vehicles ?? getSanityAllCarModels()
})

export const getAllServices = cache(async (): Promise<Service[]> => {
  const catalogue = await getSupabaseCatalogue()
  return catalogue?.services ?? getSanityAllServices()
})

export const getProductsByCarModel = cache(async (carModelId: string): Promise<Product[]> => {
  const catalogue = await getSupabaseCatalogue()
  if (catalogue) {
    return catalogue.products.filter(
      (product) => product.carModel?.slug.current === carModelId
    )
  }
  return getSanityProductsByCarModel(carModelId)
})

export const getCarModelBySlug = cache(async (slug: string): Promise<CarModel | null> => {
  const catalogue = await getSupabaseCatalogue()
  if (catalogue) {
    return catalogue.vehicles.find((vehicle) => vehicle.slug.current === slug) ?? null
  }
  return getSanityCarModelBySlug(slug)
})

export const getProductsByCategory = cache(async (category: Product['category']): Promise<Product[]> => {
  const catalogue = await getSupabaseCatalogue()
  if (catalogue) {
    return catalogue.products.filter((product) => product.category === category)
  }
  return getSanityProductsByCategory(category)
})

export const getRelatedProducts = cache(async (
  currentSlug: string,
  category: string,
  carModelSlug: string
): Promise<Product[]> => {
  const catalogue = await getSupabaseCatalogue()
  if (!catalogue) {
    return getSanityRelatedProducts(currentSlug, category, carModelSlug)
  }

  const candidates = catalogue.products.filter(
    (product) => product.slug.current !== currentSlug
  )
  const byCategory = candidates
    .filter((product) => product.category === category)
    .slice(0, 4)
  if (byCategory.length >= 4) return byCategory

  const used = new Set(byCategory.map((product) => product.slug.current))
  const byVehicle = candidates.filter(
    (product) =>
      !used.has(product.slug.current) &&
      product.carModel?.slug.current === carModelSlug
  )

  return [...byCategory, ...byVehicle.slice(0, 4 - byCategory.length)]
})
