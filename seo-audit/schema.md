# Schema.org Structured Data Audit -- wadialawir.com

**Date:** 2026-04-05
**Pages audited:** index.html, products.html, product.html
**Data source:** js/products.js (45 products, 5 services, 2 car models)

---

## 1. Existing Schema Detection

### index.html -- 3 JSON-LD blocks found

#### Block 1: AutoPartsStore (LocalBusiness subtype)
```json
{
  "@context": "https://schema.org",
  "@type": "AutoPartsStore",
  "name": "Wadi Al Awir Car Accessories",
  "alternateName": "وادي العوير لزينة السيارات",
  "image": "https://wadialawir.com/shop-front.webp",
  "telephone": "+971553573156",
  "address": { ... },
  "geo": { ... },
  "url": "https://wadialawir.com",
  "openingHours": "Mo-Su 09:00-23:00",
  "aggregateRating": { "ratingValue": "4.4", "reviewCount": "33" },
  "priceRange": "AED 75 - AED 1500",
  "paymentAccepted": "Cash, Credit Card, Tabby Installments",
  "sameAs": [ ... ]
}
```

#### Block 2: WebSite
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Wadi Al Awir Car Accessories",
  "url": "https://wadialawir.com"
}
```

#### Block 3: ItemList (20 products)
```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [ ... 20 ListItem entries ... ]
}
```

### products.html -- 0 JSON-LD blocks found

No structured data of any kind.

### product.html -- 2 JSON-LD blocks (dynamically injected via JS)

#### Block 1: Product (JS-injected)
Generated at runtime for each product by ID query parameter.

#### Block 2: BreadcrumbList (JS-injected)
Generated at runtime with Home > Products > [Product Name].

---

## 2. Validation Results

### index.html -- AutoPartsStore

| Check | Result | Notes |
|-------|--------|-------|
| @context is https://schema.org | PASS | |
| @type valid and not deprecated | PASS | AutoPartsStore is a valid subtype of LocalBusiness |
| Required properties present | PASS | name, address present |
| image URL is absolute | PASS | https://wadialawir.com/shop-front.webp |
| image URL has spaces | PASS | FIXED - File renamed from "shop front.webp" to "shop-front.webp" |
| url trailing slash consistency | INFO | url is "https://wadialawir.com" but canonical is "https://wadialawir.com/" -- pick one |
| openingHours format | WARN | "Mo-Su 09:00-23:00" is acceptable but Google prefers the array format or the two-letter day spec per Schema.org. Current format works but is a single string rather than array |
| aggregateRating.ratingValue | PASS | "4.4" is valid |
| aggregateRating missing bestRating/worstRating | WARN | Recommended to add "bestRating": "5" and "worstRating": "1" for clarity |
| Missing: postalCode | WARN | PostalAddress has no postalCode. Dubai does not universally use postal codes, so this is acceptable but noted |
| sameAs contains Google Maps short URL | INFO | maps.app.goo.gl short link is fine for sameAs |
| Missing: areaServed | WARN | Recommended for local SEO. Should specify Dubai/UAE |

### index.html -- WebSite

| Check | Result | Notes |
|-------|--------|-------|
| @context | PASS | |
| @type | PASS | |
| Missing: potentialAction (SearchAction) | INFO | Not critical -- site has no search feature, so SearchAction sitelinks box is not applicable |

### index.html -- ItemList

| Check | Result | Notes |
|-------|--------|-------|
| @context | PASS | |
| @type | PASS | |
| ListItem structure | PASS | All 20 items have position, name, url |
| URLs are absolute | PASS | All use https://wadialawir.com/product.html?id=... |
| Item count vs actual products | WARN | ItemList has 20 products but js/products.js contains ~45 products. 25 products are missing from the homepage ItemList. This is acceptable if intentional (featured items only) but should be documented or the list should represent all products |
| Missing: itemListOrder | INFO | Recommended to specify "ItemListOrderAscending" or "ItemListUnordered" |

### product.html -- Product (JS-generated)

| Check | Result | Notes |
|-------|--------|-------|
| @context | PASS | |
| @type | PASS | |
| name | PASS | Uses English name |
| description | PASS | Uses English description |
| image | PASS | Array of absolute URLs |
| brand | PASS | |
| sku | PASS | Uses product ID |
| offers.price | PASS | Numeric value |
| offers.priceCurrency | PASS | "AED" |
| offers.availability | PASS | https://schema.org/InStock |
| offers.seller | PASS | |
| offers.url | PASS | Absolute URL |
| Missing: offers.priceValidUntil | CRITICAL | Google requires priceValidUntil for Product rich results eligibility. Without it, the Product snippet will not show in search results |
| Missing: review or aggregateRating | CRITICAL | Google requires either review or aggregateRating on Product for rich result eligibility. Without at least one, Product rich results will NOT display |
| Missing: offers.itemCondition | WARN | Recommended. Should be "https://schema.org/NewCondition" |
| Missing: gtin/mpn | INFO | No GTIN or MPN. These are recommended but not required for aftermarket car parts where manufacturer codes may not exist |
| Missing: category | WARN | Product.category is recommended. Data exists in products.js (exterior, interior, lighting, etc.) |
| Missing: additionalProperty | INFO | Could add compatibility info (vehicle make/model/year) as additionalProperty for richer data |
| JS-only rendering | CRITICAL | Product and Breadcrumb schemas are injected via client-side JavaScript. Googlebot can execute JS, but this adds risk. If JS fails to load or execute, no schema is present. Server-side rendering or static generation is strongly preferred |

### product.html -- BreadcrumbList (JS-generated)

| Check | Result | Notes |
|-------|--------|-------|
| @context | PASS | |
| @type | PASS | |
| itemListElement structure | PASS | 3 levels: Home > Products > Product |
| Position 2 URL | WARN | Uses "https://wadialawir.com/#products" (hash fragment). Google may ignore the fragment. Should point to "https://wadialawir.com/products.html" instead |
| item property format | PASS | Absolute URLs |

---

## 3. Missing Schema Opportunities

### 3A. products.html -- No schema at all (HIGH priority)

This page has zero structured data. It should have:

1. **BreadcrumbList** -- Home > Products
2. **ItemList** -- Full product catalog with links to individual product pages
3. **WebPage** -- Basic page identification

**Recommended JSON-LD for products.html:**

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://wadialawir.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Products",
      "item": "https://wadialawir.com/products.html"
    }
  ]
}
</script>
```

