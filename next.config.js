/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn2.thecatapi.com",
        port: "",
        pathname: "/**",
      },

      {
        protocol: "https",
        hostname: "28.media.tumblr.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
