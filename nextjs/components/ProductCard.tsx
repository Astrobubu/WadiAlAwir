import Link from 'next/link'
import type { Product } from '../lib/sanity'
import { urlFor } from '../lib/sanity'
import AddToCartButton from './AddToCartButton'

interface ProductCardProps {
  product: Product
  lang: 'en' | 'ar'
}

export default function ProductCard({ product, lang }: ProductCardProps) {
  const name = product.name[lang] ?? product.name.en
  const carName = product.carModel?.name?.[lang] ?? ''

  const thumbSrc = product.thumbnail
    ? urlFor(product.thumbnail).width(480).height(360).format('webp').quality(80).url()
    : product.images?.[0]
      ? urlFor(product.images[0]).width(480).height(360).format('webp').quality(80).url()
      : null

  const detailHref = `/${lang}/products/${product.slug.current}`

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
          <img
            src={thumbSrc}
            alt={name}
            width={480}
            height={360}
            className="product-card__image"
            loading="lazy"
            decoding="async"
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
          <AddToCartButton product={product} locale={lang} />
        </div>
      </div>
    </article>
  )
}
