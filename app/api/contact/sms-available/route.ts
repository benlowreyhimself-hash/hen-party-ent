import { NextResponse } from 'next/server';

/**
 * Check if SMS/Twilio is configured and available
 */
export async function GET() {
  const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
  const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
  const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

  const isAvailable = !!(
    TWILIO_ACCOUNT_SID &&
    TWILIO_AUTH_TOKEN &&
    TWILIO_PHONE_NUMBER &&
    TWILIO_ACCOUNT_SID !== 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' &&
    TWILIO_AUTH_TOKEN !== 'your_auth_token_here'
  );

  return NextResponse.json({ available: isAvailable });
}

