import { getFeaturedHouses } from '@/lib/supabase/houses';
import Link from 'next/link';
import Image from 'next/image';

export default async function VenuesList() {
  // Optimized: Only fetch 6 houses needed for homepage (not all 871)
  const houses = await getFeaturedHouses(6);
  
  // Show featured houses first, then others
  const featuredHouses = houses.filter(h => h.is_featured).slice(0, 3);
  const otherHouses = houses.filter(h => !h.is_featured).slice(0, 3);
  const displayHouses = [...featuredHouses, ...otherHouses].slice(0, 6);

  if (displayHouses.length === 0) {
    // Fallback to static houses if no Supabase houses yet
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-muted-foreground text-center">No accommodations available yet.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-4 max-w-4xl mx-auto">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> These venues are places where Ben has provided life drawing services in the past. 
          Ben travels to your location - you book your own accommodation and Ben comes to you.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayHouses.map((house) => (
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
            <h4 className="text-xl font-semibold mb-2 text-primary hover:underline">
              {house.title}
            </h4>
            <p className="text-muted-foreground text-sm mb-3">{house.location}</p>
            {house.description && (
              <p className="text-foreground text-sm line-clamp-3">{house.description}</p>
            )}
          </div>
        </Link>
      ))}
    </div>
    </>
  );
}

