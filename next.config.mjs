/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  productionBrowserSourceMaps: false,
  webpack: (config) => {
    config.devtool = false; // Disable source maps in development
    config.ignoreWarnings = [
      (warning) =>
        warning.message.includes("Failed to parse source map") &&
        warning.file.includes("LayoutGroupContext.mjs"),
    ];
    return config;
  },
  devIndicators: false, // Disable development indicators
};

export default nextConfig;
