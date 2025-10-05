/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  pageExtensions: [
    "page.tsx",
    "page.ts",
    "page.jsx",
    "page.js",
    "js",
    "jsx",
    "ts",
    "tsx",
  ],
  async rewrites() {
    return {
      beforeFiles: [
        // Esto previene que los archivos en /components/ se traten como páginas
        {
          source: "/components/:path*",
          destination: "/404",
        },
      ],
    };
  },
};

export default nextConfig;
