"use client";

import ContactLink from "@/components/ContactLink";

export default function BathLocationPageContent() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Bath Location</h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-card border border-border rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Hen Party Life Drawing in Bath</h2>
          <p className="text-muted-foreground mb-4">
            Bath is a beautiful and popular destination for hen parties, and we're delighted to offer our 
            life drawing entertainment services in this historic city.
          </p>
          <p className="text-muted-foreground mb-4">
            Whether you're staying in a hotel, Airbnb, or private accommodation, we can bring the life 
            drawing experience directly to you.
          </p>
          <p className="text-muted-foreground">
            Our sessions are perfect for groups looking for a unique and memorable activity during their 
            hen party celebration in Bath.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">What's Included</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-foreground">Professional life drawing session</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-foreground">All art materials provided</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-foreground">Travel to your location in Bath</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-foreground">Flexible session times</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Booking</h3>
            <p className="text-muted-foreground mb-4">
              To book a life drawing session for your hen party in Bath, please contact us:
            </p>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                <ContactLink type="phone" value="07747571426" className="text-primary hover:underline">
                  07747571426
                </ContactLink>
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                <ContactLink type="email" value="ben@henpartyentertainment.co.uk" className="text-primary hover:underline">
                  ben@henpartyentertainment.co.uk
                </ContactLink>
              </p>
            </div>
            <a
              href="/contact"
              className="mt-4 inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

