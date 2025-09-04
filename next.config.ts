/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Needed for GitHub Pages export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com'
      }
    ],
  },
  eslint: {
    // Ne bloque PAS le build en cas d'erreurs eslint
    ignoreDuringBuilds: true,
  },
  output: 'export', // Outputs a static build for GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/thisisarya' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/thisisarya/' : '',
};

module.exports = nextConfig;
