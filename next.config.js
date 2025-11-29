/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.ctfassets.net','www.aaroncouch.name'],
  },
        experimental: {
        serverActions: true,
      },
}

module.exports = nextConfig
