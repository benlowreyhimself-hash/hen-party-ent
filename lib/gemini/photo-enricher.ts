/**
 * Photo Enrichment Service using Gemini AI
 * Generates alt text, titles, and descriptions for photos
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_MODELS } from './models';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export interface PhotoMetadata {
  alt: string;
  title: string;
  description: string;
}

/**
 * Enrich a photo with AI-generated metadata
 */
export async function enrichPhoto(
  photoUrl: string,
  existingAlt?: string
): Promise<PhotoMetadata> {
  const model = genAI.getGenerativeModel({ model: GEMINI_MODELS.PHOTO_ENRICHMENT });

  const context = `
This is a photo from a hen party life drawing session. The website is about professional male life drawing model services for hen parties across the UK.

Website context:
- Service: Professional life drawing entertainment for hen parties
- Model: Ben, based in Bath, covers South West and nationwide
- Style: Tasteful, fun, professional
- Locations: Bristol, Bath, Cardiff, Gloucester, Cotswolds, Somerset, Oxford, Swindon, London, Nationwide
- Service type: Mobile service - Ben travels to your location
- Materials: Provided by Ben
- Experience: Fun, comfortable, memorable

Generate appropriate metadata for this photo:
1. Alt text: Descriptive, SEO-friendly, 5-10 words
2. Title: Engaging title, 3-8 words
3. Description: 2-3 sentences describing the photo in context of hen party life drawing
`;

  const prompt = `
${context}

Photo URL: ${photoUrl}
${existingAlt ? `Existing alt text: ${existingAlt}` : ''}

Provide a JSON response with:
{
  "alt": "descriptive alt text for accessibility and SEO",
  "title": "engaging photo title",
  "description": "2-3 sentence description of the photo in context of hen party life drawing entertainment"
}

Return ONLY valid JSON, no markdown formatting.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Extract JSON from response
    let jsonString = text.trim();
    if (jsonString.startsWith('```json')) {
      jsonString = jsonString.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    } else if (jsonString.startsWith('```')) {
      jsonString = jsonString.replace(/```\n?/g, '').trim();
    }

    const parsed = JSON.parse(jsonString);

    return {
      alt: parsed.alt || existingAlt || 'Hen Party Life Drawing Session',
      title: parsed.title || 'Hen Party Life Drawing',
      description: parsed.description || 'Professional life drawing entertainment for hen parties.',
    };
  } catch (error: any) {
    console.error('Error enriching photo:', error);
    // Return fallback metadata
    return {
      alt: existingAlt || 'Hen Party Life Drawing Session',
      title: 'Hen Party Life Drawing',
      description: 'Professional life drawing entertainment for hen parties across the UK.',
    };
  }
}

/**
 * Batch enrich multiple photos
 */
export async function enrichPhotos(
  photos: Array<{ url: string; alt?: string }>
): Promise<PhotoMetadata[]> {
  const results: PhotoMetadata[] = [];

  for (const photo of photos) {
    try {
      const enriched = await enrichPhoto(photo.url, photo.alt);
      results.push(enriched);
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`Error enriching photo ${photo.url}:`, error);
      results.push({
        alt: photo.alt || 'Hen Party Life Drawing Session',
        title: 'Hen Party Life Drawing',
        description: 'Professional life drawing entertainment for hen parties.',
      });
    }
  }

  return results;
}

