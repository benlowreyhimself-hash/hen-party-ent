import { Suspense } from "react";
import ReviewsPageContent from "@/components/ReviewsPageContent";

// Force dynamic rendering to prevent prerendering issues
export const dynamic = 'force-dynamic';

export default function ReviewsPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground">Loading reviews...</p>
        </div>
      </div>
    }>
      <ReviewsPageContent />
    </Suspense>
  );
}
