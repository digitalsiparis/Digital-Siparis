/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/api/:path*', destination: 'http://localhost:4000/:path*' },
    ];
  },
  images: {
    remotePatterns: [
      // Fastify'nin servis ettiği ürün resimleri için
      { protocol: 'http', hostname: 'localhost', port: '4000', pathname: '/uploads/**' },
    ],
  },
};
export default nextConfig;
