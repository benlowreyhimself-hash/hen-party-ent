// Email sending service using SendGrid (preferred) or Resend (fallback), SMS using Twilio

import { Resend } from 'resend';
import twilio from 'twilio';
import sgMail from '@sendgrid/mail';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = 'ben@henpartyentertainment.co.uk';

// Twilio configuration
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER; // Format: +447747571426

// Initialize SendGrid if API key is available
if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

interface BookingFormData {
  name: string;
  email: string;
  phone?: string;
  relation?: string;
  occasion?: string;
  region?: string;
  groupSize?: string;
  duration?: string;
  startTime?: string;
  eventDate?: string;
  venue?: string;
  fullAddress?: string;
  message?: string;
  enquiryDate?: string;
  source?: string;
  method?: string;
}

/**
 * Send booking enquiry email
 */
export async function sendBookingEmail(formData: BookingFormData) {
  // Format email body to match Google Sheets structure
  const emailBody = `
New Booking Enquiry - ${formData.name} - ${formData.eventDate || 'TBC'}

BOOKING DETAILS:
================
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Relation: ${formData.relation || 'Not specified'}
Occasion: ${formData.occasion || 'Not specified'}
Region: ${formData.region || 'Not specified'}
Group Size: ${formData.groupSize || 'Not specified'}
Duration: ${formData.duration || 'Not specified'}
Start Time: ${formData.startTime || 'Not specified'}
Event Date: ${formData.eventDate || 'Not specified'}
Venue: ${formData.venue || 'Not specified'}
Full Address: ${formData.fullAddress || 'Not provided'}

MESSAGE/NOTES:
${formData.message || 'No additional notes'}

METADATA:
=========
Enquiry Date: ${formData.enquiryDate || new Date().toISOString().split('T')[0]}
Source: ${formData.source || 'Website Contact Form'}
Method: ${formData.method || 'form'}
  `.trim();

  const emailSubject = `New Booking Enquiry - ${formData.name} - ${formData.eventDate || 'TBC'}`;

  // Prefer Resend (better free tier, simpler setup)
  if (RESEND_API_KEY) {
    try {
      const resend = new Resend(RESEND_API_KEY);

      const result = await resend.emails.send({
        from: 'Website <ben@henpartyentertainment.co.uk>',
        to: TO_EMAIL,
        replyTo: formData.email,
        subject: emailSubject,
        text: emailBody,
        html: formatBookingEmailHTML(formData),
      });

      if (result.error) {
        throw new Error(result.error.message || 'Failed to send email');
      }

      console.log('✅ Email sent via Resend');
      return;
    } catch (error: any) {
      console.error('Resend error:', error);
      // Fall through to SendGrid or console log
    }
  }

  // Fallback to SendGrid if Resend fails or is not configured
  if (SENDGRID_API_KEY) {
    try {
      await sgMail.send({
        from: 'Website <ben@henpartyentertainment.co.uk>', // Using verified domain
        to: TO_EMAIL,
        replyTo: formData.email,
        subject: emailSubject,
        text: emailBody,
        html: formatBookingEmailHTML(formData),
      });

      console.log('✅ Email sent via SendGrid');
      return;
    } catch (error: any) {
      console.error('SendGrid error:', error);
      // Fall through to console log
    }
  }

  // Fallback: Log to console (for development)
  console.log('\n📧 BOOKING ENQUIRY EMAIL:');
  console.log('========================');
  console.log(`To: ${TO_EMAIL}`);
  console.log(`Subject: ${emailSubject}`);
  console.log(`\n${emailBody}\n`);
  console.log('========================\n');
}

/**
 * Send template email
 */
export async function sendTemplateEmail(email: string) {
  const templateBody = `
HEN PARTY LIFE DRAWING - BOOKING TEMPLATE

Please fill in the following details and send back:

Name: _________________________
Email: _________________________
Phone: _________________________
Relation: _________________________
Occasion: _________________________
Region: _________________________
Group Size: _________________________
Duration: (60 mins / 90 mins / TBC): _________________________
Start Time: _________________________
Event Date: _________________________
Venue: _________________________
Full Address: _________________________

Message/Notes:
_____________________________________________
_____________________________________________
_____________________________________________

Thank you!
Ben - Hen Party Entertainment
  `.trim();

  const emailSubject = 'Hen Party Life Drawing - Booking Template';

  // Prefer Resend (better free tier, simpler setup)
  if (RESEND_API_KEY) {
    try {
      const resend = new Resend(RESEND_API_KEY);

      const result = await resend.emails.send({
        from: 'Ben <ben@henpartyentertainment.co.uk>',
        to: email,
        subject: emailSubject,
        text: templateBody,
      });

      if (result.error) {
        throw new Error(result.error.message || 'Failed to send email');
      }

      console.log('✅ Template email sent via Resend');
      return;
    } catch (error: any) {
      console.error('Resend error:', error);
      // Fall through to SendGrid or console log
    }
  }

  // Fallback to SendGrid if Resend fails or is not configured
  if (SENDGRID_API_KEY) {
    try {
      await sgMail.send({
        from: 'Ben <ben@henpartyentertainment.co.uk>', // Using verified domain
        to: email,
        subject: emailSubject,
        text: templateBody,
      });

      console.log('✅ Template email sent via SendGrid');
      return;
    } catch (error: any) {
      console.error('SendGrid error:', error);
      // Fall through to console log
    }
  }

  // Fallback
  console.log(`\n📧 TEMPLATE EMAIL TO: ${email}`);
  console.log(`Subject: ${emailSubject}`);
  console.log(`\n${templateBody}\n`);
}

