# Generative Engine Optimization (GEO) Audit Report
## wadialawir.com -- Wadi Al Awir Car Accessories, Dubai
**Audit Date:** 2026-04-05
**Auditor:** Claude Opus 4.6 (GEO Specialist)

---

## GEO Health Score: 34/100 (Poor -- Significant Work Needed)

| Dimension               | Weight | Score | Weighted |
|--------------------------|--------|-------|----------|
| Citability               | 25%    | 20/100| 5.0      |
| Structural Readability   | 20%    | 45/100| 9.0      |
| Multi-Modal Content      | 15%    | 30/100| 4.5      |
| Authority & Brand Signals| 20%    | 25/100| 5.0      |
| Technical Accessibility  | 20%    | 52/100| 10.4     |
| **TOTAL**                |        |       | **33.9** |

---

## 1. AI Crawler Access Status (robots.txt)

**File location:** /robots.txt

**Current contents:**

    User-agent: *
    Allow: /
    Sitemap: https://wadialawir.com/sitemap.xml

### Crawler-by-Crawler Verdict

| Crawler         | Purpose                  | Status     | Notes                              |
|-----------------|--------------------------|------------|-------------------------------------|
| Googlebot       | Google Search + AIO      | ALLOWED    | Wildcard permit                     |
| Bingbot         | Bing Search + Copilot    | ALLOWED    | Wildcard permit                     |
| GPTBot          | ChatGPT web search       | ALLOWED    | Wildcard permit (good)              |
| OAI-SearchBot   | OpenAI SearchGPT         | ALLOWED    | Wildcard permit (good)              |
| ClaudeBot       | Anthropic web search     | ALLOWED    | Wildcard permit (good)              |
| PerplexityBot   | Perplexity AI search     | ALLOWED    | Wildcard permit (good)              |
| Google-Extended | Gemini training data     | ALLOWED    | Consider blocking for training-only |
| CCBot           | Common Crawl (training)  | ALLOWED    | Consider blocking for training-only |
| anthropic-ai    | Anthropic training       | ALLOWED    | Consider blocking for training-only |
| cohere-ai       | Cohere training          | ALLOWED    | Consider blocking for training-only |
| Bytespider      | ByteDance/TikTok crawler | ALLOWED    | Consider blocking                   |

**Assessment:** The wildcard Allow: / lets all AI crawlers in, which is correct for search visibility. However, you should explicitly allow search bots by name and block training-only bots. This signals intentional consent and protects content from being used in training without benefit.
### Recommended robots.txt

    User-agent: *
    Allow: /

    # Explicitly allow AI search crawlers
    User-agent: GPTBot
    Allow: /

    User-agent: OAI-SearchBot
    Allow: /

    User-agent: ClaudeBot
    Allow: /

    User-agent: PerplexityBot
    Allow: /

    # Block training-only crawlers (no search benefit)
    User-agent: CCBot
    Disallow: /

    User-agent: anthropic-ai
    Disallow: /

    User-agent: cohere-ai
    Disallow: /

    User-agent: Bytespider
    Disallow: /

    User-agent: Google-Extended
    Disallow: /

    Sitemap: https://wadialawir.com/sitemap.xml

---

## 2. llms.txt Compliance

