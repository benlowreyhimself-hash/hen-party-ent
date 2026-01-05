import { generateTopicContent } from '@/lib/content-generator';
import Link from 'next/link';
import Image from 'next/image';
import ContactButtons from '@/components/ContactButtons';
import { Metadata } from 'next';

// Cache generated content for 1 week
export const revalidate = 604800;

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = await params;
    const topic = slug.replace(/-/g, ' ');
    return {
        title: `${topic.charAt(0).toUpperCase() + topic.slice(1)} | Ben's Hen Party Tips`,
        description: `Expert advice and top tips for "${topic}". Read our guide for planning the perfect hen party.`
    };
}

export default async function TopicPage({ params }: { params: Params }) {
    const { slug } = await params;
    const topic = slug.replace(/-/g, ' ');

    // Genuine Content Generation
    const content = await generateTopicContent(topic);

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Header */}
            <div className="bg-primary text-primary-foreground py-12 md:py-20">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/20 text-sm font-bold tracking-wider mb-4">
                        POPULAR TOPIC
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 capitalize leading-tight">
                        {content.title || topic}
                    </h1>
                    <p className="text-xl md:text-2xl opacity-90 font-light max-w-2xl mx-auto">
                        Real advice for real hen parties.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 -mt-8">
                <div className="max-w-4xl mx-auto">
                    {/* Main Content Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
                        <div className="prose prose-lg text-gray-600 max-w-none">
                            <p className="text-xl font-medium text-gray-800 mb-8 leading-relaxed">
                                {content.intro}
                            </p>

                            {content.tips && content.tips.length > 0 && (
                                <div className="my-8 bg-sky-50 p-8 rounded-xl border border-sky-100">
                                    <h3 className="text-2xl font-bold text-sky-900 mb-6 flex items-center gap-2">
                                        ✨ Ben's Pro Tips
                                    </h3>
                                    <ul className="space-y-4">
                                        {content.tips.map((tip: string, i: number) => (
                                            <li key={i} className="flex gap-3">
                                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-sky-200 text-sky-700 flex items-center justify-center font-bold text-sm mt-1">{i + 1}</span>
                                                <span>{tip}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <p className="border-l-4 border-primary pl-6 py-2 italic text-gray-500">
                                {content.conclusion}
                            </p>
                        </div>
                    </div>

                    {/* Call to Action Wrapper */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row">
                        <div className="md:w-1/3 relative h-64 md:h-auto">
                            <Image
                                src="https://xirtgqglzsghphhihrcr.supabase.co/storage/v1/object/public/hen-party-media/originals/ben-bride-glasses.jpg"
                                alt="Ben Hen Party Model"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-8 md:w-2/3 flex flex-col justify-center">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">Make it Unforgettable</h2>
                            <p className="text-gray-600 mb-6">
                                Whatever your plans for <strong>{topic}</strong>, nothing breaks the ice quite like a Life Drawing Class with a professional model like myself. It's classy, hilarious, and memorable.
                            </p>
                            <div className="flex gap-4">
                                <Link href="/prices" className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
                                    View Prices
                                </Link>
                                <Link href="/contact" className="border-2 border-primary text-primary px-6 py-3 rounded-lg font-bold hover:bg-primary/5 transition-colors">
                                    Check Availability
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
