import type { MetadataRoute } from 'next';

// Demonstração: bloqueia todos os buscadores até a aprovação da cliente.
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: '*', disallow: '/' }] };
}
