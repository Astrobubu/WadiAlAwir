# Next.js Migration Design — Wadi Al Awir

**Date:** 2026-04-06  
**Status:** Approved

---

## Overview

Migrate the existing static HTML/CSS/JS site for Wadi Al Awir (wadialawir.com) to a Next.js 14 App Router application. The goal is better SEO through server-side rendering, a maintainable codebase for adding features later, and a JSON-driven product system that can be swapped for a Postgres database on a VPS in the future.

The visual design (Midnight Gold theme: navy `#070B14`, gold `#D4A853`, off-white `#EDE9E0`) is preserved exactly. No redesign.

---

## Stack

| Concern | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSR, clean URLs, future-proof |
| Styling | Global CSS (ported from styles.css) | Keep exact design, no rewrite |
| i18n | next-intl | App Router compatible, SSR-friendly, locale-based routing |
| Data | JSON files | Simple, portable, swappable for Postgres later |
| Deployment | Vercel | Already configured, zero change |
| Language | TypeScript | Type safety for product data shape |

> Note: `next-i18next` is Pages Router only. `next-intl` is the correct library for App Router.

---

## URL Structure

| Old | New |
|---|---|
| `/` | `/en` (redirects from `/`) |
| `/?lang=ar` | `/ar` |
| `/products.html` | `/en/products` |
| `/product.html?id=mud-guard` | `/en/products/mud-guard` |
| `/privacy.html` | `/en/privacy` |
| `/returns.html` | `/en/returns` |

Both `/en/products/mud-guard` and `/ar/products/mud-guard` are server-rendered and independently indexable by Google.

---

## Project Structure

```
/app
  layout.tsx                  ← root layout (fonts, GA script)
  page.tsx                    ← redirects / → /en
  /[locale]
    layout.tsx                ← locale layout (dir, lang attr, navbar, footer)
    page.tsx                  ← homepage (hero, services, car models, products preview, reviews, location, FAQ)
    /products
      page.tsx                ← full catalog with filtering
    /products/[id]
      page.tsx                ← single product detail (SSG via generateStaticParams)
    /privacy
      page.tsx
    /returns
      page.tsx

/components
  Navbar.tsx
  Hero.tsx
  ServicesGrid.tsx
  CarModelsGrid.tsx
  ProductGrid.tsx
  ProductCard.tsx
  ProductDetail.tsx
  ReviewsTrack.tsx
  LocationSection.tsx
  FAQSection.tsx
  Footer.tsx
  CartDrawer.tsx
  LightboxModal.tsx
  WhatsAppButton.tsx

/data
  products.json               ← ported from js/products.js PRODUCTS array
  services.json               ← ported from js/products.js SERVICES array
  car-models.json             ← ported from js/products.js CAR_MODELS array

/messages
  en.json                     ← ported from TRANSLATIONS.en in main.js
  ar.json                     ← ported from TRANSLATIONS.ar in main.js

/public
  /assets                     ← unchanged (hero images, badges, car images, thumbs)
  favicon.png
  sitemap.xml
  robots.txt

/styles
  globals.css                 ← ported from css/styles.css (all CSS vars, classes intact)
```

---

## Data Layer

### Product shape (TypeScript)
```ts
type Product = {
  id: string;
  name: { en: string; ar: string };
  carModel: string;
  carYear: string;
  price: number;
  currency: "AED";
  warranty: string;
  category: "exterior" | "interior" | "lighting" | "utility";
  description: { en: string; ar: string };
  features: { en: string[]; ar: string[] };
  images: string[];
  thumbnail: string;
  badge?: string;
}
```

Products are loaded from `data/products.json` at build time. Product detail pages are statically generated via `generateStaticParams` — instant page loads, fully crawlable by Google.

### Swapping to Postgres later
When moving to a VPS, replace the `import products from '@/data/products.json'` calls with `db.query('SELECT * FROM products')`. No component changes needed.

---

## i18n (next-intl)

- Locale detected from URL segment: `/en/...` or `/ar/...`
- Root `/` redirects to `/en`
- `dir` attribute (`ltr`/`rtl`) set on `<html>` in `[locale]/layout.tsx`
- `lang` attribute set on `<html>`
- All translation strings in `/messages/en.json` and `/messages/ar.json`
- Cart and UI strings use `useTranslations()` hook in client components
- Page-level strings use `getTranslations()` in server components

---

## Cart

Client-side only (localStorage), same logic as current `_cart` array. Implemented as a React context (`CartContext`) wrapping the locale layout. WhatsApp order URL generation ported from `js/whatsapp.js`.

---

## SEO

- Every page exports `generateMetadata()` with title, description, OG tags, canonical URL
- Product pages include `Product` schema JSON-LD
- Homepage includes `LocalBusiness` / `AutoPartsStore` schema
- `sitemap.xml` generated dynamically via `app/sitemap.ts`
- `robots.txt` kept as static file in `/public`
- Both `/en` and `/ar` versions get `hreflang` tags

---

## What Is NOT Changed

- Visual design — all CSS ported as-is
- WhatsApp commerce flow
- Product images and asset paths
- Vercel deployment (just point to new repo or same repo after migration)
- Google Analytics tag

---

## Migration Strategy

The migration is done in a new Next.js project created alongside the existing static files. The old HTML files are not deleted until the Next.js app is verified working on a preview URL. Zero downtime — Vercel preview deployment is tested first, then the main branch is updated.

---

## Out of Scope

- Admin dashboard (future)
- User accounts / auth (future)
- Real checkout / payment gateway (future)
- Postgres database integration (future, after VPS setup)
