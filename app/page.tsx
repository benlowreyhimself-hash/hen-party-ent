import Image from "next/image";

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://henpartyentertainment.co.uk/wp-content/uploads/2014/11/1F93FF7F-70CA-4EF1-9584-D0F5C7BE91A8_1_201_a.jpeg"
                alt="Hen Party Life Drawing"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4">Hen Party Life Drawing</h2>
              <p className="text-muted-foreground mb-4">
                Experience a unique and fun activity for your hen party. Our life drawing sessions are designed to be entertaining, 
                memorable, and perfect for celebrating with friends.
              </p>
              <p className="text-muted-foreground">
                We provide professional life drawing entertainment across the UK, bringing the art of life drawing to your 
                special celebration.
              </p>
            </div>
          </div>

          {/* Video Section */}
          <div className="mb-12">
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

          {/* Additional Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Professional Service</h3>
              <p className="text-muted-foreground">
                Experienced life drawing sessions tailored to your event
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Nationwide Coverage</h3>
              <p className="text-muted-foreground">
                Available across the UK for your convenience
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Memorable Experience</h3>
              <p className="text-muted-foreground">
                Create lasting memories with a unique hen party activity
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
<!-- Auto-deploy test -->