Note: The ItemList for products.html should be generated dynamically from the PRODUCTS array (same approach as product.html schema injection) since the product catalog is JS-rendered.

### 3B. Service schema on index.html (MEDIUM priority)

The site offers 5 services (window tinting, PPF, ceramic coating, car detailing, custom accessories installation). None have structured data. Adding Service schema improves visibility for service-related searches like "window tinting Dubai" or "ceramic coating Al Awir."

**Recommended JSON-LD for services (add to index.html):**

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "AutoPartsStore",
  "@id": "https://wadialawir.com/#organization",
  "name": "Wadi Al Awir Car Accessories",
  "url": "https://wadialawir.com",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Auto Services",
    "itemListElement": [
      {
        "@type": "OfferCatalog",
        "name": "Window Tinting",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Window Tinting - Saloon Car",
              "description": "Professional Nano window tinting. Clear from inside, dark outside. 10-year warranty. 99% heat rejection, 100% UV rejection.",
              "provider": {
                "@type": "AutoPartsStore",
                "name": "Wadi Al Awir Car Accessories"
              },
              "areaServed": {
                "@type": "City",
                "name": "Dubai"
              },
              "offers": {
                "@type": "Offer",
                "price": "600",
                "priceCurrency": "AED"
              }
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Window Tinting - SUV Car",
              "description": "Professional Nano window tinting for SUVs. Clear from inside, dark outside. 10-year warranty.",
              "provider": {
                "@type": "AutoPartsStore",
                "name": "Wadi Al Awir Car Accessories"
              },
              "areaServed": {
                "@type": "City",
                "name": "Dubai"
              },
              "offers": {
                "@type": "Offer",
                "price": "700",
                "priceCurrency": "AED"
              }
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Windshield Tinting Only",
              "description": "Professional Nano tinting for windshield. 99% heat rejection, 100% UV rejection.",
              "provider": {
                "@type": "AutoPartsStore",
                "name": "Wadi Al Awir Car Accessories"
              },
              "areaServed": {
                "@type": "City",
                "name": "Dubai"
              },
              "offers": {
                "@type": "Offer",
                "price": "200",
                "priceCurrency": "AED"
              }
            }
          }
        ]
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Paint Protection Film (PPF)",
          "description": "Invisible urethane film protecting from stone chips, scratches, and road debris. Self-healing technology.",
          "provider": {
            "@type": "AutoPartsStore",
            "name": "Wadi Al Awir Car Accessories"
          },
          "areaServed": {
            "@type": "City",
            "name": "Dubai"
          }
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Ceramic Coating",
          "description": "Advanced nano-ceramic coating providing durable hydrophobic protection with superior gloss and easy cleaning.",
          "provider": {
            "@type": "AutoPartsStore",
            "name": "Wadi Al Awir Car Accessories"
          },
          "areaServed": {
            "@type": "City",
            "name": "Dubai"
          }
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Car Detailing",
          "description": "Full interior and exterior detailing. Deep cleaning, paint correction, leather treatment, and showroom finish.",
          "provider": {
            "@type": "AutoPartsStore",
            "name": "Wadi Al Awir Car Accessories"
          },
          "areaServed": {
            "@type": "City",
            "name": "Dubai"
          }
        }
      }
    ]
  }
}
</script>
```

### 3C. FAQPage schema (INFO -- not recommended for Google rich results)

Since August 2023, Google restricts FAQ rich results to government and healthcare sites. This is a commercial auto parts shop, so FAQPage will NOT generate Google rich results. However, FAQPage markup can still benefit AI/LLM citation and discovery (GEO). Only pursue this if the site has actual FAQ content and AI discoverability is a priority.

### 3D. Review schema on index.html (MEDIUM priority)

The homepage shows 4 Google reviews with star ratings and author names. These could be marked up as individual Review objects nested within the LocalBusiness schema.

**Recommended: Add reviews array to the existing AutoPartsStore block:**

```json
"review": [
  {
    "@type": "Review",
    "author": { "@type": "Person", "name": "Nazim Malik" },
    "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
    "reviewBody": "Excellent place for JETOUR accessories. Wide range of products and very helpful staff."
  },
  {
    "@type": "Review",
    "author": { "@type": "Person", "name": "Saeed Al Emad" },
    "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
    "reviewBody": "The majority of the accessories are in stock, the team is fantastic and very knowledgeable."
  },
  {
    "@type": "Review",
    "author": { "@type": "Person", "name": "Ahmed K." },
    "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
    "reviewBody": "Best shop for Jetour T2 accessories in Dubai. Professional installation and fair prices."
  },
  {
    "@type": "Review",
    "author": { "@type": "Person", "name": "Mohammad R." },
    "reviewRating": { "@type": "Rating", "ratingValue": "4", "bestRating": "5" },
    "reviewBody": "Great selection of car accessories. Good quality products and reasonable prices. Recommended!"
  }
]
```

### 3E. BreadcrumbList on index.html (LOW priority)

Homepage does not have BreadcrumbList. While not critical for a homepage, adding a single-item breadcrumb establishes the hierarchy root for Google breadcrumb trails.

### 3F. Organization @id linking (MEDIUM priority)

The AutoPartsStore on index.html and the seller in Product schema on product.html are not linked via @id. Using `"@id": "https://wadialawir.com/#organization"` in the AutoPartsStore block and referencing it in Product.offers.seller would create a connected entity graph.

---

## 4. Rich Result Eligibility Summary

| Rich Result Type | Status | Blocking Issues |
|------------------|--------|-----------------|
| Local Business (Google Business Profile) | ELIGIBLE | Image URL has space. Add areaServed. |
| Product | NOT ELIGIBLE | Missing priceValidUntil and missing review/aggregateRating. Both are required by Google for Product rich results. |
| Breadcrumb | ELIGIBLE | JS-rendered (risk). Hash fragment URL in position 2. |
| ItemList (Carousel) | ELIGIBLE | Only 20 of ~45 products listed. |
| Sitelinks Search Box | N/A | No search functionality on site. |
| FAQ | NOT APPLICABLE | Commercial site -- Google will not show FAQ rich results. |
| HowTo | NOT APPLICABLE | Deprecated September 2023 -- do not add. |

---

## 5. Priority Action Items

### CRITICAL (blocks rich results)

1. **Add priceValidUntil to Product offers** -- Without this, Product rich results will not display. Set a future date (e.g., end of current year). Update the JS in product.html around line 826:
   ```js
   "priceValidUntil": "2026-12-31",
   ```

2. **Add aggregateRating or review to Product schema** -- Google requires at least one for Product rich results. Options:
   - Add a static aggregateRating mirroring the store's Google rating (if applicable to products)
   - Or implement per-product reviews

3. ~~**Fix image URL space**~~ DONE -- File renamed to `shop-front.webp` and schema updated.

### HIGH

4. **Add structured data to products.html** -- Currently has zero schema. Add BreadcrumbList and a dynamically generated ItemList for all products.

5. **Add Service schema to index.html** -- The 5 services (window tinting with 3 price tiers, PPF, ceramic coating, detailing, custom accessories) have no structured data. Service schema with pricing improves visibility for local service searches.

6. **Add itemCondition to Product offers** -- Add `"itemCondition": "https://schema.org/NewCondition"` to the Offer block.

### MEDIUM

7. **Add reviews to LocalBusiness schema** -- The 4 Google reviews displayed on the homepage should be included in the AutoPartsStore schema as a reviews array.

8. **Add areaServed to LocalBusiness** -- Specify Dubai and UAE to strengthen local SEO signals.

9. **Link entities with @id** -- Add `"@id": "https://wadialawir.com/#organization"` to AutoPartsStore and reference it in Product.offers.seller for a connected knowledge graph.

10. **Fix BreadcrumbList position 2 URL** -- Change from `https://wadialawir.com/#products` to `https://wadialawir.com/products.html` since that is the actual products catalog page.

