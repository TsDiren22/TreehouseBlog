/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pure static HTML export → drops into `out/`, no Node server needed.
  output: "export",
  // Produces /projects/index.html instead of /projects.html — nicer URLs
  // behind any static server and works well with Caddy's file_server.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
