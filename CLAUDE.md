# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Wadi Al Awir — a bilingual (English/Arabic) e-commerce site for car accessories in Dubai. Static site deployed on Vercel at wadialawir.com. No build system, no backend, no npm — pure vanilla HTML/CSS/JS.

Commerce is WhatsApp-based (no traditional checkout). Tabby installment payment badges are shown but orders go through WhatsApp. Phone: +971 55 357 3156.

## Development

**No build step.** Open HTML files directly or use any local server. Deployment is automatic on git push via Vercel.

There are no tests, linters, or package managers configured.

## Architecture

### Pages
- `index.html` — Homepage (hero, product preview, services, reviews)
- `products.html` — Full catalog with car model + category filtering
- `product.html` — Single product detail (dynamic via `?id=` query param)

### JavaScript
- `js/main.js` — Master init, i18n system, navbar, cart logic, scroll animations, filtering
- `js/products.js` — All product/service data arrays + rendering functions
- `js/gallery.js` — Lightbox modal for product images
- `js/whatsapp.js` — WhatsApp deep-link URL generators (product, service, cart)
- `js/haptics.js` — Web Vibration API with 7-level intensity hierarchy
- `js/thumb-map.js` — Maps full images to optimized WebP thumbnails

### Styling
- `css/styles.css` — Single stylesheet, "Midnight Gold" theme
- CSS custom properties for colors, spacing, typography
- Colors: navy `#070B14`, gold `#D4A853`, off-white `#EDE9E0`
- Fonts: Bebas Neue + Plus Jakarta Sans (EN), Aref Ruqaa + Cairo (AR)

### Assets
- `assets/badges/` — Payment provider logos
- `assets/cars/` — Car model hero images
- `assets/thumbs/` — Optimized thumbnail WebPs
- Product image folders at root level (one per product)

## Key Patterns

### Internationalization (i18n)
- `TRANSLATIONS` object in main.js, elements use `data-i18n` attribute
- Language stored in localStorage key `wadi-lang`
- Switching language toggles `document.documentElement.dir` between ltr/rtl
- All product data has `{ en, ar }` shape for name, description, features

### Product Data Model
Products in `js/products.js` follow this shape:
```js
{ id, name: {en, ar}, carModel, carYear, price, currency: "AED",
  warranty, category, description: {en, ar}, features: {en, ar},
  images: [], thumbnail, badge }
```
- `carModel`: "jetour-t2" or "jetour-rox-01"
- `category`: "exterior" | "interior" | "lighting" | "utility"

### Cart
Client-side `_cart` array persisted to localStorage. Cart summary sent via WhatsApp URL.

### SEO
- Schema.org structured data (AutoPartsStore, Product, Breadcrumb, ItemList)
- Full Open Graph + Twitter Card meta tags
- `sitemap.xml` and `robots.txt` at root
- Canonical URLs on all pages

## Conventions

- ES5-compatible vanilla JS (no modules, no imports, no transpilation)
- All strings that users see must have both `en` and `ar` translations
- Product IDs are kebab-case slugs (e.g., `mud-guard`, `ambient-lighting`)
- Images use lazy loading via `img-lazy` class + IntersectionObserver
- WhatsApp integration for all purchase flows — no payment gateway
