import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
