import { NextResponse } from 'next/server';
import { saveFormSubmission } from '@/lib/supabase/form-submissions';
import { sendBookingEmail, sendVenueEnquiryEmail } from '@/lib/email/sender';
import { getHouseById } from '@/lib/supabase/houses';

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Basic Validation
        if (!data.name || !data.email) {
            return NextResponse.json(
                { success: false, error: 'Name and email are required' },
                { status: 400 }
            );
        }

        // 1. Save to Database
        const submissionId = await saveFormSubmission({
            name: data.name,
            email: data.email,
            phone: data.phone,
            message: data.message,
            eventDate: data.date,
            houseId: data.houseId,
            trackingId: data.trackingId,
            source: 'accommodation_enquiry',
            method: 'form_submission',
            venueType: 'accommodation',
            fullAddress: data.address,
        });

        if (!submissionId) {
            console.error('Failed to save submission to database');
            // Continue anyway to try sending email
        }

        // 2. Prepare Email Data
        const emailData = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            message: data.message,
            eventDate: data.date,
            venue: data.venueName,
            source: 'Accommodation Enquiry',
        };

        // 3. Send Notification to Ben
        await sendBookingEmail(emailData);

        // 4. Dual Notification (If Venue has contact email)
        if (data.houseId) {
            const house = await getHouseById(data.houseId);
            if (house && house.contact_email) {
                console.log(`sending venue enquiry to ${house.contact_email}`);
                await sendVenueEnquiryEmail(emailData, house.contact_email);
            }
        }

        return NextResponse.json({ success: true, submissionId });

    } catch (error: any) {
        console.error('Error processing enquiry:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
