"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Grid3x3, List, Filter, MapPin, Calendar, CheckCircle } from 'lucide-react';
import { trackAccommodationFilter } from '@/lib/analytics';
import AccommodationMap from '@/components/AccommodationMap';

interface Accommodation {
  id: string;
  title: string;
  slug: string;
  location: string;
  region: string | null;
  image_url: string | null;
  description: string | null;
  sleeps: string | null;
  address: string | null;
  ben_visited_dates: string[] | null;
  has_affiliate_relationship: boolean;
  owner_approved: boolean;
}

export default function AccommodationsPageContent() {
  const [houses, setHouses] = useState<Accommodation[]>([]);
  const [regions, setRegions] = useState<Array<{ region: string; count: number }>>([]);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [housesRes, regionsRes] = await Promise.all([
          fetch('/api/accommodations'),
          fetch('/api/accommodations/regions'),
        ]);

        if (!housesRes.ok) throw new Error(`Accommodations API Error: ${housesRes.status}`);
        if (!regionsRes.ok) throw new Error(`Regions API Error: ${regionsRes.status}`);

        const housesData = await housesRes.json();
        const regionsData = await regionsRes.json();

        setHouses(housesData.houses || []);
        setRegions(regionsData.regions || []);
      } catch (error: any) {
        console.error('Error loading accommodations:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredHouses = selectedRegion
    ? houses.filter(h => h.region === selectedRegion)
    : houses;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getLatestVisitDate = (dates: string[] | null) => {
    if (!dates || dates.length === 0) return null;
    const sorted = [...dates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    return sorted[0];
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading accommodations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }



  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://xirtgqglzsghphhihrcr.supabase.co/storage/v1/object/public/hen-party-media/originals/hero-hen-party-group-drawing-class.jpg"
            alt="Hen Party Life Drawing Hero"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md">
            Venues Where Ben Has Performed
          </h1>
          <p className="text-xl md:text-2xl mb-4 drop-shadow-md">
            Life Drawing Entertainment at Beautiful Locations Across the UK
          </p>
          <p className="text-lg opacity-90 drop-shadow-sm max-w-2xl mx-auto">
            These are past locations where Ben has provided life drawing services.
            Ben travels to your location - this is a mobile service.
          </p>
        </div>
      </section>

      {/* Filters & View Toggle */}
      <section className="bg-white py-6 border-b border-gray-200 sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Region Filter */}
            <div className="flex items-center gap-4 flex-wrap">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <button
                onClick={() => {
                  setSelectedRegion(null);
                  trackAccommodationFilter('region', 'all');
                }}
                className={`px-4 py-2 rounded-md transition-colors ${selectedRegion === null
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                All Regions ({houses.length})
              </button>
              {regions.map(({ region, count }) => (
                <button
                  key={region}
                  onClick={() => {
                    setSelectedRegion(region);
                    trackAccommodationFilter('region', region);
                  }}
                  className={`px-4 py-2 rounded-md transition-colors ${selectedRegion === region
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {region} ({count})
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => {
                  setViewMode('grid');
                  trackAccommodationFilter('view_mode', 'grid');
                }}
                className={`p-2 rounded transition-colors ${viewMode === 'grid'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
                aria-label="Grid view"
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  setViewMode('list');
                  trackAccommodationFilter('view_mode', 'list');
                }}
                className={`p-2 rounded transition-colors ${viewMode === 'list'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
                aria-label="List view"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Accommodations Display */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {filteredHouses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">
                {selectedRegion
                  ? `No accommodations found in ${selectedRegion}.`
                  : 'No accommodations available at the moment.'}
              </p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHouses.map((house) => {
                const latestVisit = getLatestVisitDate(house.ben_visited_dates);
                return (
                  <Link
                    key={house.id}
                    href={`/accommodations/${house.slug}`}
                    className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-48 bg-slate-100">
                      {house.image_url ? (
                        <Image
                          src={house.image_url}
                          alt={house.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                          <Image
                            src="https://xirtgqglzsghphhihrcr.supabase.co/storage/v1/object/public/hen-party-media/originals/hen-party-hen-party-drawing-ladies-9y7r.jpeg"
                            alt="Generic House Placeholder"
                            fill
                            className="object-cover opacity-50 grayscale"
                          />
                          <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                            <span className="bg-white/90 px-3 py-1 rounded text-sm font-medium shadow-sm">
                              Image Coming Soon
                            </span>
                          </div>
                        </div>
                      )}
                      {house.has_affiliate_relationship && (
                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded z-10">
                          Affiliate
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      {/* Primary Info: Sleeps and Location */}
                      <div className="mb-4">
                        <div className="flex items-center gap-4 mb-2">
                          {house.sleeps && (
                            <div className="text-2xl font-bold text-primary">
                              Sleeps {house.sleeps}
                            </div>
                          )}
                          <div className="flex items-center gap-1 text-lg font-semibold text-foreground">
                            <MapPin className="w-5 h-5 text-primary" />
                            <span>{house.location}</span>
                          </div>
                        </div>
                        {house.region && (
                          <div className="text-sm text-muted-foreground mb-2">
                            {house.region}
                          </div>
                        )}
                      </div>

                      {/* Secondary Info: Address/House Name */}
                      <div className="mb-3">
                        <h3 className="text-lg font-medium text-foreground mb-1">
                          {house.title}
                        </h3>
                        {house.address && (
                          <p className="text-sm text-muted-foreground">
                            {house.address}
                          </p>
                        )}
                      </div>

                      {/* Owner Approval Badge */}
                      {house.owner_approved && (
                        <div className="flex items-center gap-1 mb-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-xs text-muted-foreground">Owner Approved</span>
                        </div>
                      )}
                      {latestVisit && (
                        <div className="flex items-center gap-2 text-sm text-primary mb-3">
                          <Calendar className="w-4 h-4" />
                          <span>Ben visited: {formatDate(latestVisit)}</span>
                          {house.ben_visited_dates && house.ben_visited_dates.length > 1 && (
                            <span className="text-xs text-muted-foreground">
                              ({house.ben_visited_dates.length} visits)
                            </span>
                          )}
                        </div>
                      )}
                      {house.description && (
                        <p className="text-foreground text-sm line-clamp-3">{house.description}</p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredHouses.map((house) => {
                const latestVisit = getLatestVisitDate(house.ben_visited_dates);
                return (
                  <Link
                    key={house.id}
                    href={`/accommodations/${house.slug}`}
                    className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex flex-col md:flex-row"
                  >
                    <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0 bg-slate-100">
                      {house.image_url ? (
                        <Image
                          src={house.image_url}
                          alt={house.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 256px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                          <Image
                            src="https://xirtgqglzsghphhihrcr.supabase.co/storage/v1/object/public/hen-party-media/originals/hen-party-hen-party-drawing-ladies-9y7r.jpeg"
                            alt="Generic House Placeholder"
                            fill
                            className="object-cover opacity-50 grayscale"
                          />
                          <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                            <span className="bg-white/90 px-3 py-1 rounded text-sm font-medium shadow-sm">
                              Image Coming Soon
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex-1">
                      {/* Primary Info: Sleeps and Location */}
                      <div className="mb-3">
                        <div className="flex items-center gap-4 mb-2">
                          {house.sleeps && (
                            <div className="text-2xl font-bold text-primary">
                              Sleeps {house.sleeps}
                            </div>
                          )}
                          <div className="flex items-center gap-1 text-lg font-semibold text-foreground">
                            <MapPin className="w-5 h-5 text-primary" />
                            <span>{house.location}</span>
                          </div>
                        </div>
                        {house.region && (
                          <div className="text-sm text-muted-foreground">
                            {house.region}
                          </div>
                        )}
                      </div>

                      {/* Secondary Info: Address/House Name */}
                      <div className="mb-3">
                        <h3 className="text-lg font-medium text-foreground mb-1">
                          {house.title}
                        </h3>
                        {house.address && (
                          <p className="text-sm text-muted-foreground">
                            {house.address}
                          </p>
                        )}
                      </div>

                      {/* Badges */}
                      <div className="flex items-center gap-2 mb-3">
                        {house.has_affiliate_relationship && (
                          <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                            Affiliate
                          </span>
                        )}
                        {house.owner_approved && (
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-xs text-muted-foreground">Owner Approved</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-muted-foreground text-sm mb-3">
                        {latestVisit && (
                          <div className="flex items-center gap-1 text-primary">
                            <Calendar className="w-4 h-4" />
                            <span>Ben visited: {formatDate(latestVisit)}</span>
                            {house.ben_visited_dates && house.ben_visited_dates.length > 1 && (
                              <span className="text-xs text-muted-foreground ml-1">
                                ({house.ben_visited_dates.length} visits)
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      {house.description && (
                        <p className="text-foreground">{house.description}</p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Map Section */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Accommodation Locations Map</h2>
            <AccommodationMap accommodations={filteredHouses} height="600px" />
          </div>
        </div>
      </section>
    </div>
  );
}

