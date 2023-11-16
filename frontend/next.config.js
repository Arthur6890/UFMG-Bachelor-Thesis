/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-sa-east-1.amazonaws.com/tcc-ufmg",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
