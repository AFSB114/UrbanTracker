import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['react-map-gl', 'mapbox-gl'],
};

export default nextConfig;
