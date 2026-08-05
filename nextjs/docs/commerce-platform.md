# Wadi Al Awir Shared Commerce Platform

The public Next.js storefront and the existing `stock-sparkle-invoice` application now target one operational model:

- Supabase stores staff roles, catalogue content, articles, stock, customers and invoices.
- Cloudflare R2 is the media library and can attach uploads to products.
- Sanity remains a read-only storefront fallback until the Supabase catalogue is imported and published.
- The original invoice application remains usable while Wadi's `/admin` workspace adopts the same tables.

## 1. Apply the database migration

The migration sources of truth are:

`D:\Apps\stock-sparkle-invoice\supabase\migrations\20260804190000_wadi_shared_platform.sql`

`D:\Apps\stock-sparkle-invoice\supabase\migrations\20260804213000_invoice_tax_setting.sql`

`D:\Apps\stock-sparkle-invoice\supabase\migrations\20260804230000_update_invoice_rpc.sql`

All three migrations were applied to the linked Supabase project on 4 August 2026. The schema lint completed without warnings, and the last migration adds atomic invoice editing with stock restoration and version snapshots.

Apply it to the Supabase project already configured by `stock-sparkle-invoice`. It preserves all existing rows and adds:

- owner, editor, accountant and viewer staff roles;
- RLS isolation between public content and private commercial records;
- vehicles, products, product images, services and articles;
- normalized customers linked to invoice snapshots;
- audit history;
- transactional invoice creation and stock adjustment.

The oldest existing Supabase user becomes the initial owner. New Auth sign-ups receive no staff access automatically.

## 2. Configure the Wadi environment

Copy the variable names from `.env.example` into `.env.local` and the deployment environment. Never expose the service-role or R2 secret keys with a `NEXT_PUBLIC_` prefix.

The public Supabase URL and publishable key can use the same values already configured in `stock-sparkle-invoice`.

## 3. Create the R2 media bucket

The `wadi-media` R2 bucket is active in Western Europe with a public `r2.dev` URL and browser-upload CORS for the production domain and local development. Connect `media.wadialawir.com` as its custom domain before public deployment, then replace `CLOUDFLARE_R2_PUBLIC_URL` with that URL.

The application should use a token scoped only to object read/write for this bucket. Do not retain an account-wide setup token in the application environment.

Apply the browser-upload CORS policy:

```powershell
npx wrangler r2 bucket cors set wadi-media --file cloudflare/r2-cors.json
npx wrangler r2 bucket cors list wadi-media
```

The admin uses five-minute presigned PUT URLs. R2 credentials remain server-side, and the completion endpoint verifies every object before registering it in Supabase.

## 4. Import the current catalogue

Inspect without making changes:

```powershell
npm run catalog:dry-run
```

After the migration is applied, import catalogue data while retaining current public image URLs:

```powershell
npm run catalog:import
```

After R2 is configured, import and upload original media:

```powershell
npm run catalog:import:r2
```

The importer upserts Wadi-owned records and never deletes invoices, customers, stock history or administrator-uploaded media. Existing stock items are matched by SKU or exact English name so their quantity and cost are retained. Four older stock records did not have unambiguous catalogue matches, so they remain preserved as internal-only stock instead of being guessed or deleted.

## 5. Verify before deployment

```powershell
npm run typecheck
npm run build
```

Then verify:

1. `/admin/login` accepts only the approved staff account.
2. A product edit changes both the public price and invoice stock item.
3. English and Arabic product HTML still contains the full server-rendered catalogue.
4. An R2 image upload appears in Media and on its attached product.
5. A test invoice decreases stock once and prints correctly.
6. Anonymous Supabase requests cannot read customers, invoices, stock, staff profiles or audit logs.

## Rollout order

1. Apply migration.
2. Configure Supabase variables in the Next.js environment.
3. Import catalogue and confirm `/admin` counts.
4. Configure R2 and upload/migrate media.
5. Run the build and browser verification.
6. Deploy the Next.js project.
7. Keep Sanity configured for one release as rollback protection, then remove it after the Supabase catalogue has been stable.
