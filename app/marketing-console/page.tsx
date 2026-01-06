'use client';

import { useState } from 'react';
import { useUser, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import Link from 'next/link';

type ContentType = 'instagram' | 'facebook' | 'story' | 'bulk';
type GeneratedContent = {
    caption?: string;
    hashtags?: string[];
    bestTimeToPost?: string;
    imageIdea?: string;
    callToAction?: string;
    slides?: Array<{ text: string; sticker: string }>;
    weeklyPosts?: Array<{
        day: string;
        platform: string;
        caption: string;
        hashtags: string[];
        imageIdea: string;
    }>;
    rawText?: string;
};

const LOCATIONS = [
    'Bristol', 'Bath', 'Cardiff', 'Cheltenham', 'Gloucester',
    'Oxford', 'Swindon', 'London', 'Brighton', 'Bournemouth',
    'Southampton', 'Exeter', 'Newport', 'Swansea', 'Glastonbury'
];

const TOPICS = [
    'Booking now for 2026 hen parties',
    'Why life drawing is the perfect hen party activity',
    'Bride goes FREE promotion',
    'Mobile service - we come to you',
    'What to expect from a session',
    'Customer testimonial spotlight',
    'Summer hen party ideas',
    'Last minute availability',
    'New location announcement',
    'Behind the scenes'
];

export default function MarketingConsolePage() {
    const { user } = useUser();
    const [contentType, setContentType] = useState<ContentType>('instagram');
    const [topic, setTopic] = useState('');
    const [customTopic, setCustomTopic] = useState('');
    const [tone, setTone] = useState('fun and friendly');
    const [location, setLocation] = useState('');
    const [hashtags, setHashtags] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        setIsLoading(true);
        setError('');
        setGeneratedContent(null);

        try {
            const response = await fetch('/api/marketing/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: contentType,
                    topic: customTopic || topic,
                    tone,
                    location,
                    hashtags,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setGeneratedContent(data.content);
            } else {
                setError(data.error || 'Failed to generate content');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
            <SignedIn>
                <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
                    {/* Header */}
                    <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
                        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Link href="/" className="text-pink-400 hover:text-pink-300">
                                    ← Back to Site
                                </Link>
                                <h1 className="text-2xl font-bold">
                                    🎨 Marketing Console
                                </h1>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-slate-400 text-sm">
                                    Logged in as {user?.emailAddresses[0]?.emailAddress}
                                </span>
                            </div>
                        </div>
                    </header>

                    <div className="max-w-7xl mx-auto px-4 py-8">
                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Input Panel */}
                            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <span>✨</span> Generate Content
                                </h2>

                                {/* Content Type */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium mb-2 text-slate-300">
                                        Content Type
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                        {[
                                            { id: 'instagram', label: '📸 Instagram', desc: 'Post' },
                                            { id: 'facebook', label: '👥 Facebook', desc: 'Post' },
                                            { id: 'story', label: '📱 Stories', desc: 'IG/FB' },
                                            { id: 'bulk', label: '📅 Weekly', desc: 'Bulk' },
                                        ].map((type) => (
                                            <button
                                                key={type.id}
                                                onClick={() => setContentType(type.id as ContentType)}
                                                className={`p-3 rounded-xl border text-center transition ${contentType === type.id
                                                        ? 'bg-pink-600 border-pink-500 text-white'
                                                        : 'bg-slate-700/50 border-slate-600 hover:border-pink-500'
                                                    }`}
                                            >
                                                <div className="text-lg">{type.label}</div>
                                                <div className="text-xs opacity-70">{type.desc}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Topic Selection */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium mb-2 text-slate-300">
                                        Topic
                                    </label>
                                    <select
                                        value={topic}
                                        onChange={(e) => setTopic(e.target.value)}
                                        className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white"
                                    >
                                        <option value="">Select a topic...</option>
                                        {TOPICS.map((t) => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            placeholder="Or enter custom topic..."
                                            value={customTopic}
                                            onChange={(e) => setCustomTopic(e.target.value)}
                                            className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder:text-slate-500"
                                        />
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium mb-2 text-slate-300">
                                        Target Location (optional)
                                    </label>
                                    <select
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white"
                                    >
                                        <option value="">All locations</option>
                                        {LOCATIONS.map((loc) => (
                                            <option key={loc} value={loc}>{loc}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Tone */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium mb-2 text-slate-300">
                                        Tone
                                    </label>
                                    <select
                                        value={tone}
                                        onChange={(e) => setTone(e.target.value)}
                                        className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white"
                                    >
                                        <option value="fun and friendly">Fun & Friendly</option>
                                        <option value="professional and classy">Professional & Classy</option>
                                        <option value="exciting and urgent">Exciting & Urgent</option>
                                        <option value="warm and personal">Warm & Personal</option>
                                        <option value="playful and cheeky">Playful & Cheeky</option>
                                    </select>
                                </div>

                                {/* Custom Hashtags */}
                                {contentType === 'instagram' && (
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium mb-2 text-slate-300">
                                            Custom Hashtags (optional)
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="#henparty #lifedrawing..."
                                            value={hashtags}
                                            onChange={(e) => setHashtags(e.target.value)}
                                            className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder:text-slate-500"
                                        />
                                    </div>
                                )}

                                {/* Generate Button */}
                                <button
                                    onClick={handleGenerate}
                                    disabled={isLoading || (!topic && !customTopic)}
                                    className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-pink-500 hover:to-purple-500 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="animate-spin">⏳</span>
                                            Generating with AI...
                                        </>
                                    ) : (
                                        <>
                                            <span>🚀</span>
                                            Generate Content
                                        </>
                                    )}
                                </button>

                                {error && (
                                    <div className="mt-4 p-4 bg-red-900/50 border border-red-700 rounded-xl text-red-200">
                                        {error}
                                    </div>
                                )}
                            </div>

                            {/* Output Panel */}
                            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <span>📝</span> Generated Content
                                </h2>

                                {!generatedContent && !isLoading && (
                                    <div className="text-center py-16 text-slate-500">
                                        <div className="text-6xl mb-4">✨</div>
                                        <p>Your AI-generated content will appear here</p>
                                    </div>
                                )}

                                {generatedContent && (
                                    <div className="space-y-6">
                                        {/* Caption */}
                                        {generatedContent.caption && (
                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <label className="text-sm font-medium text-slate-300">Caption</label>
                                                    <button
                                                        onClick={() => copyToClipboard(generatedContent.caption || '')}
                                                        className="text-xs bg-slate-700 px-3 py-1 rounded-lg hover:bg-slate-600"
                                                    >
                                                        📋 Copy
                                                    </button>
                                                </div>
                                                <div className="bg-slate-900 rounded-xl p-4 text-white whitespace-pre-wrap">
                                                    {generatedContent.caption}
                                                </div>
                                            </div>
                                        )}

                                        {/* Hashtags */}
                                        {generatedContent.hashtags && generatedContent.hashtags.length > 0 && (
                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <label className="text-sm font-medium text-slate-300">Hashtags</label>
                                                    <button
                                                        onClick={() => copyToClipboard(generatedContent.hashtags?.join(' ') || '')}
                                                        className="text-xs bg-slate-700 px-3 py-1 rounded-lg hover:bg-slate-600"
                                                    >
                                                        📋 Copy All
                                                    </button>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {generatedContent.hashtags.map((tag, i) => (
                                                        <span key={i} className="bg-pink-900/50 text-pink-300 px-3 py-1 rounded-full text-sm">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Best Time */}
                                        {generatedContent.bestTimeToPost && (
                                            <div className="bg-green-900/30 border border-green-700/50 rounded-xl p-4">
                                                <div className="text-sm text-green-400 mb-1">⏰ Best Time to Post</div>
                                                <div className="text-white">{generatedContent.bestTimeToPost}</div>
                                            </div>
                                        )}

                                        {/* Image Idea */}
                                        {generatedContent.imageIdea && (
                                            <div className="bg-purple-900/30 border border-purple-700/50 rounded-xl p-4">
                                                <div className="text-sm text-purple-400 mb-1">🖼️ Image Idea</div>
                                                <div className="text-white">{generatedContent.imageIdea}</div>
                                            </div>
                                        )}

                                        {/* Stories */}
                                        {generatedContent.slides && (
                                            <div>
                                                <label className="text-sm font-medium text-slate-300 block mb-2">Story Slides</label>
                                                <div className="space-y-3">
                                                    {generatedContent.slides.map((slide, i) => (
                                                        <div key={i} className="bg-slate-900 rounded-xl p-4 flex items-start gap-3">
                                                            <span className="bg-pink-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm shrink-0">
                                                                {i + 1}
                                                            </span>
                                                            <div>
                                                                <div className="text-white mb-1">{slide.text}</div>
                                                                <div className="text-xs text-slate-400">Sticker: {slide.sticker}</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Weekly Posts */}
                                        {generatedContent.weeklyPosts && (
                                            <div>
                                                <label className="text-sm font-medium text-slate-300 block mb-2">Weekly Content Plan</label>
                                                <div className="space-y-3 max-h-96 overflow-y-auto">
                                                    {generatedContent.weeklyPosts.map((post, i) => (
                                                        <div key={i} className="bg-slate-900 rounded-xl p-4">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <span className="font-bold text-pink-400">{post.day}</span>
                                                                <span className="text-xs bg-slate-700 px-2 py-1 rounded">{post.platform}</span>
                                                            </div>
                                                            <p className="text-white text-sm mb-2">{post.caption}</p>
                                                            <div className="flex flex-wrap gap-1 mb-2">
                                                                {post.hashtags.map((tag, j) => (
                                                                    <span key={j} className="text-xs text-pink-300">{tag}</span>
                                                                ))}
                                                            </div>
                                                            <p className="text-xs text-slate-400">🖼️ {post.imageIdea}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Raw Text Fallback */}
                                        {generatedContent.rawText && (
                                            <div className="bg-slate-900 rounded-xl p-4 text-white whitespace-pre-wrap">
                                                {generatedContent.rawText}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="mt-8 grid sm:grid-cols-3 gap-4">
                            <Link
                                href="/unique-hen-do-ideas"
                                className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 hover:border-pink-500 transition text-center"
                            >
                                <div className="text-2xl mb-2">📄</div>
                                <div className="font-medium">Unique Hen Do Ideas</div>
                                <div className="text-xs text-slate-400">High-value content page</div>
                            </Link>
                            <Link
                                href="/hen-party-games"
                                className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 hover:border-pink-500 transition text-center"
                            >
                                <div className="text-2xl mb-2">🎮</div>
                                <div className="font-medium">Hen Party Games</div>
                                <div className="text-xs text-slate-400">Content inspiration</div>
                            </Link>
                            <Link
                                href="/reviews"
                                className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 hover:border-pink-500 transition text-center"
                            >
                                <div className="text-2xl mb-2">⭐</div>
                                <div className="font-medium">Reviews</div>
                                <div className="text-xs text-slate-400">Testimonial content</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </SignedIn>
        </>
    );
}
