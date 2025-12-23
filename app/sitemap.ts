import { MetadataRoute } from 'next';
import { getAllHouseSlugs } from '@/data/houses';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hen-party-ent.vercel.app';
  const houseSlugs = getAllHouseSlugs();

  const routes = [
    '',
    '/reviews',
    '/photos',
    '/prices',
    '/about-ben',
    '/contact',
    '/house-archives',
    '/locations/bath',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const houseRoutes = houseSlugs.map((slug) => ({
    url: `${baseUrl}/house-archives/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...houseRoutes];
}

