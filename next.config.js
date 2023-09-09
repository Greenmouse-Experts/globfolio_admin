/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    loader: 'cloudinary',
    path: '/',
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "res.cloudinary.com",
        port: '',
        pathname: '/**',
      },
    ],
    minimumCacheTTL: 1500000,
  },
}

module.exports = nextConfig
