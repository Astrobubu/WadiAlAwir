import Link from 'next/link'
import Image from 'next/image'
import type { ProductCardProduct } from '../lib/catalogue'
import AddToCartButton from './AddToCartButton'

interface ProductCardProps {
  product: ProductCardProduct
  lang: 'en' | 'ar'
}

export default function ProductCard({ product, lang }: ProductCardProps) {
  const name = product.name[lang] ?? product.name.en
  const carName = product.carModel?.name?.[lang] ?? ''

  const thumbSrc = product.thumbnailUrl

  const detailHref = `/${lang}/products/${product.slug}`

  return (
    <article className="product-card">
      {/* Thumbnail */}
      <Link href={detailHref} className="product-card__image-wrap" aria-label={name} tabIndex={-1}>
        {product.badge === 'warranty' && (
          <span className="product-card__badge product-card__badge--warranty">
            {lang === 'ar' ? 'ضمان' : 'Warranty'}
          </span>
        )}
        {thumbSrc ? (
          <Image
            src={thumbSrc}
            alt={name}
            width={480}
            height={360}
            className="product-card__image"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="product-card__image" style={{ background: 'var(--bg-elevated)' }} />
        )}
      </Link>

      {/* Body */}
      <div className="product-card__body">
        <span className="product-card__car">{carName}</span>

        <h3 className="product-card__name">
          <Link href={detailHref}>{name}</Link>
        </h3>

        <div className="product-card__price">
          {product.price.toLocaleString('en-AE')}
          <span className="product-card__price-currency">{product.currency ?? 'AED'}</span>
        </div>

        <div className="product-card__actions">
          <AddToCartButton
            product={{
              id: product.id,
              slug: product.slug,
              name: product.name,
              vehicle: product.carModel?.name,
              carYear: product.carYear,
              price: product.price,
              thumbnailUrl: product.thumbnailUrl,
            }}
            locale={lang}
          />
        </div>
      </div>
    </article>
  )
}