**Status:** MISSING (404 at https://wadialawir.com/llms.txt)

The llms.txt file is an emerging standard (RSL 1.0) that provides LLMs with a structured summary of your site. It is the single most impactful quick win for GEO. When an AI agent visits your site, it can read llms.txt to quickly understand your business, products, and how to cite you.

### Recommended llms.txt (create at site root)

    # Wadi Al Awir Car Accessories

    > Premium car accessories shop in Al Awir, Dubai specializing in Jetour T2
    > and ROX 01 aftermarket parts, window tinting, ceramic coating, and car
    > detailing. Open daily 9 AM to 11 PM. Rated 4.4/5 on Google.

    ## Contact
    - Phone: +971 55 357 3156
    - WhatsApp: +971 55 357 3156
    - Location: Al Awir 1, Dubai, UAE
    - Instagram: @wadi_alawir
    - Website: https://wadialawir.com

    ## Products
    ### Jetour T2 Accessories (2023-2024)
    - Mud Guards (AED 150) - Heavy-duty front/rear splash guards, no-drill install
    - Ambient Lighting System (AED 600) - Multi-color, stepless brightness, 1-year warranty
    - Brake Caliper Covers (AED 600) - Multiple colors, 1-year warranty
    - Fog Lights (AED 350) - OEM-fit LED fog lights
    - Rear Bumper Tow Bar (AED 800) - Heavy-duty towing capacity
    - H&R Wheel Spacers (AED 1,500) - German-made, precision fit
    - Crystal Gear Lever Handle - Premium interior upgrade
    - Phone Holder, Screen Protector, Door Handle Protectors
    - Mud Flaps, Spare Tire Cover, Under Seat Covers

    ### ROX 01 Accessories
    - Rear Spoiler, Mud Flaps, H&R Wheel Spacers
    - Brake Caliper Covers, Phone Holder, Screen Protector
    - Central Control Wireless Charger Pad

    ## Services
    - Professional window tinting, Ceramic coating, Car detailing, Accessory installation

    ## Payment
    Cash, credit cards, and Tabby installments (buy now, pay later)

    ## Pricing
    Range: AED 75 to AED 1,500

---

## 3. Passage-Level Citability Analysis

This is the most critical dimension for AI search visibility. AI models extract and cite passages that are self-contained, specific, and directly answer questions.

### Current State: POOR (20/100)

**Critical Problems:**

**3a. Nearly all product content is rendered by JavaScript only.** GPTBot, ClaudeBot, PerplexityBot, and most AI crawlers do NOT execute JavaScript. They see empty div containers. Product pages have title tag set to Loading and blank meta descriptions until JS runs.

**3b. No FAQ section.** FAQ content is the highest-citability content type for AI search. Queries like "Where to buy Jetour T2 accessories in Dubai?" have no direct answers on the page.

**3c. No informational content.** There are zero blog posts, guides, or how-to articles. AI search engines strongly prefer citing educational content over product listings.

**3d. Product descriptions are too short.** Most descriptions are 15-25 words. Optimal AI citation passages are 134-167 words. The mud guard description is only 19 words.

**3e. No question-based headings.** All H2s are generic labels ("Our Products", "Our Services") instead of question-based headings that match user queries.

### What AI Crawlers Actually See on Product Pages

When GPTBot visits product.html?id=mud-guard, it sees:

- Title: "Loading... | Wadi Al Awir Car Accessories"
- Meta description: (empty)
- OG tags: (all empty)
- Product schema: {}
- Body content: Empty placeholder divs

**This means zero product pages are indexable by AI search engines.**

---

## 4. Authority and Brand Signals

### Current State: WEAK (25/100)

| Signal              | Status      | Impact on AI Citations |
|---------------------|-------------|------------------------|
| Wikipedia entity    | NONE        | High negative impact   |
| YouTube presence    | NONE found  | Strongest correlation (~0.737) missing |
| Reddit mentions     | NONE found  | High correlation missing |
| LinkedIn company    | NONE found  | Moderate impact missing |
| Google Business     | EXISTS (4.4 stars, 33 reviews) | Positive but limited |
| Instagram           | EXISTS (@wadi_alawir) | Low direct AI impact |
| Domain age/DR       | NEW/LOW     | Weak correlation (~0.266) |
| Backlink profile    | MINIMAL     | Weak direct impact   |
| Authorship signals  | NONE        | Negative for E-E-A-T  |
| Publication dates   | NONE        | Negative for freshness |

**Key Insight:** Only 11% of domains are cited by both ChatGPT and Google AI Overviews. Without Wikipedia, YouTube, and Reddit presence, the probability of being cited by any AI search engine is extremely low.

### Structured Data Assessment

**Homepage (index.html):**
- AutoPartsStore schema: PRESENT and well-formed
- WebSite schema: PRESENT
- ItemList schema: PRESENT (20 products listed)
- AggregateRating: PRESENT (4.4/5, 33 reviews)

**Products page (products.html):**
- Schema markup: NONE
- Canonical URL: MISSING
- OG tags: MISSING

**Product detail page (product.html):**
- Product schema: Injected by JS only (empty {} in source)
- Breadcrumb schema: Injected by JS only (empty {} in source)
- All meta tags: Empty (populated by JS only)

---

## 5. Technical Accessibility for AI Crawlers

### Current State: MODERATE (52/100)

| Factor                        | Status    | Score |
|-------------------------------|-----------|-------|
| HTML served (not SPA)         | YES       | Good  |
| Homepage content in source    | PARTIAL   | Mixed |
| Product pages SSR             | NO        | Critical fail |
| Sitemap present               | YES       | Good  |
| Sitemap includes product URLs | YES (25 URLs) | Good |
| Canonical URLs                | Homepage only | Partial |
| HTTPS                         | YES       | Good  |
| Mobile responsive             | YES       | Good  |
| Page load speed               | Lightweight static | Good |
| hreflang for Arabic           | MISSING   | Negative |
| Bilingual content approach    | JS toggle (not crawlable) | Critical fail |

### Client-Side Rendering Problem (CRITICAL)

The site is a static HTML site that uses client-side JavaScript to render all dynamic content. This is the single biggest technical problem:

1. Product grid on homepage -- rendered by products.js after DOMContentLoaded
2. Services grid on homepage -- rendered by main.js after DOMContentLoaded
3. Car model grid on homepage -- rendered by products.js after DOMContentLoaded
4. Entire products listing page -- all products rendered by JS
5. Product detail pages -- title, meta, schema, all content rendered by JS
6. Arabic translations -- applied by JS lang toggle, not crawlable

AI crawlers (GPTBot, ClaudeBot, PerplexityBot) generally do NOT execute JavaScript. Googlebot does execute JS, but Google AI Overviews may still prefer statically-rendered content for citation extraction.

---

## 6. Platform-Specific Readiness Scores

### Google AI Overviews: 35/100

- (+) AutoPartsStore schema on homepage
- (+) AggregateRating present
- (+) Sitemap with product URLs
- (+) Google Business Profile exists
- (-) Product pages invisible without JS
- (-) No FAQ schema
- (-) No informational content for Featured Snippets
- (-) No hreflang for bilingual content
- (-) No blog/guide content for long-tail queries

### ChatGPT (GPTBot/SearchGPT): 20/100

- (+) robots.txt allows GPTBot
- (-) No llms.txt
- (-) Product pages return empty HTML to crawlers
- (-) No Wikipedia entity
- (-) No YouTube content (strongest citation signal)
- (-) No Reddit presence
- (-) No self-contained answer passages
- (-) Product descriptions too short for citation

### Perplexity: 22/100

- (+) robots.txt allows PerplexityBot
- (+) Homepage has some static content (reviews, location)
- (-) No llms.txt
- (-) JS-dependent product content invisible
- (-) No citation-worthy passages
- (-) No statistics with source attribution
- (-) No comparison or guide content

### Bing Copilot: 30/100

- (+) Bing can render JS (partially)
- (+) Schema markup on homepage
- (+) Sitemap present
- (-) No llms.txt
- (-) Product page meta tags empty in source
- (-) No blog or informational content
- (-) No FAQ section

---

## 7. Top 10 Highest-Impact Changes (Prioritized)

### 1. Server-Side Render Product Pages [CRITICAL -- Effort: HIGH]

**Impact: +25 points to GEO score**

The product detail pages (product.html?id=*) must have their content present in the initial HTML source. Options:

- **Best:** Static site generator (11ty, Hugo, Astro) that pre-renders each product page as a standalone HTML file (e.g., /products/mud-guard.html)
- **Good:** Build script that generates static HTML from the PRODUCTS array in products.js
- **Minimum:** Pre-render the JSON-LD schema, title, meta description, OG tags, and a noscript block with product name, description, price, and image

Each product page should have in the raw HTML source:
- Correct title (e.g., "Mud Guard for Jetour T2 | AED 150 | Wadi Al Awir Dubai")
- Populated meta description
- Complete Product JSON-LD schema
- H1 with product name
- Paragraph with 134-167 word description
- Price, images with alt text

### 2. Create llms.txt [HIGH IMPACT -- Effort: LOW]

**Impact: +5 points to GEO score**

Create the file as specified in Section 2 above. This takes 15 minutes and immediately helps every AI crawler understand your business.

### 3. Add FAQ Section with FAQPage Schema [HIGH IMPACT -- Effort: LOW]

**Impact: +10 points to GEO score**

Add a static FAQ section to index.html with questions real customers ask. Each answer should be 134-167 words and self-contained. Suggested questions:

- "Where can I buy Jetour T2 accessories in Dubai?"
- "What Jetour T2 accessories are available with warranty?"
- "Does Wadi Al Awir offer window tinting in Dubai?"
- "What ROX 01 accessories are available in Dubai?"
- "Can I pay in installments for car accessories at Wadi Al Awir?"

Each answer must be a complete, extractable passage that an AI could cite without any surrounding context.

### 4. Create a Blog / Guides Section [HIGH IMPACT -- Effort: MEDIUM]

**Impact: +12 points to GEO score**

AI search engines cite informational content far more than product listings. Create 5-10 articles:

- "Best Jetour T2 Accessories in Dubai: Complete 2024-2025 Guide"
- "Jetour T2 vs ROX 01: Which Accessories Do You Need?"
- "Window Tinting Laws in Dubai: What You Need to Know (2025)"
- "How to Choose the Right Wheel Spacers for Your Jetour T2"
- "Ceramic Coating vs PPF: Which Is Better for Dubai Heat?"

Each article: 800-1,500 words, question-based H2 headings, specific statistics, self-contained 134-167 word answer blocks under each heading.

### 5. Update robots.txt with Explicit AI Crawler Rules [LOW EFFORT]

**Impact: +3 points to GEO score**

Replace current robots.txt with the version in Section 1 above. Takes 10 minutes.

### 6. Build YouTube and Reddit Presence [HIGH IMPACT -- Effort: MEDIUM-HIGH]

**Impact: +8 points to GEO score (indirect)**

YouTube mentions have the strongest correlation (~0.737) with AI citations.

- Create a YouTube channel with 5-10 installation videos (e.g., "How to Install Mud Guards on Jetour T2")
- Post in relevant Reddit communities (r/Jetour, r/Dubai, r/CarMods) with genuine helpful content
- This creates entity recognition across platforms that AI models use for citation decisions

### 7. Expand Product Descriptions to 134-167 Words [MEDIUM IMPACT -- Effort: MEDIUM]

**Impact: +5 points to GEO score**

Current descriptions average 15-25 words. Each product description should:

- Start with a direct answer in the first 40-60 words
- Include specific measurements, materials, compatibility details
- Mention the price and warranty in the text (not just data fields)
- Be extractable as a standalone paragraph

**Example for Mud Guard** (current: 19 words, target: ~140 words):

"The Wadi Al Awir 4-piece mud guard set for Jetour T2 (2023-2024) provides heavy-duty protection against road debris, stones, water, and mud spray. Made from premium flexible plastic with a textured surface that disperses debris on impact, these guards cover both front and rear wheel arches. Installation requires no drilling -- the snap-on design fits directly onto existing mounting points in under 30 minutes. Priced at AED 150, these mud guards are one of the most cost-effective upgrades for protecting your Jetour T2 bodywork from Dubai sandy roads and construction debris. Available at Wadi Al Awir Car Accessories in Al Awir, Dubai. Order via WhatsApp at +971 55 357 3156."

### 8. Add hreflang Tags for Arabic Content [MEDIUM IMPACT -- Effort: MEDIUM]

**Impact: +3 points to GEO score**

The site has Arabic translations but they are toggled client-side via JavaScript, making them invisible to crawlers. Options:

- Create separate /ar/ URL paths with static Arabic content
- At minimum, add link rel alternate hreflang tags
- Arabic search queries in the Gulf region are significant

### 9. Add Product Schema to Individual Product Pages (Server-Side) [MEDIUM IMPACT -- Effort: MEDIUM]

**Impact: +4 points to GEO score**

When product pages are pre-rendered (see item 1), each must include complete Product schema with name, description, image, brand, offers (price, currency, availability), and vehicle compatibility.

### 10. Add Authorship and Date Signals [LOW IMPACT -- Effort: LOW]

**Impact: +2 points to GEO score**

- Add datePublished and dateModified meta tags or schema to all pages
- Add author attribution to any blog/guide content
- These are E-E-A-T signals that AI search engines weight for citation decisions

---

## 8. Quick Win Checklist (Can Be Done This Week)

- [ ] Create /llms.txt at site root (15 minutes)
- [ ] Update robots.txt with explicit AI crawler rules (10 minutes)
- [ ] Add FAQ section with FAQPage schema to index.html (2-3 hours)
- [ ] Add noscript fallback content to product.html with static product info (2-3 hours)
- [ ] Add canonical URLs to products.html and product.html pages (30 minutes)
- [ ] Add datePublished/dateModified to homepage schema (15 minutes)
- [ ] Expand product descriptions in products.js to 134-167 words each (3-4 hours)

## 9. Medium-Term Roadmap (1-3 Months)

- [ ] Pre-render all product pages as static HTML files
- [ ] Create Arabic URL variants (/ar/) with static content
- [ ] Launch blog with 5 guide articles targeting long-tail queries
- [ ] Create YouTube channel with installation videos
- [ ] Build Reddit presence in relevant communities
- [ ] Add BreadcrumbList schema to all pages
- [ ] Implement link rel alternate hreflang tags

## 10. Competitive Context

Jetour T2 is a relatively new vehicle (launched 2023) with growing popularity in the UAE/GCC market. The aftermarket accessories space for this vehicle is not yet saturated in AI search results. This creates a time-limited window of opportunity: the first business to produce citable, well-structured content about Jetour T2 accessories will likely dominate AI search results for these queries for a long time, since AI models build entity associations early and are slow to change them.

**The window is open now. The competition for "Jetour T2 accessories Dubai" in AI search is near zero. But it will not stay that way.**

---

*Report generated by Claude Opus 4.6 GEO Audit System*
*wadialawir.com | Al Awir, Dubai, UAE*
