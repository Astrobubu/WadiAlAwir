# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

Wadi Al Awir — a bilingual (English/Arabic) e-commerce site for car accessories in Dubai, live at wadialawir.com. The live site is the **Next.js app in `nextjs/`**, deployed on Vercel (Vercel project name: `nextjs`), backed by a **shared Supabase database** (the same Supabase project used by the sibling `stock-sparkle-invoice` invoicing app).

Commerce is WhatsApp-based (no traditional checkout). Tabby installment payment badges are shown but orders go through WhatsApp. Phone: +971 55 357 3156.

## IMPORTANT: root-level static site is legacy, do not edit for storefront changes

`index.html`, `products.html`, `product.html`, `js/*.js`, `css/styles.css`, and the root `vercel.json` are the **old static site**. It is **not deployed** and does **not** feed the live storefront. `js/products.js` is kept around only as historical seed data (it's what `nextjs/scripts/migrate-to-supabase.mjs` originally imported from). **Do not edit these files when asked to add/change products, car models, or storefront content** — changes there will not appear on wadialawir.com. All real catalogue work happens in `nextjs/` against Supabase (see below).

## Where the real catalogue lives

- **Database tables** (shared Supabase project): `catalog_vehicles` (car models), `catalog_products`, `catalog_product_images`, `catalog_services`, `articles`, plus `items` (inventory, shared with the invoicing app) and `media_assets`.
- **Read path**: `nextjs/lib/supabase/catalog.ts` (`getSupabaseCatalogue`) — cached with `unstable_cache(..., { revalidate: 300, tags: ['wadi-catalogue'] })`. Falls back to Sanity CMS types if Supabase isn't configured, but Supabase is the live source of truth.
- **Write path (normal case — one product at a time)**: the admin panel at `/admin` (`nextjs/app/admin/(workspace)/...`). Product create/edit: `AdminProductForm` + `saveProductAction` in `nextjs/app/admin/(workspace)/products/actions.ts` (creates/updates an `items` row + a `catalog_products` row, calls `revalidateTag('wadi-catalogue')`). Images: `AdminMediaUploader` → `/api/admin/media/upload-url` (presigned R2 PUT) → `/api/admin/media/complete` (registers `media_assets` + `catalog_product_images`).
- **There is no admin UI to create a new vehicle (car model).** Vehicles (`catalog_vehicles`) must be inserted directly via a script with the Supabase service-role key — see `nextjs/scripts/add-byd-leopard.mjs` for the established pattern (upsert-by-slug, additive only, uploads images to R2 first, then vehicle rows, then `items`/`catalog_products`/`catalog_product_images`). Copy that script's shape for future "add a new car + its products" requests instead of using the admin UI (which can't create vehicles) or editing `js/products.js` (which does nothing live).
- **Credentials**: `nextjs/.env.production.local` / `.env.development.local` hold the Cloudflare R2 vars. The Supabase `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` are **not** in this repo's env files — they live in the sibling repo `D:/Apps/stock-sparkle-invoice/.env` (same shared Supabase project). Any script that needs service-role access must load that sibling `.env` (see `loadSiblingEnv` in `migrate-to-supabase.mjs` / `add-byd-leopard.mjs`).
- Any one-off catalogue script must be **additive only** — upsert by slug, never delete rows — since the `items` table and Supabase project are shared with the invoicing app's stock/invoices data.
- After a direct-to-DB script (bypassing the admin server actions), the storefront picks up changes automatically within 5 minutes via the `revalidate: 300` cache; there's no public revalidate endpoint to force it sooner (saving any product in `/admin` does call `revalidateTag` immediately, as a workaround).

## Development

**Next.js app** (`nextjs/`): `npm run dev` / `npm run build` / `npm run start`. No build step for the legacy static files (irrelevant since they aren't deployed).

## Architecture (Next.js app, `nextjs/`)

- `app/[locale]/` — homepage, `/products`, `/products/[id]`, locale-based routing (`next-intl`)
- `app/admin/(workspace)/` — staff admin panel (products, stock, invoices, media, articles)
- `lib/supabase/catalog.ts` — reads the live catalogue from Supabase
- `lib/r2.ts` — Cloudflare R2 client for product images
- `scripts/` — one-off/import scripts (`migrate-to-supabase.mjs` = original static→Supabase seed; `add-byd-leopard.mjs` = example of adding a new vehicle + products directly)

### Product Data Model (Supabase `catalog_products`)
`{ slug, name_en, name_ar, vehicle_id, car_year, category, price/currency (via items), warranty, badge, description_en/ar, features_en/ar (string arrays), variants (jsonb), is_published, sort_order }`
- `category`: `"exterior" | "interior" | "lighting" | "utility"`
- Images live in `catalog_product_images` (`product_id`, `public_url`, `is_thumbnail`, `sort_order`), uploaded to Cloudflare R2

### Legacy static site (not deployed — reference only)
- `index.html` / `products.html` / `product.html`, `js/main.js`, `js/products.js`, `js/gallery.js`, `js/whatsapp.js`, `js/haptics.js`, `css/styles.css` — the pre-migration vanilla JS site. Kept in the repo for history; do not treat as the source of truth for anything customer-facing.
- Visual design (Midnight Gold theme: navy `#070B14`, gold `#D4A853`, off-white `#EDE9E0`) was ported as-is into the Next.js app's global CSS — this part of the legacy code is still a useful reference for exact colors/fonts (Bebas Neue + Plus Jakarta Sans EN, Aref Ruqaa + Cairo AR).

## Conventions

- All customer-facing strings need both `en` and `ar` content (Supabase columns: `*_en` / `*_ar`).
- Product/vehicle slugs are kebab-case (e.g. `byd-leopard-5-mud-flaps`).
- WhatsApp integration for all purchase flows — no payment gateway.
