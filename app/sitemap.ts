import { MetadataRoute } from 'next';
import { getPublishedHouseSlugs } from '@/lib/supabase/houses';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hen-party-ent.vercel.app';
  
  // Get all published accommodation slugs from Supabase
  const accommodationSlugs = await getPublishedHouseSlugs();

  // Static pages
  const routes = [
    '',
    '/reviews',
    '/photos',
    '/prices',
    '/about-ben',
    '/contact',
    '/accommodations',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Individual accommodation pages (high priority for SEO)
  const accommodationRoutes = accommodationSlugs.map((slug) => ({
    url: `${baseUrl}/accommodations/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9, // High priority for individual property pages
  }));

  // Region pages (if we have regions)
  const regionRoutes = [
    '/regions/south-west',
    '/regions/south-east',
    '/regions/london',
    '/regions/midlands',
    '/regions/north',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...accommodationRoutes, ...regionRoutes];
}

