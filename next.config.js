/** @type {import('next').NextConfig} */
const nextConfig = {
  // Note: 'standalone' output removed - not compatible with Vercel's default deployment
  // Use default output for Vercel hosting
  images: {
    domains: ['images.unsplash.com'],
  },
};

module.exports = nextConfig;