11. **Add bestRating/worstRating to AggregateRating** -- Explicitly set `"bestRating": "5"` and `"worstRating": "1"`.

### LOW

12. **Update ItemList to include all products** -- Or add a `"name"` and `"description"` to clarify it represents featured products only.

13. **Add Product.category** -- Map the existing category field (exterior, interior, lighting, utility, wheels) to the Product schema.

14. **Consider server-side schema generation** -- Product and Breadcrumb schemas on product.html rely entirely on client-side JS execution. If pre-rendering or SSG is feasible, it eliminates the risk of Googlebot not executing the JS.

---

## 6. Corrected/Enhanced Schema Blocks

### 6A. Enhanced AutoPartsStore (replace existing block in index.html)

```json
{
  "@context": "https://schema.org",
  "@type": "AutoPartsStore",
  "@id": "https://wadialawir.com/#organization",
  "name": "Wadi Al Awir Car Accessories",
  "alternateName": "وادي العوير لزينة السيارات",
  "image": "https://wadialawir.com/shop-front.webp",
  "telephone": "+971553573156",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "5GHV+FR2, Al Awir 1",
    "addressLocality": "Dubai",
    "addressRegion": "Dubai",
    "addressCountry": "AE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 25.1786535,
    "longitude": 55.5445376
  },
  "url": "https://wadialawir.com/",
  "openingHours": "Mo-Su 09:00-23:00",
  "areaServed": {
    "@type": "City",
    "name": "Dubai",
    "containedInPlace": {
      "@type": "Country",
      "name": "United Arab Emirates"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.4",
    "reviewCount": "33",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Nazim Malik" },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "Excellent place for JETOUR accessories. Wide range of products and very helpful staff."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Saeed Al Emad" },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "The majority of the accessories are in stock, the team is fantastic and very knowledgeable."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Ahmed K." },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "Best shop for Jetour T2 accessories in Dubai. Professional installation and fair prices."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Mohammad R." },
      "reviewRating": { "@type": "Rating", "ratingValue": "4", "bestRating": "5" },
      "reviewBody": "Great selection of car accessories. Good quality products and reasonable prices. Recommended!"
    }
  ],
  "priceRange": "AED 75 - AED 1500",
  "paymentAccepted": "Cash, Credit Card, Tabby Installments",
  "sameAs": [
    "https://www.instagram.com/wadi_alawir/",
    "https://maps.app.goo.gl/gJF5geXWEnjm8P5w8"
  ]
}
```

