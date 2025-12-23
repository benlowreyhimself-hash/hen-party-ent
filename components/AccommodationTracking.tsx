"use client";

import { useEffect } from "react";
import { trackAccommodationView } from "@/lib/analytics";

interface AccommodationTrackingProps {
  accommodationName: string;
  slug: string;
}

/**
 * Client component to track accommodation page views
 * Must be used in a client component or page
 */
export default function AccommodationTracking({
  accommodationName,
  slug,
}: AccommodationTrackingProps) {
  useEffect(() => {
    trackAccommodationView(accommodationName, slug);
  }, [accommodationName, slug]);

  return null; // This component doesn't render anything
}

