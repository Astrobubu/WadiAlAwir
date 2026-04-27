import { NextRequest, NextResponse } from 'next/server'

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

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const pathLocale = localeFromPath(pathname)
  if (pathLocale) {
    const res = NextResponse.next()
    res.headers.set(localeHeader, pathLocale)
    res.cookies.set(cookieName, pathLocale, { sameSite: 'lax', path: '/' })
    return res
  }

  // No locale prefix — redirect to cookie preference or default
  const locale = localeFromCookie(req) ?? defaultLocale
  const url = req.nextUrl.clone()
  url.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    '/((?!studio|_next|api|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\..*).*)',
  ],
}
