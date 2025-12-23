import Link from "next/link";

// Force dynamic rendering to prevent prerendering issues
export const dynamic = 'force-dynamic';

export default function HouseArchivesPage() {
  const archives = [
    {
      title: "Church Farm Barn",
      slug: "church-farm-barn",
    },
    {
      title: "Forest Holiday Hen Party Activity Life Drawing Nude Model – Forest of Dean",
      slug: "forest-holiday",
    },
    {
      title: "Hen Party Activities & Entertainment at Cotswold Manor Estate, Lew Bampton, Oxfordshire, OX18 2B",
      slug: "cotswold-manor",
    },
    {
      title: "Fun Hen Party Activities near Bath. Georgian Farm House and Cottages, Frome Rd, BA14.",
      slug: "georgian-farm-house",
    },
    {
      title: "Hen Party Activities – Petite France – Bodkin House Hotel",
      slug: "petite-france",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">House Archives</h1>
      
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-muted-foreground mb-12">
          Browse our archive of hen party venues and locations where we've provided life drawing entertainment.
        </p>
        
        <div className="space-y-4">
          {archives.map((archive, index) => (
            <Link
              key={index}
              href={`/house-archives/${archive.slug}`}
              className="block bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold text-primary hover:underline">
                {archive.title}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

