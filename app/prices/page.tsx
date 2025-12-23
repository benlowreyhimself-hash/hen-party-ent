export default function PricesPage() {
  const pricingOptions = [
    {
      title: "Standard Session",
      duration: "2 hours",
      price: "£250",
      features: [
        "Professional life drawing session",
        "All materials provided",
        "Suitable for groups up to 15 people",
        "Travel within 30 miles included",
      ],
    },
    {
      title: "Extended Session",
      duration: "3 hours",
      price: "£350",
      features: [
        "Extended life drawing session",
        "All materials provided",
        "Suitable for groups up to 20 people",
        "Travel within 30 miles included",
        "Additional activities included",
      ],
    },
    {
      title: "Premium Package",
      duration: "4 hours",
      price: "£450",
      features: [
        "Full day experience",
        "All materials provided",
        "Suitable for groups up to 25 people",
        "Nationwide travel included",
        "Multiple activities",
        "Complimentary refreshments",
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4 text-center">Prices</h1>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        All prices are inclusive of travel within specified distances. For locations outside the standard area, 
        additional travel costs may apply. Please contact us for a personalized quote.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pricingOptions.map((option, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-semibold mb-2">{option.title}</h3>
            <p className="text-muted-foreground mb-4">{option.duration}</p>
            <div className="text-4xl font-bold text-primary mb-6">{option.price}</div>
            <ul className="space-y-3">
              {option.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            <a
              href="/contact"
              className="mt-6 block w-full text-center bg-primary text-primary-foreground py-3 rounded-md hover:opacity-90 transition-opacity"
            >
              Book Now
            </a>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-muted-foreground mb-4">
          For custom packages or special requirements, please{" "}
          <a href="/contact" className="text-primary hover:underline">contact us</a> for a personalized quote.
        </p>
      </div>
    </div>
  );
}

