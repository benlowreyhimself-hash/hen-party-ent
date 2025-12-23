# Gemini Models Configuration

## Overview
The accommodation database enrichment system now uses the **best available Gemini models** for each specific task, with automatic fallback for reliability.

## Model Selection Strategy

### 1. Property Enrichment (`lib/gemini/property-enricher.ts`)
- **Primary Model**: `gemini-3.0-pro`
  - Latest flagship model with superior reasoning and creative writing capabilities
  - Generates the most engaging and accurate property descriptions
  
- **Fallback Model**: `gemini-1.5-pro`
  - Reliable previous generation model
  - Used if Gemini 3 is temporarily unavailable

**Use Case**: Generating property descriptions, features lists, sales content, and meta descriptions

### 2. Address Verification (`lib/gemini/address-verifier.ts`)
- **Primary Model**: `gemini-3.0-pro`
  - Highest accuracy for parsing addresses and validating locations
  - Enhanced logic for finding correct booking links
  
- **Fallback Model**: `gemini-1.5-pro`

**Use Case**: Verifying addresses, finding booking platform links (Airbnb, Booking.com, VRBO), extracting location data

### 3. Photo Enrichment (`lib/gemini/photo-enricher.ts`)
- **Model**: `gemini-3.0-flash`
  - Extremely fast and cost-effective
  - Excellent visual understanding for generating alt text and descriptions
  
**Use Case**: Generating alt text, titles, and descriptions for photos

## Configuration File

All model selections are centralized in `lib/gemini/models.ts`:

```typescript
export const GEMINI_MODELS = {
  PROPERTY_ENRICHMENT: 'gemini-3.0-pro',
  PROPERTY_ENRICHMENT_FALLBACK: 'gemini-1.5-pro',
  
  ADDRESS_VERIFICATION: 'gemini-3.0-pro',
  ADDRESS_VERIFICATION_FALLBACK: 'gemini-1.5-pro',
  
  PHOTO_ENRICHMENT: 'gemini-3.0-flash',
  PHOTO_ENRICHMENT_FALLBACK: 'gemini-1.5-flash',
  
  BATCH_PROCESSING: 'gemini-3.0-flash',
};
```

## Automatic Fallback System

The `tryWithFallback()` function automatically:
1. Attempts the primary (best quality) model first
2. Falls back to the secondary model if the primary fails
3. Provides error handling and logging

This ensures:
- ✅ Maximum quality when possible
- ✅ Reliability through fallbacks
- ✅ No service interruptions

## Model Comparison

| Model | Speed | Quality | Cost | Best For |
|-------|-------|---------|------|----------|
| `gemini-1.5-pro` | Slower | Highest | Higher | Complex content generation, reasoning |
| `gemini-1.5-flash` | Fast | Good | Lower | Simple tasks, batch processing |

## Updating Models

To use newer models (e.g., `gemini-2.0-flash-exp`), simply update `lib/gemini/models.ts`:

```typescript
PROPERTY_ENRICHMENT: 'gemini-2.0-flash-exp', // New experimental model
```

The system will automatically use the new model with fallback support.

## Performance Notes

- **Property Enrichment**: Uses Pro model for best quality (slower, ~2-3 seconds per property)
- **Address Verification**: Uses Pro model for accuracy (slower, ~2-3 seconds per address)
- **Photo Enrichment**: Uses Flash model for speed (fast, ~0.5-1 second per photo)
- **Batch Processing**: Automatically uses Flash model for efficiency

## Cost Optimization

- Pro models are used only for tasks requiring highest quality
- Flash models used for simpler tasks and batch operations
- Automatic fallback prevents unnecessary API calls on errors

