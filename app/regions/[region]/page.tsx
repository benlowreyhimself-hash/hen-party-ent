import { getHousesByRegion } from '@/lib/supabase/houses';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ region: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { region } = await params;
  const decodedRegion = decodeURIComponent(region);
  
  return {
    title: `Hen Party Life Drawing in ${decodedRegion} | Hen Party Entertainment`,
    description: `Hen party life drawing entertainment services in ${decodedRegion}. Professional male model for hen party celebrations at beautiful accommodations.`,
  };
}

export default async function RegionPage({ params }: PageProps) {
  const { region } = await params;
  const decodedRegion = decodeURIComponent(region);
  const houses = await getHousesByRegion(decodedRegion);

  if (houses.length === 0) {
    notFound();
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Hen Party Life Drawing in {decodedRegion}
          </h1>
          <p className="text-xl md:text-2xl">
            {houses.length} {houses.length === 1 ? 'accommodation' : 'accommodations'} available
          </p>
        </div>
      </section>

      {/* Houses Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {houses.map((house) => (
              <Link
                key={house.id}
                href={`/accommodations/${house.slug}`}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {house.image_url && (
                  <div className="relative h-48">
                    <Image
                      src={house.image_url}
                      alt={house.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-primary hover:underline">
                    {house.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-2">{house.location}</p>
                  {house.postcode && (
                    <p className="text-muted-foreground text-xs mb-3">{house.postcode}</p>
                  )}
                  {house.description && (
                    <p className="text-foreground text-sm line-clamp-3">{house.description}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Back Link */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <Link
            href="/accommodations"
            className="text-primary hover:underline"
          >
            ← View All Accommodations
          </Link>
        </div>
      </section>
    </div>
  );
}

