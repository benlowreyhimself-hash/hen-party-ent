import PhotosPageContent from "@/components/PhotosPageContent";

// Prevent static generation - page uses client-side interactivity
export const dynamic = 'force-dynamic';

export default function PhotosPage() {
  return <PhotosPageContent />;
}
