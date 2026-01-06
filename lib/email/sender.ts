// Email sending service using Resend with Twilio for SMS
import { Resend } from 'resend';
import twilio from 'twilio';

// Initialize Resend
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

const TO_EMAIL = 'ben@henpartyentertainment.co.uk';
const FROM_EMAIL = 'notifications@henpartyentertainment.co.uk'; // Must be a verified domain

// Twilio configuration
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

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
 * Send booking enquiry email via Resend
 */
export async function sendBookingEmail(formData: BookingFormData) {
  if (!resend) {
    console.error('❌ Resend API Key missing. Cannot send email.');
    return;
  }

  // Build subject: Name + Date + Location (if provided)
  const subjectParts = [formData.name];
  if (formData.eventDate) subjectParts.push(formData.eventDate);
  if (formData.region) subjectParts.push(formData.region);
  const emailSubject = subjectParts.join(' - ');

  // Text Body
  const textBody = `
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

  // HTML Body
  const htmlBody = formatBookingEmailHTML(formData);

  try {
    const data = await resend.emails.send({
      from: `Hen Party Ent <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      replyTo: formData.email,
      subject: emailSubject,
      text: textBody,
      html: htmlBody,
    });

    if (data.error) {
      console.error('❌ Resend API Error:', data.error);
      throw new Error(data.error.message);
    }

    console.log('✅ Email sent via Resend. ID:', data.data?.id);
  } catch (error: any) {
    console.error('❌ Error sending email via Resend:', error);
    // Log intent if failed
    console.log('\n📧 FAILED EMAIL INTENT:');
    console.log(`To: ${TO_EMAIL}`);
    console.log(`Subject: ${emailSubject}`);
  }
}

/**
 * Send enquiry email to venue (Dual Notification) via Resend
 */
export async function sendVenueEnquiryEmail(formData: BookingFormData, venueEmail: string) {
  if (!resend) {
    console.error('❌ Resend API Key missing. Cannot send venue email.');
    return;
  }

  const emailSubject = `Enquiry from Hen Party Entertainment - ${formData.eventDate || 'Date TBC'}`;

  const textBody = `
Hello,

You have received a new enquiry via Hen Party Entertainment.

ENQUIRY DETAILS:
Name: ${formData.name}
Event Date: ${formData.eventDate || 'TBC'}
Group Size: ${formData.groupSize || 'TBC'}
Message: ${formData.message || 'No message provided'}

This enquiry was generated from our website listing for your venue.
Please reply directly to ${formData.email} to discuss availability.

Best regards,
Ben Lowrey
Hen Party Entertainment
  `.trim();

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .header { background-color: #c87cc4; color: white; padding: 20px; }
    .content { padding: 20px; border: 1px solid #ddd; }
    .field { margin-bottom: 10px; }
    .label { font-weight: bold; }
  </style>
</head>
<body>
  <div class="header">
    <h2>New Enquiry via Hen Party Entertainment</h2>
  </div>
  <div class="content">
    <p>Hello,</p>
    <p>You have received a new enquiry via Hen Party Entertainment.</p>
    
    <h3>Enquiry Details:</h3>
    <div class="field"><span class="label">Name:</span> ${formData.name}</div>
    <div class="field"><span class="label">Event Date:</span> ${formData.eventDate || 'TBC'}</div>
    <div class="field"><span class="label">Group Size:</span> ${formData.groupSize || 'TBC'}</div>
    <div class="field"><span class="label">Client Email:</span> ${formData.email}</div>
    
    ${formData.message ? `<h3>Message:</h3><p>${formData.message}</p>` : ''}
    
    <p><strong>This enquiry came from our listing for your venue.</strong></p>
    <p>Please reply directly to <strong>${formData.email}</strong> to discuss booking availability.</p>
    
    <hr>
    <p>Best regards,<br>Ben Lowrey<br>Hen Party Entertainment</p>
  </div>
</body>
</html>
  `;

  try {
    const data = await resend.emails.send({
      from: `Ben Lowrey <${FROM_EMAIL}>`,
      to: [venueEmail],
      bcc: [TO_EMAIL], // Copy Ben
      replyTo: formData.email, // Reply goes to client
      subject: emailSubject,
      text: textBody,
      html: htmlBody,
    });

    if (data.error) {
      console.error('❌ Resend API Error (Venue Email):', data.error);
    } else {
      console.log('✅ Venue email sent via Resend. ID:', data.data?.id);
    }
  } catch (error) {
    console.error('❌ Error sending venue email via Resend:', error);
  }
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

  // Fallback
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
