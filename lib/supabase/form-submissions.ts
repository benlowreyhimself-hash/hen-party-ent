import { createAdminClient } from './admin';
import type { NewFormSubmission } from '@/db/schema';

/**
 * Save a form submission to the database
 */
export async function saveFormSubmission(data: {
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
  venueType?: string;
  fullAddress?: string;
  message?: string;
  source?: string;
  method?: string;
  enquiryDate?: string;
}): Promise<string | null> {
  try {
    const supabase = createAdminClient();
    
    const submission: NewFormSubmission = {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      relation: data.relation || null,
      occasion: data.occasion || null,
      region: data.region || null,
      group_size: data.groupSize || null,
      duration: data.duration || null,
      start_time: data.startTime || null,
      event_date: data.eventDate || null,
      venue_type: data.venueType || null,
      full_address: data.fullAddress || null,
      message: data.message || null,
      source: data.source || 'form',
      method: data.method || 'form_submission',
      enquiry_date: data.enquiryDate || new Date().toISOString().split('T')[0],
    };

    const { data: result, error } = await supabase
      .from('form_submissions')
      .insert(submission)
      .select('id')
      .single();

    if (error) {
      console.error('Error saving form submission to database:', error);
      return null;
    }

    return result?.id || null;
  } catch (error: any) {
    console.error('Error in saveFormSubmission:', error);
    return null;
  }
}

/**
 * Save a template request to the database
 */
export async function saveTemplateRequest(data: {
  method: 'sms' | 'email';
  phone?: string;
  email?: string;
}): Promise<string | null> {
  try {
    const supabase = createAdminClient();
    
    const submission: NewFormSubmission = {
      name: 'Template Request',
      email: data.email || data.phone || 'unknown',
      phone: data.phone || null,
      source: data.method,
      method: 'template_request',
      enquiry_date: new Date().toISOString().split('T')[0],
    };

    const { data: result, error } = await supabase
      .from('form_submissions')
      .insert(submission)
      .select('id')
      .single();

    if (error) {
      console.error('Error saving template request to database:', error);
      return null;
    }

    return result?.id || null;
  } catch (error: any) {
    console.error('Error in saveTemplateRequest:', error);
    return null;
  }
}

/**
 * Get all form submissions (for admin panel)
 */
export async function getAllFormSubmissions() {
  try {
    const supabase = createAdminClient();
    
    const { data, error } = await supabase
      .from('form_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching form submissions:', error);
      return [];
    }

    return data || [];
  } catch (error: any) {
    console.error('Error in getAllFormSubmissions:', error);
    return [];
  }
}
