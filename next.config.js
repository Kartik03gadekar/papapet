/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["papapetbackend-oaiw.onrender.com", "localhost"], // ✅ fix for images
  },
};

module.exports = nextConfig;
