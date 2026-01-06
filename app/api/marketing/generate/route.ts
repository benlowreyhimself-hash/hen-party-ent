import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
    try {
        const { type, topic, tone, location, hashtags } = await request.json();

        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

        let prompt = '';

        switch (type) {
            case 'instagram':
                prompt = `You are a social media marketing expert for a hen party life drawing entertainment business based in the UK. 
        
Create an engaging Instagram post about: ${topic}
Tone: ${tone || 'fun, friendly, professional'}
${location ? `Target location: ${location}` : 'General UK audience'}

Requirements:
- Write a compelling caption (150-300 characters)
- Include relevant emojis
- Make it engaging and encourage interaction
- Focus on hen parties, life drawing, and fun celebrations
- ${hashtags ? 'Include these hashtags: ' + hashtags : 'Suggest 5-8 relevant hashtags'}

Format your response as JSON:
{
  "caption": "Your engaging caption here",
  "hashtags": ["#hashtag1", "#hashtag2"],
  "bestTimeToPost": "suggested day/time",
  "imageIdea": "brief description of ideal accompanying image"
}`;
                break;

            case 'facebook':
                prompt = `You are a social media marketing expert for a hen party life drawing entertainment business.

Create a Facebook post about: ${topic}
Tone: ${tone || 'warm, conversational, engaging'}
${location ? `Target location: ${location}` : 'General UK audience'}

Requirements:
- Write a longer-form caption (2-3 paragraphs)
- Include a strong call-to-action
- Make it shareable
- Focus on hen parties and memorable experiences

Format your response as JSON:
{
  "caption": "Your Facebook post here",
  "callToAction": "Book now / Contact us / etc",
  "imageIdea": "brief description of ideal accompanying image"
}`;
                break;

            case 'story':
                prompt = `You are a social media marketing expert for a hen party life drawing entertainment business.

Create Instagram Story text overlays about: ${topic}
Tone: ${tone || 'exciting, urgent, fun'}

Requirements:
- Create 3-4 story slides with short punchy text
- Include interactive elements (poll ideas, questions)
- Drive traffic to website or booking

Format your response as JSON:
{
  "slides": [
    { "text": "Slide 1 text", "sticker": "poll/question/countdown" },
    { "text": "Slide 2 text", "sticker": "type" }
  ],
  "linkIdea": "what to link to"
}`;
                break;

            case 'bulk':
                prompt = `You are a social media marketing expert for a hen party life drawing entertainment business.

Create a week's worth of social media content about: ${topic}
Locations to target: ${location || 'Bristol, Bath, Cardiff, Cheltenham, London'}

Create 7 unique posts, one for each day of the week.

Format your response as JSON:
{
  "weeklyPosts": [
    {
      "day": "Monday",
      "platform": "Instagram",
      "caption": "caption text",
      "hashtags": ["#tag1", "#tag2"],
      "imageIdea": "description"
    }
  ]
}`;
                break;

            default:
                prompt = `Create social media content for a hen party life drawing business about: ${topic}`;
        }

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        // Try to parse as JSON, otherwise return raw text
        let parsedContent;
        try {
            // Remove markdown code blocks if present
            const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            parsedContent = JSON.parse(cleanText);
        } catch {
            parsedContent = { rawText: text };
        }

        return NextResponse.json({
            success: true,
            content: parsedContent,
            type,
            generatedAt: new Date().toISOString(),
        });
    } catch (error: any) {
        console.error('Marketing content generation error:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
