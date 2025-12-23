import { notFound } from 'next/navigation';
import { getHouseBySlug, getAllHouses } from '@/lib/supabase/houses';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import ContactLink from '@/components/ContactLink';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Use admin client for static generation (no cookies needed)
  const houses = await getAllHouses();
  // Only generate static params for published houses
  return houses
    .filter(house => house.is_published)
    .map((house) => ({
      slug: house.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  // Use admin client for metadata generation (no cookies needed)
  const allHouses = await getAllHouses();
  const house = allHouses.find(h => h.slug === slug && h.is_published);

  if (!house) {
    return {
      title: 'House Not Found',
    };
  }

  return {
    title: house.meta_title || `${house.title} | Hen Party Life Drawing Entertainment`,
    description: house.meta_description || house.description || `Hen party life drawing entertainment at ${house.title} in ${house.location}. Professional male model for your hen party celebration.`,
  };
}

export default async function AccommodationPage({ params }: PageProps) {
  const { slug } = await params;
  const house = await getHouseBySlug(slug);

  if (!house) {
    notFound();
  }

  const photos = [
    house.image_url,
    house.photo_1_url,
    house.photo_2_url,
    house.photo_3_url,
  ].filter(Boolean) as string[];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center">
        {house.image_url && (
          <div className="absolute inset-0">
            <Image
              src={house.image_url}
              alt={house.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-primary/60"></div>
          </div>
        )}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{house.title}</h1>
          <p className="text-xl md:text-2xl">{house.location}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Location Info */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Location Information</h2>
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-foreground mb-2">
                  <strong>Location:</strong> {house.location}
                </p>
                {house.postcode && (
                  <p className="text-foreground mb-2">
                    <strong>Postcode:</strong> {house.postcode}
                  </p>
                )}
                {house.address && (
                  <p className="text-foreground mb-2">
                    <strong>Address:</strong> {house.address}
                  </p>
                )}
                {house.region && (
                  <p className="text-foreground">
                    <strong>Region:</strong> {house.region}
                  </p>
                )}
              </div>
            </div>

            {/* Photos Gallery */}
            {photos.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Photos</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {photos.slice(0, 3).map((photo, index) => (
                    <div key={index} className="relative h-[300px] rounded-lg overflow-hidden">
                      <Image
                        src={photo}
                        alt={`${house.title} - Photo ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {house.description && (
              <div className="mb-8">
                <p className="text-lg text-foreground leading-relaxed">{house.description}</p>
              </div>
            )}

            {/* Sales Content */}
            {house.content && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Hen Party Life Drawing Entertainment</h2>
                <div className="prose prose-lg max-w-none">
                  <div className="text-foreground whitespace-pre-line">{house.content}</div>
                </div>
              </div>
            )}

            {/* Features */}
            {house.features && house.features.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Accommodation Features</h2>
                <ul className="space-y-2">
                  {house.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Booking & Contact */}
            <div className="bg-primary/10 border border-primary rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Book Your Hen Party Entertainment</h2>
              <p className="text-foreground mb-4">
                Interested in booking life drawing entertainment for your hen party at {house.title}? 
                Contact us to discuss your requirements and check availability.
              </p>
              <div className="space-y-2 mb-4">
                <p>
                  <strong>Phone:</strong>{" "}
                  <ContactLink type="phone" value="07747571426" className="text-primary hover:underline">
                    07747571426
                  </ContactLink>
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <ContactLink type="email" value="ben@henpartyentertainment.co.uk" className="text-primary hover:underline">
                    ben@henpartyentertainment.co.uk
                  </ContactLink>
                </p>
              </div>
              {house.booking_url && (
                <div className="mt-4">
                  <a
                    href={house.booking_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
                  >
                    View Accommodation on Booking Site
                  </a>
                </div>
              )}
            </div>

            {/* Google Maps */}
            {house.google_maps_url && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Location Map</h2>
                <a
                  href={house.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  View on Google Maps →
                </a>
              </div>
            )}

            {/* Back to Listings */}
            <div className="text-center">
              <Link
                href="/accommodations"
                className="text-primary hover:underline"
              >
                ← View All Accommodations
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

