import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [320, 420, 768, 1024, 1200, 1600],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination:
          "/en?top=10&bottom=10&nickName=test&partnerNickName=partner&dDay=234&isConnected=true&coupleId=test123",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
