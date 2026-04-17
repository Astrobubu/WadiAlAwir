# Performance Audit: wadialawir.com

**Date:** 2026-04-05
**Site type:** Static vanilla HTML/CSS/JS on Vercel (no build system, no framework)
**Pages analyzed:** index.html, products.html, product.html

---

## 1. Resource Inventory

### CSS
| File | Size (raw) | Lines |
|------|-----------|-------|
| css/styles.css | 48.9 KB | 2,696 |
| Inline `<style>` in products.html | ~2 KB | ~100 |
| Inline `<style>` in product.html | ~6 KB | ~230 |

**Total CSS:** ~57 KB unminified. Served as a single monolithic file to all three pages.

### JavaScript (all synchronous, parser-blocking)
| File | Size (raw) | Lines | Purpose |
|------|-----------|-------|---------|
| js/thumb-map.js | 9.8 KB | 3 | Thumbnail hash map (single minified line) |
| js/products.js | 69.4 KB | 1,339 | Product data + rendering |
| js/whatsapp.js | 8.2 KB | 193 | WhatsApp URL builder |
| js/gallery.js | 5.0 KB | 154 | Lightbox modal |
| js/main.js | 24.3 KB | 624 | i18n, nav, cart, animations |
| js/haptics.js | 4.7 KB | 176 | Vibration feedback |

**Total JS:** 121.4 KB unminified. All loaded synchronously at end of `<body>`.

### Third-party resources (render path)
| Resource | Type | Blocking? |
|----------|------|-----------|
| Google Analytics (gtag.js) | Script (async) | No -- loaded async |
| Google Fonts CSS | Stylesheet | **YES -- render-blocking** |
| Google Fonts WOFF2 files | Font files | Loaded after CSS parse |

### Images
- **120 product images** totaling 15.6 MB across product folders
- **82 thumbnails** in assets/thumbs/ totaling ~1 MB (JPEG, 4-13 KB each)
- **Hero wallpaper:** 587 KB JPEG, 1920x1080, progressive -- loaded via CSS `background-image`
- **favicon.png:** 240 KB (extremely large for a favicon)
- Product images: mostly JPEG/WebP, largest is 1 MB (brake caliper PNG)
- No `<img>` width/height attributes on JS-rendered product cards
- Product card images use `loading="lazy"` (good)
- Car card images use `loading="lazy"` (good)

### Fonts (4 families, 10 total weights)
```
Aref Ruqaa: 400, 700        (Arabic display)
Bebas Neue: 400              (English display headings)
Cairo: 400, 600, 700         (Arabic body)
Plus Jakarta Sans: 400, 500, 600, 700  (English body)
```
All loaded via a single render-blocking `<link>` tag with `display=swap`.

---

## 2. Estimated Core Web Vitals

### LCP (Largest Contentful Paint) -- ESTIMATED: 3.0-4.5s (Needs Improvement to Poor)

**LCP element:** Hero section background image (`hero-wallpaper-4.jpg`, 587 KB)

**LCP waterfall bottleneck chain:**
1. HTML downloaded
2. CSS file parsed -- discovers `background-image: url(hero-wallpaper-4.jpg)`
3. Google Fonts CSS fetched (render-blocking) -- delays first paint
4. Google Fonts WOFF2 files fetched
5. Hero image download starts only after CSS is fully parsed (late discovery)
6. Hero image renders

**Key problems:**
- Hero image is referenced in CSS, not HTML -- the browser cannot discover it during HTML preload scanning. This adds at least one full round-trip of latency.
- No `<link rel="preload">` for the hero image.
- Google Fonts stylesheet is render-blocking. The browser cannot paint anything until all 4 font families' CSS is downloaded and parsed.
- 587 KB JPEG hero (1920x1080) is not served in modern format (WebP/AVIF would be ~60% smaller).
- No responsive image sizing -- mobile downloads the full 1920px image.

### INP (Interaction to Next Paint) -- ESTIMATED: 100-180ms (Good)

