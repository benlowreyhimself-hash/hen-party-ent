import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_MODELS, tryWithFallback } from './models';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

interface PropertyInfo {
  title?: string;
  description?: string;
  location?: string;
  address?: string;
  postcode?: string;
  features?: string[];
  content?: string; // Sales content about hen party services
  meta_description?: string;
  booking_url?: string;
  google_maps_url?: string;
}

interface EnrichmentResult {
  description: string;
  features: string[];
  content: string;
  meta_description: string;
  sleeps?: string | null;
}

/**
 * Enrich property information using Gemini AI
 */
export async function enrichProperty(
  propertyName: string,
  location?: string | null,
  address?: string | null,
  existingData?: Partial<PropertyInfo>
): Promise<EnrichmentResult> {
  return tryWithFallback(
    GEMINI_MODELS.PROPERTY_ENRICHMENT,
    GEMINI_MODELS.PROPERTY_ENRICHMENT_FALLBACK,
    async (modelName) => {
      const model = genAI.getGenerativeModel({ model: modelName });
      
      const prompt = `
You are an expert in hen party accommodations and life drawing entertainment.
Your task is to generate detailed, SEO-friendly content for a hen party accommodation.

Property Name: ${propertyName || 'Property'}
${location ? `Location: ${location}` : ''}
${address ? `Address: ${address}` : ''}
${existingData?.description ? `Existing Description: ${existingData.description}` : ''}

Please provide the following in a JSON format:

1.  **description**: A concise, 2-3 sentence description of the property, highlighting its suitability for hen parties.
2.  **features**: An array of 5-8 key features of the accommodation that are appealing to hen groups (e.g., "Hot tub", "Large communal spaces", "Beautiful garden", "Close to amenities", "Private chef available").
3.  **content**: A 200-300 word sales piece about why this specific property is perfect for a hen party life drawing event. Emphasize the fun, tasteful, and memorable experience of life drawing, and how it complements the accommodation's features. Include phrases like "professional male model", "all drawing materials provided", "no experience necessary", "fun and laughter guaranteed".
4.  **meta_description**: A short, SEO-optimized meta description (150-160 characters) for the property's webpage.
5.  **sleeps**: The number of people the property sleeps (e.g., "8", "10-12", "12+"). Extract this from booking pages or property descriptions if available. If not found, use null.

Ensure all generated content is unique, engaging, and tailored for hen party organizers.
  `;

      try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        console.log(`[Gemini Property Enrichment] Raw response length: ${text.length}`);

        if (!text) {
          throw new Error('Gemini returned empty response');
        }

        // Attempt to parse JSON, handle potential markdown code blocks
        let jsonString = text.trim();
        // Remove markdown code blocks if present (```json ... ``` or ``` ... ```)
        jsonString = jsonString.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/\s*```$/, '');

        try {
          const parsedData: EnrichmentResult = JSON.parse(jsonString);

          // Ensure features is an array of strings
          if (!Array.isArray(parsedData.features)) {
            parsedData.features = [];
          }

          return parsedData;
        } catch (e: any) {
          console.error(`[Gemini Property Enrichment] JSON Parse Error. Raw Text:`, text);
          throw new Error(`Failed to parse Gemini JSON: ${e.message}`);
        }
      } catch (error: any) {
        console.error(`Error calling Gemini API with ${modelName}:`, error);
        throw new Error(`Gemini API call failed: ${error.message}`);
      }
    }
  );
}

interface EnrichmentRequest {
  name: string;
  location?: string | null;
  existingData?: Partial<PropertyInfo>;
}

/**
 * Batch enrich multiple properties
 */
export async function enrichProperties(
  requests: EnrichmentRequest[]
): Promise<EnrichmentResult[]> {
  const results: EnrichmentResult[] = [];
  
  // Process sequentially to avoid rate limits
  for (const request of requests) {
    try {
      const enriched = await enrichProperty(
        request.name,
        request.location,
        request.existingData?.address,
        request.existingData
      );
      results.push(enriched);
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error: any) {
      console.error(`Error enriching ${request.name}:`, error.message);
      // Return empty result on error
      results.push({
        description: '',
        features: [],
        content: '',
        meta_description: '',
        sleeps: null,
      });
    }
  }
  
  return results;
}
