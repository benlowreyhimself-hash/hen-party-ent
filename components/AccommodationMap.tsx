"use client";

import { useEffect, useState } from 'react';

interface Accommodation {
  id: string;
  title: string;
  slug: string;
  location: string;
  address?: string | null;
  postcode?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  google_maps_url?: string | null;
}

interface AccommodationMapProps {
  accommodations?: Accommodation[];
  height?: string;
}

export default function AccommodationMap({ accommodations: propAccommodations, height = "600px" }: AccommodationMapProps) {
  const [accommodations, setAccommodations] = useState<Accommodation[]>(propAccommodations || []);
  const [loading, setLoading] = useState(!propAccommodations);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    if (propAccommodations) {
      setAccommodations(propAccommodations);
      setLoading(false);
      return;
    }

    // Fetch accommodations if not provided
    async function loadAccommodations() {
      try {
        const response = await fetch('/api/accommodations');
        const data = await response.json();
        setAccommodations(data.houses || []);
      } catch (error) {
        console.error('Error loading accommodations:', error);
        setMapError('Failed to load accommodations');
      } finally {
        setLoading(false);
      }
    }

    loadAccommodations();
  }, [propAccommodations]);

  // Geocode addresses that don't have coordinates
  useEffect(() => {
    if (loading || accommodations.length === 0) return;

    const geocodeAccommodations = async () => {
      const needsGeocoding = accommodations.filter(acc => !acc.latitude || !acc.longitude);
      
      if (needsGeocoding.length === 0) {
        // All have coordinates, render map
        return;
      }

      // For now, we'll use a simple approach: try to extract coordinates from Google Maps URLs
      // or use postcode-based geocoding
      // In production, you'd want to use Google Geocoding API or store coordinates in database
      
      // Placeholder: We'll render the map with available coordinates
      // and show a message for accommodations without coordinates
    };

    geocodeAccommodations();
  }, [accommodations, loading]);

  if (loading) {
    return (
      <div className="w-full bg-gray-100 rounded-lg flex items-center justify-center" style={{ height }}>
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    );
  }

  if (mapError) {
    return (
      <div className="w-full bg-gray-100 rounded-lg flex items-center justify-center" style={{ height }}>
        <p className="text-red-600">{mapError}</p>
      </div>
    );
  }

  // Filter accommodations with valid coordinates or Google Maps URLs
  const mappableAccommodations = accommodations.filter(
    acc => (acc.latitude && acc.longitude) || (acc.google_maps_url && acc.google_maps_url.length > 0)
  );

  if (mappableAccommodations.length === 0) {
    return (
      <div className="w-full bg-gray-100 rounded-lg flex items-center justify-center p-8" style={{ height }}>
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No accommodations with location data available.</p>
          <p className="text-sm text-muted-foreground">
            Accommodations will appear on the map once location data is available.
          </p>
        </div>
      </div>
    );
  }

  // Use Google Maps Embed API for simplicity (no API key required for basic embeds)
  // For interactive maps, you'd use Google Maps JavaScript API or Leaflet
  return (
    <div className="w-full rounded-lg overflow-hidden border border-border" style={{ height }}>
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}&center=51.4545,-2.5879&zoom=7`}
      />
      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> This map shows the general area. Click on individual accommodations to see exact locations and get directions.
        </p>
        <p className="text-sm text-blue-800 mt-2">
          Showing {mappableAccommodations.length} of {accommodations.length} accommodations with location data.
        </p>
      </div>
    </div>
  );
}

