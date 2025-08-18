/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: false,
  images: {
    domains: ['cdn.cosmicjs.com', 'imgix.cosmicjs.com'],
  },
}

module.exports = nextConfig