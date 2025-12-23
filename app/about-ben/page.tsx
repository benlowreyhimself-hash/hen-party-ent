import AboutBenPageContent from "@/components/AboutBenPageContent";

// Prevent static generation - page uses client-side interactivity
export const dynamic = 'force-dynamic';

export default function AboutBenPage() {
  return <AboutBenPageContent />;
}

