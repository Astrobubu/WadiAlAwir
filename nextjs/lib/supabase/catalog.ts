import { createClient } from '@supabase/supabase-js'
import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import type {
  CarModel,
  ExternalImageAsset,
  Product,
  ProductVariant,
  Service,
  ServicePackage,
} from '@/lib/sanity'
import { getSupabaseConfig, isSupabaseConfigured } from './config'

type JsonObject = Record<string, unknown>

interface VehicleRow {
  id: string
  slug: string
  name_en: string
  name_ar: string
  years: string
  hero_url: string | null
  sort_order: number
  updated_at: string
}

interface ProductImageRow {
  id: string
  public_url: string
  alt_en: string | null
  alt_ar: string | null
  is_thumbnail: boolean
  sort_order: number
}

interface ProductRow {
  id: string
  slug: string
  name_en: string
  name_ar: string
  description_en: string
  description_ar: string
  features_en: string[]
  features_ar: string[]
  car_year: string
  category: Product['category']
  price: number
  currency: string
  warranty: string | null
  badge: Product['badge']
  variants: JsonObject[] | null
  updated_at: string
  vehicle: VehicleRow
  images: ProductImageRow[] | null
}

interface ServiceRow {
  id: string
  slug: string
  name_en: string
  name_ar: string
  description_en: string
  description_ar: string
  icon: Service['icon']
  packages: JsonObject[] | null
}

function publicClient() {
  const { url, publishableKey } = getSupabaseConfig()
  return createClient(url, publishableKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  })
}

let catalogWarningShown = false

function warnOnce(message: string) {
  if (catalogWarningShown) return
  catalogWarningShown = true
  console.warn(`[Supabase catalogue] ${message} Falling back to Sanity.`)
}

function externalImage(
  url: string,
  alt?: string | null
): ExternalImageAsset {
  return {
    _type: 'externalImage',
    url,
    alt: alt ?? undefined,
  }
}

function mapVehicle(row: VehicleRow, productCount: number): CarModel {
  return {
    _id: `supabase.vehicle.${row.id}`,
    _type: 'carModel',
    _updatedAt: row.updated_at,
    slug: { current: row.slug },
    name: { en: row.name_en, ar: row.name_ar },
    years: row.years,
    heroImage: row.hero_url
      ? externalImage(row.hero_url, row.name_en)
      : externalImage('/assets/hero-wallpaper-4.jpg', row.name_en),
    productCount,
  }
}

function mapVariant(value: JsonObject): ProductVariant | null {
  const variantId = typeof value.variantId === 'string' ? value.variantId : null
  const name = value.name
  if (
    !variantId ||
    !name ||
    typeof name !== 'object' ||
    typeof (name as JsonObject).en !== 'string' ||
    typeof (name as JsonObject).ar !== 'string'
  ) {
    return null
  }

  return {
    variantId,
    name: {
      en: (name as JsonObject).en as string,
      ar: (name as JsonObject).ar as string,
    },
    color: typeof value.color === 'string' ? value.color : undefined,
    imageIndex:
      typeof value.imageIndex === 'number' ? value.imageIndex : undefined,
  }
}

function mapProduct(row: ProductRow, vehicle: CarModel): Product {
  const sortedImages = [...(row.images ?? [])].sort(
    (a, b) => a.sort_order - b.sort_order
  )
  const images = sortedImages.map((image) =>
    externalImage(image.public_url, image.alt_en ?? row.name_en)
  )
  const thumbnailRow =
    sortedImages.find((image) => image.is_thumbnail) ?? sortedImages[0]

  return {
    _id: `supabase.product.${row.id}`,
    _type: 'product',
    _updatedAt: row.updated_at,
    slug: { current: row.slug },
    name: { en: row.name_en, ar: row.name_ar },
    carModel: vehicle,
    carYear: row.car_year,
    price: Number(row.price),
    currency: row.currency,
    category: row.category,
    description: { en: row.description_en, ar: row.description_ar },
    features: {
      en: row.features_en ?? [],
      ar: row.features_ar ?? [],
    },
    images,
    thumbnail: thumbnailRow
      ? externalImage(thumbnailRow.public_url, thumbnailRow.alt_en ?? row.name_en)
      : images[0] ?? externalImage('/assets/hero-wallpaper-4.jpg', row.name_en),
    badge: row.badge,
    warranty: row.warranty,
    variants: (row.variants ?? [])
      .map(mapVariant)
      .filter((variant): variant is ProductVariant => Boolean(variant)),
  }
}

