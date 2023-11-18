/** @type {import('next').NextConfig} */
const nextConfig = {
  // Customize your Next.js configuration here
  pageExtensions: ["jsx", "js"],
  // Add additional configurations as needed
  images: {
    domains: ['avatars.githubusercontent.com'],
    // Add additional domains as needed
    loader: 'default',
  },
};

module.exports = nextConfig;
