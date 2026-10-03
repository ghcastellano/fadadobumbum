/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 82, 85, 90],
    // cache da otimização na edge da Vercel (31 dias)
    minimumCacheTTL: 2678400,
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  async headers() {
    const cache = [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }];
    const security = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      // Demonstração em aprovação: fora dos buscadores até a venda fechar.
      // Para liberar a indexação basta remover este header e o robots do layout.
      { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
    ];
    return [
      { source: '/(.*)', headers: security },
      { source: '/assets/:path*', headers: cache },
    ];
  },
};

export default nextConfig;
