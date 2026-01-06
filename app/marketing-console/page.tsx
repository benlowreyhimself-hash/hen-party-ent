'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type GeneratedContent = {
    caption?: string;
    hashtags?: string[];
    bestTimeToPost?: string;
    imageIdea?: string;
};

type HeadlineData = {
    text: GeneratedContent | null;
    textPrompt: string | null;
    imageBase64: string | null;
    imagePrompt: string | null;
    voiceBase64: string | null;
    voiceName: string | null;
    videoUri: string | null;
};

const HEADLINES = [
    'Booking now for 2026 hen parties',
    'Why life drawing is the perfect hen party activity',
    'Bride goes FREE promotion',
    'Mobile service - we come to you',
    'What to expect from a session',
    'Customer testimonial spotlight',
    'Summer hen party ideas',
    'Last minute availability',
    'New location announcement',
    'Behind the scenes',
    'Five star reviews',
    'Unique hen party ideas',
];

const VOICES = [
    { id: 'charlotte', name: 'Charlotte', desc: 'Warm & friendly' },
    { id: 'emily', name: 'Emily', desc: 'Calm & gentle' },
    { id: 'lily', name: 'Lily', desc: 'Energetic & youthful' },
    { id: 'freya', name: 'Freya', desc: 'Expressive & fun' },
    { id: 'grace', name: 'Grace', desc: 'Natural & conversational' },
];

const ADMIN_PASSWORD = 'henparty2026';

const emptyHeadlineData = (): HeadlineData => ({
    text: null,
    textPrompt: null,
    imageBase64: null,
    imagePrompt: null,
    voiceBase64: null,
    voiceName: null,
    videoUri: null,
});

