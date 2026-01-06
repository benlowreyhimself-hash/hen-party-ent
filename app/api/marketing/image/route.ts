import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { prompt, style } = await req.json();

        if (!prompt) {
            return NextResponse.json({ success: false, error: 'Prompt is required' }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ success: false, error: 'API key not configured' }, { status: 500 });
        }

        // Initialize the new Google GenAI client
        const ai = new GoogleGenAI({ apiKey });

        // Create a marketing-focused prompt for hen party life drawing
        // IMPORTANT: Male model in scene but tastefully handled - focus on women, model blurred/background
        const imagePrompt = `${style || 'Professional, modern, elegant'} marketing image for hen party life drawing class: ${prompt}.

Scene setup:
- Group of happy women (the hen party) drawing at easels, laughing and having fun
- A tasteful male model posing in the background, artistically positioned
- Model shown from behind, side angle, or partially obscured - never frontal nudity
- Use creative angles: model in soft focus or partially out of frame
- FOCUS is on the women enjoying themselves, not the model
- Model wearing minimal clothing but strategically positioned/cropped

Style:
- Pink and purple color palette with champagne gold accents
- Bright, airy, celebratory atmosphere
- Instagram-worthy, professional photography style
- Soft lighting, elegant setting
- No text in the image
- Tasteful and classy, never explicit`;

        // Generate image using Imagen 4
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: imagePrompt,
            config: {
                numberOfImages: 1,
            },
        });

        // Get the generated image
        if (response.generatedImages && response.generatedImages.length > 0) {
            const imageBytes = response.generatedImages[0].image?.imageBytes;

            if (imageBytes) {
                return NextResponse.json({
                    success: true,
                    hasImage: true,
                    imageBase64: imageBytes,
                    mimeType: 'image/png',
                    textDescription: `Generated image for: ${prompt}`,
                    prompt: imagePrompt // Return the prompt used
                });
            }
        }

        // Fallback if no image generated
        return NextResponse.json({
            success: false,
            error: 'No image was generated. The prompt may have been blocked by safety filters.'
        }, { status: 400 });

    } catch (error: any) {
        console.error('Image generation error:', error);

        // Handle specific error types
        if (error.message?.includes('blocked') || error.message?.includes('safety')) {
            return NextResponse.json({
                success: false,
                error: 'Image was blocked by safety filters. Try a different prompt.'
            }, { status: 400 });
        }

        return NextResponse.json({
            success: false,
            error: error.message || 'Failed to generate image'
        }, { status: 500 });
    }
}
