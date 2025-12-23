import { notFound } from 'next/navigation';
import { getHouseBySlug, getAllHouses } from '@/lib/supabase/houses';
import type { Metadata } from 'next';
import AccommodationDetailsContent from '@/components/AccommodationDetailsContent';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const houses = await getAllHouses();
  // Only generate static params for published houses with at least one booking link
  return houses
    .filter(house => house.is_published && (
      house.website_url || house.airbnb_url || house.booking_com_url || house.vrbo_url || house.other_booking_url
    ))
    .map((house) => ({
      slug: house.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hen-party-ent.vercel.app';
  const house = await getHouseBySlug(slug);

  if (!house) {
    return {
      title: 'Accommodation Not Found',
    };
  }

  const title = house.meta_title || `${house.title} | Hen Party Life Drawing Entertainment`;
  const description = house.meta_description || house.description || `Hen party life drawing entertainment at ${house.title} in ${house.location}. Professional male model for your hen party celebration.`;
  const url = `${baseUrl}/accommodations/${slug}`;
  const imageUrl = house.image_url || `${baseUrl}/favicon.ico`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Hen Party Entertainment',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: house.title,
        },
      ],
      locale: 'en_GB',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function AccommodationPage({ params }: PageProps) {
  const { slug } = params;
  const house = await getHouseBySlug(slug);

  if (!house) {
    notFound();
  }

  return <AccommodationDetailsContent house={house} />;
}

