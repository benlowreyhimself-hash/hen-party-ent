import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { prompt, imageBase64 } = await req.json();

        if (!prompt) {
            return NextResponse.json({ success: false, error: 'Prompt is required' }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ success: false, error: 'API key not configured' }, { status: 500 });
        }

        const ai = new GoogleGenAI({ apiKey });

        // Create marketing-focused video prompt
        const videoPrompt = `Professional marketing video for hen party life drawing business: ${prompt}. 
Pink and purple color palette, celebratory atmosphere, elegant and fun. 
Show happy groups, art supplies, champagne glasses, celebration vibes.
Professional, tasteful, Instagram-worthy content.`;

        // Start video generation (async operation)
        let operation = await ai.models.generateVideos({
            model: 'veo-2.0-generate-001', // Using Veo 2 (more widely available)
            prompt: videoPrompt,
        });

        // Poll for completion (max 2 minutes for API response)
        const maxAttempts = 12;
        let attempts = 0;

        while (!operation.done && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds
            operation = await ai.operations.getVideosOperation({ operation });
            attempts++;
        }

        if (!operation.done) {
            return NextResponse.json({
                success: false,
                error: 'Video generation timed out. Try again or use a simpler prompt.',
                operationId: operation.name,
            }, { status: 408 });
        }

        // Get the generated video
        const generatedVideo = operation.response?.generatedVideos?.[0];
        if (!generatedVideo?.video) {
            return NextResponse.json({
                success: false,
                error: 'No video was generated. The prompt may have been blocked.',
            }, { status: 400 });
        }

        // Download and return as base64
        const videoFile = generatedVideo.video;

        return NextResponse.json({
            success: true,
            hasVideo: true,
            videoUri: videoFile.uri,
            mimeType: videoFile.mimeType || 'video/mp4',
            prompt: videoPrompt,
        });

    } catch (error: any) {
        console.error('Video generation error:', error);

        if (error.message?.includes('not found') || error.message?.includes('not supported')) {
            return NextResponse.json({
                success: false,
                error: 'Video generation is not available for your API tier. Consider upgrading or using image generation.',
            }, { status: 403 });
        }

        return NextResponse.json({
            success: false,
            error: error.message || 'Failed to generate video'
        }, { status: 500 });
    }
}
