import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/Afra4509' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
