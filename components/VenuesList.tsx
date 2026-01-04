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
      <div className="flex flex-col gap-3">
        {displayHouses.map((house) => (
          <Link
            key={house.id}
            href={`/accommodations/${house.slug}`}
            className="group flex items-center gap-4 p-3 bg-white border border-slate-200 rounded-lg hover:border-primary/50 hover:shadow-sm transition-all"
          >
            {house.image_url && (
              <div className="relative w-24 h-20 flex-shrink-0 rounded-md overflow-hidden bg-slate-100">
                <Image
                  src={house.image_url}
                  alt={house.title}
                  fill
                  sizes="96px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="flex-grow min-w-0">
              <div className="flex justify-between items-start gap-2">
                <h4 className="font-semibold text-gray-900 group-hover:text-primary transition-colors truncate">
                  {house.title}
                </h4>
                <span className="text-xs font-medium px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full whitespace-nowrap">
                  {house.location}
                </span>
              </div>
              {house.sleeps && (
                <p className="text-xs text-primary font-medium mt-0.5">Sleeps {house.sleeps}</p>
              )}
              {house.description && (
                <p className="text-slate-500 text-xs line-clamp-2 mt-1 leading-relaxed">
                  {house.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

