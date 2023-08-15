/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_INSTAGRAM_URL: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
    NEXT_PUBLIC_WHATSAPP_URL: process.env.NEXT_PUBLIC_WHATSAPP_URL,
    NEXT_PUBLIC_SHOPEE_URL: process.env.NEXT_PUBLIC_SHOPEE_URL,
  },
}

module.exports = nextConfig
