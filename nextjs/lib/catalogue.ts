import { cache } from 'react'
import { getSupabaseCatalogue } from './supabase/catalog'

export interface LocaleString { en: string; ar: string }
export interface LocaleStringArray { en: string[]; ar: string[] }
export interface ProductVariant { variantId: string; name: LocaleString; color?: string; imageIndex?: number }
export interface ExternalImageAsset { _type: 'externalImage'; url: string; alt?: string }
export type ProductImageAsset = ExternalImageAsset

export interface CarModel {
  id: string
  updatedAt?: string
  slug: string
  name: LocaleString
  years: string
  heroImage: ProductImageAsset
  productCount: number
}

export interface Product {
  id: string
  updatedAt?: string
  slug: string
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
  id: string
  slug: string
  name: LocaleString
  carModel?: { slug: string; name: LocaleString }
  carYear?: string
  price: number
  currency: string
  category: Product['category']
  thumbnailUrl: string | null
  badge?: Product['badge']
}

export interface ServicePackage { name: LocaleString; price: number; currency: string; features: LocaleStringArray }
export interface Service {
  id: string
  slug: string
  name: LocaleString
  description: LocaleString
  icon: 'tint' | 'shield' | 'droplets' | 'sparkles' | 'wrench'
  packages?: ServicePackage[]
}

interface ImageUrlBuilder {
  width(value: number): ImageUrlBuilder
  height(value: number): ImageUrlBuilder
  format(value: string): ImageUrlBuilder
  quality(value: number): ImageUrlBuilder
  fit(value: string): ImageUrlBuilder
  url(): string
}

class SupabaseImageUrlBuilder implements ImageUrlBuilder {
  constructor(private readonly sourceUrl: string) {}
  width() { return this }
  height() { return this }
  format() { return this }
  quality() { return this }
  fit() { return this }
  url() { return this.sourceUrl }
}

export function urlFor(source: ProductImageAsset): ImageUrlBuilder {
  return new SupabaseImageUrlBuilder(source.url)
}

export function toProductCardProduct(product: Product): ProductCardProduct {
  const image = product.thumbnail ?? product.images[0]
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    carModel: { slug: product.carModel.slug, name: product.carModel.name },
    carYear: product.carYear,
    price: product.price,
    currency: product.currency,
    category: product.category,
    thumbnailUrl: image?.url ?? null,
    badge: product.badge,
  }
}

export const getAllProducts = cache(async (): Promise<Product[]> => (await getSupabaseCatalogue()).products)
export const getProductById = cache(async (id: string): Promise<Product | null> => {
  const catalogue = await getSupabaseCatalogue()
  return catalogue.products.find((product) => product.slug === id) ?? null
})
export const getAllCarModels = cache(async (): Promise<CarModel[]> => (await getSupabaseCatalogue()).vehicles)
export const getAllServices = cache(async (): Promise<Service[]> => (await getSupabaseCatalogue()).services)
export const getProductsByCarModel = cache(async (carModelId: string): Promise<Product[]> => {
  const catalogue = await getSupabaseCatalogue()
  return catalogue.products.filter((product) => product.carModel.slug === carModelId)
})
export const getCarModelBySlug = cache(async (slug: string): Promise<CarModel | null> => {
  const catalogue = await getSupabaseCatalogue()
  return catalogue.vehicles.find((vehicle) => vehicle.slug === slug) ?? null
})
export const getProductsByCategory = cache(async (category: Product['category']): Promise<Product[]> => {
  const catalogue = await getSupabaseCatalogue()
  return catalogue.products.filter((product) => product.category === category)
})
export const getRelatedProducts = cache(async (currentSlug: string, category: string, carModelSlug: string): Promise<Product[]> => {
  const catalogue = await getSupabaseCatalogue()
  const candidates = catalogue.products.filter((product) => product.slug !== currentSlug)
  const byCategory = candidates.filter((product) => product.category === category).slice(0, 4)
  if (byCategory.length >= 4) return byCategory
  const used = new Set(byCategory.map((product) => product.slug))
  const byVehicle = candidates.filter((product) => !used.has(product.slug) && product.carModel.slug === carModelSlug)
  return [...byCategory, ...byVehicle.slice(0, 4 - byCategory.length)]
})
