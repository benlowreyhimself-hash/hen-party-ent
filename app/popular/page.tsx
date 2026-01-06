import { getPopularQueries } from '@/lib/gsc';
import Link from 'next/link';

// Revalidate every 24 hours
export const revalidate = 86400;

export default async function PopularSearchesPage() {
    let queries: any[] = [];

    try {
        // In production, fetch from GSC
        // For build time/SSR, we handle failures gracefully
        queries = await getPopularQueries();
    } catch (error) {
        console.warn('Failed to fetch GSC queries for popular page:', error);
        // Fallback static topics if API fails or empty
        queries = [
            { keys: ['hen party ideas bristol'] },
            { keys: ['hen do packages bath'] },
            { keys: ['life drawing hen do'] },
            { keys: ['classy hen party games'] },
            { keys: ['hen party houses with pools'] }
        ];
    }

    // Check if we got results, otherwise use fallback
    if (queries.length === 0) {
        console.log('No GSC data found, using fallback topics');
        queries = [
            { keys: ['hen party ideas bristol'] },
            { keys: ['hen do packages bath'] },
            { keys: ['life drawing hen do'] },
            { keys: ['classy hen party games'] },
            { keys: ['hen party houses with pools'] },
            { keys: ['hen party life drawing'] },
            { keys: ['cheap hen do ideas'] }
        ];
    }

    // Filter and format
    const topics = queries
        .map(q => q.keys?.[0])
        .filter(Boolean)
        // Basic deduplication
        .filter((v, i, a) => a.indexOf(v) === i)
        .slice(0, 50);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 text-gray-800">Popular Hen Party Topics</h1>
                <p className="text-lg text-gray-600">
                    Explore the most popular questions and ideas brides and organizers are searching for right now.
                </p>
            </div>

            {/* Featured Guides - Hand-crafted high-value content */}
            <div className="max-w-5xl mx-auto mb-16">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                    <span className="text-primary">★</span> Featured Guides
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link
                        href="/unique-hen-do-ideas"
                        className="group relative bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-8 text-white overflow-hidden hover:scale-[1.02] transition-transform"
                    >
                        <div className="absolute top-4 right-4 bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
                            POPULAR
                        </div>
                        <h3 className="text-2xl font-bold mb-3">Unique Hen Do Ideas 2026</h3>
                        <p className="opacity-90 mb-4">Top 10 creative, classy alternatives to typical hen parties. From life drawing to escape rooms.</p>
                        <span className="inline-flex items-center gap-2 font-semibold group-hover:gap-3 transition-all">
                            Read Guide <span>→</span>
                        </span>
                    </Link>
                    <Link
                        href="/hen-party-games"
                        className="group bg-white border-2 border-slate-200 rounded-2xl p-8 hover:border-primary/50 transition-colors"
                    >
                        <div className="text-4xl mb-4">🎮</div>
                        <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-primary">Hen Party Games</h3>
                        <p className="text-gray-600 mb-4">Fun games and activities to keep everyone entertained at your hen do.</p>
                        <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                            Explore Games <span>→</span>
                        </span>
                    </Link>
                </div>
            </div>

            {/* Popular Locations */}
            <div className="max-w-5xl mx-auto mb-16">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                    <span className="text-primary">📍</span> Popular Locations
                </h2>
                <div className="flex flex-wrap gap-3">
                    {['Bristol', 'Bath', 'Cardiff', 'Cheltenham', 'London', 'Brighton', 'Oxford', 'Cotswolds', 'Glastonbury', 'Exeter'].map((city) => (
                        <Link
                            key={city}
                            href={`/hen-party-life-drawing-${city.toLowerCase()}`}
                            className="bg-white px-4 py-2 rounded-full border border-slate-200 text-gray-700 hover:border-primary hover:text-primary transition-colors"
                        >
                            {city}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Dynamic Topics from GSC */}
            <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                    <span className="text-primary">🔥</span> Trending Searches
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {topics.map((topic, index) => {
                        const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                        return (
                            <Link
                                key={index}
                                href={`/popular/${slug}`}
                                className="block p-6 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
                            >
                                <h3 className="font-semibold text-gray-800 group-hover:text-primary capitalize flex items-center gap-2">
                                    <span className="text-primary/40">#</span> {topic}
                                </h3>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