function mapPackage(value: JsonObject): ServicePackage | null {
  const name = value.name as JsonObject | undefined
  const features = value.features as JsonObject | undefined
  if (
    !name ||
    typeof name.en !== 'string' ||
    typeof name.ar !== 'string' ||
    typeof value.price !== 'number'
  ) {
    return null
  }

  return {
    name: { en: name.en, ar: name.ar },
    price: value.price,
    currency: typeof value.currency === 'string' ? value.currency : 'AED',
    features: {
      en: Array.isArray(features?.en) ? (features.en as string[]) : [],
      ar: Array.isArray(features?.ar) ? (features.ar as string[]) : [],
    },
  }
}

async function loadSupabaseCatalogue(): Promise<{
  products: Product[]
  vehicles: CarModel[]
  services: Service[]
} | null> {
  if (!isSupabaseConfigured) return null

  const supabase = publicClient()
  const [productsResult, vehiclesResult, servicesResult] = await Promise.all([
    supabase
      .from('catalog_products')
      .select(`
        id, slug, name_en, name_ar, description_en, description_ar,
        features_en, features_ar, car_year, category, price, currency,
        warranty, badge, variants, updated_at,
        vehicle:catalog_vehicles!inner(
          id, slug, name_en, name_ar, years, hero_url, sort_order, updated_at
        ),
        images:catalog_product_images(
          id, public_url, alt_en, alt_ar, is_thumbnail, sort_order
        )
      `)
      .eq('is_published', true)
      .order('sort_order')
      .order('created_at'),
    supabase
      .from('catalog_vehicles')
      .select('id, slug, name_en, name_ar, years, hero_url, sort_order, updated_at')
      .eq('is_published', true)
      .order('sort_order'),
    supabase
      .from('catalog_services')
      .select('id, slug, name_en, name_ar, description_en, description_ar, icon, packages')
      .eq('is_published', true)
      .order('sort_order'),
  ])

  const firstError =
    productsResult.error ?? vehiclesResult.error ?? servicesResult.error
  if (firstError) {
    warnOnce(firstError.message)
    return null
  }

  const productRows = (productsResult.data ?? []) as unknown as ProductRow[]
  if (productRows.length === 0) {
    warnOnce('No published products were returned.')
    return null
  }

  const vehicleRows = (vehiclesResult.data ?? []) as unknown as VehicleRow[]
  const counts = new Map<string, number>()
  for (const product of productRows) {
    counts.set(product.vehicle.id, (counts.get(product.vehicle.id) ?? 0) + 1)
  }

  const vehicles = vehicleRows.map((vehicle) =>
    mapVehicle(vehicle, counts.get(vehicle.id) ?? 0)
  )
  const vehicleById = new Map(
    vehicles.map((vehicle) => [vehicle._id.replace('supabase.vehicle.', ''), vehicle])
  )
  const products = productRows.map((product) => {
    const vehicle =
      vehicleById.get(product.vehicle.id) ??
      mapVehicle(product.vehicle, counts.get(product.vehicle.id) ?? 0)
    return mapProduct(product, vehicle)
  })

  const services = ((servicesResult.data ?? []) as unknown as ServiceRow[]).map(
    (service): Service => ({
      _id: `supabase.service.${service.id}`,
      _type: 'service',
      slug: { current: service.slug },
      name: { en: service.name_en, ar: service.name_ar },
      description: {
        en: service.description_en,
        ar: service.description_ar,
      },
      icon: service.icon,
      packages: (service.packages ?? [])
        .map(mapPackage)
        .filter((entry): entry is ServicePackage => Boolean(entry)),
    })
  )

  return { products, vehicles, services }
}

const getCachedSupabaseCatalogue = unstable_cache(
  loadSupabaseCatalogue,
  ['wadi-public-catalogue-v2'],
  { revalidate: 300, tags: ['wadi-catalogue'] }
)

export const getSupabaseCatalogue = cache(async () => {
  if (!isSupabaseConfigured) return null
  return getCachedSupabaseCatalogue()
})
