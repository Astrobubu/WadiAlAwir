// Import NextResponse directly to avoid next/server.js eagerly loading ua-parser-js
// (ua-parser-js uses __dirname which doesn't exist in Vercel Edge Runtime)
import { NextResponse } from 'next/dist/server/web/spec-extension/response'
import type { NextRequest } from 'next/dist/server/web/spec-extension/request'
import { createServerClient } from '@supabase/ssr'

const locales = ['en', 'ar'] as const
type Locale = typeof locales[number]
const defaultLocale: Locale = 'en'
const cookieName = 'wadi-lang'
// Header next-intl reads on the server to know the active locale
const localeHeader = 'X-NEXT-INTL-LOCALE'

function localeFromPath(pathname: string): Locale | null {
  for (const locale of locales) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return locale
    }
  }
  return null
}

function localeFromCookie(req: NextRequest): Locale | null {
  const v = req.cookies.get(cookieName)?.value
  return v && (locales as readonly string[]).includes(v) ? (v as Locale) : null
}

async function refreshSupabaseSession(req: NextRequest, res: NextResponse) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  if (!url || !publishableKey) return res

  const supabase = createServerClient(url, publishableKey, {
    cookies: {
      getAll: () => req.cookies.getAll(),
      setAll: (cookiesToSet) => {
        for (const cookie of cookiesToSet) {
          req.cookies.set(cookie.name, cookie.value)
          res.cookies.set(cookie.name, cookie.value, cookie.options)
        }
      },
    },
  })

  // Refresh expired auth cookies when necessary. Authorization is still
  // enforced in the protected admin layout and by database RLS policies.
  try {
    await supabase.auth.getClaims()
  } catch (error) {
    console.warn('[Supabase auth] Session refresh failed.', error)
  }
  return res
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const legacyLocale = localeFromCookie(req) ?? defaultLocale
  const legacyRoutes: Record<string, string> = {
    '/index': '',
    '/index.html': '',
    '/products.html': '/products',
    '/privacy.html': '/privacy',
    '/returns.html': '/returns',
  }

  if (pathname === '/product.html') {
    const id = req.nextUrl.searchParams.get('id')
    const url = req.nextUrl.clone()
    url.pathname = id
      ? `/${legacyLocale}/products/${encodeURIComponent(id)}`
      : `/${legacyLocale}/products`
    url.search = ''
    return NextResponse.redirect(url, 308)
  }

  if (pathname in legacyRoutes) {
    const url = req.nextUrl.clone()
    url.pathname = `/${legacyLocale}${legacyRoutes[pathname]}`
    url.search = ''
    return NextResponse.redirect(url, 308)
  }

  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    const res = NextResponse.next()
    res.headers.set(localeHeader, defaultLocale)
    return refreshSupabaseSession(req, res)
  }

  const pathLocale = localeFromPath(pathname)
  if (pathLocale) {
    const res = NextResponse.next()
    res.headers.set(localeHeader, pathLocale)
    res.cookies.set(cookieName, pathLocale, { sameSite: 'lax', path: '/' })
    return refreshSupabaseSession(req, res)
  }

  // No locale prefix — redirect to cookie preference or default
  const locale = localeFromCookie(req) ?? defaultLocale
  const url = req.nextUrl.clone()
  url.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    '/index.html',
    '/products.html',
    '/product.html',
    '/privacy.html',
    '/returns.html',
    '/((?!studio|_next|api|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\..*).*)',
  ],
}
