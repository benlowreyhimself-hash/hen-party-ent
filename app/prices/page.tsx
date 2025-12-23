import PricingCards from "@/components/PricingCards";

// Force dynamic rendering to prevent prerendering issues
export const dynamic = 'force-dynamic';

export default function PricesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Prices</h1>
      <PricingCards showContact={true} />
    </div>
  );
}
