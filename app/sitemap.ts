import { MetadataRoute } from 'next';
import { getPublishedHouseSlugs } from '@/lib/supabase/houses';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://henpartyentertainment.co.uk';

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
    '/hen-party-games',
    '/popular',
    '/unique-hen-do-ideas',
    '/hen-party-life-drawing-bristol',
    '/hen-party-life-drawing-bath',
    '/hen-party-life-drawing-london',
    '/hen-party-life-drawing-cardiff',
    '/hen-party-life-drawing-brighton',
    '/hen-party-life-drawing-oxford',
    '/hen-party-life-drawing-bournemouth',
    '/hen-party-life-drawing-southampton',
    '/hen-party-life-drawing-cheltenham',
    '/hen-party-life-drawing-gloucester',
    '/hen-party-life-drawing-swindon',
    '/hen-party-life-drawing-exeter',
    '/hen-party-life-drawing-newquay',
    '/hen-party-life-drawing-portsmouth',
    '/hen-party-life-drawing-swansea',
    '/hen-party-life-drawing-tenby',
    '/hen-party-life-drawing-cotswolds',
    '/hen-party-life-drawing-newport',
    '/hen-party-life-drawing-taunton',
    '/hen-party-life-drawing-glastonbury',
    '/hen-party-life-drawing-frome',
    '/hen-party-life-drawing-wells',
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

  return [...routes, ...accommodationRoutes];
}

