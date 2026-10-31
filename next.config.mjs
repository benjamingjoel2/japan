import createMDX from '@next/mdx'

const prefixes = ['', '/fr', '/de', '/es']

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  experimental: { globalNotFound: true },
  images: {
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
    formats: ['image/avif', 'image/webp'],
    // Capped at 1920: beyond that, extra pixels cost bandwidth for no visible gain.
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920],
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
  async redirects() {
    // The single /legal page became three pages; /credits (Unsplash only) was removed.
    return prefixes.flatMap((p) => [
      { source: `${p}/legal`, destination: `${p}/booking-terms`, permanent: true },
      { source: `${p}/credits`, destination: p || '/', permanent: true },
    ])
  },
  async headers() {
    return [
      { source: '/captions/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }] },
    ]
  },
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
