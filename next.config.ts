import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
  },
  experimental: {
    turbo: {
      root: path.resolve(__dirname),
    },
  },
};

export default nextConfig;
