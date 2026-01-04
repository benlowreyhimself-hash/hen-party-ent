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
import { getHousesByLocation } from '@/lib/supabase/houses-location';

interface Activity {
    title: string;
    description: string;
}

interface LocationPageProps {
    city: string;
    heroImage?: string;
    introTitle: string;
    introText: React.ReactNode;
    zones?: string;
    metaDescription: string;
    faqLocation?: string;
    activities?: Activity[];
    whyChoose?: string;
}

export default async function LocationPageTemplate({
    city,
    heroImage = "https://xirtgqglzsghphhihrcr.supabase.co/storage/v1/object/public/hen-party-media/originals/hero-hen-party-group-drawing-class.jpg",
    introTitle,
    introText,
    zones,
    faqLocation,
    activities = [],
    whyChoose
}: LocationPageProps) {
    const locationName = faqLocation || city;

    // Fetch recommended houses for this location (Piggyback SEO)
    const houses = await getHousesByLocation(city);

    // Global Location Links (Same as Homepage)
    const locationLinks = [
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
    ];

    return (
        <div className="w-full bg-slate-50">
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center justify-center">
                <div className="absolute inset-0">
                    <Image
                        src={heroImage}
                        alt={`Hen Party Life Drawing ${city}`}
                        fill
                        sizes="100vw"
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>
                <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-md">Hen Party Life Drawing {city}</h1>
                    <h3 className="text-2xl md:text-4xl font-light drop-shadow-md">Fun, Classy & Tasteful Entertainment</h3>
                    {zones && <p className="mt-4 text-lg md:text-xl font-light opacity-90 drop-shadow-sm max-w-2xl mx-auto">{zones}</p>}
                </div>
            </section>

            {/* Global Location Bar */}
            <section className="bg-primary text-primary-foreground py-6 shadow-md relative z-20">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm md:text-lg font-medium leading-relaxed flex flex-wrap justify-center gap-x-3 gap-y-1">
                        {locationLinks.map((link, index) => (
                            <span key={link.href}>
                                <Link href={link.href} className={`hover:underline hover:text-white/90 transition-colors ${link.name === city ? 'font-bold underline' : ''}`}>
                                    {link.name}
                                </Link>
                                {index < locationLinks.length - 1 && <span className="opacity-50 ml-3">•</span>}
                            </span>
                        ))}
                    </p>
                </div>
            </section>

            {/* Main Heading */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                        Book {city}'s Favourite Hen Party Life Drawing Model!
                    </h2>
                    <p className="text-xl text-primary mt-4 font-medium">
                        Perfect for hen parties staying in {city} and the surrounding areas. Direct booking. No Agency fees.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12">
                <div className="container mx-auto px-4">

                    {/* Introduction Card with Why Choose Section */}
                    <div className="max-w-5xl mx-auto mb-16 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

                        {/* Optional: Layout with side image if no top list, otherwise just text block if focusing on content */}
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="relative h-[400px] md:h-auto">
                                <Image
                                    src="https://xirtgqglzsghphhihrcr.supabase.co/storage/v1/object/public/hen-party-media/originals/hen-party-hen-party-drawing-ladies-9y7r.jpeg"
                                    alt={`Hen Party Life Drawing Session ${city}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-8 md:p-12 flex flex-col justify-center">
                                <h3 className="text-2xl font-bold mb-6 text-gray-800">{introTitle}</h3>

                                {whyChoose && (
                                    <div className="mb-6 bg-primary/5 p-4 rounded-lg border border-primary/10">
                                        <h4 className="font-semibold text-primary mb-2">Why choose {city}?</h4>
                                        <p className="text-gray-700 italic">{whyChoose}</p>
                                    </div>
                                )}

                                <div className="prose prose-lg text-gray-600">
                                    {introText}
                                    <p className="mt-4">
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

                    {/* Top Activities Section (If provided) */}
                    {activities.length > 0 && (
                        <div className="max-w-5xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-gray-800">Top 5 Hen Party Ideas in {city}</h2>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {activities.map((activity, index) => (
                                    <div key={index} className={`bg-white p-6 rounded-xl shadow-sm border ${index === 0 ? 'border-primary/40 ring-1 ring-primary/10 bg-primary/5' : 'border-slate-100'} hover:shadow-md transition-shadow`}>
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${index === 0 ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'}`}>
                                                {index + 1}
                                            </span>
                                            <h3 className={`font-bold text-lg ${index === 0 ? 'text-primary' : 'text-gray-800'}`}>{activity.title}</h3>
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed">{activity.description}</p>
                                        {index === 0 && (
                                            <div className="mt-4">
                                                <span className="inline-block px-3 py-1 bg-white text-primary text-xs font-bold rounded-full border border-primary/20">Our Top Pick!</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

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
                                    I'm a Mobile Life Drawing Model covering {city} and the South of England. I can travel to your accommodation, whether it's an AirBnB, hotel, or private venue.
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

                    {/* Recommended Accommodation Section (Piggyback SEO) */}
                    {houses.length > 0 && (
                        <div className="max-w-6xl mx-auto mb-16 px-4">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Top Hen Party Houses in {city}</h2>
                                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                    We regularly visit these popular {city} venues. Because we are mobile, we can set up a life drawing class right in your lounge!
                                </p>
                            </div>

                            <div className="flex flex-col gap-3">
                                {houses.map((house) => (
                                    <div key={house.id} className="bg-white rounded-lg border border-slate-200 p-4 transition-all hover:border-primary/50 hover:shadow-sm group">
                                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-2">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-base font-bold text-gray-900 group-hover:text-primary transition-colors">
                                                    {house.website_url ? (
                                                        <a
                                                            href={house.website_url.startsWith('http') ? house.website_url : `https://${house.website_url}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="hover:underline flex items-center gap-1"
                                                        >
                                                            {house.title}
                                                            <span className="text-xs text-muted-foreground font-normal no-underline">(External Link)</span>
                                                        </a>
                                                    ) : (
                                                        house.title
                                                    )}
                                                </h3>
                                                {house.sleeps && (
                                                    <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">
                                                        Sleeps {house.sleeps}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-2 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md border border-green-100">
                                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                                Ben Visits Here
                                            </div>
                                        </div>

                                        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                                            {house.description}
                                        </p>

                                        {house.features && house.features.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {house.features.slice(0, 3).map((feature, i) => (
                                                    <span key={i} className="text-[10px] uppercase tracking-wider text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 text-center bg-slate-50 p-4 rounded-lg border border-slate-200">
                                <p className="text-sm text-gray-500">
                                    <strong>Property Owners:</strong> Want to be listed here? <Link href="/contact" className="text-primary hover:underline">Contact Ben</Link> to become a recommended partner.
                                </p>
                            </div>
                        </div>
                    )}

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

                    {/* Photo Gallery Preview (with Placeholder Slots for Tourist Photos) */}
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

                    {/* Google Reviews Section */}
                    <div className="max-w-6xl mx-auto mb-16 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
                        <h2 className="text-3xl font-bold mb-10 text-center text-gray-800 flex items-center justify-center gap-3">
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
                        <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">Simple Pricing for {city}</h2>
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
                            <AccordionItem value="item-booking" className="border-b-0 mb-2">
                                <AccordionTrigger className="text-left font-semibold px-4 hover:bg-slate-50 rounded-lg">How do I pay?</AccordionTrigger>
                                <AccordionContent className="px-4 text-gray-600">
                                    <p className="mb-2">A £50 deposit confirms the booking. The remainder is to be settled 1 week prior to the event.</p>
                                    <p>Please use your Name as the payment reference.</p>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-materials" className="border-b-0 mb-2">
                                <AccordionTrigger className="text-left font-semibold px-4 hover:bg-slate-50 rounded-lg">Are materials provided?</AccordionTrigger>
                                <AccordionContent className="px-4 text-gray-600">
                                    <p>Yes, all materials (sketch pads & charcoal) are provided. You just need to ensure there is enough space for the group to sit comfortably.</p>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-prep" className="border-b-0 mb-2">
                                <AccordionTrigger className="text-left font-semibold px-4 hover:bg-slate-50 rounded-lg">Do we need to prepare the room?</AccordionTrigger>
                                <AccordionContent className="px-4 text-gray-600">
                                    <p>Just make sure everyone has a seat! Relaxed background music is ideal—dance music or "Magic Mike" tracks can add too much pressure.</p>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-surprise" className="border-b-0 mb-2">
                                <AccordionTrigger className="text-left font-semibold px-4 hover:bg-slate-50 rounded-lg">It's a surprise for the Bride!</AccordionTrigger>
                                <AccordionContent className="px-4 text-gray-600">
                                    <p>No problem! Ben (or the assigned model) will text you upon arrival and enter discreetly to keep the surprise intact.</p>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-model" className="border-b-0 mb-2">
                                <AccordionTrigger className="text-left font-semibold px-4 hover:bg-slate-50 rounded-lg">Who will be our model?</AccordionTrigger>
                                <AccordionContent className="px-4 text-gray-600">
                                    <p>Your point of contact is Ben (07747571426). In most cases, Ben will be your model. If another model is assigned, their details will be passed to you, and they will contact you leading up to the booking.</p>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-company" className="border-b-0 mb-2">
                                <AccordionTrigger className="text-left font-semibold px-4 hover:bg-slate-50 rounded-lg">Company Details</AccordionTrigger>
                                <AccordionContent className="px-4 text-gray-600">
                                    <p>You are booking with <strong>Hen Party Entertainment Ltd.</strong></p>
                                    <p>Company number: 13901884</p>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-reliablity" className="border-b-0 mb-2">
                                <AccordionTrigger className="text-left font-semibold px-4 hover:bg-slate-50 rounded-lg">Why book direct?</AccordionTrigger>
                                <AccordionContent className="px-4 text-gray-600">
                                    <p>I have worked for most main hen party agencies. When you book direct, you get the same premium service at a better price—and I actually show up! Agencies often struggle to find reliable models at the last minute.</p>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    {/* Contact CTA */}
                    <div className="max-w-4xl mx-auto text-center py-12 bg-primary/5 rounded-2xl border border-primary/10">
                        <h2 className="text-3xl font-bold mb-6 text-gray-800">Ready to make a booking for your {city} Hen Party?</h2>
                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                            Feel welcome to call, text, or email. I'm happy to answer any questions you might have about availability in {city}.
                        </p>
                        <ContactButtons />
                    </div>
                </div>
            </section>
        </div>
    );
}
