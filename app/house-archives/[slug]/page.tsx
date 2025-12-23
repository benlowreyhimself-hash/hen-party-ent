import { notFound } from "next/navigation";
import { getHouseBySlug, getAllHouseSlugs, type House } from "@/data/houses";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ContactLink from "@/components/ContactLink";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Force dynamic rendering - prevent static generation
export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const slugs = getAllHouseSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const house = getHouseBySlug(slug);
  
  if (!house) {
    return {
      title: "House Not Found",
    };
  }

  return {
    title: house.seoTitle || house.title,
    description: house.seoDescription || house.description,
    openGraph: {
      title: house.seoTitle || house.title,
      description: house.seoDescription || house.description,
      type: "website",
    },
  };
}

export default async function HousePage({ params }: PageProps) {
  const { slug } = await params;
  const house = getHouseBySlug(slug);

  if (!house) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: house.title,
    description: house.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: house.location,
      addressCountry: "GB",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 py-16">
        <Link 
          href="/house-archives" 
          className="text-primary hover:underline mb-6 inline-block"
        >
          ← Back to House Archives
        </Link>
        
        <h1 className="text-4xl font-bold mb-4">{house.title}</h1>
        
        <div className="mb-6">
          <p className="text-lg text-muted-foreground">
            <strong>Location:</strong> {house.location}
            {house.address && (
              <>
                <br />
                <strong>Address:</strong> {house.address}
              </>
            )}
          </p>
        </div>

        {house.image && (
          <div className="relative h-[400px] rounded-lg overflow-hidden mb-8">
            <Image
              src={house.image}
              alt={house.title}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none mb-8">
            <div dangerouslySetInnerHTML={{ __html: house.content }} />
          </div>

          {house.features && house.features.length > 0 && (
            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Venue Features</h2>
              <ul className="space-y-2">
                {house.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Book Life Drawing Entertainment</h2>
            <p className="text-muted-foreground mb-4">
              Interested in booking life drawing entertainment for your hen party at {house.title}? 
              Contact us to discuss your requirements and check availability.
            </p>
            <div className="space-y-2 mb-4">
              <p>
                <strong>Phone:</strong>{" "}
                <ContactLink type="phone" value="07747571426" className="text-primary hover:underline">
                  07747571426
                </ContactLink>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <ContactLink type="email" value="ben@henpartyentertainment.co.uk" className="text-primary hover:underline">
                  ben@henpartyentertainment.co.uk
                </ContactLink>
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

