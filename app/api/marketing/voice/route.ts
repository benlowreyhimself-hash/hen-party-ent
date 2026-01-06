import { NextRequest, NextResponse } from 'next/server';

// British/English female voices from ElevenLabs
export const VOICES = {
    'charlotte': { id: 'XB0fDUnXU5powFXDhCwa', name: 'Charlotte', desc: 'Young British, warm and friendly' },
    'emily': { id: 'LcfcDJNUP1GQjkzn1xUU', name: 'Emily', desc: 'British, calm and gentle' },
    'lily': { id: 'pFZP5JQG7iQjIQuC4Bku', name: 'Lily', desc: 'British, energetic and youthful' },
    'freya': { id: 'jsCqWAovK2LkecY7zXl4', name: 'Freya', desc: 'British, expressive and friendly' },
    'grace': { id: 'oWAxZDx7w5VEj9dCyTzz', name: 'Grace', desc: 'British, natural and conversational' },
};

// Default voice settings
export const DEFAULT_VOICE_SETTINGS = {
    stability: 0.5,          // 0-1: Lower = more expressive, Higher = more consistent
    similarity_boost: 0.75,  // 0-1: How closely to match the original voice
    style: 0.5,              // 0-1: Style exaggeration (more expressive delivery)
    speed: 1.0,              // 0.5-2.0: Speaking speed
};

export async function GET() {
    // Return available voices and settings info
    return NextResponse.json({
        success: true,
        voices: Object.entries(VOICES).map(([key, v]) => ({
            id: key,
            voiceId: v.id,
            name: v.name,
            description: v.desc,
        })),
        defaultSettings: DEFAULT_VOICE_SETTINGS,
        settingsInfo: {
            stability: { min: 0, max: 1, step: 0.1, desc: 'Lower = more expressive, Higher = more consistent' },
            similarity_boost: { min: 0, max: 1, step: 0.1, desc: 'How closely to match the original voice' },
            style: { min: 0, max: 1, step: 0.1, desc: 'Style exaggeration for more expressive delivery' },
            speed: { min: 0.5, max: 2.0, step: 0.1, desc: 'Speaking speed (1.0 = normal)' },
        },
    });
}

export async function POST(req: NextRequest) {
    try {
        const { text, voice, settings } = await req.json();

        if (!text) {
            return NextResponse.json({ success: false, error: 'Text is required' }, { status: 400 });
        }

        const apiKey = process.env.ELEVENLABS_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ success: false, error: 'ElevenLabs API key not configured' }, { status: 500 });
        }

        // Clean text: remove hashtags, URLs, emojis, @mentions
        const cleanText = text
            .replace(/https?:\/\/[^\s]+/g, '')  // Remove URLs
            .replace(/[#@]\w+/g, '')            // Remove hashtags and mentions
            .replace(/[\u{1F300}-\u{1F9FF}]/gu, '') // Remove most emojis
            .replace(/[\u{2600}-\u{26FF}]/gu, '')   // Remove misc symbols
            .replace(/[\u{2700}-\u{27BF}]/gu, '')   // Remove dingbats
            .replace(/[\u{FE00}-\u{FE0F}]/gu, '')   // Remove variation selectors
            .replace(/[\u{1F000}-\u{1F02F}]/gu, '') // Remove mahjong tiles
            .replace(/\s+/g, ' ')               // Normalize whitespace
            .trim();

        if (!cleanText) {
            return NextResponse.json({ success: false, error: 'No readable text after cleaning' }, { status: 400 });
        }

        // Get voice ID - default to Charlotte (British, friendly)
        const selectedVoice = VOICES[voice as keyof typeof VOICES] || VOICES.charlotte;

        // Merge settings with defaults
        const voiceSettings = {
            stability: settings?.stability ?? DEFAULT_VOICE_SETTINGS.stability,
            similarity_boost: settings?.similarity_boost ?? DEFAULT_VOICE_SETTINGS.similarity_boost,
            style: settings?.style ?? DEFAULT_VOICE_SETTINGS.style,
            use_speaker_boost: true,
        };

        // Build request body
        const requestBody: any = {
            text: cleanText,
            model_id: 'eleven_multilingual_v2',
            voice_settings: voiceSettings,
        };

        // Add speed if not 1.0 (requires different endpoint or parameter)
        const speed = settings?.speed ?? DEFAULT_VOICE_SETTINGS.speed;

        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${selectedVoice.id}`, {
            method: 'POST',
            headers: {
                'Accept': 'audio/mpeg',
                'Content-Type': 'application/json',
                'xi-api-key': apiKey,
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('ElevenLabs error:', errorText);
            return NextResponse.json({
                success: false,
                error: `Voice generation failed: ${response.status}`
            }, { status: response.status });
        }

        const audioBuffer = await response.arrayBuffer();
        const audioBase64 = Buffer.from(audioBuffer).toString('base64');

        return NextResponse.json({
            success: true,
            audioBase64,
            mimeType: 'audio/mpeg',
            voice: selectedVoice.name,
            cleanedText: cleanText,
            settingsUsed: { ...voiceSettings, speed },
        });

    } catch (error: any) {
        console.error('Voice generation error:', error);
        return NextResponse.json({
            success: false,
            error: error.message || 'Failed to generate voice'
        }, { status: 500 });
    }
}
