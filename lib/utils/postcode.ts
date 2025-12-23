// UK Postcode to Region mapping
// This is a simplified mapping - you may want to expand this

const POSTCODE_REGIONS: Record<string, string> = {
  // South West
  'BA': 'South West',
  'BS': 'South West',
  'GL': 'South West',
  'SN': 'South West',
  'SP': 'South West',
  'TA': 'South West',
  'DT': 'South West',
  'EX': 'South West',
  'PL': 'South West',
  'TR': 'South West',
  
  // South East
  'BN': 'South East',
  'BR': 'South East',
  'CT': 'South East',
  'DA': 'South East',
  'GU': 'South East',
  'HP': 'South East',
  'ME': 'South East',
  'MK': 'South East',
  'OX': 'South East',
  'PO': 'South East',
  'RG': 'South East',
  'RH': 'South East',
  'SL': 'South East',
  'SO': 'South East',
  'TN': 'South East',
  
  // London
  'E': 'London',
  'EC': 'London',
  'N': 'London',
  'NW': 'London',
  'SE': 'London',
  'SW': 'London',
  'W': 'London',
  'WC': 'London',
  
  // Midlands
  'B': 'West Midlands',
  'CV': 'West Midlands',
  'DY': 'West Midlands',
  'WS': 'West Midlands',
  'WV': 'West Midlands',
  'DE': 'East Midlands',
  'LE': 'East Midlands',
  'NG': 'East Midlands',
  'NN': 'East Midlands',
  
  // East of England
  'CB': 'East of England',
  'CM': 'East of England',
  'CO': 'East of England',
  'IP': 'East of England',
  'NR': 'East of England',
  'PE': 'East of England',
  'SG': 'East of England',
  
  // Yorkshire and Humber
  'BD': 'Yorkshire and Humber',
  'DN': 'Yorkshire and Humber',
  'HD': 'Yorkshire and Humber',
  'HG': 'Yorkshire and Humber',
  'HU': 'Yorkshire and Humber',
  'HX': 'Yorkshire and Humber',
  'LS': 'Yorkshire and Humber',
  'S': 'Yorkshire and Humber',
  'WF': 'Yorkshire and Humber',
  'YO': 'Yorkshire and Humber',
  
  // North West
  'BB': 'North West',
  'BL': 'North West',
  'CA': 'North West',
  'CH': 'North West',
  'CW': 'North West',
  'FY': 'North West',
  'L': 'North West',
  'LA': 'North West',
  'M': 'North West',
  'OL': 'North West',
  'PR': 'North West',
  'SK': 'North West',
  'WA': 'North West',
  'WN': 'North West',
  
  // North East
  'DH': 'North East',
  'DL': 'North East',
  'NE': 'North East',
  'SR': 'North East',
  'TS': 'North East',
  
  // Wales
  'CF': 'Wales',
  'LD': 'Wales',
  'LL': 'Wales',
  'NP': 'Wales',
  'SA': 'Wales',
  'SY': 'Wales',
  
  // Scotland
  'AB': 'Scotland',
  'DD': 'Scotland',
  'DG': 'Scotland',
  'EH': 'Scotland',
  'FK': 'Scotland',
  'G': 'Scotland',
  'HS': 'Scotland',
  'IV': 'Scotland',
  'KA': 'Scotland',
  'KW': 'Scotland',
  'KY': 'Scotland',
  'ML': 'Scotland',
  'PA': 'Scotland',
  'PH': 'Scotland',
  'TD': 'Scotland',
  'ZE': 'Scotland',
};

/**
 * Extract region from UK postcode
 * @param postcode - UK postcode (e.g., "BA1 1AA" or "BA11AA")
 * @returns Region name or "Unknown"
 */
export function getRegionFromPostcode(postcode: string): string {
  if (!postcode) return 'Unknown';
  
  // Normalize postcode (remove spaces, convert to uppercase)
  const normalized = postcode.replace(/\s+/g, '').toUpperCase();
  
  // Extract the outward code (first part before the space)
  // UK postcodes are typically: AA9A 9AA or A9A 9AA or A9 9AA or AA9 9AA
  // We need the first 2-4 characters
  let outwardCode = '';
  
  // Try to match common patterns
  if (normalized.length >= 2) {
    // Try 2 characters first (most common)
    const twoChar = normalized.substring(0, 2);
    if (POSTCODE_REGIONS[twoChar]) {
      return POSTCODE_REGIONS[twoChar];
    }
    
    // Try 3 characters (e.g., EC1, WC1)
    if (normalized.length >= 3) {
      const threeChar = normalized.substring(0, 3);
      if (POSTCODE_REGIONS[threeChar]) {
        return POSTCODE_REGIONS[threeChar];
      }
    }
    
    // Try single character for London (E, N, W, etc.)
    const oneChar = normalized.substring(0, 1);
    if (POSTCODE_REGIONS[oneChar]) {
      return POSTCODE_REGIONS[oneChar];
    }
  }
  
  return 'Unknown';
}

/**
 * Get all available regions
 */
export function getAllRegions(): string[] {
  const regions = new Set(Object.values(POSTCODE_REGIONS));
  return Array.from(regions).sort();
}

