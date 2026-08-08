import Script from 'next/script'
import { GA_MEASUREMENT_ID } from '../lib/analytics'

/**
 * GA4 tag. Mounted in the public [locale] layout only, so the
 * /admin workspace and /studio do not pollute site traffic data.
 *
 * GA4 enhanced measurement tracks client-side route changes via
 * History API events, so no manual page_view call is needed.
 */
export default function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  )
}
