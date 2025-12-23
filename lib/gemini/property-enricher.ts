import { GoogleGenerativeAI } from '@google/generative-ai';

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

/**
 * Enrich property information using Gemini 3
 */
export async function enrichProperty(
  propertyName: string,
  location?: string,
  existingData?: Partial<PropertyInfo>
): Promise<PropertyInfo> {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

  const prompt = `You are a property information assistant. I need you to research and provide detailed information about a property/accommodation for a hen party entertainment business.

Property Name: ${propertyName}
Location: ${location || 'Not specified'}
${existingData?.postcode ? `Postcode: ${existingData.postcode}` : ''}

Please provide comprehensive information about this property including:

1. **Description**: A compelling 2-3 sentence description of the property, highlighting what makes it special for hen parties (e.g., large spaces, beautiful gardens, hot tubs, etc.)

2. **Features**: A list of key features that would appeal to hen party groups (e.g., "Large living room perfect for activities", "Hot tub", "Beautiful garden", "Parking for multiple cars", "Fully equipped kitchen", etc.)

3. **Location Details**: If you can find it, provide:
   - Full address (if available)
   - Postcode (if not already provided)
   - Nearby attractions or amenities

4. **Sales Content**: Write a compelling sales piece (200-300 words) about why this property is perfect for hen party life drawing entertainment. Include:
   - The atmosphere and setting
   - Why it's ideal for hen party celebrations
   - How the space works for life drawing sessions
   - Any unique selling points

5. **SEO Meta Description**: A 150-160 character meta description for search engines

6. **Booking Information**: If you can find it, provide:
   - Booking URL (Airbnb, booking.com, etc.) if available
   - Google Maps URL

Please format your response as JSON with the following structure:
{
  "description": "...",
  "features": ["feature1", "feature2", ...],
  "address": "...",
  "postcode": "...",
  "content": "...",
  "meta_description": "...",
  "booking_url": "...",
  "google_maps_url": "..."
}

If you cannot find specific information, use your knowledge to create realistic and appealing content based on the property name and location. Focus on making it attractive for hen party groups looking for life drawing entertainment.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from the response (might have markdown code blocks)
    let jsonText = text.trim();
    
    // Remove markdown code blocks if present
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/g, '').trim();
    }

    // Parse JSON
    const enrichedData: PropertyInfo = JSON.parse(jsonText);

    // Merge with existing data (existing data takes precedence)
    return {
      ...enrichedData,
      ...existingData,
      // Only update fields that were enriched
      description: enrichedData.description || existingData?.description,
      features: enrichedData.features || existingData?.features,
      content: enrichedData.content || existingData?.content,
      meta_description: enrichedData.meta_description || existingData?.meta_description,
      address: enrichedData.address || existingData?.address,
      postcode: enrichedData.postcode || existingData?.postcode,
      booking_url: enrichedData.booking_url || existingData?.booking_url,
      google_maps_url: enrichedData.google_maps_url || existingData?.google_maps_url,
    };
  } catch (error: any) {
    console.error('Error enriching property:', error);
    throw new Error(`Failed to enrich property: ${error.message}`);
  }
}

/**
 * Batch enrich multiple properties
 */
export async function enrichProperties(
  properties: Array<{ name: string; location?: string; existingData?: Partial<PropertyInfo> }>
): Promise<PropertyInfo[]> {
  const results: PropertyInfo[] = [];

  for (const property of properties) {
    try {
      const enriched = await enrichProperty(
        property.name,
        property.location,
        property.existingData
      );
      results.push(enriched);
      
      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error: any) {
      console.error(`Error enriching ${property.name}:`, error);
      results.push(property.existingData || {
        title: property.name,
        location: property.location || '',
      });
    }
  }

  return results;
}

/**
 * Generate sales content for a property
 */
export async function generateSalesContent(
  propertyName: string,
  location: string,
  features?: string[]
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

  const prompt = `Write a compelling 250-300 word sales piece about why ${propertyName} in ${location} is perfect for hen party life drawing entertainment.

Key points to include:
- The property's atmosphere and setting
- Why it's ideal for hen party celebrations
- How the space works for life drawing sessions
- The experience guests will have
- Any unique selling points

${features && features.length > 0 ? `Property features: ${features.join(', ')}` : ''}

Make it engaging, professional, and focused on the hen party experience. Write in second person ("you", "your group").`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error: any) {
    console.error('Error generating sales content:', error);
    throw new Error(`Failed to generate sales content: ${error.message}`);
  }
}

