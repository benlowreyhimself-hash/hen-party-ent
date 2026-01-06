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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {topics.map((topic, index) => {
                    const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    return (
                        <Link
                            key={index}
                            href={`/popular/${slug}`}
                            className="block p-6 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
                        >
                            <h2 className="font-semibold text-gray-800 group-hover:text-primary capitalize flex items-center gap-2">
                                <span className="text-primary/40">#</span> {topic}
                            </h2>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
}
