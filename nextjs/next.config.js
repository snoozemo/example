/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.snoozemo.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    appDir: true,
    //  typedRoutes: true,
  },
};
module.exports = nextConfig;
