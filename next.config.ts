import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;

module.exports = {
  async headers() {
    const headers = [];
    if (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production') {
      headers.push({
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
        source: '/:path*',
      });
    }
    return headers;
  },
 };