export default function MarketingConsolePage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');

    const [selectedHeadline, setSelectedHeadline] = useState<string | null>(null);
    const [headlineData, setHeadlineData] = useState<Record<string, HeadlineData>>({});
    const [selectedVoice, setSelectedVoice] = useState('charlotte');

    // Loading states
    const [isGeneratingText, setIsGeneratingText] = useState(false);
    const [isGeneratingImage, setIsGeneratingImage] = useState(false);
    const [isGeneratingVoice, setIsGeneratingVoice] = useState(false);
    const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
    const [isSavingToDrive, setIsSavingToDrive] = useState(false);
    const [driveLink, setDriveLink] = useState<string | null>(null);

    const [error, setError] = useState('');
    const [copySuccess, setCopySuccess] = useState<string | null>(null);

    // Load saved data from localStorage (fast, persistent in browser)
    useEffect(() => {
        const saved = sessionStorage.getItem('marketing_auth');
        if (saved === 'true') setIsAuthenticated(true);

        // Load from localStorage
        try {
            const savedData = localStorage.getItem('marketing_headline_data');
            if (savedData) {
                const parsed = JSON.parse(savedData);
                setHeadlineData(parsed);
                console.log('Loaded', Object.keys(parsed).length, 'headlines from local storage');
            }
        } catch (e) {
            console.error('Failed to load:', e);
        }
    }, []);

    // Auto-save to localStorage when data changes
    useEffect(() => {
        if (Object.keys(headlineData).length > 0) {
            try {
                // Save text content only (images/audio too large for localStorage)
                const dataToSave: Record<string, HeadlineData> = {};
                for (const [key, value] of Object.entries(headlineData)) {
                    dataToSave[key] = {
                        ...value,
                        imageBase64: null, // Skip large binaries
                        voiceBase64: null,
                    };
                }
                localStorage.setItem('marketing_headline_data', JSON.stringify(dataToSave));
            } catch (e) {
                console.error('Failed to save:', e);
            }
        }
    }, [headlineData]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            sessionStorage.setItem('marketing_auth', 'true');
        } else {
            setAuthError('Incorrect password');
        }
    };

    const updateHeadlineData = (headline: string, updates: Partial<HeadlineData>) => {
        setHeadlineData(prev => ({
            ...prev,
            [headline]: { ...(prev[headline] || emptyHeadlineData()), ...updates }
        }));
    };

    const handleGenerateText = async () => {
        if (!selectedHeadline) return;
        setIsGeneratingText(true);
        setError('');

        try {
            const response = await fetch('/api/marketing/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'instagram',
                    topic: selectedHeadline,
                    tone: 'professional and classy',
                }),
            });

            const data = await response.json();
            if (data.success) {
                updateHeadlineData(selectedHeadline, {
                    text: data.content,
                    textPrompt: data.prompt || null,
                });
            } else {
                setError(data.error || 'Failed to generate text');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsGeneratingText(false);
        }
    };

    const handleGenerateImage = async () => {
        if (!selectedHeadline) return;
        setIsGeneratingImage(true);
        setError('');

        try {
            const currentData = headlineData[selectedHeadline];
            const response = await fetch('/api/marketing/image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: currentData?.text?.imageIdea || selectedHeadline,
                    style: 'Professional, modern, elegant'
                }),
            });

            const data = await response.json();
            if (data.success && data.hasImage) {
                updateHeadlineData(selectedHeadline, {
                    imageBase64: data.imageBase64,
                    imagePrompt: data.prompt || null,
                });
            } else {
                setError(data.error || 'Failed to generate image');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsGeneratingImage(false);
        }
    };

    const handleGenerateVoice = async () => {
        if (!selectedHeadline) return;
        const currentData = headlineData[selectedHeadline];
        if (!currentData?.text?.caption) {
            setError('Generate text first');
            return;
        }

        setIsGeneratingVoice(true);
        setError('');

        try {
            const response = await fetch('/api/marketing/voice', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: currentData.text.caption,
                    voice: selectedVoice,
                }),
            });

            const data = await response.json();
            if (data.success) {
                updateHeadlineData(selectedHeadline, {
                    voiceBase64: data.audioBase64,
                    voiceName: data.voice,
                });
            } else {
                setError(data.error || 'Failed to generate voice');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsGeneratingVoice(false);
        }
    };

    const handleGenerateVideo = async () => {
        if (!selectedHeadline) return;
        setIsGeneratingVideo(true);
        setError('');

        try {
            const currentData = headlineData[selectedHeadline];
            const response = await fetch('/api/marketing/video', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: currentData?.text?.imageIdea || selectedHeadline,
                }),
            });

            const data = await response.json();
            if (data.success && data.hasVideo) {
                updateHeadlineData(selectedHeadline, {
                    videoUri: data.videoUri,
                });
            } else {
                setError(data.error || 'Failed to generate video');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsGeneratingVideo(false);
        }
    };

    const handleSaveToDrive = async () => {
        if (!selectedHeadline) return;
        const data = headlineData[selectedHeadline];
        if (!data?.text && !data?.imageBase64 && !data?.voiceBase64) {
            setError('Generate some content first');
            return;
        }

        setIsSavingToDrive(true);
        setError('');
        setDriveLink(null);

        try {
            const response = await fetch('/api/marketing/save-to-drive', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    headline: selectedHeadline,
                    text: data.text,
                    imageBase64: data.imageBase64,
                    voiceBase64: data.voiceBase64,
                    videoUri: data.videoUri,
                }),
            });

            const result = await response.json();
            if (result.success) {
                setDriveLink(result.folderLink);
            } else {
                setError(result.error || 'Failed to save to Drive');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSavingToDrive(false);
        }
    };

    const currentData = selectedHeadline ? headlineData[selectedHeadline] : null;

    const downloadImage = () => {
        if (!currentData?.imageBase64) return;
        const link = document.createElement('a');
        link.href = `data:image/png;base64,${currentData.imageBase64}`;
        link.download = `marketing-${selectedHeadline?.replace(/\s+/g, '-').toLowerCase() || 'image'}.png`;
        link.click();
    };

    const downloadVoice = () => {
        if (!currentData?.voiceBase64) return;
        const link = document.createElement('a');
        link.href = `data:audio/mpeg;base64,${currentData.voiceBase64}`;
        link.download = `voiceover-${selectedHeadline?.replace(/\s+/g, '-').toLowerCase() || 'audio'}.mp3`;
        link.click();
    };

    const copyToClipboard = async (text: string, label: string) => {
        await navigator.clipboard.writeText(text);
        setCopySuccess(label);
        setTimeout(() => setCopySuccess(null), 2000);
    };

    const copyAllContent = () => {
        if (!currentData?.text) return;
        const allContent = [
            currentData.text.caption || '',
            '',
            currentData.text.hashtags?.join(' ') || '',
            '',
            currentData.text.bestTimeToPost ? `Best time to post: ${currentData.text.bestTimeToPost}` : '',
        ].filter(Boolean).join('\n');
        copyToClipboard(allContent, 'all');
    };

    const selectHeadline = (headline: string) => {
        setSelectedHeadline(headline);
        setError('');
    };

    const hasContent = (headline: string) => {
        const data = headlineData[headline];
        return data && (data.text || data.imageBase64 || data.voiceBase64);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 max-w-md w-full">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-light text-white mb-2">Marketing Console</h1>
                        <p className="text-white/50 text-sm">Enter password to continue</p>
                    </div>
                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white mb-4 placeholder:text-white/30 focus:border-white/30 focus:outline-none transition"
                            autoFocus
                        />
                        {authError && <p className="text-red-400 text-sm mb-4">{authError}</p>}
                        <button type="submit" className="w-full bg-white text-slate-900 py-3 rounded-xl font-medium hover:bg-white/90 transition">
                            Enter
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <Link href="/" className="text-white/40 hover:text-white/60 text-sm transition">← Back to website</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            {/* Header */}
            <header className="backdrop-blur-xl bg-white/5 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="text-white/50 hover:text-white text-sm transition">← Back</Link>
                        <h1 className="text-lg font-light">Marketing Console</h1>
                    </div>
                    <button
                        onClick={() => { sessionStorage.removeItem('marketing_auth'); setIsAuthenticated(false); }}
                        className="text-white/40 hover:text-white text-sm transition"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Headlines List */}
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h2 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-4">Headlines</h2>
                        <div className="space-y-2">
                            {HEADLINES.map((headline) => {
                                const data = headlineData[headline];
                                const isSelected = selectedHeadline === headline;
                                const hasSavedContent = data?.text || data?.imageBase64 || data?.voiceBase64;
                                return (
                                    <button
                                        key={headline}
                                        onClick={() => selectHeadline(headline)}
                                        className={`w-full text-left p-3 rounded-xl transition flex items-center justify-between gap-2 ${isSelected
                                            ? 'bg-white/10 border border-white/20'
                                            : hasSavedContent
                                                ? 'bg-white/5 border border-white/10'
                                                : 'hover:bg-white/5 border border-transparent'
                                            }`}
                                    >
                                        <span className={`text-sm ${hasSavedContent ? 'text-white' : 'text-white/70'}`}>{headline}</span>
                                        <div className="flex items-center gap-1 shrink-0">
                                            {hasSavedContent && (
                                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-white/50 font-medium uppercase">saved</span>
                                            )}
                                            {data?.text && <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>}
                                            {data?.imageBase64 && <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>}
                                            {data?.voiceBase64 && <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Generator Panel */}
                    <div className="lg:col-span-2 space-y-6">
                        {selectedHeadline ? (
                            <>
                                {/* Selected Headline & Actions */}
                                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="text-white/40 text-xs uppercase tracking-wider">Folder Name</p>
                                                <button
                                                    onClick={() => copyToClipboard(selectedHeadline.replace(/\s+/g, '-').toLowerCase(), 'folder')}
                                                    className={`text-[10px] px-1.5 py-0.5 rounded transition ${copySuccess === 'folder' ? 'text-emerald-400' : 'text-white/30 hover:text-white/50'}`}
                                                >
                                                    {copySuccess === 'folder' ? '✓' : 'copy'}
                                                </button>
                                            </div>
                                            <h3 className="text-xl font-light">{selectedHeadline}</h3>
                                            <code className="text-xs text-white/30 font-mono">{selectedHeadline.replace(/\s+/g, '-').toLowerCase()}</code>
                                        </div>
                                        <div className="flex gap-1 flex-wrap justify-end">
                                            {currentData?.text && <span className="px-2 py-0.5 rounded-full bg-white/5 text-white/50 text-[10px] border border-white/10">text</span>}
                                            {currentData?.imageBase64 && <span className="px-2 py-0.5 rounded-full bg-white/5 text-white/50 text-[10px] border border-white/10">image</span>}
                                            {currentData?.voiceBase64 && <span className="px-2 py-0.5 rounded-full bg-white/5 text-white/50 text-[10px] border border-white/10">voice</span>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                        <button
                                            onClick={handleGenerateText}
                                            disabled={isGeneratingText}
                                            className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl text-xs font-medium transition disabled:opacity-50 text-white/70"
                                        >
                                            {isGeneratingText ? 'generating...' : currentData?.text ? 'Regenerate Text' : 'Generate Text'}
                                        </button>
                                        <button
                                            onClick={handleGenerateImage}
                                            disabled={isGeneratingImage}
                                            className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl text-xs font-medium transition disabled:opacity-50 text-white/70"
                                        >
                                            {isGeneratingImage ? 'generating...' : currentData?.imageBase64 ? 'Regenerate Image' : 'Generate Image'}
                                        </button>
                                        <button
                                            onClick={handleGenerateVoice}
                                            disabled={isGeneratingVoice || !currentData?.text?.caption}
                                            className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl text-xs font-medium transition disabled:opacity-50 text-white/70"
                                        >
                                            {isGeneratingVoice ? 'generating...' : currentData?.voiceBase64 ? 'Regenerate Voice' : 'Generate Voice'}
                                        </button>
                                        <button
                                            onClick={handleGenerateVideo}
                                            disabled={isGeneratingVideo}
                                            className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl text-xs font-medium transition disabled:opacity-50 text-white/70"
                                        >
                                            {isGeneratingVideo ? 'generating...' : currentData?.videoUri ? 'Regenerate Video' : 'Generate Video'}
                                        </button>
                                    </div>

                                    {/* Save to Google Drive */}
                                    <div className="mt-4 pt-4 border-t border-white/10">
                                        <div className="flex items-center justify-between">
                                            <button
                                                onClick={handleSaveToDrive}
                                                disabled={isSavingToDrive || (!currentData?.text && !currentData?.imageBase64 && !currentData?.voiceBase64)}
                                                className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl text-xs font-medium transition disabled:opacity-50 text-white/70"
                                            >
                                                {isSavingToDrive ? 'Saving to Drive...' : 'Save All to Google Drive'}
                                            </button>
                                            {driveLink && (
                                                <a
                                                    href={driveLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs text-white/50 hover:text-white/70 underline"
                                                >
                                                    Open folder →
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm">
                                            {error}
                                        </div>
                                    )}
                                </div>

                                {/* Generated Text */}
                                {currentData?.text && (
                                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-sm font-medium text-white/60 uppercase tracking-wider">Caption</h4>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={copyAllContent}
                                                    className={`text-xs px-3 py-1 rounded-lg transition ${copySuccess === 'all' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/10 hover:bg-white/15 text-white/70'}`}
                                                >
                                                    {copySuccess === 'all' ? '✓ Copied!' : 'Copy All'}
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-white/90 whitespace-pre-wrap mb-6">{currentData.text.caption}</p>

                                        {currentData.text.hashtags && currentData.text.hashtags.length > 0 && (
                                            <div className="mb-6">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h4 className="text-sm font-medium text-white/60 uppercase tracking-wider">Hashtags</h4>
                                                    <button
                                                        onClick={() => copyToClipboard(currentData.text?.hashtags?.join(' ') || '', 'hashtags')}
                                                        className={`text-xs transition ${copySuccess === 'hashtags' ? 'text-emerald-400' : 'text-white/40 hover:text-white/60'}`}
                                                    >
                                                        {copySuccess === 'hashtags' ? '✓ Copied' : 'Copy'}
                                                    </button>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {currentData.text.hashtags.map((tag, i) => (
                                                        <span key={i} className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs text-white/70">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {currentData.text.bestTimeToPost && (
                                            <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                                                <p className="text-xs text-white/40 mb-1">Best Time to Post</p>
                                                <p className="text-sm text-white/80">{currentData.text.bestTimeToPost}</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Generated Image */}
                                {currentData?.imageBase64 && (
                                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-sm font-medium text-white/60 uppercase tracking-wider">Generated Image</h4>
                                            <button
                                                onClick={downloadImage}
                                                className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg transition"
                                            >
                                                Download
                                            </button>
                                        </div>
                                        <img
                                            src={`data:image/png;base64,${currentData.imageBase64}`}
                                            alt="Generated marketing image"
                                            className="w-full rounded-xl mb-4"
                                        />
                                        {currentData.imagePrompt && (
                                            <details className="text-xs">
                                                <summary className="text-white/40 cursor-pointer hover:text-white/60">View prompt used</summary>
                                                <p className="mt-2 p-3 bg-white/5 rounded-lg text-white/60">{currentData.imagePrompt}</p>
                                            </details>
                                        )}
                                    </div>
                                )}

                                {/* Generated Voice */}
                                {currentData?.voiceBase64 && (
                                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-sm font-medium text-white/60 uppercase tracking-wider">
                                                Voice Over <span className="text-white/40">({currentData.voiceName || 'Charlotte'})</span>
                                            </h4>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={handleGenerateVoice}
                                                    disabled={isGeneratingVoice}
                                                    className="text-xs text-white/40 hover:text-white/60 transition disabled:opacity-50"
                                                >
                                                    {isGeneratingVoice ? 'regenerating...' : 'regenerate'}
                                                </button>
                                                <button
                                                    onClick={downloadVoice}
                                                    className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg transition"
                                                >
                                                    Download MP3
                                                </button>
                                            </div>
                                        </div>

                                        {/* Voice Selection */}
                                        <div className="mb-4">
                                            <label className="text-xs text-white/30 block mb-2">Change voice</label>
                                            <div className="flex flex-wrap gap-2">
                                                {VOICES.map(v => (
                                                    <button
                                                        key={v.id}
                                                        onClick={() => setSelectedVoice(v.id)}
                                                        className={`text-xs px-3 py-1.5 rounded-lg transition ${selectedVoice === v.id
                                                            ? 'bg-white/15 border border-white/20 text-white'
                                                            : 'bg-white/5 border border-white/10 text-white/40 hover:text-white/60'
                                                            }`}
                                                    >
                                                        {v.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <audio
                                            controls
                                            className="w-full"
                                            src={`data:audio/mpeg;base64,${currentData.voiceBase64}`}
                                        />
                                    </div>
                                )}

                                {/* Generated Video */}
                                {currentData?.videoUri && (
                                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-sm font-medium text-white/60 uppercase tracking-wider">Generated Video</h4>
                                        </div>
                                        <video
                                            controls
                                            className="w-full rounded-xl"
                                            src={currentData.videoUri}
                                        />
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
                                <p className="text-white/30">Select a headline to get started</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
