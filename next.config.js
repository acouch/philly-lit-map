/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.ctfassets.net',
      'philly-lit-map.vercel.app',
      'm.media-amazon.com',
    ],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
