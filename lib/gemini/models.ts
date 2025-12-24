/**
 * Gemini Model Configuration
 * 
 * Model selection strategy:
 * - Use the most capable model for complex tasks (content generation, reasoning)
 * - Use faster models for simpler tasks (photo metadata, quick lookups)
 * - Include fallbacks for reliability
 */

export const GEMINI_MODELS = {
  // Best for complex content generation and reasoning
  // gemini-3.0-pro: Latest flagship model, best reasoning and quality
  // gemini-3.0-flash: Extremely fast and capable
  // gemini-1.5-pro: Reliable fallback
  // Verified working model
  PROPERTY_ENRICHMENT: 'gemini-2.0-flash-exp',
  PROPERTY_ENRICHMENT_FALLBACK: 'gemini-2.0-flash-exp',

  // Best for structured data extraction and verification
  ADDRESS_VERIFICATION: 'gemini-2.0-flash-exp',
  ADDRESS_VERIFICATION_FALLBACK: 'gemini-2.0-flash-exp',

  // Best for simple metadata generation
  PHOTO_ENRICHMENT: 'gemini-2.0-flash-exp',
  PHOTO_ENRICHMENT_FALLBACK: 'gemini-2.0-flash-exp',

  // For batch operations where speed matters
  BATCH_PROCESSING: 'gemini-2.0-flash-exp',
} as const;

/**
 * Get the appropriate model for a task with fallback support
 */
export function getModelForTask(
  task: keyof typeof GEMINI_MODELS,
  useFallback = false
): string {
  const modelKey = useFallback
    ? `${task}_FALLBACK` as keyof typeof GEMINI_MODELS
    : task;

  return GEMINI_MODELS[modelKey] || GEMINI_MODELS.PROPERTY_ENRICHMENT_FALLBACK;
}

/**
 * Try a model with automatic fallback on error
 */
export async function tryWithFallback<T>(
  primaryModel: string,
  fallbackModel: string,
  operation: (model: string) => Promise<T>
): Promise<T> {
  try {
    return await operation(primaryModel);
  } catch (error: any) {
    // If it's a model-specific error, try fallback
    if (error.message?.includes('model') || error.message?.includes('not found')) {
      console.warn(`⚠️  Primary model ${primaryModel} failed, trying fallback ${fallbackModel}`);
      return await operation(fallbackModel);
    }
    throw error;
  }
}

