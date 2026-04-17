# Sitemap Audit Report -- wadialawir.com

**Date:** 2026-04-05
**File:** `D:/Apps/WadiAlAwir/sitemap.xml`

---

## 1. XML Format and Validity

| Check | Result |
|-------|--------|
| XML declaration | PASS -- `<?xml version="1.0" encoding="UTF-8"?>` present |
| Namespace | PASS -- `xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"` correct |
| Well-formed XML | PASS -- proper open/close tags, no syntax errors |
| URL count | 26 URLs (well under 50,000 limit) |
| Sitemap index needed? | NO -- single file is sufficient at this scale |

**Verdict: PASS**

---

## 2. Product Coverage Analysis

**Products in `products.js`: 52**
**Product URLs in sitemap: 24** (plus 2 non-product pages = 26 total)

### Coverage: 46% -- CRITICAL GAP

### 32 Products MISSING from sitemap:

| # | Product ID | Category |
|---|-----------|----------|
| 1 | `car-mat-2ply-t2` | Accessory |
| 2 | `car-mat-t2` | Accessory |
| 3 | `central-control-pad` | Accessory |
| 4 | `dashcam-mirror-t2` | Accessory |
| 5 | `defender-headlights-t2` | Accessory |
| 6 | `defender-tail-lights-t2` | Accessory |
| 7 | `dubai-ambient-panel` | Accessory |
| 8 | `key-cover-t2` | Accessory |
| 9 | `original-brake-pad-t2` | Accessory |
| 10 | `original-spare-tire-cover` | Accessory |
| 11 | `rim-rox01-0389` | Rim |
| 12 | `rim-rox01-536` | Rim |
| 13 | `rim-rox01-m121` | Rim |
| 14 | `rim-rox01-m122` | Rim |
| 15 | `rim-rox01-yf5705` | Rim |
| 16 | `rim-t2-0319` | Rim |
| 17 | `rim-t2-0376` | Rim |
| 18 | `rim-t2-2112` | Rim |
| 19 | `rim-t2-3134` | Rim |
| 20 | `rim-t2-fc030` | Rim |
| 21 | `rim-t2-xf015` | Rim |
| 22 | `rim-t2-zs019` | Rim |
| 23 | `rox-01-badge-emblem` | Accessory |
| 24 | `rox-01-car-mat` | Accessory |
| 25 | `rox-01-number-plate-cover` | Accessory |
| 26 | `rox-01-rear-fender-liner` | Accessory |
| 27 | `window-tinting` | Service |
| 28 | `ppf` | Service |
| 29 | `ceramic-coating` | Service |
| 30 | `detailing` | Service |
| 31 | `accessories` | Service |
| 32 | `jetour-t2` | Service/Landing |
| 33 | `jetour-rox-01` | Service/Landing |

These 32 products are defined in `products.js` and render via `product.html?id=...` but Google has no way to discover them through the sitemap.

---

## 3. Phantom URLs (in sitemap but NOT in products.js)

**5 URLs reference product IDs that no longer exist in the codebase:**

| Product ID | Status |
|-----------|--------|
| `rear-spoiler-abs` | REMOVED from products.js |
| `rear-spoiler-wing` | REMOVED from products.js |
| `roof-light` | REMOVED from products.js |
| `side-ladder` | REMOVED from products.js |
| `side-storage-box` | REMOVED from products.js |

These were likely part of an earlier product set (sitemap was created at commit `157a631`) and the products were later removed without updating the sitemap. These URLs will either 404 or show a broken product page.

**Severity: HIGH -- Remove these 5 URLs immediately.**

---

## 4. lastmod Dates

| Issue | Detail |
|-------|--------|
| All 26 URLs use identical date | `2026-04-03` |
| Actual last sitemap commit | `157a631` (much earlier) |
| Latest code commit | `417a778` on or around 2026-04-03 |

**Finding:** Every single URL has the same `lastmod` value. This is a weak signal to Google -- it provides no useful information about which pages actually changed. When all dates are identical, Google may ignore `lastmod` entirely.

**Recommendation:** Use real modification dates. At minimum, use the date each product was added to `products.js`. For the homepage and products listing, use the date of the most recent content change.

**Severity: LOW** (does not cause errors, but wastes a ranking signal)

---

## 5. priority and changefreq Tags

| Tag | Present | Google's stance |
|-----|---------|----------------|
| `priority` | YES (1.0, 0.9, 0.8) | **Ignored by Google since 2018** |
| `changefreq` | YES (on 2 URLs) | **Ignored by Google since 2018** |

