import Image from "next/image";
import Link from "next/link";
import { houses } from "@/data/houses";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0">
        <Image
            src="https://henpartyentertainment.co.uk/wp-content/uploads/2014/11/1F93FF7F-70CA-4EF1-9584-D0F5C7BE91A8_1_201_a.jpeg"
            alt="Hen Party Life Drawing Hero"
            fill
            sizes="100vw"
            className="object-cover"
          priority
        />
          <div className="absolute inset-0 bg-primary/60"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-4">Welcome</h1>
          <p className="text-2xl md:text-3xl">This is the home of Hen Party Life Drawing</p>
        </div>
      </section>

      {/* Location Bar */}
      <section className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg">
            Bristol - Bath - Cardiff - Gloucester - Cotswolds - Somerset - Oxford - Swindon - London - Nationwide
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Introduction Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6 text-center">Hen Party Life Drawing Entertainment</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground mb-4">
                Looking for something unique and memorable for your hen party? Our professional life drawing sessions 
                offer a fun, entertaining, and unforgettable experience that will have everyone talking for years to come.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                We provide professional life drawing entertainment across the UK, bringing the art of life drawing 
                directly to your hen party celebration. Whether you're staying in a luxury manor, a cosy cottage, 
                or a holiday rental, we can create the perfect session for your group.
              </p>
              <p className="text-lg text-muted-foreground">
                Our experienced instructor creates a comfortable, fun atmosphere where everyone can participate and 
                enjoy this unique activity. All materials are provided, and sessions are tailored to your group's 
                preferences and comfort levels.
              </p>
            </div>
          </div>

          {/* Image and Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://henpartyentertainment.co.uk/wp-content/uploads/2014/11/1F93FF7F-70CA-4EF1-9584-D0F5C7BE91A8_1_201_a.jpeg"
                alt="Hen Party Life Drawing Session"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-semibold mb-4">What to Expect</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-foreground">Professional life drawing instructor</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-foreground">All art materials provided</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-foreground">Fun, comfortable atmosphere</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-foreground">Sessions tailored to your group</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-foreground">Suitable for groups of all sizes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-foreground">Travel to your location included</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Video Section */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-6 text-center">See Us In Action</h3>
            <div className="aspect-video w-full max-w-4xl mx-auto">
              <iframe
                src="https://www.youtube.com/embed/X1-Z5qricLo"
                title="Hen Party Life Drawing Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg"
              ></iframe>
            </div>
          </div>

          {/* Service Areas */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-6 text-center">Where We Operate</h3>
            <div className="bg-card border border-border rounded-lg p-8">
              <p className="text-center text-lg mb-4">
                We provide hen party life drawing entertainment across the UK, with regular service to:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                {["Bristol", "Bath", "Cardiff", "Gloucester", "Cotswolds", "Somerset", "Oxford", "Swindon", "London", "Nationwide"].map((location) => (
                  <div key={location} className="p-3 bg-primary/10 rounded-md">
                    <span className="font-semibold">{location}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-muted-foreground mt-6">
                Don't see your location? We travel nationwide - contact us to discuss your requirements.
              </p>
            </div>
          </div>

          {/* Popular Venues */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-6 text-center">Popular Venues We Serve</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {houses.slice(0, 6).map((house) => (
                <Link
                  key={house.slug}
                  href={`/house-archives/${house.slug}`}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <h4 className="text-xl font-semibold mb-2 text-primary hover:underline">
                    {house.title}
                  </h4>
                  <p className="text-muted-foreground text-sm mb-3">{house.location}</p>
                  <p className="text-foreground text-sm line-clamp-3">{house.description}</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/house-archives"
                className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
              >
                View All Venues
              </Link>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional Service</h3>
              <p className="text-muted-foreground">
                Experienced life drawing sessions tailored to your event with all materials provided
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚗</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Nationwide Coverage</h3>
              <p className="text-muted-foreground">
                Available across the UK - we travel to your location for your convenience
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Memorable Experience</h3>
              <p className="text-muted-foreground">
                Create lasting memories with a unique hen party activity that everyone will remember
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
            <h3 className="text-3xl font-bold mb-4">Ready to Book Your Hen Party Entertainment?</h3>
            <p className="text-lg mb-6">
              Contact us today to discuss your requirements and check availability for your celebration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:07747571426"
                className="bg-white text-primary px-6 py-3 rounded-md hover:opacity-90 transition-opacity font-semibold"
              >
                Call: 07747571426
          </a>
          <a
                href="mailto:ben@henpartyentertainment.co.uk"
                className="bg-white text-primary px-6 py-3 rounded-md hover:opacity-90 transition-opacity font-semibold"
              >
                Email Us
              </a>
              <Link
                href="/contact"
                className="bg-white text-primary px-6 py-3 rounded-md hover:opacity-90 transition-opacity font-semibold"
              >
                Contact Form
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
