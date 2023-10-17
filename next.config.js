/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
})

const nextConfig = withPWA({
  images: {
    // dangerouslyAllowSVG: true,
    // contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // domains: ['cdn.sanity.io'],
    // NEXTJS13
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
    // DEFAULT:
    // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },

  i18n: {
    locales: ["en", "nl"],
    defaultLocale: "en",
  },

  async redirects() {
    return [
      {
        source: "/:locale/studio*",
        destination: "/en/studio",
        permanent: false,
        locale: false,
      },
    ]
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/home",
          destination: "/",
          // permanent: true,
          // locale:false,
        },
      ],
    }
  },
  // NOT POSSIBLE WITH INTERNATIONALISATION
  // output: "export",

  // Good to know: Since Next.js 13.4, Strict Mode is true by default with app router, so the above configuration is only necessary for pages.
  // You can still disable Strict Mode by setting reactStrictMode: false.
  //  We strongly suggest you enable Strict Mode
  reactStrictMode: true,
})

module.exports = nextConfig