Both `priority` and `changefreq` are officially ignored by Google. They add XML bloat without any SEO benefit. Removing them simplifies maintenance.

**Severity: INFO -- safe to remove, no impact either way.**

---

## 6. Missing Non-Product Pages

The sitemap includes:
- Homepage (`/`) -- PRESENT
- Products listing (`/products.html`) -- PRESENT
- `product.html` (individual pages) -- PARTIALLY present

Pages that may exist but are NOT in the sitemap:
- No other HTML files found in the root (`index.html`, `product.html`, `products.html` are the only .html files).
- Service pages (`window-tinting`, `ppf`, `ceramic-coating`, `detailing`) exist as product entries but are missing from the sitemap (see Section 2).

**Verdict:** The site has a simple 3-template structure. The main gap is the 32 missing product/service URLs, not missing page templates.

---

## 7. Summary

| Check | Severity | Status |
|-------|----------|--------|
| XML validity | Critical | PASS |
| URL count < 50k | Critical | PASS (26 URLs) |
| Sitemap index needed | -- | NO |
| Product coverage | Critical | FAIL -- 32 of 52 products missing (46% coverage) |
| Phantom/dead URLs | High | FAIL -- 5 removed products still listed |
| Non-200 URLs (phantom) | High | 5 URLs likely return errors |
| lastmod accuracy | Low | WARN -- all dates identical |
| priority/changefreq | Info | Present but ignored by Google |
| Missing pages | Medium | Services not indexed |

---

## 8. Recommended Fixed Sitemap

The sitemap should be regenerated to include all 52 products from `products.js`, remove the 5 phantom IDs, drop `priority`/`changefreq`, and use only `loc` + `lastmod`. The total URL count would be 54 (homepage + products listing + 52 product pages).

### URLs to ADD (32):

```
https://wadialawir.com/product.html?id=car-mat-2ply-t2
https://wadialawir.com/product.html?id=car-mat-t2
https://wadialawir.com/product.html?id=central-control-pad
https://wadialawir.com/product.html?id=dashcam-mirror-t2
https://wadialawir.com/product.html?id=defender-headlights-t2
https://wadialawir.com/product.html?id=defender-tail-lights-t2
https://wadialawir.com/product.html?id=dubai-ambient-panel
https://wadialawir.com/product.html?id=key-cover-t2
https://wadialawir.com/product.html?id=original-brake-pad-t2
https://wadialawir.com/product.html?id=original-spare-tire-cover
https://wadialawir.com/product.html?id=rim-rox01-0389
https://wadialawir.com/product.html?id=rim-rox01-536
https://wadialawir.com/product.html?id=rim-rox01-m121
https://wadialawir.com/product.html?id=rim-rox01-m122
https://wadialawir.com/product.html?id=rim-rox01-yf5705
https://wadialawir.com/product.html?id=rim-t2-0319
https://wadialawir.com/product.html?id=rim-t2-0376
https://wadialawir.com/product.html?id=rim-t2-2112
https://wadialawir.com/product.html?id=rim-t2-3134
https://wadialawir.com/product.html?id=rim-t2-fc030
https://wadialawir.com/product.html?id=rim-t2-xf015
https://wadialawir.com/product.html?id=rim-t2-zs019
https://wadialawir.com/product.html?id=rox-01-badge-emblem
https://wadialawir.com/product.html?id=rox-01-car-mat
https://wadialawir.com/product.html?id=rox-01-number-plate-cover
https://wadialawir.com/product.html?id=rox-01-rear-fender-liner
https://wadialawir.com/product.html?id=window-tinting
https://wadialawir.com/product.html?id=ppf
https://wadialawir.com/product.html?id=ceramic-coating
https://wadialawir.com/product.html?id=detailing
https://wadialawir.com/product.html?id=accessories
https://wadialawir.com/product.html?id=jetour-t2
https://wadialawir.com/product.html?id=jetour-rox-01
```

### URLs to REMOVE (5):

```
https://wadialawir.com/product.html?id=rear-spoiler-abs
https://wadialawir.com/product.html?id=rear-spoiler-wing
https://wadialawir.com/product.html?id=roof-light
https://wadialawir.com/product.html?id=side-ladder
https://wadialawir.com/product.html?id=side-storage-box
```

---

## 9. Quality Gate Assessment

Total product pages: 52 (after fix). These are product pages with unique specs, images, and pricing -- NOT location/doorway pages. This falls into the "Safe at Scale" category for product pages with unique content.

No location page concerns apply.
