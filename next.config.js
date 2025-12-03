/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['philly-lit-map.vercel.app'],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
