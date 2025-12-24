"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ContactLink from '@/components/ContactLink';
import StructuredData from '@/components/StructuredData';
import AccommodationTracking from '@/components/AccommodationTracking';
import OutboundLink from '@/components/OutboundLink';
import { BookingLinkType, getAllBookingLinks } from '@/lib/utils/booking-links';
import EnquiryModal from '@/components/EnquiryModal';
import { Button } from '@/components/ui/button';

interface AccommodationDetailsContentProps {
  house: {
    id: string;
    title: string;
    slug: string;
    location: string;
    region: string | null;
    address: string | null;
    postcode: string | null;
    description: string | null;
    content: string | null;
    features: string[] | null;
    image_url: string | null;
    photo_1_url: string | null;
    photo_2_url: string | null;
    photo_3_url: string | null;
    google_maps_url: string | null;
    website_url: string | null;
    airbnb_url: string | null;
    booking_com_url: string | null;
    vrbo_url: string | null;
    other_booking_url: string | null;
    sleeps: string | null;
    meta_title: string | null;
    meta_description: string | null;
    is_published: boolean;
    is_featured: boolean;
    address_verified: boolean;
    booking_links_found: boolean;
    photos_extracted: boolean;
    content_generated: boolean;
    enrichment_complete: boolean;
    booking_url: string | null;
    ben_visited_dates: string[] | null;
    has_affiliate_relationship: boolean;
    owner_approved: boolean;
    owner_contact_info: string | null;
    owner_notes: string | null;
  };
}

export default function AccommodationDetailsContent({ house }: AccommodationDetailsContentProps) {
  // Get all booking links for tracking
  const bookingLinks = getAllBookingLinks(house);

  const photos = [
    house.image_url,
    house.photo_1_url,
    house.photo_2_url,
    house.photo_3_url,
  ].filter(Boolean) as string[];

  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  // Affiliate link precedence: explicit affiliate link > generic booking link
  const primaryBookingLink = house.affiliate_link || (bookingLinks.length > 0 ? bookingLinks[0].url : null);


  return (
    <>
      <StructuredData house={house as any} />
      <AccommodationTracking accommodationName={house.title} slug={house.slug} />
      <div className="w-full">
        {/* Hero Section */}
        <section className="relative h-[400px] flex items-center justify-center">
          {house.image_url && (
            <div className="absolute inset-0">
              <Image
                src={house.image_url}
                alt={house.title}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-primary/60"></div>
            </div>
          )}
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{house.title}</h1>
            <p className="text-xl md:text-2xl">{house.location}</p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Verification Status */}
              {bookingLinks.length > 0 && (
                <div className="mb-8 bg-green-50 border-2 border-green-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">✓</span>
                    <h2 className="text-xl font-semibold text-green-900">Verified Holiday Accommodation</h2>
                  </div>
                  <p className="text-green-800 mb-3">
                    This property has been verified as a public holiday accommodation with booking links available.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {bookingLinks.map((link, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm font-medium">
                        {link.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Mobile Service Disclaimer */}
              <div className="mb-8 bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-blue-900 mb-3">📱 Mobile Service</h2>
                <p className="text-blue-800 mb-2">
                  <strong>Ben travels to your location</strong> - this is a mobile service. Ben does not organize or book venues.
                </p>
                <p className="text-blue-800">
                  This venue is a place where Ben has provided life drawing services in the past.
                  You book your own accommodation, and Ben travels to you to provide the entertainment.
                </p>
              </div>

              {/* Location Info */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Location Information</h2>
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-foreground mb-2">
                        <strong>Location:</strong> {house.location}
                      </p>
                      {house.region && (
                        <p className="text-foreground mb-2">
                          <strong>Region:</strong> {house.region}
                        </p>
                      )}
                      {house.postcode && (
                        <p className="text-foreground mb-2">
                          <strong>Postcode:</strong> {house.postcode}
                        </p>
                      )}
                    </div>
                    <div>
                      {house.sleeps && (
                        <p className="text-foreground mb-2">
                          <strong>Sleeps:</strong> {house.sleeps} people
                        </p>
                      )}
                      {house.address && (
                        <p className="text-foreground">
                          <strong>Address:</strong> {house.address}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Photos Gallery */}
              {photos.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Property Photos</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative h-[250px] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                        <Image
                          src={photo}
                          alt={`${house.title} - Photo ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              {house.description && (
                <div className="mb-8">
                  <p className="text-lg text-foreground leading-relaxed">{house.description}</p>
                </div>
              )}

              {/* Sales Content */}
              {house.content && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Hen Party Life Drawing Entertainment</h2>
                  <div className="prose prose-lg max-w-none">
                    <div className="text-foreground whitespace-pre-line">{house.content}</div>
                  </div>
                </div>
              )}

              {/* Features */}
              {house.features && house.features.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Accommodation Features</h2>
                  <ul className="space-y-2">
                    {house.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Booking Links - Prominent Display */}
              {bookingLinks.length > 0 && (
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary rounded-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold mb-4 text-center">Book This Accommodation</h2>
                  <p className="text-foreground mb-6 text-center">
                    Book this verified holiday accommodation through one of these platforms:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {bookingLinks.map((link, index) => (
                      <OutboundLink
                        key={index}
                        href={link.url}
                        linkType={link.type}
                        accommodationName={house.title}
                        className="block bg-white border-2 border-primary rounded-lg p-4 hover:shadow-lg transition-all text-center group"
                      >
                        <div className="font-semibold text-lg text-primary group-hover:text-primary/80 mb-1">
                          {link.label}
                        </div>
                        <div className="text-sm text-muted-foreground">Click to book →</div>
                      </OutboundLink>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact for Entertainment */}
              <div className="bg-primary/10 border border-primary rounded-lg p-6 mb-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Check Availability</h2>
                <p className="text-foreground mb-4">
                  Interested in booking life drawing entertainment for your hen party at {house.title}?
                  Send an enquiry directly to check availability.
                </p>
                <Button
                  size="lg"
                  onClick={() => setIsEnquiryModalOpen(true)}
                  className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transform transition hover:scale-105"
                >
                  Send Enquiry to Venue & Ben
                </Button>
                <div className="mt-4 text-sm text-muted-foreground">
                  Or email: <a href="mailto:ben@henpartyentertainment.co.uk" className="underline">ben@henpartyentertainment.co.uk</a>
                </div>
              </div>

              <EnquiryModal
                isOpen={isEnquiryModalOpen}
                onClose={() => setIsEnquiryModalOpen(false)}
                houseId={house.id}
                houseTitle={house.title}
                venueEmail={house.owner_contact_info} // Pass this if available for context, though API handles it
              />

              {/* Google Maps */}
              {house.google_maps_url && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Location Map</h2>
                  <OutboundLink
                    href={house.google_maps_url}
                    linkType="other"
                    accommodationName={house.title}
                    className="text-primary hover:underline"
                  >
                    View on Google Maps →
                  </OutboundLink>
                </div>
              )}

              {/* Back to Listings */}
              <div className="text-center">
                <Link
                  href="/accommodations"
                  className="text-primary hover:underline"
                >
                  ← View All Accommodations
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
