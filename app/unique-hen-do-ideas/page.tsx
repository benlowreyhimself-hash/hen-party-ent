import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Unique Hen Do Ideas 2026 | Creative & Alternative Hen Party Activities UK',
    description: 'Looking for unique hen do ideas? Discover creative, classy alternatives to typical hen parties. Life drawing, escape rooms, cocktail making & more. Perfect for the bride who wants something different.',
    keywords: ['unique hen do ideas', 'alternative hen party', 'creative hen activities', 'classy hen ideas', 'unusual hen do', 'hen party ideas UK'],
    openGraph: {
        title: 'Unique Hen Do Ideas 2026 | Creative Hen Party Activities',
        description: 'Looking for unique hen do ideas? Discover creative, classy alternatives to typical hen parties.',
        type: 'article',
    },
};

// JSON-LD Structured Data
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Unique Hen Do Ideas 2026: Creative & Alternative Hen Party Activities",
    "description": "Discover unique hen do ideas that go beyond the typical hen party. From life drawing to creative workshops, find the perfect activity for the bride who wants something different.",
    "author": {
        "@type": "Person",
        "name": "Ben",
        "url": "https://henpartyentertainment.co.uk/about-ben"
    },
    "publisher": {
        "@type": "Organization",
        "name": "Hen Party Entertainment",
        "url": "https://henpartyentertainment.co.uk"
    },
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString(),
};

export default function UniqueHenDoIdeasPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
                {/* Hero Section */}
                <section className="py-16 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Unique Hen Do Ideas for 2026
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Tired of the same old hen party activities? Discover creative, classy alternatives
                            that the whole group will love. Perfect for the bride who wants something memorable.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/contact"
                                className="bg-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-700 transition"
                            >
                                Book Life Drawing
                            </Link>
                            <Link
                                href="/prices"
                                className="border-2 border-pink-600 text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition"
                            >
                                View Prices
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Why Choose Unique Activities */}
                <section className="py-12 px-4 bg-white">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                            Why Choose Unique Hen Party Activities?
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-pink-50 p-6 rounded-xl text-center">
                                <div className="text-4xl mb-4">🎨</div>
                                <h3 className="font-bold text-lg mb-2">Memorable</h3>
                                <p className="text-gray-600">Stand out from every other hen do with activities everyone will talk about for years.</p>
                            </div>
                            <div className="bg-pink-50 p-6 rounded-xl text-center">
                                <div className="text-4xl mb-4">🥂</div>
                                <h3 className="font-bold text-lg mb-2">Inclusive</h3>
                                <p className="text-gray-600">Not everyone loves clubbing. Unique activities mean grandma and the girls can all join in.</p>
                            </div>
                            <div className="bg-pink-50 p-6 rounded-xl text-center">
                                <div className="text-4xl mb-4">💕</div>
                                <h3 className="font-bold text-lg mb-2">Personal</h3>
                                <p className="text-gray-600">Show the bride you really thought about what she'd love, not just what's "expected".</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Top Unique Ideas */}
                <section className="py-12 px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                            Top 10 Unique Hen Do Ideas
                        </h2>

                        <div className="space-y-8">
                            {/* Idea 1 - Life Drawing */}
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-start gap-4">
                                        <span className="bg-pink-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">1</span>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">🎨 Nude Life Drawing Class</h3>
                                            <p className="text-gray-600 mb-4">
                                                <strong>The perfect blend of naughty and nice!</strong> Everyone gets creative while sketching a
                                                tasteful nude model. It's hilarious, classy, and produces keepsake artwork. The model
                                                brings everything - you just bring the prosecco!
                                            </p>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm">From £30pp</span>
                                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">All inclusive</span>
                                                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">Mobile service</span>
                                            </div>
                                            <Link href="/prices" className="text-pink-600 font-semibold hover:underline">
                                                Learn more about life drawing →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Idea 2 */}
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-start gap-4">
                                        <span className="bg-gray-200 text-gray-700 w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">2</span>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">🔮 Sound Bath & Meditation</h3>
                                            <p className="text-gray-600 mb-4">
                                                For the spiritual bride. A deeply relaxing experience with singing bowls and guided
                                                meditation. Perfect before the wedding chaos begins. Many hen groups combine this
                                                with yoga or breathwork sessions.
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">Relaxing</span>
                                                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">Group bonding</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Idea 3 */}
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-start gap-4">
                                        <span className="bg-gray-200 text-gray-700 w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">3</span>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">🧪 Cocktail Making Masterclass</h3>
                                            <p className="text-gray-600 mb-4">
                                                Learn to make professional cocktails with a mixologist. Many places let you sample
                                                your creations! A fun, interactive activity that appeals to almost everyone.
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">Hands-on</span>
                                                <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm">Drinks included</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Idea 4 */}
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-start gap-4">
                                        <span className="bg-gray-200 text-gray-700 w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">4</span>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">🔐 Escape Room Challenge</h3>
                                            <p className="text-gray-600 mb-4">
                                                Work together to solve puzzles and escape before time runs out! Great for
                                                competitive groups. Many venues offer private bookings with themed rooms
                                                perfect for hen parties.
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">Team building</span>
                                                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">Competitive</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Idea 5 */}
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-start gap-4">
                                        <span className="bg-gray-200 text-gray-700 w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">5</span>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">🎭 Murder Mystery Dinner</h3>
                                            <p className="text-gray-600 mb-4">
                                                Dress up, solve a crime, and enjoy a delicious dinner! Perfect for drama-loving
                                                brides. Many companies offer private events with costumes and props included.
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">Theatrical</span>
                                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Evening activity</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Idea 6 */}
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-start gap-4">
                                        <span className="bg-gray-200 text-gray-700 w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">6</span>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">🍽️ Private Chef Experience</h3>
                                            <p className="text-gray-600 mb-4">
                                                Have a professional chef come to your accommodation and cook a gourmet meal.
                                                Sit back, sip wine, and be treated like royalty. Many chefs also offer
                                                cooking lessons alongside the meal.
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">Luxury</span>
                                                <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm">Comes to you</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Idea 7 */}
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-start gap-4">
                                        <span className="bg-gray-200 text-gray-700 w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">7</span>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">🌊 Wild Swimming</h3>
                                            <p className="text-gray-600 mb-4">
                                                For adventurous groups! Find a beautiful river, lake, or lido for a refreshing
                                                swim together. Many areas have guided wild swimming experiences with changing
                                                facilities and hot drinks after.
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">Adventurous</span>
                                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Free/Low cost</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Idea 8 */}
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-start gap-4">
                                        <span className="bg-gray-200 text-gray-700 w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">8</span>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">💅 At-Home Spa Party</h3>
                                            <p className="text-gray-600 mb-4">
                                                Skip the expensive spa and bring the pampering to you! Hire mobile beauty
                                                therapists for massages, facials, and mani-pedis while you relax in robes
                                                with face masks and fizz.
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm">Relaxing</span>
                                                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">Comes to you</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Idea 9 */}
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-start gap-4">
                                        <span className="bg-gray-200 text-gray-700 w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">9</span>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">🍷 Vineyard Tour & Tasting</h3>
                                            <p className="text-gray-600 mb-4">
                                                English wine is having a moment! Visit a local vineyard for a tour, tasting,
                                                and often a delicious lunch among the vines. Surprisingly good value and
                                                makes for beautiful photos.
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">Daytime activity</span>
                                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Scenic</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Idea 10 */}
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-start gap-4">
                                        <span className="bg-gray-200 text-gray-700 w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">10</span>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">🏺 Pottery/Ceramic Painting</h3>
                                            <p className="text-gray-600 mb-4">
                                                Get creative and messy together! Whether it's throwing pots on a wheel or
                                                painting ceramic items to take home, it's a relaxed, chatty activity that
                                                produces lasting keepsakes.
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">Creative</span>
                                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">Take home keepsake</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 px-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            Ready to Book the Perfect Activity?
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            Life drawing is consistently rated as the most memorable hen party activity.
                            I travel across the South West & UK to bring the fun to you!
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/contact"
                                className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
                            >
                                Check Availability
                            </Link>
                            <Link
                                href="/reviews"
                                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition"
                            >
                                Read Reviews
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-12 px-4 bg-white">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-4">
                            <details className="bg-gray-50 rounded-xl p-6 group">
                                <summary className="font-bold cursor-pointer list-none flex justify-between items-center">
                                    How far in advance should I book hen party activities?
                                    <span className="text-pink-600">+</span>
                                </summary>
                                <p className="mt-4 text-gray-600">
                                    For popular activities like life drawing, we recommend booking 2-3 months in advance,
                                    especially for weekend dates in summer. However, last-minute bookings are sometimes
                                    possible - just get in touch to check availability.
                                </p>
                            </details>
                            <details className="bg-gray-50 rounded-xl p-6 group">
                                <summary className="font-bold cursor-pointer list-none flex justify-between items-center">
                                    What if some guests don't want to do the activity?
                                    <span className="text-pink-600">+</span>
                                </summary>
                                <p className="mt-4 text-gray-600">
                                    That's totally fine! For life drawing, everyone can participate at their own comfort level.
                                    Some prefer to just watch and enjoy the atmosphere while others get creative. It's a relaxed,
                                    no-pressure environment.
                                </p>
                            </details>
                            <details className="bg-gray-50 rounded-xl p-6 group">
                                <summary className="font-bold cursor-pointer list-none flex justify-between items-center">
                                    Can activities come to our accommodation?
                                    <span className="text-pink-600">+</span>
                                </summary>
                                <p className="mt-4 text-gray-600">
                                    Yes! Life drawing is a mobile service - I travel to your Airbnb, hotel, or hen house with
                                    all materials included. Many other activities like mobile spas, private chefs, and cocktail
                                    making can also come to you.
                                </p>
                            </details>
                            <details className="bg-gray-50 rounded-xl p-6 group">
                                <summary className="font-bold cursor-pointer list-none flex justify-between items-center">
                                    How many people can participate?
                                    <span className="text-pink-600">+</span>
                                </summary>
                                <p className="mt-4 text-gray-600">
                                    Life drawing works best with groups of 8-20 people, but I can accommodate smaller groups
                                    (minimum charge applies) and larger groups up to 30+ with advance notice. Most hen parties
                                    are around 10-15 people.
                                </p>
                            </details>
                        </div>
                    </div>
                </section>

                {/* Location Links */}
                <section className="py-12 px-4 bg-gray-50">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                            Life Drawing Available In These Locations
                        </h2>
                        <div className="flex flex-wrap justify-center gap-3">
                            {[
                                'Bristol', 'Bath', 'Cardiff', 'Cheltenham', 'Gloucester',
                                'Oxford', 'Swindon', 'Brighton', 'Bournemouth', 'Southampton',
                                'London', 'Exeter', 'Newport', 'Cotswolds', 'Glastonbury'
                            ].map((city) => (
                                <Link
                                    key={city}
                                    href={`/hen-party-life-drawing-${city.toLowerCase()}`}
                                    className="bg-white px-4 py-2 rounded-full text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition border"
                                >
                                    {city}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
