import { House } from '@/lib/supabase/houses';

interface StructuredDataProps {
  house: House;
}

export default function StructuredData({ house }: StructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hen-party-ent.vercel.app';
  const url = `${baseUrl}/accommodations/${house.slug}`;

  const structuredData: any = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: house.title,
    description: house.description || `Hen party life drawing entertainment at ${house.title}`,
    url,
    telephone: '+447747571426',
    email: 'ben@henpartyentertainment.co.uk',
    priceRange: '££',
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
    serviceType: 'Hen Party Life Drawing Entertainment',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '50+',
      bestRating: '5',
      worstRating: '1',
    },
  };

  // Add optional fields only if they exist
  if (house.image_url) {
    structuredData.image = [house.image_url];
  }

  if (house.address || house.location || house.postcode) {
    structuredData.address = {
      '@type': 'PostalAddress',
      addressLocality: house.location,
      postalCode: house.postcode,
      addressCountry: 'GB',
    };
    if (house.address) {
      structuredData.address.streetAddress = house.address;
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

