import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Proxy all backend requests to FastAPI (running locally)
  async rewrites() {
    return [
      // Your API endpoints (login, ask, image, verify, images/upload, etc.)
      { source: "/backend/:path*", destination: "http://18.232.35.191:8002/:path*" },

      // Static uploads served by FastAPI's StaticFiles
      { source: "/uploads/:path*", destination: "http://18.232.35.191:8002/uploads/:path*" },
    ];
  },

  // (Optional) CORS headers. With the proxy, you usually don't need these,
  // but leaving them on all paths won't hurt dev.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT,OPTIONS" },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },

  images: {
    domains: ["replicate.delivery"],
  },
};

export default nextConfig;
