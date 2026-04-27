import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for:
  // - /studio (Sanity Studio)
  // - /_next (Next.js internals)
  // - /api (API routes)
  // - /favicon.ico, /robots.txt, /sitemap.xml (static files)
  // - Files with extensions (images, fonts, etc.)
  matcher: [
    '/((?!studio|_next|api|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\..*).*)',
  ],
};
