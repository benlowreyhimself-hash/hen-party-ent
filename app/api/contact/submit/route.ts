import { NextResponse } from 'next/server';
import { sendBookingEmail } from '@/lib/email/sender';
import { saveFormSubmission } from '@/lib/supabase/form-submissions';

export async function POST(request: Request) {
  try {
    const formData = await request.json();

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

    // Send email
    await sendBookingEmail(formData);

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

