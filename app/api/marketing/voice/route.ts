import { NextRequest, NextResponse } from 'next/server';

// British/English female voices from ElevenLabs
export const VOICES = {
    'charlotte': { id: 'XB0fDUnXU5powFXDhCwa', name: 'Charlotte', desc: 'Young British, warm and friendly' },
    'emily': { id: 'LcfcDJNUP1GQjkzn1xUU', name: 'Emily', desc: 'British, calm and gentle' },
    'lily': { id: 'pFZP5JQG7iQjIQuC4Bku', name: 'Lily', desc: 'British, energetic and youthful' },
    'freya': { id: 'jsCqWAovK2LkecY7zXl4', name: 'Freya', desc: 'British, expressive and friendly' },
    'grace': { id: 'oWAxZDx7w5VEj9dCyTzz', name: 'Grace', desc: 'British, natural and conversational' },
};

export async function GET() {
    // Return available voices
    return NextResponse.json({
        success: true,
        voices: Object.entries(VOICES).map(([key, v]) => ({
            id: key,
            voiceId: v.id,
            name: v.name,
            description: v.desc,
        })),
    });
}

export async function POST(req: NextRequest) {
    try {
        const { text, voice } = await req.json();

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

        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${selectedVoice.id}`, {
            method: 'POST',
            headers: {
                'Accept': 'audio/mpeg',
                'Content-Type': 'application/json',
                'xi-api-key': apiKey,
            },
            body: JSON.stringify({
                text: cleanText,
                model_id: 'eleven_multilingual_v2',
                voice_settings: {
                    stability: 0.4,        // More expressive
                    similarity_boost: 0.8,
                    style: 0.6,            // Fun/playful style
                    use_speaker_boost: true,
                }
            }),
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
        });

    } catch (error: any) {
        console.error('Voice generation error:', error);
        return NextResponse.json({
            success: false,
            error: error.message || 'Failed to generate voice'
        }, { status: 500 });
    }
}
