import { Suspense } from "react";
import ContactPageContent from "@/components/ContactPageContent";

// Force dynamic rendering - prevent static generation
export const dynamic = 'force-dynamic';

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <ContactPageContent />
    </Suspense>
  );
}
