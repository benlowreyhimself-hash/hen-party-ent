import { Suspense } from "react";
import AccommodationsPageContent from "@/components/AccommodationsPageContent";

// Force dynamic rendering - prevent static generation
export const dynamic = 'force-dynamic';

export default function AccommodationsPage() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading accommodations...</p>
        </div>
      </div>
    }>
      <AccommodationsPageContent />
    </Suspense>
  );
}
