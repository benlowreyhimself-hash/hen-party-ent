import { NextResponse } from 'next/server';
import { sendTemplateEmail, sendTemplateSMS } from '@/lib/email/sender';
import { saveTemplateRequest } from '@/lib/supabase/form-submissions';

export async function POST(request: Request) {
  try {
    const { method, phone, email } = await request.json();

    if (method === 'sms') {
      if (!phone) {
        return NextResponse.json(
          { error: 'Phone number is required' },
          { status: 400 }
        );
      }

      // Save to database first
      try {
        await saveTemplateRequest({
          method: 'sms',
          phone: phone,
        });
        console.log('✅ SMS template request saved to database');
      } catch (dbError: any) {
        console.error('Database save error (continuing with SMS):', dbError);
        // Continue with SMS even if database save fails
      }

      try {
        await sendTemplateSMS(phone);
      } catch (smsError: any) {
        // If SMS fails due to missing Twilio config, return helpful error
        if (smsError.message.includes('not available') || smsError.message.includes('not configured')) {
          return NextResponse.json(
            { 
              error: 'SMS is not available. Please use the email option instead.',
              suggestion: 'email'
            },
            { status: 400 }
          );
        }
        throw smsError; // Re-throw other errors
      }
    } else if (method === 'email') {
      if (!email) {
        return NextResponse.json(
          { error: 'Email address is required' },
          { status: 400 }
        );
      }

      // Save to database first
      try {
        await saveTemplateRequest({
          method: 'email',
          email: email,
        });
        console.log('✅ Email template request saved to database');
      } catch (dbError: any) {
        console.error('Database save error (continuing with email):', dbError);
        // Continue with email even if database save fails
      }

      await sendTemplateEmail(email);
    } else {
      return NextResponse.json(
        { error: 'Invalid method. Use "sms" or "email"' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: `Template sent via ${method}` },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error sending template:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send template' },
      { status: 500 }
    );
  }
}
