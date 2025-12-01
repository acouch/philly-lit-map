/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.ctfassets.net',
      'www.aaroncouch.name',
      'm.media-amazon.com',
    ],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
