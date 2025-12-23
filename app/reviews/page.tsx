export default function ReviewsPage() {
  const reviews = [
    {
      name: "Sarah M.",
      location: "Bath",
      rating: 5,
      text: "Absolutely fantastic experience! Ben was professional and made the whole group feel comfortable. Highly recommend for any hen party!",
    },
    {
      name: "Emma L.",
      location: "Bristol",
      rating: 5,
      text: "Such a unique and fun activity. Everyone had a great time and the drawings turned out better than expected!",
    },
    {
      name: "Jessica K.",
      location: "Cardiff",
      rating: 5,
      text: "Perfect addition to our hen party weekend. Ben was great and the session was both entertaining and memorable.",
    },
    {
      name: "Lucy P.",
      location: "Oxford",
      rating: 5,
      text: "We had such a laugh! The life drawing session was the highlight of our weekend. Thank you so much!",
    },
    {
      name: "Rachel T.",
      location: "London",
      rating: 5,
      text: "Amazing experience! Professional, fun, and something completely different. Would definitely book again!",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Reviews</h1>
      
      <div className="max-w-4xl mx-auto space-y-8">
        {reviews.map((review, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold">{review.name}</h3>
                <p className="text-muted-foreground">{review.location}</p>
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
    </div>
  );
}

