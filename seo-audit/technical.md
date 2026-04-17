# Technical SEO Audit -- wadialawir.com

**Date:** 2026-04-05  
**Auditor:** Automated (Claude Opus 4.6)  
**Site type:** Static vanilla HTML/CSS/JS on Vercel  
**Pages:** index.html, products.html, product.html (query-param routing)

---

## Overall Technical Score: 58 / 100

| Category | Status | Score |
|---|---|---|
| Crawlability | PASS (with issues) | 6/10 |
| Indexability | FAIL | 3/10 |
| Security | PASS | 8/10 |
| URL Structure | WARN | 5/10 |
| Mobile | PASS | 8/10 |
| Core Web Vitals (source) | WARN | 6/10 |
| Structured Data | PASS (with issues) | 7/10 |
| JavaScript Rendering | FAIL | 4/10 |
| IndexNow | FAIL | 0/10 |

---

## CRITICAL Issues

### 1. Product pages are entirely JavaScript-rendered -- invisible to most crawlers

**Severity:** CRITICAL  
**Category:** JavaScript Rendering / Indexability

The `product.html` page ships with **empty** meta tags in the HTML source:

```html
<title>Loading... | Wadi Al Awir Car Accessories</title>
<meta name="description" content="">
<link rel="canonical" href="">
<meta property="og:title" content="">
<meta property="og:description" content="">
<meta property="og:image" content="">
```

All SEO-critical content (title, description, canonical, OG tags, product schema, breadcrumb schema, product name, price, images) is injected by JavaScript at runtime. Googlebot can execute JS, but:

- The initial HTML response carries **zero meaningful content** for any crawler.
- Social media crawlers (Facebook, Twitter, WhatsApp, Telegram) do NOT execute JS. Every shared product link will show "Loading..." with no image or description.
- Bing, Yandex, Baidu, and most non-Google crawlers have limited or no JS rendering.
- Even Googlebot's rendering queue introduces delays of hours to weeks before content is indexed.
- The product schema JSON-LD starts as `{}` -- invalid structured data in the raw HTML.

**Fix:** Implement server-side rendering or pre-rendering. Options for a static Vercel site:
1. **Pre-render at build time:** Generate a static `product-[id].html` for each product using a build script. Each file has full meta tags, canonical, schema, and initial HTML baked in.
2. **Vercel Edge Functions:** Use an edge middleware to inject meta tags into the HTML based on the `?id=` param before returning to the client.
3. **At minimum:** Use a pre-rendering service (e.g., Prerender.io) and configure Vercel rewrites to serve pre-rendered HTML to bot user agents.

---

### 2. Sitemap contains 5 dead product URLs (IDs not in products.js)

**Severity:** CRITICAL  
**Category:** Crawlability / Indexability

The following product IDs exist in `sitemap.xml` but do NOT exist in `js/products.js`. These URLs will render a "product not found" state via JS, but return HTTP 200 to crawlers:

| Sitemap URL | Status |
|---|---|
| `product.html?id=rear-spoiler-wing` | ID not found in products.js |
| `product.html?id=rear-spoiler-abs` | ID not found in products.js |
| `product.html?id=side-ladder` | ID not found in products.js |
| `product.html?id=side-storage-box` | ID not found in products.js |
| `product.html?id=roof-light` | ID not found in products.js |

These are **soft 404s** -- the server returns 200, but the page has no real content. Google may flag these in Search Console.

**Fix:** Either:
- Add these products back to `products.js`, or
- Remove these URLs from `sitemap.xml` and add proper 404/redirect handling.

---

### 3. Sitemap is missing 26 product URLs that exist in products.js

**Severity:** CRITICAL  
**Category:** Crawlability

The sitemap lists 24 product URLs. The `products.js` file contains 48 actual products (excluding car models and service entries). The following 26 products are NOT in the sitemap:

| Missing from Sitemap |
|---|
| central-control-pad |
| car-mat-2ply-t2 |
| car-mat-t2 |
| rox-01-car-mat |
| dubai-ambient-panel |
| original-spare-tire-cover |
| key-cover-t2 |
| dashcam-mirror-t2 |
| defender-headlights-t2 |
| defender-tail-lights-t2 |
| rox-01-rear-fender-liner |
| rox-01-badge-emblem |
| rim-t2-2112 |
| rim-t2-zs019 |
| rim-t2-3134 |
| rim-t2-0376 |
| rim-t2-0319 |
| rim-t2-xf015 |
| rim-t2-fc030 |
| rim-rox01-yf5705 |
| rim-rox01-536 |
| rim-rox01-m121 |
| rim-rox01-m122 |
| rim-rox01-0389 |
| rox-01-number-plate-cover |
| original-brake-pad-t2 |