**Likely good because:**
- No heavy framework (React, Vue, etc.) -- vanilla JS with simple event handlers
- Event delegation is used for most click handlers (haptics.js, main.js)
- No complex state management or virtual DOM diffing
- Product rendering is straightforward DOM string concatenation
- All event listeners use `{ passive: true }` where appropriate

**Minor concerns:**
- `renderProducts()` rebuilds the entire product grid via innerHTML on every filter change. With 20+ products this creates a brief main thread task.
- `setLanguage()` triggers full re-render of car models, products, and services simultaneously.
- Cart drawer re-render uses innerHTML with inline onclick handlers.

### CLS (Cumulative Layout Shift) -- ESTIMATED: 0.05-0.15 (Good to Needs Improvement)

**Good practices already in place:**
- CSS `aspect-ratio` set on product card images (4/3) and car card images (16/10)
- `display=swap` on Google Fonts (prevents invisible text, but causes layout shift when font swaps)
- Hero section has fixed `height: 100vh`

**CLS risk areas:**
- **Font swap shifts:** 4 Google Font families with `display=swap` means 4 potential FOUT events. When Plus Jakarta Sans loads and replaces the system font, text reflows throughout the page.
- **JS-rendered content:** Car models grid, product grid, services grid, and filter buttons are all empty containers until JS executes. When products.js renders 6-8 product cards into `#product-grid`, the page height jumps significantly.
- **Google Maps iframe** in the location section has no explicit height in HTML (relies on CSS).
- **Product card images** rendered by JS lack explicit width/height attributes (they rely on CSS aspect-ratio, which is acceptable but less robust).

---

## 3. Detailed Findings

### CRITICAL: Render-Blocking Google Fonts (Impact: High)

