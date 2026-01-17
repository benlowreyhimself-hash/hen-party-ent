import { NextResponse } from 'next/server';
import { sendBookingEmail } from '@/lib/email/sender';
import { saveFormSubmission } from '@/lib/supabase/form-submissions';
import { appendRowToSheet } from '@/lib/google-sheets/actions';

const SPREADSHEET_ID = '1DG39vTTA52h62Y6Du7MT5v3bGeFeaozgIeJQ01U2y08';

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    // Capture tracking info from headers (Next.js 16)
    const { headers } = await import('next/headers');
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || 'Unknown';
    const country = headersList.get('x-vercel-ip-country') || 'Unknown';
    const city = headersList.get('x-vercel-ip-city') || 'Unknown';
    const userAgent = headersList.get('user-agent') || 'Unknown';

    console.log(`📍 Contact Submission: ${city}, ${country} (IP: ${ip})`);

    // Validate required fields
    if (!formData.name || !formData.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Save to database first
    try {
      await saveFormSubmission({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        relation: formData.relation || null,
        occasion: formData.occasion || null,
        region: formData.region || null,
        groupSize: formData.groupSize || null,
        duration: formData.duration || null,
        startTime: formData.startTime || null,
        eventDate: formData.eventDate || null,
        venueType: formData.venue || null,
        fullAddress: formData.fullAddress || null,
        message: formData.message || null,
        source: formData.source || 'form',
        method: formData.method || 'form_submission',
        enquiryDate: formData.enquiryDate || new Date().toISOString().split('T')[0],
      });
      console.log('✅ Form submission saved to database');
    } catch (dbError: any) {
      console.error('Database save error (continuing with email):', dbError);
      // Continue with email even if database save fails
    }

    // Construct enriched source
    let source = formData.source || 'Website';
    if (formData.gclid) {
      source = 'Google Ads';
    } else if (formData.utm_source) {
      source = `${formData.utm_source} / ${formData.utm_medium || ''}`;
    }

    // Add campaign details if available
    let campaignDetails = '';
    if (formData.utm_campaign) campaignDetails += `Camp: ${formData.utm_campaign} `;
    if (formData.utm_term) campaignDetails += `Kw: ${formData.utm_term}`;

    const finalSource = campaignDetails ? `${source} (${campaignDetails.trim()})` : source;

    // Add to Google Sheets
    try {
      const sheetRow = [
        formData.name,                                // A: Name
        'New',                                        // B: Status
        finalSource,                                  // C: Source
        'Contact Form',                               // D: Method
        formData.email,                               // E: Email
        formData.enquiryDate || new Date().toISOString().split('T')[0], // F: Enquiry Date
        formData.eventDate || '',                     // G: Event Date
        formData.relation || '',                      // H: Relation
        formData.occasion || '',                      // I: Occasion
        formData.region || '',                        // J: Region
        formData.duration || '',                      // K: Duration
        formData.groupSize || '',                     // L: Group Size
        formData.startTime || '',                     // M: Start Time
        formData.venue || '',                         // N: Venue
        formData.phone || '',                         // O: Phone number
        formData.fullAddress || '',                   // P: Full address
        '',                                           // Q: Days out (Empty for new)
        '',                                           // R: Prosecco (Empty for new)
        formData.message || '',                       // S: CRM Notes (Message)
      ];

      await appendRowToSheet(SPREADSHEET_ID, sheetRow, 'Master!A:S');
    } catch (sheetError) {
      console.error('Google Sheet append error:', sheetError);
      // Continue with email
    }

    // Send email with tracking info
    await sendBookingEmail({
      ...formData,
      ipAddress: ip,
      country,
      city,
    });

    return NextResponse.json(
      { message: 'Booking enquiry sent successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit form' },
      { status: 500 }
    );
  }
}

