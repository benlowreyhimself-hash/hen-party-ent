import Link from 'next/link';

export const metadata = {
    title: 'About This Software | Hen Party Entertainment',
    description: 'Learn about the technology and architecture behind the Hen Party Entertainment booking platform.',
};

export default function AboutSoftwarePage() {
    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition mb-8"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Home
                </Link>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">About This Software</h1>
                <p className="text-gray-600 text-lg mb-12">
                    The technology powering henpartyentertainment.co.uk
                </p>

                <article className="prose prose-lg max-w-none">
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                        <p className="text-gray-700 leading-relaxed mb-6">
                            Hen Party Entertainment represents a complete digital platform for booking life drawing experiences across the UK. Originally a WordPress-based website, this Next.js application has been rebuilt from the ground up to deliver faster performance, better user experience, and seamless integration with venue and accommodation booking systems.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Platform Architecture</h2>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            Built on Next.js 14 with the App Router, this full-stack application combines React Server Components with client-side interactivity for optimal performance. The backend leverages Supabase for PostgreSQL database management and Drizzle ORM for type-safe database operations. User authentication and admin access are handled through Clerk, while Stripe powers secure payment processing.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Booking & Location System</h2>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            The platform features an extensive location-based booking system covering 17+ UK cities including Bristol, Bath, London, Cardiff, Brighton, Oxford, Bournemouth, Southampton, Cheltenham, and more. Each location page is dynamically generated with location-specific content, SEO-optimised URLs, and dedicated accommodation recommendations to help party organisers plan complete experiences.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Key Features</h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                            <li>Multi-step enquiry form with venue tracking and analytics</li>
                            <li>Dynamic pricing cards with seasonal offers</li>
                            <li>Photo galleries and customer reviews integration</li>
                            <li>Accommodation database with location-based recommendations</li>
                            <li>Google Maps integration for venue discovery</li>
                            <li>Mobile-responsive design with desktop navigation dropdowns</li>
                            <li>Contact link tracking for phone and email conversions</li>
                            <li>Structured data for rich search engine results</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Content & SEO</h2>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            Each page is carefully optimised for search engines with location-specific keywords, comprehensive meta descriptions, and structured data markup. The hen party games section provides additional value for party planners, while the reviews page showcases genuine customer testimonials. The About Ben section adds a personal touch, establishing trust and credibility with potential customers.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Design System</h2>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            Styled with Tailwind CSS and shadcn/ui components, the design features a vibrant pink primary colour (#ec4899) that reflects the fun, celebratory nature of hen party events. The two-tier header design separates contact information from navigation, ensuring key details are always visible. Image optimisation through Next.js Image component ensures fast loading even with gallery-heavy pages.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Infrastructure</h2>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            The application is deployed on Vercel with automatic CI/CD from GitHub. Supabase provides managed PostgreSQL hosting with automatic backups. Media assets are served through Supabase Storage with CDN caching. Google Analytics 4 and Tag Manager provide comprehensive visitor and conversion tracking for marketing optimisation.
                        </p>

                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <p className="text-gray-500 text-sm">
                                Built with Next.js 14, React, TypeScript, Supabase, Drizzle ORM, Clerk, and Stripe.
                                <br />
                                © {new Date().getFullYear()} Hen Party Entertainment. All rights reserved.
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        </main>
    );
}
