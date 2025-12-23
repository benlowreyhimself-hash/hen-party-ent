import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_MODELS, tryWithFallback } from './models';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

interface VerifiedAddress {
  verified_address: string;
  is_public_property?: boolean;
  google_place_id?: string;
  google_maps_url: string;
  website_url?: string;
  airbnb_url?: string;
  booking_com_url?: string;
  vrbo_url?: string;
  other_booking_urls?: string[];
  location?: string;
  postcode?: string;
  sleeps?: string;
  photos?: string[]; // Array of 3-4 high-quality photo URLs from booking sites
}

/**
 * Verify an address using Gemini AI and find booking links
 */
export async function verifyAddressAndFindLinks(
  rawAddress: string,
  region?: string
): Promise<VerifiedAddress> {
  return tryWithFallback(
    GEMINI_MODELS.ADDRESS_VERIFICATION,
    GEMINI_MODELS.ADDRESS_VERIFICATION_FALLBACK,
    async (modelName) => {
      const model = genAI.getGenerativeModel({ model: modelName });
      
      const prompt = `
You are an expert at finding property information and booking links for hen party accommodations.

Given this address: "${rawAddress}"
${region ? `Region: ${region}` : ''}

**CRITICAL**: This address must be verified as a PUBLIC property (hotel, B&B, holiday rental, event venue) that can be booked for hen parties. 
If this appears to be a private residential address with NO public booking website or listing, mark it as unverified.

Please provide a JSON response with:
1. **verified_address**: The official, Google-recognized address format
2. **is_public_property**: Boolean - true if this is a public accommodation (hotel, B&B, holiday rental, event venue) with booking links, false if it appears to be a private home
3. **google_maps_url**: A Google Maps URL for this address
4. **website_url**: The official property/venue website (if found)
5. **airbnb_url**: Airbnb listing URL (if found)
6. **booking_com_url**: Booking.com listing URL (if found)
7. **vrbo_url**: VRBO listing URL (if found)
8. **other_booking_urls**: Array of other booking platform URLs (e.g., HomeAway, Expedia, etc.)
9. **location**: City/town name extracted from address
10. **postcode**: UK postcode if found
11. **sleeps**: Number of people the property sleeps (e.g., "8", "10-12", "12+") - extract from booking pages if available
12. **photos**: Array of 3-4 high-quality photo URLs from the property's booking pages or website. Extract the main property images (exterior, interior, key features). Return as array: ["https://...", "https://...", "https://..."]

Search the web to find:
- Official property websites
- Booking platform listings (Airbnb, Booking.com, VRBO, etc.)
- Google Maps location
- Property capacity/sleeps information from booking pages
- High-quality property photos from booking listings (exterior shots, interior spaces, key features)

**VERIFICATION RULES**:
- If you find booking links (Airbnb, Booking.com, VRBO, official website), mark is_public_property as true
- If you find NO booking links and it appears to be a private residential address, mark is_public_property as false
- Only verify properties that can be publicly booked for hen parties

Return ONLY valid JSON in this format:
{
  "verified_address": "Full official address",
  "is_public_property": true/false,
  "google_maps_url": "https://maps.google.com/...",
  "website_url": "https://...",
  "airbnb_url": "https://www.airbnb.com/...",
  "booking_com_url": "https://www.booking.com/...",
  "vrbo_url": "https://www.vrbo.com/...",
  "other_booking_urls": ["https://..."],
  "location": "City name",
  "postcode": "POSTCODE",
  "sleeps": "8" or null,
  "photos": ["https://...", "https://...", "https://..."] or null
}

If a field is not found, use null or empty array. Be thorough in searching for booking links.
  `;

      try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        
        console.log(`[Gemini Address Verification] Raw response length: ${text.length}`);

        if (!text) {
          throw new Error('Gemini returned empty response for address verification');
        }

        // Extract JSON from response (handle markdown code blocks)
        let jsonString = text.trim();
        // Remove markdown code blocks if present (```json ... ``` or ``` ... ```)
        jsonString = jsonString.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/\s*```$/, '');
        
        try {
          const parsed = JSON.parse(jsonString);
          
          return {
            verified_address: parsed.verified_address || rawAddress,
            is_public_property: parsed.is_public_property !== false, // Default to true if not specified
            google_maps_url: parsed.google_maps_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(rawAddress)}`,
            website_url: parsed.website_url || undefined,
            airbnb_url: parsed.airbnb_url || undefined,
            booking_com_url: parsed.booking_com_url || undefined,
            vrbo_url: parsed.vrbo_url || undefined,
            other_booking_urls: parsed.other_booking_urls || [],
            location: parsed.location || region || undefined,
            postcode: parsed.postcode || undefined,
            sleeps: parsed.sleeps || undefined,
            photos: parsed.photos && Array.isArray(parsed.photos) ? parsed.photos.filter((url: any) => typeof url === 'string' && url.startsWith('http')) : undefined,
          };
        } catch (e: any) {
          console.error(`[Gemini Address Verification] JSON Parse Error. Raw Text:`, text);
          throw new Error(`Failed to parse Gemini JSON for address verification: ${e.message}`);
        }
      } catch (error: any) {
        console.error(`Error verifying address with ${modelName}:`, error.message);
        throw error; // Let fallback handler catch this
      }
    }
  ).catch((error: any) => {
    // Final fallback if both models fail
    console.error('All models failed for address verification, using fallback');
    return {
      verified_address: rawAddress,
      is_public_property: false, // Default to false on error - requires manual verification
      google_maps_url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(rawAddress)}`,
      location: region || undefined,
      photos: undefined,
    };
  });
}

/**
 * Batch verify multiple addresses
 */
export async function verifyAddressesBatch(
  addresses: Array<{ address: string; region?: string }>
): Promise<VerifiedAddress[]> {
  const results: VerifiedAddress[] = [];
  
  for (const addr of addresses) {
    try {
      const verified = await verifyAddressAndFindLinks(addr.address, addr.region);
      results.push(verified);
      
      // Rate limiting - wait 1 second between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error: any) {
      console.error(`Error verifying ${addr.address}:`, error.message);
      results.push({
        verified_address: addr.address,
        is_public_property: false, // Default to false on error
        google_maps_url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addr.address)}`,
        location: addr.region || undefined,
        photos: undefined,
      });
    }
  }
  
  return results;
}

