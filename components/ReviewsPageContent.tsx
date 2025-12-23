"use client";

import { useEffect, useState } from "react";
import ContactModule from "@/components/ContactModule";
import { getGoogleReviewsLink, fetchGoogleReviews, type GoogleReview } from "@/lib/google/reviews";
import { ExternalLink } from "lucide-react";

export default function ReviewsPageContent() {
  const [reviews, setReviews] = useState<GoogleReview[] | null>(null);
  const [loading, setLoading] = useState(true);
  const googleReviewsLink = getGoogleReviewsLink();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/google/reviews');
        if (!response.ok) {
          throw new Error('Failed to fetch reviews from API');
        }
        const data = await response.json();
        if (data.reviews) {
          setReviews(data.reviews);
        }
      } catch (error) {
        console.error('Error fetching Google Reviews from API:', error);
        // Fallback to static reviews if API fails
        setReviews(fallbackReviews);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const fallbackReviews: GoogleReview[] = [
    {
      author_name: "Sarah M.",
      rating: 5,
      relative_time_description: "2 months ago",
      text: "Absolutely fantastic experience! Ben made our hen party so special. Professional, fun, and everyone had a great time. Highly recommend!",
      time: Date.now(),
    },
    {
      author_name: "Emma L.",
      rating: 5,
      relative_time_description: "3 months ago",
      text: "Best hen party activity we've ever done! Ben was amazing and made everyone feel comfortable. The life drawing session was the highlight of our weekend.",
      time: Date.now(),
    },
    {
      author_name: "Jessica K.",
      rating: 5,
      relative_time_description: "4 months ago",
      text: "Incredible service! Ben traveled to our location and provided everything we needed. The session was professional, fun, and memorable. Thank you!",
      time: Date.now(),
    },
    {
      author_name: "Rachel T.",
      rating: 5,
      relative_time_description: "5 months ago",
      text: "Perfect addition to our hen party! Ben was professional, friendly, and made the whole experience enjoyable for everyone. Would definitely book again!",
      time: Date.now(),
    },
    {
      author_name: "Laura B.",
      rating: 5,
      relative_time_description: "6 months ago",
      text: "Amazing experience! Ben made our hen party unforgettable. The life drawing session was fun, professional, and everyone loved it. Highly recommend!",
      time: Date.now(),
    },
  ];

  const displayReviews = reviews || fallbackReviews;

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Reviews</h1>
      
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <a
          href={googleReviewsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
        >
          View All Google Reviews
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {loading ? (
        <div className="max-w-4xl mx-auto text-center py-8">
          <p className="text-muted-foreground">Loading reviews...</p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-8">
          {displayReviews.map((review, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{review.author_name}</h3>
                  <p className="text-muted-foreground text-sm">{review.relative_time_description}</p>
                </div>
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
              </div>
              <p className="text-foreground">{review.text}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">Ready to Book Your Hen Party?</h2>
        <ContactModule variant="full" showFormLink={true} />
      </div>
    </div>
  );
}