**Fix:** Regenerate `sitemap.xml` from the PRODUCTS array in `products.js`. Automate this as a build step so they never drift again.

---

## HIGH Issues

### 4. products.html is missing a canonical tag

**Severity:** HIGH  
**Category:** Indexability

The `products.html` page has no `<link rel="canonical">` tag at all. The `index.html` has one correctly set to `https://wadialawir.com/`. The `product.html` has an empty canonical that is filled by JS (see Critical issue #1).

**Fix:** Add to `products.html` head:
```html
<link rel="canonical" href="https://wadialawir.com/products.html">
```

### 5. products.html is missing Open Graph and Twitter Card meta tags

**Severity:** HIGH  
**Category:** Indexability / Social Sharing

The `products.html` page has no OG or Twitter meta tags. When shared on social media, it will show a generic preview with no image.

**Fix:** Add OG and Twitter Card meta tags to `products.html`.

### 6. OG image path points to nonexistent file

**Severity:** HIGH  
**Category:** Indexability / Social Sharing

`index.html` references `assets/og/og-image.jpg` for the OG image, but the `assets/og/` directory does not exist. The OG image will be a broken link on all social platforms.

**Fix:** Create an OG image at `assets/og/og-image.jpg` (recommended size: 1200x630px).

### 7. www redirect uses 307 (Temporary) instead of 301 (Permanent)

**Severity:** HIGH  
**Category:** URL Structure / Redirects

```
https://www.wadialawir.com/ --> 307 Temporary Redirect --> https://wadialawir.com/
```

A 307 does not pass full link equity to the canonical URL. Search engines treat temporary redirects differently from permanent ones.

**Fix:** Configure the Vercel redirect (via `vercel.json`) to use a 301 or 308 permanent redirect:
```json
{
  "redirects": [
    { "source": "/(.*)", "has": [{ "type": "host", "value": "www.wadialawir.com" }], "destination": "https://wadialawir.com/$1", "permanent": true }
  ]
}
```

### 8. No vercel.json configuration file

**Severity:** HIGH  
**Category:** Security / URL Structure

There is no `vercel.json` file. This means:
- No custom security headers (X-Content-Type-Options, X-Frame-Options, Content-Security-Policy, Referrer-Policy, Permissions-Policy)
- No custom redirect rules
- No custom 404 page
- No cache control for static assets

**Fix:** Create a `vercel.json` with security headers and redirect rules. See recommendation in the Security section below.

### 9. Image URLs contain spaces and special characters

**Severity:** HIGH  
**Category:** URL Structure / Crawlability

Product image paths contain spaces and special characters, for example:
```
shop-front.webp (FIXED - renamed from "shop front.webp")
4Pcs Mud guard Fit for JETOUR T2 Front and Rear Splash Guards/71kuuco8CqL._AC_SL1500_.jpg
```

Spaces in URLs cause encoding issues, break some crawlers, and create inconsistent URLs. The schema.org image URL has been fixed to `https://wadialawir.com/shop-front.webp`.

**Fix:** Rename all directories and files to use hyphens instead of spaces. Update all references in `products.js` and HTML files.

---

## MEDIUM Issues

### 10. No custom 404 page

**Severity:** MEDIUM  
**Category:** Crawlability / UX

Requesting a nonexistent path (e.g., `/nonexistent-page`) returns Vercel's default 404 response (`text/plain`, 79 bytes). There is no branded 404 page to help users navigate back.

Additionally, `product.html?id=nonexistent` returns HTTP 200 (soft 404). Googlebot cannot distinguish this from a real product page in the raw HTML.

**Fix:**
1. Create a `404.html` page with navigation back to the homepage.
2. For invalid product IDs, consider using a `<meta name="robots" content="noindex">` tag injected by JS when the product is not found (though this still has the JS-rendering problem).

### 11. All JS files loaded synchronously and render-blocking

**Severity:** MEDIUM  
**Category:** Core Web Vitals (LCP)

Six JS files are loaded at the bottom of `index.html` without `async` or `defer`:

| File | Size |
|---|---|
| js/thumb-map.js | 9.6 KB |
| js/products.js | 67.8 KB |
| js/whatsapp.js | 8.0 KB |
| js/gallery.js | 4.9 KB |
| js/main.js | 23.8 KB |
| js/haptics.js | 4.6 KB |
| **Total** | **118.7 KB** |

While placing scripts at the bottom mitigates render-blocking, the 118 KB of unminified JS still adds parsing time. The `products.js` file at 68 KB contains all product data inline, loaded on every page.

**Fix:**
- Add `defer` to all script tags.
- Minify all JS files (can save 30-50% on products.js).
- Consider lazy-loading `products.js` data or splitting it.

### 12. Google Fonts render-blocking CSS

**Severity:** MEDIUM  
**Category:** Core Web Vitals (LCP)

Four font families are loaded via a single Google Fonts CSS link:
```
Aref Ruqaa (400, 700) + Bebas Neue + Cairo (400, 600, 700) + Plus Jakarta Sans (400, 500, 600, 700)
```

This is a render-blocking stylesheet that loads ~13 font files. This directly impacts LCP.

**Fix:**
- Use `font-display: swap` (already set via `&display=swap` -- good).
- Consider self-hosting fonts and using `preload` for critical font files.
- Evaluate if all four families are necessary; reducing to two would cut load time.

### 13. No lang="ar" support or hreflang tags

**Severity:** MEDIUM  
**Category:** Indexability / International

The site has bilingual content (English and Arabic) controlled by JS, but:
- The HTML `lang` attribute is always `en`.
- There are no `hreflang` tags for language variants.
- The `dir="ltr"` attribute does not change for Arabic content.

Google cannot determine that Arabic content exists or serve the correct language to Arabic-speaking users.

**Fix:** If Arabic is a supported language, implement `hreflang` tags or consider separate URL paths (`/ar/`) for Arabic content.

### 14. CSS file is unminified at 49 KB

**Severity:** MEDIUM  
**Category:** Core Web Vitals (LCP)

`css/styles.css` is 49 KB unminified. Minification could reduce this by 20-30%.

**Fix:** Add a CSS minification step to the build/deploy process.

### 15. No `Cache-Control` for static assets

**Severity:** MEDIUM  
**Category:** Core Web Vitals

The homepage returns `Cache-Control: public, max-age=0, must-revalidate`. While Vercel handles this at the edge, there are no explicit cache headers for static assets like images, CSS, and JS. Browser caching is left to Vercel defaults.

**Fix:** Configure asset caching in `vercel.json`:
```json
{
  "headers": [
    { "source": "/assets/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] },
    { "source": "/(.*\\.js)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] },
    { "source": "/(.*\\.css)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] }
  ]
}
```

---

## LOW Issues

### 16. Missing security headers

**Severity:** LOW  
**Category:** Security

Current headers from Vercel:
- `Strict-Transport-Security: max-age=63072000` -- PASS (Vercel default, good)
- `Access-Control-Allow-Origin: *` -- WARN (overly permissive but acceptable for a public site)

Missing headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Content-Security-Policy`
- `Referrer-Policy`
- `Permissions-Policy`

**Fix:** Add these via `vercel.json` headers configuration.

### 17. HTTP to HTTPS uses 308 redirect -- acceptable

**Severity:** LOW (informational)  
**Category:** Security

```
http://wadialawir.com/ --> 308 Permanent Redirect --> https://wadialawir.com/
```

This is correct behavior. 308 preserves the request method and is a permanent redirect. No action needed.

### 18. No IndexNow implementation

**Severity:** LOW  
**Category:** IndexNow

The site does not implement IndexNow protocol for Bing, Yandex, or Naver. For a small static site this is low priority, but could speed up indexing of new products.

**Fix:** Add an IndexNow API key file and submit URLs when products change.

### 19. Schema.org image URL contains a space

**Severity:** LOW  
**Category:** Structured Data

In the LocalBusiness schema on `index.html`:
```json
"image": "https://wadialawir.com/shop-front.webp"
```

This URL contains a space and should be percent-encoded or the file renamed.

**Fix:** Rename the file to `shop-front.webp` and update all references.

### 20. Breadcrumb schema links to anchor instead of page

**Severity:** LOW  
**Category:** Structured Data

The breadcrumb schema on product pages sets position 2 (Products) to:
```
https://wadialawir.com/#products
```

The products listing page is `products.html`, not an anchor on the homepage. This creates a mismatch between the breadcrumb schema and the actual page structure.

**Fix:** Change to `https://wadialawir.com/products.html`.

---

## Summary by Category

### 1. Crawlability -- 6/10
- PASS: robots.txt exists, allows all crawlers, points to sitemap
- PASS: Sitemap is valid XML, served with correct `application/xml` content type
- FAIL: Sitemap has 5 dead URLs pointing to products that no longer exist
- FAIL: Sitemap is missing 26 of 48 products (54% coverage)
- WARN: No AI crawler management rules (GPTBot, ClaudeBot, etc.) in robots.txt

### 2. Indexability -- 3/10
- PASS: index.html has proper canonical
- FAIL: product.html canonical is empty in source HTML, set only by JS
- FAIL: products.html has no canonical tag at all
- FAIL: Product pages return 200 for invalid IDs (soft 404)
- FAIL: All product page content is JS-rendered (title, description, schema all empty in source)

### 3. Security -- 8/10
- PASS: HTTPS enforced with 308 redirect from HTTP
- PASS: HSTS enabled with 2-year max-age
- WARN: Missing X-Content-Type-Options, X-Frame-Options, CSP, Referrer-Policy
- INFO: No vercel.json to configure custom headers

### 4. URL Structure -- 5/10
- PASS: Clean base URLs (index.html, products.html)
- WARN: Query parameter routing for products (`?id=`) is not ideal for SEO; path-based URLs are preferred
- WARN: www to non-www redirect uses 307 instead of 301/308
- FAIL: Image URLs contain spaces and special characters

### 5. Mobile -- 8/10
- PASS: Viewport meta tag present on all pages: `width=device-width, initial-scale=1`
- PASS: `theme-color` meta tag set
- PASS: Responsive CSS with mobile-specific styles
- INFO: Touch target sizing cannot be fully validated from source alone

### 6. Core Web Vitals (Source Analysis) -- 6/10
- LCP concerns: Render-blocking Google Fonts CSS, unminified 49 KB CSS, large unminified JS bundle
- INP concerns: 118 KB of synchronous JS must parse before interactivity; haptics.js adds event listeners
- CLS concerns: Product images loaded without explicit width/height on main image may cause layout shift; font swap could cause FOIT/FOUT

### 7. Structured Data -- 7/10
- PASS: LocalBusiness (AutoPartsStore) schema on homepage with address, geo, ratings, opening hours
- PASS: WebSite schema on homepage
- PASS: ItemList schema on homepage
- PASS: Product schema generated per product page (but only via JS)
- PASS: BreadcrumbList schema on product pages (but only via JS)
- WARN: Product schema starts as `{}` in raw HTML -- invalid until JS executes
- WARN: Image URL in LocalBusiness schema contains a space

### 8. JavaScript Rendering -- 4/10
- FAIL: Product pages are 100% client-side rendered for all SEO-critical content
- FAIL: Empty title ("Loading..."), empty canonical, empty description, empty OG tags in source
- FAIL: Schema JSON-LD starts as empty `{}` in source
- INFO: Homepage and products page have server-rendered HTML with proper meta tags

### 9. IndexNow -- 0/10
- Not implemented

---

## Prioritized Action Plan

| Priority | Action | Impact | Effort |
|---|---|---|---|
| 1 | Pre-render product pages or add SSR for meta tags/schema | Fixes indexability for 48 product URLs | High |
| 2 | Fix sitemap: remove 5 dead URLs, add 26 missing products | Enables crawling of all products | Low |
| 3 | Add canonical tag to products.html | Prevents duplicate content issues | Low |
| 4 | Create vercel.json with 301 redirects, security headers, cache rules | Fixes www redirect, adds security headers | Medium |
| 5 | Add OG/Twitter tags to products.html, create OG image file | Fixes social sharing | Low |
| 6 | Rename files/dirs with spaces to use hyphens | Fixes URL encoding issues | Medium |
| 7 | Minify CSS and JS files | Improves LCP and INP | Low |
| 8 | Add defer to script tags | Reduces parse blocking | Low |
| 9 | Create custom 404.html | Improves UX for dead links | Low |
| 10 | Self-host critical fonts with preload | Reduces LCP | Medium |

---

## Files Examined

- `D:/Apps/WadiAlAwir/robots.txt`
- `D:/Apps/WadiAlAwir/sitemap.xml`
- `D:/Apps/WadiAlAwir/index.html`
- `D:/Apps/WadiAlAwir/products.html`
- `D:/Apps/WadiAlAwir/product.html`
- `D:/Apps/WadiAlAwir/js/products.js`
- `D:/Apps/WadiAlAwir/js/main.js`
- `D:/Apps/WadiAlAwir/css/styles.css`

## Live Endpoints Tested

- `https://wadialawir.com/` -- 200 OK
- `https://wadialawir.com/robots.txt` -- 200 OK
- `https://wadialawir.com/sitemap.xml` -- 200 OK (application/xml)
- `http://wadialawir.com/` -- 308 redirect to HTTPS (correct)
- `https://www.wadialawir.com/` -- 307 redirect to non-www (should be 301/308)
- `https://wadialawir.com/nonexistent-page` -- 404 (Vercel default, no custom page)
- `https://wadialawir.com/product.html?id=nonexistent` -- 200 (soft 404, problem)
