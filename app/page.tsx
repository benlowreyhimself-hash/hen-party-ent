import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ContactButtons from "@/components/ContactButtons";
import PricingCards from "@/components/PricingCards";

// Force dynamic rendering to prevent prerendering issues with ContactButtons
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="w-full bg-slate-50">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://xirtgqglzsghphhihrcr.supabase.co/storage/v1/object/public/hen-party-media/originals/hero-hen-party-group-drawing-class.jpg"
            alt="Hen Party Life Drawing Hero"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-md">Hen Party Life Drawing</h1>
          <h3 className="text-2xl md:text-4xl font-light drop-shadow-md">Fun, Classy & Tasteful Naked Life Drawing Classes</h3>
        </div>
      </section>

      {/* Location Bar */}
      <section className="bg-primary text-primary-foreground py-6 shadow-md relative z-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm md:text-lg font-medium leading-relaxed flex flex-wrap justify-center gap-x-3 gap-y-1">
            {[
              { name: 'Bristol', href: '/hen-party-life-drawing-bristol' },
              { name: 'Bath', href: '/hen-party-life-drawing-bath' },
              { name: 'London', href: '/hen-party-life-drawing-london' },
              { name: 'Cardiff', href: '/hen-party-life-drawing-cardiff' },
              { name: 'Brighton', href: '/hen-party-life-drawing-brighton' },
              { name: 'Oxford', href: '/hen-party-life-drawing-oxford' },
              { name: 'Bournemouth', href: '/hen-party-life-drawing-bournemouth' },
              { name: 'Southampton', href: '/hen-party-life-drawing-southampton' },
              { name: 'Cheltenham', href: '/hen-party-life-drawing-cheltenham' },
              { name: 'Gloucester', href: '/hen-party-life-drawing-gloucester' },
              { name: 'Swindon', href: '/hen-party-life-drawing-swindon' },
              { name: 'Exeter', href: '/hen-party-life-drawing-exeter' },
              { name: 'Newquay', href: '/hen-party-life-drawing-newquay' },
              { name: 'Portsmouth', href: '/hen-party-life-drawing-portsmouth' },
              { name: 'Swansea', href: '/hen-party-life-drawing-swansea' },
              { name: 'Tenby', href: '/hen-party-life-drawing-tenby' },
              { name: 'Cotswolds', href: '/hen-party-life-drawing-cotswolds' },
            ].map((link, index, array) => (
              <span key={link.href}>
                <Link href={link.href} className="hover:underline hover:text-white/90 transition-colors">
                  {link.name}
                </Link>
                {index < array.length - 1 && <span className="opacity-50 ml-3">•</span>}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* Main Heading */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
            Book the South West's most popular Hen Party Life Drawing Model!
          </h2>
          <p className="text-xl text-primary mt-4 font-medium">
            Direct booking. No Agency fees.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">

          {/* Introduction Card */}
          <div className="max-w-5xl mx-auto mb-16 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-[400px] md:h-auto">
                <Image
                  src="https://xirtgqglzsghphhihrcr.supabase.co/storage/v1/object/public/hen-party-media/originals/hen-party-hen-party-drawing-ladies-9y7r.jpeg"
                  alt="Hen Party Life Drawing Session"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">The Perfect Activity</h3>
                <div className="prose prose-lg text-gray-600">
                  <p className="mb-4">
                    If you're organising a Hen Party for a friend, sister, or family member, you've come to the right place!
                  </p>
                  <p className="mb-4">
                    I've been doing Hen Parties since 2013 and I take great care to make sure everybody has a fun time.
                  </p>
                  <p className="mb-4">
                    I make sure the bride is made to feel special, and the whole group enjoys themselves. You will end up with lots of great photos of your fun weekend.
                  </p>
                  <p>
                    <a
                      href="https://share.google/SkTxcIAp7GAgditi0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      View genuine 5 star reviews on Google →
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Hi! My name's Ben Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-primary/10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 transform hover:-translate-y-1 transition-transform duration-300">
              <div className="w-48 h-48 md:w-64 md:h-64 relative flex-shrink-0">
                <div className="absolute inset-0 rounded-full border-4 border-white shadow-lg overflow-hidden">
                  <Image
                    src="https://xirtgqglzsghphhihrcr.supabase.co/storage/v1/object/public/hen-party-media/originals/ben-bride-glasses.jpg"
                    alt="Ben - Professional Life Drawing Model"
                    fill
                    sizes="(max-width: 768px) 200px, 256px"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-4xl font-bold mb-4 text-gray-800">Hi! My name's Ben</h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  I'm a Mobile Life Drawing Model based in Bath, but I cover the entire South West, and I have a network of carefully selected Models all over the UK!
                </p>
                <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                  <Link href="/about-ben" className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                    More About Ben
                  </Link>
                  <Link href="/contact" className="inline-block bg-white border-2 border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors">
                    Get in Touch
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Tasteful & Fun Section */}
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <h2 className="text-4xl font-bold mb-8 text-gray-800">Tasteful & Fun</h2>
          </div>

          {/* What to Expect Section - Cards Layout */}
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">What to expect</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "A professional friendly male model will present a range of nude poses for the hens to draw.",
                "Drawing techniques and exercises will be explained.",
                "Nobody will be made to feel uncomfortable or embarrassed.",
                "This is a fun & tasteful form of hen party entertainment.",
                "The bride will be invited to pose (clothed) with the model if she wishes.",
                "The model will wear a dressing gown between poses.",
                "Photos with the model can be taken at the end of the session.",
                "The session will be fully explained, you can ask any questions."
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4">
                  <span className="text-primary text-xl font-bold mt-1">✓</span>
                  <p className="text-gray-700 font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Photo Gallery Preview */}
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Photo Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                "https://xirtgqglzsghphhihrcr.supabase.co/storage/v1/object/public/hen-party-media/originals/hen-party-hen-party-life-drawing-kj1u.jpg",
                "https://xirtgqglzsghphhihrcr.supabase.co/storage/v1/object/public/hen-party-media/originals/hen-party-hen-party-life-drawing-t2dy.jpeg",
                "https://xirtgqglzsghphhihrcr.supabase.co/storage/v1/object/public/hen-party-media/originals/hen-party-life-drawing-hen-party-6g84.jpeg",
                "https://xirtgqglzsghphhihrcr.supabase.co/storage/v1/object/public/hen-party-media/originals/hen-party-hen-party-life-drawing-7bp5.jpeg"
              ].map((src, i) => (
                <div key={i} className="relative h-48 md:h-64 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <Image
                    src={src}
                    alt={`Gallery preview ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link href="/photos" className="inline-block text-primary font-semibold hover:underline text-lg">
                View Full Gallery →
              </Link>
            </div>
          </div>

          {/* Google Reviews Section - Cards */}
          <div className="max-w-6xl mx-auto mb-16 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-3xl font-bold mb-10 text-center text-gray-800 flex items-center justify-center gap-3">
              <Image src="/file.svg" width={30} height={30} alt="Google" className="hidden" /> {/* Placeholder for Google Logo if needed */}
              What People Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "Ben was super friendly and easy to work with..",
                "I booked Life Drawing for my sister's Hen Party and I can't thank Ben enough…",
                "We had a great time and Ben was very professional…",
                "Lots of fun for my future daughter in law's hen party…"
              ].map((quote, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-xl border border-slate-100 relative pt-10">
                  <div className="absolute top-4 left-4 text-4xl text-primary/20 font-serif leading-none">"</div>
                  <p className="text-gray-700 italic relative z-10 text-sm md:text-base">
                    {quote}
                  </p>
                  <div className="mt-4 flex text-yellow-400 text-sm">★★★★★</div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/reviews" className="inline-block bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 px-6 py-2 rounded-full font-medium transition-colors shadow-sm">
                Read All Reviews
              </Link>
            </div>
          </div>

          {/* Video Section */}
          <div className="mb-16">
            <div className="max-w-4xl mx-auto bg-black rounded-xl overflow-hidden shadow-xl">
              <div className="aspect-video w-full">
                <iframe
                  src="https://www.youtube.com/embed/X1-Z5qricLo"
                  title="Hen Party Life Drawing Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Prices Section */}
          <div className="max-w-5xl mx-auto mb-20">
            <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">Simple Pricing</h2>
            <PricingCards showContact={false} />
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full bg-white rounded-xl shadow-sm border border-slate-100 px-2" defaultValue="item-0">
              <AccordionItem value="item-0" className="border-b-0 mb-2">
                <AccordionTrigger className="text-left font-semibold px-4 hover:bg-slate-50 rounded-lg">Does Ben come to us?</AccordionTrigger>
                <AccordionContent className="px-4 text-gray-600">
                  <p>Yes. In most cases I visit people in the AirBnB where they are staying. This keeps things simple and is more relaxed for the group.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-1" className="border-b-0 mb-2">
                <AccordionTrigger className="text-left font-semibold px-4 hover:bg-slate-50 rounded-lg">I'm not sure how many people there will be. Can I confirm it later?</AccordionTrigger>
                <AccordionContent className="px-4 text-gray-600">
                  <p>Yes. You can book with a deposit, then confirm the final numbers nearer the time.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b-0 mb-2">
                <AccordionTrigger className="text-left font-semibold px-4 hover:bg-slate-50 rounded-lg">Do we need to be able to draw?</AccordionTrigger>
                <AccordionContent className="px-4 text-gray-600">
                  <p>You don't need any art experience. Fun drawing exercises will be explained and everybody will be included.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-b-0 mb-2">
                <AccordionTrigger className="text-left font-semibold px-4 hover:bg-slate-50 rounded-lg">Are the Drawing Materials provided?</AccordionTrigger>
                <AccordionContent className="px-4 text-gray-600">
                  <p>Yes. I will bring plenty of sketch pads and charcoal. You only need bring the drinks!</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-b-0 mb-2">
                <AccordionTrigger className="text-left font-semibold px-4 hover:bg-slate-50 rounded-lg">Do we need to prepare anything?</AccordionTrigger>
                <AccordionContent className="px-4 text-gray-600">
                  <p>You only need to prepare the space. Make sure everybody has somewhere to sit and a drink!</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="border-b-0 mb-2">
                <AccordionTrigger className="text-left font-semibold px-4 hover:bg-slate-50 rounded-lg">Will the model tell us what to do?</AccordionTrigger>
                <AccordionContent className="px-4 text-gray-600">
                  <p>Yes, I will guide the whole session. I have a series of fun drawing exercises which everybody will enjoy.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6" className="border-b-0 mb-2">
                <AccordionTrigger className="text-left font-semibold px-4 hover:bg-slate-50 rounded-lg">Can we take photos?</AccordionTrigger>
                <AccordionContent className="px-4 text-gray-600">
                  <p>Yes, but ask me before you take a photo. I will hold a baloon in front</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7" className="border-b-0 mb-2">
                <AccordionTrigger className="text-left font-semibold px-4 hover:bg-slate-50 rounded-lg">Will the model act professionally?</AccordionTrigger>
                <AccordionContent className="px-4 text-gray-600">
                  <p>Yes, the activity is coducted in a professional manner.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-8" className="border-b-0">
                <AccordionTrigger className="text-left font-semibold px-4 hover:bg-slate-50 rounded-lg">Do we pay a deposit?</AccordionTrigger>
                <AccordionContent className="px-4 text-gray-600">
                  <p>Yes. You can confirm the booking with a depoist and then pay the the final amount two weeks prior to the event</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Contact CTA */}
          <div className="max-w-4xl mx-auto text-center py-12 bg-primary/5 rounded-2xl border border-primary/10">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Ready to make a booking?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Feel welcome to call, text, or email. I'm happy to answer any questions you might have.
            </p>
            <ContactButtons />
          </div>
        </div>
      </section>
    </div>
  );
}
