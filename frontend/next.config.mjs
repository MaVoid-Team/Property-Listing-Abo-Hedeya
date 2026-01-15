import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export only for GitHub Pages (set NEXT_PUBLIC_STATIC_EXPORT=true)
  // For Vercel, leave this undefined to use serverless functions
  ...(process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true' && {
    output: 'export',
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
    trailingSlash: false,
  }),
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Unoptimized only for static export, otherwise use Next.js Image Optimization
    unoptimized: process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true',
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/rails/active_storage/**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  },
}

export default withNextIntl(nextConfig)