/**
 * Send template SMS via Twilio
 */
export async function sendTemplateSMS(phone: string) {
  // Format phone number (ensure it starts with +44 for UK)
  let formattedPhone = phone.trim();
  if (!formattedPhone.startsWith('+')) {
    // If starts with 0, replace with +44
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '+44' + formattedPhone.substring(1);
    } else {
      formattedPhone = '+44' + formattedPhone;
    }
  }

  // Shortened template (SMS has 160 char limit per message, but can be longer)
  const templateText = `Hen Party Life Drawing - Booking Template:

Name: ___
Email: ___
Phone: ___
Relation: ___
Occasion: ___
Region: ___
Group Size: ___
Duration: ___
Start Time: ___
Event Date: ___
Venue: ___
Full Address: ___

Fill in and send back. Thanks! Ben`;

  // If Twilio is configured, use it
  if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_PHONE_NUMBER) {
    try {
      const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

      const message = await client.messages.create({
        body: templateText,
        from: TWILIO_PHONE_NUMBER,
        to: formattedPhone,
      });

      console.log(`✅ SMS sent via Twilio to ${formattedPhone} (SID: ${message.sid})`);
      return;
    } catch (error: any) {
      console.error('Twilio error:', error);
      throw new Error(`Failed to send SMS: ${error.message}`);
    }
  }

  // Fallback: Log to console and suggest email
  console.log(`\n📱 SMS TEMPLATE TO: ${formattedPhone}`);
  console.log(`\n${templateText}\n`);
  console.log('⚠️  Twilio not configured. SMS not sent.');
  throw new Error('SMS is not available. Please use the email option instead, or contact us directly.');
}

/**
 * Format booking email as HTML
 */
function formatBookingEmailHTML(formData: BookingFormData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .header { background-color: #c87cc4; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; }
    .section { margin-bottom: 20px; }
    .field { margin-bottom: 10px; }
    .label { font-weight: bold; color: #c87cc4; }
    .value { margin-left: 10px; }
    .metadata { background-color: #f5f5f5; padding: 15px; border-left: 4px solid #c87cc4; }
  </style>
</head>
<body>
  <div class="header">
    <h1>New Booking Enquiry</h1>
    <p>${formData.name} - ${formData.eventDate || 'TBC'}</p>
  </div>
  
  <div class="content">
    <div class="section">
      <h2>Booking Details</h2>
      <div class="field"><span class="label">Name:</span> <span class="value">${formData.name}</span></div>
      <div class="field"><span class="label">Email:</span> <span class="value">${formData.email}</span></div>
      <div class="field"><span class="label">Phone:</span> <span class="value">${formData.phone || 'Not provided'}</span></div>
      <div class="field"><span class="label">Relation:</span> <span class="value">${formData.relation || 'Not specified'}</span></div>
      <div class="field"><span class="label">Occasion:</span> <span class="value">${formData.occasion || 'Not specified'}</span></div>
      <div class="field"><span class="label">Region:</span> <span class="value">${formData.region || 'Not specified'}</span></div>
      <div class="field"><span class="label">Group Size:</span> <span class="value">${formData.groupSize || 'Not specified'}</span></div>
      <div class="field"><span class="label">Duration:</span> <span class="value">${formData.duration || 'Not specified'}</span></div>
      <div class="field"><span class="label">Start Time:</span> <span class="value">${formData.startTime || 'Not specified'}</span></div>
      <div class="field"><span class="label">Event Date:</span> <span class="value">${formData.eventDate || 'Not specified'}</span></div>
      <div class="field"><span class="label">Venue:</span> <span class="value">${formData.venue || 'Not specified'}</span></div>
      <div class="field"><span class="label">Full Address:</span> <span class="value">${formData.fullAddress || 'Not provided'}</span></div>
    </div>
    
    ${formData.message ? `
    <div class="section">
      <h2>Message/Notes</h2>
      <p>${formData.message.replace(/\n/g, '<br>')}</p>
    </div>
    ` : ''}
    
    <div class="metadata">
      <div class="field"><span class="label">Enquiry Date:</span> <span class="value">${formData.enquiryDate || new Date().toISOString().split('T')[0]}</span></div>
      <div class="field"><span class="label">Source:</span> <span class="value">${formData.source || 'Website Contact Form'}</span></div>
      <div class="field"><span class="label">Method:</span> <span class="value">${formData.method || 'form'}</span></div>
    </div>
  </div>
</body>
</html>
  `.trim();
}

