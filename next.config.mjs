import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: {
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920, 2560],
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
