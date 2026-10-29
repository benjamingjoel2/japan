import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: {
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
    formats: ['image/avif', 'image/webp'],
    // Capped at 1920: beyond that, extra pixels cost bandwidth for no visible gain.
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920],
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
