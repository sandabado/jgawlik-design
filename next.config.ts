import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: import.meta.dirname,
  poweredByHeader: false,
  outputFileTracingIncludes: {
    middleware: ['./.next/app-build-manifest.json', './.next/build-manifest.json'],
  },
};

export default nextConfig;