### 6B. Enhanced Product schema (update JS in product.html ~line 818)

```js
schemaEl.textContent = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name.en,
  "description": product.description.en,
  "image": product.images.map(function(img) { return 'https://wadialawir.com/' + img; }),
  "brand": { "@type": "Brand", "name": "Wadi Al Awir" },
  "sku": product.id,
  "category": product.category,
  "offers": {
    "@type": "Offer",
    "price": product.price,
    "priceCurrency": "AED",
    "priceValidUntil": "2026-12-31",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition",
    "seller": {
      "@type": "AutoPartsStore",
      "@id": "https://wadialawir.com/#organization",
      "name": "Wadi Al Awir Car Accessories"
    },
    "url": "https://wadialawir.com/product.html?id=" + product.id
  }
});
```

Note: To fully qualify for Product rich results, you must also add either `aggregateRating` or `review` to each Product. If you do not have per-product reviews, you could add the store-level aggregateRating:

```js
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.4",
  "reviewCount": "33",
  "bestRating": "5"
}
```

### 6C. Fixed BreadcrumbList (update JS in product.html ~line 840)

```js
bcSchema.textContent = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://wadialawir.com/" },
    { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://wadialawir.com/products.html" },
    { "@type": "ListItem", "position": 3, "name": product.name.en, "item": "https://wadialawir.com/product.html?id=" + product.id }
  ]
});
```

---

## 7. Schema NOT Recommended

| Schema Type | Reason |
|-------------|--------|
| HowTo | Deprecated by Google (September 2023). Rich results removed. |
| FAQPage | Restricted to government/healthcare for Google rich results (August 2023). Not beneficial for this commercial site unless prioritizing AI/GEO. |
| SpecialAnnouncement | Deprecated July 2025. |
| VideoObject | No video content detected on the site. |

---

## 8. Testing and Validation

After implementing changes, validate using:

1. **Google Rich Results Test** -- https://search.google.com/test/rich-results
   - Test each page URL individually
   - For product.html, test with a specific product ID (e.g., ?id=mud-guard)

2. **Schema.org Validator** -- https://validator.schema.org/
   - Validates syntax and property types

3. **Google Search Console** -- Monitor the "Enhancements" section after deployment for:
   - Product snippets
   - Breadcrumbs
   - Local business
   - Any new errors or warnings
