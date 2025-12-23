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
          <h3 className="text-2xl md:text-3xl">This is the home of Hen Party Life Drawing</h3>
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

      {/* Main Heading */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground">
            Book the South West's most popular Hen Party Life Drawing Model!<br />
            Direct booking. No Agency fees
          </h2>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Main Image */}
          <div className="mb-12">
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <Image
                src="https://i0.wp.com/henpartyentertainment.co.uk/wp-content/uploads/2017/07/C3CD1C3E-99D3-4572-BB39-06D19DA36311_1_201_a-1.jpeg"
                alt="Hen Party Life Drawing Session"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Introduction Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-foreground mb-4">
                If you're organising a Hen Party for a friend, sister, or family member, you've come to the right place!
              </p>
              <p className="text-lg text-foreground mb-4">
                This is a perfect activity for your weekend. Take a look at the photos, video, and reviews below.
              </p>
              <p className="text-lg text-foreground mb-4">
                If you'd like to check my availability, drop me an email and we can begin making plans!
              </p>
              <p className="text-lg text-foreground mb-4">
                I've been doing Hen Parties since 2013 and I take great care to make sure everybody has a fun time.
              </p>
              <p className="text-lg text-foreground mb-4">
                I make sure the bride is made to feel special, and the whole group enjoys themselves. You will end up with lots of great photos of your fun weekend.
              </p>
              <p className="text-lg text-foreground mb-4">
                You can view my genuine 5 star reviews on google by clicking{" "}
                <a 
                  href="https://g.page/henpartyent" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  here
                </a>
              </p>
            </div>
          </div>

          {/* Hi! My name's Ben Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">Hi! My name's Ben</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-foreground mb-4 text-center">
                I'm a Mobile Life Drawing Model based in Bath, but I cover the entire South West, and I have a network of carefully selected Models all over the UK!
              </p>
            </div>
          </div>

          {/* Tasteful & Fun Section */}
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <h2 className="text-3xl font-bold mb-6">Tasteful & Fun</h2>
          </div>

          {/* What to Expect Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">What to expect</h2>
            <div className="prose prose-lg max-w-none">
              <ul className="space-y-4 text-lg">
                <li>A professional friendly male model will present a range of nude poses for the hens to draw.</li>
                <li>Drawing techniques and exercises will be explained.</li>
                <li>Nobody will be made to feel uncomfortable or embarrassed.</li>
                <li>This is a fun & tasteful form of hen party entertainment.</li>
                <li>The bride will be invited to pose (clothed) with the model if she wishes (shhhhh… don't tell her this)</li>
                <li>The model will wear a dressing gown between poses.</li>
                <li>Photos with the model can be taken at the end of the session.</li>
                <li>The session will be fully explained, you can ask any questions so that you fully understand what to expect.</li>
              </ul>
            </div>
          </div>

          {/* Google Reviews Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">Google Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-foreground mb-2 italic">
                  "Ben was super friendly and easy to work with.."
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-foreground mb-2 italic">
                  "I booked Life Drawing for my sister's Hen Party and I can't thank Ben enough…"
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-foreground mb-2 italic">
                  "We had a great time and Ben was very professional…"
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-foreground mb-2 italic">
                  "Lots of fun for my future daughter in law's hen party…"
                </p>
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div className="mb-16">
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

          {/* Prices Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">Prices</h2>
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-lg text-foreground mb-4">
                I understand it takes a lot of work to organise a large group of people. You can confirm the booking with a deposit, then settle the final amount nearer the time.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <h3 className="text-2xl font-semibold mb-4">Classic</h3>
                <Link href="/prices" className="text-primary hover:underline">View Details</Link>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <h3 className="text-2xl font-semibold mb-4">Special</h3>
                <Link href="/prices" className="text-primary hover:underline">View Details</Link>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <h3 className="text-2xl font-semibold mb-4">Ultimate</h3>
                <Link href="/prices" className="text-primary hover:underline">View Details</Link>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-lg font-semibold text-primary">Special Offer</p>
            </div>
          </div>

          {/* Popular Venues */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-6 text-center">Popular Hen Party Venues</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {houses.map((house) => (
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

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Does Ben come to us?</h3>
                <p className="text-foreground">
                  Yes. If you are staying in a House I will come to the house where you are staying.
                  If you're staying in a Hotel or just doing a day trip then let me know, a function room can be arranged.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Can I book with a deposit?</h3>
                <p className="text-foreground">
                  Yes. You can book with a deposit, then confirm the final numbers nearer the time.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Do I need any art experience?</h3>
                <p className="text-foreground">
                  You don't need any art experience. Fun drawing exercises will be explained and everybody will be included.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Do I need to bring anything?</h3>
                <p className="text-foreground">
                  Yes. I will bring plenty of sketch pads and charcoal. You only need bring the drinks!
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">What do I need to prepare?</h3>
                <p className="text-foreground">
                  You only need to prepare the space. Make sure everybody has somewhere to sit and a drink!
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Will Ben guide the session?</h3>
                <p className="text-foreground">
                  Yes, I will guide the whole session. I have a series of fun drawing exercises which everybody will enjoy.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Can I take photos?</h3>
                <p className="text-foreground">
                  Yes, but ask me before you take a photo. I will hold a balloon in front.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Is it professional?</h3>
                <p className="text-foreground">
                  Yes, the activity is conducted in a professional manner.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">When do I pay?</h3>
                <p className="text-foreground">
                  Yes. You can confirm the booking with a deposit and then pay the final amount two weeks prior to the event.
                </p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-foreground mb-6">
              Feel welcome to call, text, or email.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:07747571426"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:opacity-90 transition-opacity font-semibold"
              >
                Call: 07747571426
              </a>
              <a
                href="mailto:ben@henpartyentertainment.co.uk"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:opacity-90 transition-opacity font-semibold"
              >
                Email Us
              </a>
              <Link
                href="/contact"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:opacity-90 transition-opacity font-semibold"
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
