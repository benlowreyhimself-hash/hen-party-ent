import * as dotenv from 'dotenv';
import { readGoogleSheet, listSheets } from '../lib/google-sheets/reader';
import { createHouse, getAllHouses } from '../lib/supabase/houses';
import { getRegionFromPostcode } from '../lib/utils/postcode';

dotenv.config({ path: '.env.local' });

const SPREADSHEET_ID = '1DG39vTTA52h62Y6Du7MT5v3bGeFeaozgIeJQ01U2y08';

interface AccommodationData {
  address: string;
  venue?: string;
  region?: string;
  postcode?: string;
  location?: string;
  sheet?: string;
  row?: number;
  visitDate?: string; // Date when Ben was at this venue (from sheet name or date column)
}

async function importAccommodations() {
  try {
    console.log('📊 Starting accommodation import from Google Sheets...\n');
    
    const allSheets = await listSheets(SPREADSHEET_ID);
    
    // Sheets to process (excluding system sheets)
    const sheetsToProcess = allSheets.filter(sheet => 
      !['Analysis', 'Filters', 'Emails', 'Emails - Models', 'Follow up', 
        'Reviews Follow Up', 'Job Sheet', 'Settings', 'Models', 'Overview', 
        'Bank Accounts', 'Agent Rates'].includes(sheet)
    );
    
    console.log(`Processing ${sheetsToProcess.length} sheets:\n`);
    
    const uniqueAccommodations = new Map<string, AccommodationData & { visitDates: Set<string> }>();
    
    // Helper to extract date from sheet name (e.g., "2024-01-15" or "Jan 2024")
    function extractDateFromSheetName(sheetName: string): string | null {
      // Try to parse date from sheet name
      // Formats: "2024-01-15", "15/01/2024", "Jan 2024", "January 2024"
      const datePatterns = [
        /(\d{4}-\d{2}-\d{2})/, // YYYY-MM-DD
        /(\d{2}\/\d{2}\/\d{4})/, // DD/MM/YYYY
        /(\d{1,2}\/\d{1,2}\/\d{4})/, // D/M/YYYY
        /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{4})/i, // Month YYYY
      ];
      
      for (const pattern of datePatterns) {
        const match = sheetName.match(pattern);
        if (match) {
          try {
            const date = new Date(match[0]);
            if (!isNaN(date.getTime())) {
              return date.toISOString().split('T')[0]; // Return YYYY-MM-DD
            }
          } catch {
            // Continue to next pattern
          }
        }
      }
      return null;
    }
    
    for (const sheetName of sheetsToProcess) {
      console.log(`  📄 Reading "${sheetName}"...`);
      
      // Extract date from sheet name
      const sheetDate = extractDateFromSheetName(sheetName);
      
      try {
        const data = await readGoogleSheet(SPREADSHEET_ID, sheetName);
        
        if (data.length < 2) {
          console.log(`    ⚠️  No data rows found\n`);
          continue;
        }
        
        // Find header row
        const headerRow = data[0];
        const addressIndex = headerRow.findIndex((cell: string) => 
          cell && cell.toLowerCase().includes('full address')
        );
        const venueIndex = headerRow.findIndex((cell: string) => 
          cell && cell.toLowerCase().includes('venue')
        );
        const regionIndex = headerRow.findIndex((cell: string) => 
          cell && cell.toLowerCase().includes('region')
        );
        const dateIndex = headerRow.findIndex((cell: string) => 
          cell && (cell.toLowerCase().includes('date') || cell.toLowerCase().includes('when'))
        );
        
        if (addressIndex === -1) {
          console.log(`    ⚠️  "Full address" column not found\n`);
          continue;
        }
        
        // Process data rows
        let rowCount = 0;
        for (let i = 1; i < data.length; i++) {
          const row = data[i];
          const address = row[addressIndex]?.trim();
          const venue = row[venueIndex]?.trim();
          const region = row[regionIndex]?.trim();
          
          // Try to get date from row, otherwise use sheet name date
          let visitDate = sheetDate;
          if (dateIndex !== -1 && row[dateIndex]) {
            try {
              const rowDate = new Date(row[dateIndex]);
              if (!isNaN(rowDate.getTime())) {
                visitDate = rowDate.toISOString().split('T')[0];
              }
            } catch {
              // Use sheet date if row date is invalid
            }
          }
          
          if (address && address.length > 5) {
            // Extract postcode from address (UK postcode pattern)
            const postcodeMatch = address.match(/\b([A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2})\b/i);
            const postcode = postcodeMatch ? postcodeMatch[1].toUpperCase() : '';
            
            // Extract location (first part of address or use venue)
            let location = venue || '';
            if (!location && address) {
              // Try to extract location from address (first line or before postcode)
              const addressParts = address.split(',').map((p: string) => p.trim());
              location = addressParts[0] || address.split(/\s+/)[0] || 'Unknown';
            }
            
            // Use address as key for uniqueness
            const key = address.toLowerCase().trim();
            
            if (!uniqueAccommodations.has(key)) {
              uniqueAccommodations.set(key, {
                address,
                venue,
                region: region || (postcode ? getRegionFromPostcode(postcode) : undefined),
                postcode,
                location: location || 'Unknown',
                sheet: sheetName,
                row: i + 1,
                visitDates: new Set<string>(),
              });
            }
            
            // Add visit date if available
            const acc = uniqueAccommodations.get(key)!;
            if (visitDate) {
              acc.visitDates.add(visitDate);
            }
            rowCount++;
          }
        }
        
        console.log(`    ✅ Found ${rowCount} unique addresses (${uniqueAccommodations.size} total so far)\n`);
        
      } catch (error: any) {
        console.error(`    ❌ Error reading sheet "${sheetName}": ${error.message}\n`);
      }
    }
    
    console.log(`\n📊 Total unique accommodations found: ${uniqueAccommodations.size}\n`);
    
    if (uniqueAccommodations.size === 0) {
      console.log('⚠️  No accommodations to import');
      return;
    }
    
    // Import to database
    console.log('🔄 Importing to database...\n');
    
    let imported = 0;
    let skipped = 0;
    let errors = 0;

    // Fetch all existing houses once before the loop for efficient checking
    const allExistingHouses = await getAllHouses();
    
    for (const [key, acc] of uniqueAccommodations.entries()) {
      try {
        // Generate slug from address or venue
        const slugBase = acc.venue || acc.address.split(',')[0] || 'accommodation';
        const slug = slugBase
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
          .substring(0, 50);
        
        // Check if already exists (by checking all houses for matching slug or address)
        const existing = allExistingHouses.find(h => 
          h.slug === slug || 
          h.address?.toLowerCase() === acc.address.toLowerCase() ||
          h.raw_address?.toLowerCase() === acc.address.toLowerCase()
        );
        if (existing) {
          console.log(`  ⏭️  Skipped (exists): ${acc.address.substring(0, 50)}...`);
          skipped++;
          continue;
        }
        
        // Create accommodation
        // Store source sheet info in raw_address for tracking/verification
        const sourceInfo = acc.sheet ? ` [Source: ${acc.sheet}${acc.row ? `, Row ${acc.row}` : ''}]` : '';
        // Convert visit dates set to sorted array
        const visitDates = acc.visitDates ? Array.from(acc.visitDates).sort() : undefined;
        
        const houseData = {
          title: acc.venue || acc.address.split(',')[0] || 'Accommodation',
          slug: slug,
          postcode: acc.postcode || '',
          location: acc.location || 'Unknown',
          address: acc.address,
          raw_address: `${acc.address}${sourceInfo}`, // Store source sheet info for verification
          description: `Hen party accommodation in ${acc.location || acc.region || 'the UK'}. ${acc.address}`,
          region: acc.region || (acc.postcode ? getRegionFromPostcode(acc.postcode) : undefined),
          is_published: true,
          is_featured: false,
          ben_visited_dates: visitDates && visitDates.length > 0 ? visitDates : undefined,
        };
        
        await createHouse(houseData);
        console.log(`  ✅ Imported: ${houseData.title} (${acc.location})`);
        imported++;
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error: any) {
        console.error(`  ❌ Failed to import "${acc.address.substring(0, 50)}...": ${error.message}`);
        errors++;
      }
    }
    
    console.log(`\n✅ Import complete!`);
    console.log(`   Imported: ${imported}`);
    console.log(`   Skipped: ${skipped}`);
    console.log(`   Errors: ${errors}`);
    console.log(`   Total: ${uniqueAccommodations.size}\n`);
    
  } catch (error: any) {
    console.error('❌ Import failed:', error.message);
    if (error.message.includes('authentication')) {
      console.error('\n💡 Setup required:');
      console.error('   1. Get Google Sheets API key from: https://console.cloud.google.com/apis/credentials');
      console.error('   2. Add to .env.local: GOOGLE_SHEETS_API_KEY=your_key_here');
      console.error('   3. Enable Google Sheets API in Google Cloud Console');
    }
    process.exit(1);
  }
}

importAccommodations();

