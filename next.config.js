/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["image.tmdb.org"],
  },
  env: {
    apiKey: process.env.API_KEY,
  },
};

module.exports = nextConfig;
