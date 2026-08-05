import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const remotePatterns: NonNullable<NextConfig['images']>['remotePatterns'] = [
  {
    protocol: 'https',
    hostname: 'cdn.sanity.io',
    port: '',
    pathname: '/images/**',
  },
  {
    protocol: 'https',
    hostname: 'wadialawir.com',
    port: '',
    pathname: '/**',
  },
];

const mediaBaseUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL;
if (mediaBaseUrl) {
  const mediaUrl = new URL(mediaBaseUrl);
  remotePatterns.push({
    protocol: mediaUrl.protocol.replace(':', '') as 'http' | 'https',
    hostname: mediaUrl.hostname,
    port: mediaUrl.port,
    pathname: `${mediaUrl.pathname.replace(/\/$/, '')}/**`,
  });
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
};

export default withNextIntl(nextConfig);
