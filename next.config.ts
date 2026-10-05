import type { NextConfig } from 'next';

const distDirectory = process.env.PORTFOLIO_MODE === 'true' ? '.next-portfolio' : '.next';
const nextConfig: NextConfig = {
  distDir: distDirectory,
  reactStrictMode: true,
  outputFileTracingRoot: import.meta.dirname,
  poweredByHeader: false,
  outputFileTracingIncludes: {
    middleware: [`./${distDirectory}/app-build-manifest.json`, `./${distDirectory}/build-manifest.json`],
  },
};

export default nextConfig;
