import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      // Vercel Blob Storage (primary, reliable)
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: '*.blob.vercel-storage.com',
      },
      // WordPress URLs (fallback during migration)
      {
        protocol: 'https',
        hostname: 'henpartyentertainment.co.uk',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'i0.wp.com',
        pathname: '/henpartyentertainment.co.uk/wp-content/uploads/**',
      },
      // Enriched Property Hostnames
      {
        protocol: 'https',
        hostname: 'cf.bstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'a0.muscache.com',
      },
      {
        protocol: 'https',
        hostname: 'www.sleeps12.com',
      },
      {
        protocol: 'https',
        hostname: 'www.holidaycottages.co.uk',
      },
      {
        protocol: 'https',
        hostname: 'www.sykescottages.co.uk',
      },
      {
        protocol: 'https',
        hostname: 'no15greatpulteneystreet.co.uk',
      },
      {
        protocol: 'https',
        hostname: 'themanorpettyfrance.co.uk',
      },
      {
        protocol: 'https',
        hostname: 'www.beaunash.co.uk',
      },
      {
        protocol: 'https',
        hostname: 'www.thevenuescollection.co.uk',
      },
      {
        protocol: 'https',
        hostname: 'themanorpettyfrance.co.uk',
      },
      {
        protocol: 'https',
        hostname: 'no15greatpulteneystreet.co.uk',
      },
      {
        protocol: 'https',
        hostname: 'www.blenheim-barns.co.uk',
      },
      {
        protocol: 'https',
        hostname: 'xirtgqglzsghphhihrcr.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      // Catch-all for any HTTPS accommodation images
      // (Since accommodations come from various booking platforms)
      {
        protocol: 'https',
        hostname: '**',
      },
      // Support HTTP images (older accommodation listings)
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  // Enable static optimization
  output: 'standalone',
  // Disable static optimization for pages with client components that have event handlers
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
