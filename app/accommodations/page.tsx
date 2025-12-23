import { getPublishedHouses, getRegionsWithCounts } from '@/lib/supabase/houses';
import Link from 'next/link';
import Image from 'next/image';

export default async function AccommodationsPage() {
  const houses = await getPublishedHouses();
  const regions = await getRegionsWithCounts();

  // Group houses by region
  const housesByRegion = new Map<string, typeof houses>();
  houses.forEach(house => {
    const region = house.region || 'Unknown';
    if (!housesByRegion.has(region)) {
      housesByRegion.set(region, []);
    }
    housesByRegion.get(region)!.push(house);
  });

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Hen Party Accommodations
          </h1>
          <p className="text-xl md:text-2xl">
            Life Drawing Entertainment at Beautiful Locations Across the UK
          </p>
        </div>
      </section>

      {/* Regions Navigation */}
      {regions.length > 0 && (
        <section className="bg-white py-8 border-b border-gray-200">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4">Browse by Region</h2>
            <div className="flex flex-wrap gap-2">
              {regions.map(({ region, count }) => (
                <Link
                  key={region}
                  href={`/regions/${encodeURIComponent(region)}`}
                  className="bg-primary/10 text-primary px-4 py-2 rounded-md hover:bg-primary/20 transition-colors"
                >
                  {region} ({count})
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Houses Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">All Accommodations</h2>
          
          {houses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">No accommodations available at the moment.</p>
            </div>
          ) : (
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
                    {house.region && (
                      <p className="text-muted-foreground text-xs mb-3">{house.region}</p>
                    )}
                    {house.description && (
                      <p className="text-foreground text-sm line-clamp-3">{house.description}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