The Google Fonts `<link>` tag on line 44 of index.html is render-blocking:
```html
<link href="https://fonts.googleapis.com/css2?family=Aref+Ruqaa:wght@400;700&family=Bebas+Neue&family=Cairo:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

This single request fetches CSS for 4 font families (10 weights), which then triggers downloads of ~10 WOFF2 files. The browser blocks **all rendering** until this CSS is downloaded and parsed. On a 3G connection in Dubai, this alone can add 1-2 seconds to First Contentful Paint.

**Recommendation:** Self-host the fonts or use `<link rel="preload">` with a font-display strategy. Better yet, reduce to 2 font families (one Arabic, one English).

### CRITICAL: Hero Image Not Preloaded (Impact: High)

The hero background image (587 KB) is referenced only in CSS (`background-image`), making it invisible to the browser's preload scanner. The browser discovers it only after:
1. Downloading the HTML
2. Downloading and parsing styles.css (49 KB)
3. Then starting the image download

**Recommendation:** Add `<link rel="preload" as="image" href="assets/hero-wallpaper-4.jpg">` to `<head>`. Better yet, convert to an `<img>` tag in HTML with `fetchpriority="high"`, or at minimum convert to WebP/AVIF (~200-250 KB).

### HIGH: Monolithic CSS File (Impact: Medium)

`styles.css` at 49 KB unminified contains styles for all three pages: homepage sections, product listing page, individual product page, lightbox, cart drawer, animations, and all responsive breakpoints. Every page downloads CSS it does not need.

**Estimated savings from minification:** ~30% = ~15 KB saved (to ~34 KB).
**Estimated savings from code-splitting:** Homepage needs ~60% of the CSS. Product page needs ~50%.

**Recommendation:**
1. **Immediate:** Minify the CSS (cssnano or clean-css). No build system needed -- a one-time CLI command.
2. **Medium-term:** Extract critical above-the-fold CSS (~5 KB) and inline it in `<head>`. Load the rest with `media="print" onload="this.media='all'"`.

### HIGH: Synchronous Script Loading (Impact: Medium)

All 6 JS files are loaded as synchronous `<script>` tags at the end of `<body>`:
```html
<script src="js/thumb-map.js"></script>
<script src="js/products.js"></script>
<script src="js/whatsapp.js"></script>
<script src="js/gallery.js"></script>
<script src="js/main.js"></script>
<script src="js/haptics.js"></script>
```

While placing them at the end of body prevents them from blocking HTML parsing, they still:
- Execute sequentially (6 separate HTTP requests with no parallelization benefit from `defer`)
- Block the DOMContentLoaded event
- Block interactive time while 121 KB of JS is parsed and executed

**Recommendation:**
1. Add `defer` attribute to all scripts. This allows parallel download during HTML parsing.
2. `gallery.js` and `haptics.js` are not needed on initial paint -- they could be loaded lazily.
3. Concatenate + minify into a single file to reduce HTTP overhead (~121 KB raw -> ~60 KB minified -> ~18 KB gzipped).

### HIGH: products.js Contains All Product Data (Impact: Medium)

`products.js` is 69 KB -- the largest JS file -- because it embeds all product data (20+ products with bilingual names, descriptions, features, and image paths) directly in the source. Every page loads this, even if it only needs one product.

On the homepage, only 8 featured products are rendered, but all 20+ products' data is downloaded and parsed.

**Recommendation:**
1. Extract product data to a separate JSON file loaded on demand.
2. Or, for the product detail page, pass the product ID to a smaller JS file that fetches only that product's data.

### MEDIUM: No Image Optimization Pipeline (Impact: Medium)

- **120 images at 15.6 MB total** -- served as original uploads (Amazon product photos)
- Largest image: 1 MB PNG (brake caliper cover with transparency)
- Many product images are 200-350 KB JPEG at resolutions far larger than displayed size
- Hero image: 587 KB JPEG at 1920x1080 -- no responsive variants
- **Thumbnails are pre-generated** (82 files, ~1 MB total, 4-13 KB each) -- this is good
- No `srcset` or `<picture>` elements for responsive images
- Product images in lightbox/gallery load full-resolution originals

**Recommendation:**
1. Convert all images to WebP (lossy, quality 80). Expected savings: 40-60%.
2. Generate responsive variants (400px, 800px, 1200px widths).
3. Use `srcset` on product card images.
4. For the hero image specifically: create a 640px-wide mobile variant (~80 KB) and a WebP version (~200 KB).

### MEDIUM: Oversized Favicon (Impact: Low-Medium)

`favicon.png` is 240 KB. A favicon should be under 10 KB. This file loads on every page navigation.

**Recommendation:** Resize to 32x32 PNG (~1-2 KB) and add a 192x192 variant for PWA/bookmark icons. The existing `favicon.svg` (tracked in git) could be used instead for modern browsers.

### MEDIUM: 4 Google Font Families, 10 Weights (Impact: Medium)

Loading 4 font families is excessive:
- **Aref Ruqaa** (400, 700) -- Arabic display headings
- **Cairo** (400, 600, 700) -- Arabic body text
- **Bebas Neue** (400) -- English display headings
- **Plus Jakarta Sans** (400, 500, 600, 700) -- English body text

Each font family requires a separate WOFF2 download. Arabic fonts are particularly large because they contain extensive character sets.

**Recommendation:**
1. **Reduce weights:** Plus Jakarta Sans 500 can likely be dropped. Cairo 600 can likely be dropped.
2. **Consider reducing families:** Use Cairo for both Arabic display and body (drop Aref Ruqaa). That saves one entire font family.
3. **Self-host fonts** to eliminate the render-blocking Google Fonts CSS request and gain caching control.
4. **Use `font-display: optional`** for secondary fonts (Aref Ruqaa, Bebas Neue) to prevent layout shifts entirely for decorative fonts.

### LOW: No HTTP Caching Headers (Vercel Default)

Vercel provides default caching, but static assets (CSS, JS, images) would benefit from explicit `Cache-Control` headers in `vercel.json`. Since there is no build system generating hashed filenames, cache-busting must be done manually.

**Recommendation:** Add a `vercel.json` with aggressive caching for images:
```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    },
    {
      "source": "/css/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=86400" }]
    }
  ]
}
```

### LOW: Google Maps Iframe Loaded Eagerly on Homepage

The Google Maps embed iframe in the location section loads eagerly (it does have `loading="lazy"` -- good). However, the iframe still downloads ~200-500 KB of Google Maps resources when it enters the viewport. For users who never scroll to the bottom, this is wasted bandwidth.

**Status:** Already has `loading="lazy"` -- acceptable.

---

## 4. Prioritized Recommendations

### Priority 1: Quick Wins (< 1 hour each, high impact)

| # | Action | Expected Impact | Effort |
|---|--------|----------------|--------|
| 1 | Add `<link rel="preload" as="image" href="assets/hero-wallpaper-4.jpg">` to index.html `<head>` | LCP -0.5-1.0s | 1 min |
| 2 | Convert hero image to WebP (587 KB -> ~200 KB) | LCP -0.3-0.5s | 5 min |
| 3 | Add `defer` to all 6 `<script>` tags | TTI improvement, faster DOMContentLoaded | 2 min |
| 4 | Shrink favicon.png from 240 KB to <10 KB | Saves 230 KB per page load | 5 min |
| 5 | Minify styles.css (one-time: `npx clean-css-cli css/styles.css -o css/styles.min.css`) | ~15 KB saved | 5 min |
| 6 | Minify JS files (one-time: `npx terser js/products.js -o js/products.min.js`) | ~60 KB total savings | 15 min |

### Priority 2: Medium Effort (1-4 hours, medium-high impact)

| # | Action | Expected Impact | Effort |
|---|--------|----------------|--------|
| 7 | Self-host Google Fonts (download WOFF2, serve locally) | Eliminates render-blocking third-party request, LCP -0.3-0.8s | 2 hrs |
| 8 | Inline critical CSS (~5 KB) in `<head>`, defer the rest | FCP -0.5-1.0s | 2 hrs |
| 9 | Convert product images to WebP, generate responsive sizes | Total payload reduction ~8-10 MB | 3 hrs |
| 10 | Reduce font families from 4 to 2-3, drop unused weights | Saves 100-200 KB of font downloads | 1 hr |

### Priority 3: Architectural (4+ hours, significant long-term impact)

| # | Action | Expected Impact | Effort |
|---|--------|----------------|--------|
| 11 | Extract product data from products.js to a JSON endpoint or static JSON files | Reduces JS parse time on all pages | 4 hrs |
| 12 | Implement a simple build step (concatenate + minify CSS/JS, hash filenames) | Enables aggressive caching, reduces requests | 4 hrs |
| 13 | Add `srcset` responsive images to product cards | Saves bandwidth on mobile (50%+ reduction) | 4 hrs |
| 14 | Pre-render product cards as static HTML (SSG approach) | Eliminates CLS from JS-rendered content | 8 hrs |

---

## 5. Estimated Scores After Priority 1 Fixes

| Metric | Current Estimate | After P1 Fixes | Target |
|--------|-----------------|----------------|--------|
| LCP | 3.0-4.5s | 2.0-3.0s | <=2.5s |
| INP | 100-180ms | 80-150ms | <=200ms |
| CLS | 0.05-0.15 | 0.05-0.12 | <=0.1 |
| Lighthouse Performance | ~45-60 | ~65-75 | 90+ |

After Priority 1 + 2 fixes, LCP should reach the "Good" threshold (<=2.5s) and Lighthouse should be in the 80-90 range.

---

## 6. Summary

The site's biggest performance problems are:

1. **Late-discovered hero image** -- referenced only in CSS, no preload hint, 587 KB JPEG
2. **Render-blocking Google Fonts** -- 4 families, 10 weights, single blocking `<link>` tag
3. **Unminified assets** -- 49 KB CSS + 121 KB JS served raw
4. **No image optimization pipeline** -- 15.6 MB of original-quality product photos
5. **Oversized favicon** -- 240 KB PNG

The site benefits from being vanilla HTML/CSS/JS with no framework overhead, good use of `loading="lazy"` on images, CSS `aspect-ratio` for layout stability, and passive event listeners. INP is likely already in the "Good" range. The main work is on LCP (font + hero image optimization) and reducing total transfer size.
